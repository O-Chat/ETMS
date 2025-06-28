#ifndef TRANSPORTMANAGER_H
#define TRANSPORTMANAGER_H

#include <vector>
#include <unordered_map>
#include <string>
#include <queue>
#include <fstream>
#include <algorithm>
#include <climits>
#include "json.hpp"
#include "Person.h"
#include "Vehicle.h"
#include "Request.h"
#include "Graph.h"
using namespace std;
using json = nlohmann::json;


struct RequestComparator {
    bool operator()(const Request* a, const Request* b) const {
        return a->getUrgencyLevel() < b->getUrgencyLevel(); // Higher urgency = higher priority
    }
};

class TransportManager {
private:
    vector<Person*> people;
    vector<Vehicle*> vehicles;
    priority_queue<Request*, vector<Request*>, RequestComparator> pendingRequests;
    Graph cityMap;

public:
    // Initialization
    void initializeSystem();                          // Adds locations, vehicles, people, connections
    void clearAllData();                              // Frees memory and resets everything

    // Core processing
    void handleRequestFromFile(const string& filename);     // Reads incoming_request.json, processes it, writes output.json
    void parseRequestJSON(const string& filename, Request*& request);   // Read and create Request object
    void saveDispatchResultToJSON(const string& filename, const Request* request, const Vehicle* vehicle);  // Write result

    // Dispatch logic
    Vehicle* findClosestAvailableVehicle(const string& location, RequestType type);  // Find nearest available vehicle
    void updateVehicleStatus(Vehicle* vehicle, const string& newLocation);           // Update availability + location

    // Status
    void displayStatus() const;                           // Print all vehicle & person status
    void printGraph() const;                              // Optional: Debug city map
};

#endif
// Data loading & saving
    // void loadCityMapFromFile(const string& filename);       // Load city map structure
    // void loadVehiclesFromFile(const string& filename);      // Optional: preload vehicles
    // void loadPeopleFromFile(const string& filename);        // Optional: preload people