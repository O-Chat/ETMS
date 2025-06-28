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
