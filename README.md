# 🚑🚒🚓 Emergency Transport Management System (ETMS)

A **C++–driven simulation** with a React frontend that models real‑time emergency dispatch for ambulances, fire trucks, and police vans. ETMS finds the nearest available vehicle using Dijkstra’s algorithm and simulates real-world emergency response logistics.

> **Status:** 🛠️ *Ongoing* – Backend logic complete. Frontend UI is basic but functional. Vehicle unavailability and request queuing logic in progress.

---

## ✨ Key Features

| Feature | Status | Details |
|---------|--------|---------|
| **Shortest‑path routing** | ✅ | Dijkstra’s algorithm on a graph abstraction of the city map. |
| **Priority & FIFO queues** | 🚧 | Planned – requests will be queued when all relevant vehicles are busy. |
| **Vehicle state machine** | 🚧 | In progress – dispatched vehicles will be marked unavailable for a duration, then become available again. |
| **Multi‑vehicle support** | ✅ | Ambulance, fire truck, police van classes inherit from `Vehicle`. |
| **Auto‑dispatch on request** | ✅ | As soon as a request is filed, the nearest appropriate vehicle is dispatched. |
| **React frontend** | ✅ | Basic UI built with React and Tailwind to submit requests and view dispatches. |
| **Frontend-backend flow** | ✅ | React sends request data to the backend; backend calculates route and assigns vehicle. |
| **Modular C++ codebase** | ✅ | Separated into logical units: Person, Vehicle, Request, TransportManager, etc. |
| **Real-time vehicle tracking** | 🚧 | Planned – vehicles’ location and availability will update live on UI. |


---

## 🧠 Object-Oriented Design

The C++ backend uses object-oriented principles:

- **Inheritance**:
  - `Person` → `Patient`, `Driver`
  - `Vehicle` → `Ambulance`, `PoliceVan`, `FireTruck`
- **TransportManager** class handles all dispatch logic, vehicle status, and routing.
- **Graph** class helps build city graph
- **Request** class helps handle the requests

---



## 🚀 Current Working Flow

1. **User submits a request** via the frontend (React UI)
2. Request is sent to the backend (C++ engine)
3. Backend uses **Dijkstra’s algorithm** to find the closest relevant vehicle
4. That vehicle is immediately **dispatched** and its location updated
5. *(Planned)* The vehicle will be **unavailable for a short time**, then become available again
6. *(Planned)* If no vehicles are available, the request will be **queued** instead of dispatched

---

## 🔧 Tech Stack

- **C++17** for core simulation logic
- **React + Tailwind CSS** for basic frontend UI
- **Graph algorithms** (Dijkstra)

---

## 🙏 Acknowledgements

 Built as a simulation project combining real-time systems and graph theory.  
 
 Developed by Olivia Chattopadhyay


---

> *"Saving minutes saves lives." – ETMS guiding principle*
