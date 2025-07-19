#include "TransportManager.h"

int main() {
    TransportManager tm;
    
    // Step 1: Set up city and vehicles
    tm.initializeSystem();  

    // Step 2: Process request from JSON
    tm.handleRequestFromFile("incoming_request.json");

    // Step 3: Show status (optional)
    tm.displayStatus();

    return 0;
}
// int main(int argc, char* argv[]) {
//     TransportManager tm;
//     tm.initializeSystem();

//     if (argc > 1) {
//         std::string command = argv[1];

//         if (command == "dispatch") {
//             tm.handleRequestFromFile("incoming_request.json");
//             tm.displayStatus();
//         } else if (command == "markAvailable" && argc > 2) {
//             std::string vehicleID = argv[2];
//             tm.markVehicleAvailable(vehicleID);
//         }
//     } else {
//         std::cerr << "No command provided.\n";
//     }

//     return 0;
// }
