#include "TransportManager.h"

void TransportManager::initializeSystem() // Adds locations, vehicles, people, connections
{
    // clearAllData();
    cout << "Initializing 10x10 city grid..." << endl;

    int rows = 10, cols = 10;

    // Step 1: Add all nodes (Sector1 to Sector100)
    for (int i = 1; i <= 100; ++i)
    {
        string sector = "Sector" + to_string(i);
        cityMap.addNode(sector);
    }

    // Step 2: Connect grid neighbors addEdge(from,to,weight,bidirectional)
    for (int r = 0; r < rows; ++r)
    {
        for (int c = 0; c < cols; ++c)
        {
            int index = r * cols + c + 1; // Sector number
            string current = "Sector" + to_string(index);

            if (r > 0)
            { // up
                string up = "Sector" + to_string((r - 1) * cols + c + 1);
                cityMap.addEdge(current, up, 1, true);
            }
            if (r < rows - 1)
            { // down
                string down = "Sector" + to_string((r + 1) * cols + c + 1);
                cityMap.addEdge(current, down, 1, true);
            }
            if (c > 0)
            { // left
                string left = "Sector" + to_string(r * cols + (c - 1) + 1);
                cityMap.addEdge(current, left, 1, true);
            }
            if (c < cols - 1)
            { // right
                string right = "Sector" + to_string(r * cols + (c + 1) + 1);
                cityMap.addEdge(current, right, 1, true);
            }
        }
    }

    // Step 3: Manually assign 9 vehicles and 9 drivers at spread-out locations
    std::vector<std::string> locations = {
        "Sector1", "Sector12", "Sector24", "Sector35", "Sector47",
        "Sector58", "Sector69", "Sector82", "Sector100"};

    for (int i = 0; i < 9; ++i)
    {
        string vehicleID, driverType;
        Vehicle *v;
        Driver *d;
        string location = locations[i];
        string driverName = "Driver" + to_string(i + 1);
        int age = 30 + i;

        if (i < 3)
        {
            vehicleID = "A" + to_string(i + 1);
            driverType = "Ambulance";
            d = new Driver(driverName, age, "D" + to_string(i + 1), driverType, vehicleID);
            v = new Ambulance(vehicleID, d, location, true);
        }
        else if (i < 5)
        {
            vehicleID = "F" + to_string(i - 2);
            driverType = "FireTruck";
            d = new Driver(driverName, age, "D" + to_string(i + 1), driverType, vehicleID);
            v = new FireTruck(vehicleID, d, location, true);
        }
        else
        {
            vehicleID = "P" + to_string(i - 4);
            driverType = "PoliceCar";
            d = new Driver(driverName, age, "D" + to_string(i + 1), driverType, vehicleID);
            v = new PoliceCar(vehicleID, d, location, true);
        }

        people.push_back(d);
        vehicles.push_back(v);
    }

    std::cout << "System initialized with 3 ambulances, 2 firetrucks, and 4 police cars." << std::endl;
}


void TransportManager::clearAllData()  // Frees memory and resets everything
{
    // Free dynamically allocated Vehicle objects
    for (Vehicle* v : vehicles) {
        delete v;
    }
    vehicles.clear();

    // Free dynamically allocated Person objects
    for (Person* p : people) {
        delete p;
    }
    people.clear();

    // Clear the pending request queue
    while (!pendingRequests.empty()) {
        Request* req = pendingRequests.top();
        pendingRequests.pop();
        delete req;
    }

    // Clear the city map graph
    cityMap.clear();  // assuming Graph class has a clear() function
}


// Core processing
void TransportManager::handleRequestFromFile(const std::string &filename) // Reads incoming_request.json, processes it, writes output.json
{
    Request *newRequest = nullptr;

    // Step 1: Parse the request from JSON
    parseRequestJSON(filename, newRequest);
    if (!newRequest)
    {
        std::cerr << "Failed to parse request." << std::endl;
        return;
    }

    // Step 2: Push the request into the priority queue
    pendingRequests.push(newRequest);
    cout << "Request added to queue: " << newRequest->displayInfo() << endl;

    // Step 3: Get highest priority request (top of queue)
    Request *currentRequest = pendingRequests.top();
    pendingRequests.pop(); // remove from queue

    // Step 4: Dispatch appropriate vehicle
    Vehicle *vehicle = findClosestAvailableVehicle(currentRequest->getLocation(), currentRequest->getType());

    if (!vehicle)
    {
        cerr << "No available vehicle for request at " << currentRequest->getLocation() << endl;
        json result;
        result["request"] = {
            {"patient_name", currentRequest->getReporter()->getName()},
            {"location", currentRequest->getLocation()},
            {"urgency", currentRequest->getUrgencyLevel()},
            {"type", Request::requestTypeToString(currentRequest->getType())}
        };
        result["vehicle"] = nullptr;
        result["message"] = "No available vehicle for the request.";
    
        ofstream outFile("output.json");
        outFile << result.dump(4);
        outFile.close();
    
        delete currentRequest; // cleanup
        return;
    }

    // Step 5: Update vehicle status and location
    updateVehicleStatus(vehicle, currentRequest->getLocation());

    // Step 6: Save result to output.json
    saveDispatchResultToJSON("output.json", currentRequest, vehicle);

    cout << "Dispatched vehicle: " << vehicle->getVehicleNumber()
              << " to " << currentRequest->getLocation() << endl;

    // Optional: store request and vehicle for logging, analytics, etc.
}
                          
void TransportManager::parseRequestJSON(const string &filename, Request *&request)  // Read and create Request object
{
    request = nullptr;
    ifstream file(filename);
    if (!file.is_open())
    {
        cerr << "Failed to open request file: " << filename << endl;
        return;
    }

    json j;
    file >> j;
    file.close();

    try
    {
         // Top-level info
         string requestID = j.at("request_id");
         string location = j.at("location");
         int urgency = j.at("urgency");
         string typeStr = j.at("type");
 
         // Reporter details (nested)
         json reporter = j.at("reporter");
         string name = reporter.at("name");
         int age = reporter.at("age");
         string patientID = reporter.at("id");
 
         // For simplicity, use dummy values for missing fields
         string medicalCondition = "N/A";
         string contact = "0000000000";

        // Convert string to enum RequestType
        RequestType type;
        if (typeStr == "MEDICAL")
            type = RequestType::MEDICAL;
        else if (typeStr == "FIRE")
            type = RequestType::FIRE;
        else if (typeStr == "CRIME")
            type = RequestType::CRIME;
        else
        {
            cerr << "Invalid request type in JSON: " << typeStr << endl;
            return;
        }

        // Create Patient object
        Person *patient = new Patient(name, age, patientID, medicalCondition, location, contact);

        // Get current time
        time_t timestamp = time(nullptr);

        // Create Request
        request = new Request(requestID, patient, location, urgency, timestamp, type);
    }
    catch (exception &e)
    {
        cerr << "Error parsing JSON: " << e.what() << endl;
    }
}
void TransportManager::saveDispatchResultToJSON(const std::string &filename, const Request *request,const Vehicle *vehicle)
{
    if (!request || !vehicle) {
                std::cerr << "Cannot write dispatch result: null request or vehicle.\n";
                 return;
             }
    json output;

    output["request"] = {
        {"location", request->getLocation()},
        {"patient_name", request->getReporter()->getName()},
        {"type", Request::requestTypeToString(request->getType())},
        {"urgency", request->getUrgencyLevel()}
    };

    output["vehicle"] = {
        {"id", vehicle->getVehicleNumber()},
        {"type", vehicle->getVehicleType()}, // Use a getType() method for Ambulance/FireTruck/PoliceCar
        {"current_location", vehicle->getCurrentLocation()},
        {"driver_id", vehicle->getDriver()->getID()},
        {"driver_name", vehicle->getDriver()->getName()}
    };

    // Add location at top-level for frontend convenience
    output["location"] = request->getLocation();

    std::ofstream outFile(filename);
    if (outFile)
    {
        outFile << output.dump(4); // Pretty print with 4-space indentation
        std::cout << "Dispatch result written to " << filename << std::endl;
    }
    else
    {
        std::cerr << "Failed to open output file: " << filename << std::endl;
    }
}


// void TransportManager::saveDispatchResultToJSON(const std::string &filename, const Request *request, const Vehicle *vehicle)  // Write result
// {
//     if (!request || !vehicle) {
//         std::cerr << "Cannot write dispatch result: null request or vehicle.\n";
//         return;
//     }

//     json result;

//     // Request Info
//     result["request"] = {
//         {"patient_name", request->getReporter()->getName()},
//         {"location", request->getLocation()},
//         {"urgency", request->getUrgencyLevel()},
//         {"type", Request::requestTypeToString(request->getType())}
//     };

//     // Vehicle Info
//     result["vehicle"] = {
//         {"vehicle_number", vehicle->getVehicleNumber()},
//         {"vehicle_type", vehicle->getVehicleType()},
//         {"current_location", vehicle->getCurrentLocation()},
//         {"driver_name", vehicle->getDriver()->getName()},
//         {"driver_id", vehicle->getDriver()->getID()}
//     };

//     // Save to file
//     ofstream outFile(filename);
//     if (!outFile) {
//         std::cerr << "Failed to open " << filename << " for writing.\n";
//         return;
//     }

//     outFile << result.dump(4);  // pretty print with 4-space indent
//     outFile.close();

//     std::cout << "Dispatch result written to " << filename << std::endl;
// }

// Dispatch logic
Vehicle *TransportManager::findClosestAvailableVehicle(const std::string &location, RequestType type)// Find nearest available vehicle
 {
    string desiredType;

    // Map RequestType to string used in Vehicle::getVehicleType()
    switch (type) {
        case RequestType::MEDICAL: desiredType = "Ambulance"; break;
        case RequestType::FIRE:    desiredType = "FireTruck"; break;
        case RequestType::CRIME:   desiredType = "PoliceCar"; break;
        default: return nullptr;
    }

    Vehicle *closest = nullptr;
    int minDistance = INT_MAX;

    for (Vehicle *v : vehicles) {
        if (v->getVehicleType() == desiredType && v->getAvailability()) {
            auto [path, dist] = cityMap.dijkstra(v->getCurrentLocation(), location);
            if (dist != -1 && dist < minDistance) {
                minDistance = dist;
                closest = v;
            }
        }
    }

    return closest;  // May be null if none found
}

void TransportManager::updateVehicleStatus(Vehicle *vehicle, const std::string &newLocation)  // Update availability + location
{
    if (!vehicle) return;

    vehicle->setCurrentLocation(newLocation);
    vehicle->setCurrentAvailability(false);  // Mark as busy

    std::cout << "Vehicle " << vehicle->getVehicleNumber()
              << " moved to " << newLocation
              << " and marked as unavailable.\n";
}

// Status
void TransportManager::displayStatus() const// Print all vehicle & person status
 {
    cout << "\n===== Vehicle and Driver Status =====\n";
    for (const auto& vehicle : vehicles) {
        cout << vehicle->displayInfo() << "\n";
        if (vehicle->getDriver()) {
            cout << "   Driver: " << vehicle->getDriver()->displayInfo() << "\n";
        }
        cout << "   Availability: " << (vehicle->getAvailability() ? "Available" : "Unavailable") << "\n";
        cout << "-------------------------------------\n";
    }

    cout << "\n===== Other People (e.g., Patients) =====\n";
    for (const auto& person : people) {
        // Only display non-drivers (e.g., patients)
        if (dynamic_cast<const Driver*>(person) == nullptr) {
            cout << person->displayInfo() << "\n";
            cout << "-------------------------------------\n";
        }
    }
}

void TransportManager::printGraph() const {
    cout << "\n===== City Map =====\n";
    cout << cityMap.displayGraph();  // Uses the Graph class's displayGraph() method
}
