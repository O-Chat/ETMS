# 🚑🚒🚓 Emergency Transport Management System (ETMS)

A **C++–driven simulation** with a React frontend that models real‑time emergency dispatch for ambulances, fire trucks, and police vans. ETMS finds the nearest available vehicle using Dijkstra’s algorithm and simulates real-world emergency response logistics.

> **Status:** ✅ *Functional Prototype* – Core backend logic and frontend UI complete. Vehicles are dispatched, return to their base after 10 seconds, and availability is reflected live on the map. Queuing logic based on urgency is a planned extension.

---

## ✨ Key Features

- 🚗 **Shortest‑path routing** using Dijkstra’s algorithm over a city graph.
- ⛔ **Vehicle unavailability simulation** – dispatched vehicles are marked unavailable for 10 seconds.
- 🏠 **Return to origin** – vehicles return to their base hospital/fire station/police station after dispatch.
- 🚓 **Multi-vehicle support** with Ambulance, FireTruck, and PoliceVan classes inheriting from `Vehicle`.
- ⚡ **Instant auto-dispatch** – the system assigns the nearest available vehicle automatically on request submission.
- 🖥️ **React + Tailwind frontend** with dark theme and interactive sector grid.
- 🔁 **Live status updates** – vehicle availability and location dynamically update and reflect on the UI.
- 📬 **Frontend–backend integration** via Node.js acting as a bridge between React and C++.
- 📦 **Structured modular backend** – C++ code separated into core logic classes: `TransportManager`, `Vehicle`, `Request`, `Graph`, `Person`, etc.
- 🏥 **Hospital/Station markers** – certain sectors are visually tagged for hospitals, fire stations, and police stations on the city grid.
- 🧭 **Interactive legend** with color codes and icons for better UX.
- 💡 **Realistic simulation** of emergency transport logistics and dispatch management.

---

## 🧠 Object-Oriented Design

The C++ backend is designed with clean object-oriented structure:

- **Inheritance**:
  - `Person` → `Patient`, `Driver`
  - `Vehicle` → `Ambulance`, `PoliceVan`, `FireTruck`
- **`TransportManager`** handles:
  - Request parsing
  - Shortest path calculation
  - Vehicle availability updates
  - Vehicle reinitialization after return
- **`Graph`** maintains the city structure with sectors and edges
- **`Request`** and **`Vehicle`** objects work together to simulate emergency flow

---

## 🚀 Current Working Flow

1. **User submits a request** via the frontend (React UI)
2. Request is sent to the backend (via Node.js → C++ engine)
3. Backend uses **Dijkstra’s algorithm** to find the nearest suitable vehicle
4. The vehicle is immediately **dispatched** and marked unavailable
5. After **10 seconds**, the vehicle **returns to its original sector** and becomes available again
6. *(Planned Extension)* If no vehicles are available, the request will be **queued based on urgency**
7. *(Planned Extension)* Unserved requests will be **logged for future processing**

---

## 🌆 City Map UI

- Built with **React + TailwindCSS**
- Dark-themed layout for modern aesthetic
- Fixed sectors:
  - 🏥 Hospitals: Sectors 1, 12, 24
  - 🔥 Fire Stations: Sectors 35, 47
  - 🚓 Police Stations: Sectors 58, 69, 82, 100
- Vehicle locations update in real-time on the grid

---

## 🔧 Tech Stack

- **C++17** – Core simulation logic and routing
- **Node.js** – Bridge between React frontend and C++ backend
- **React + TailwindCSS** – Frontend UI and styling
- **Graph Algorithms** – Dijkstra’s shortest path for emergency vehicle routing
- **JSON I/O** – Communication between frontend ↔ backend ↔ C++

---

## 📂 Folder Structure

- /backend-cpp/
 - ├── Graph.cpp / .h
 - ├── TransportManager.cpp / .h
 - ├── Vehicle.cpp / .h
 - ├── Request.cpp / .h
 - ├── main.cpp
 - ├── vehicles.json
 - ├── vehicles_default.json
 - └── etms ← (Add to .gitignore if executable)
- /server-node/
 - └── index.js ← Connects frontend with C++ backend
- /frontend-react/
 - ├── App.jsx
 - └── components/
 

## 🧪 How to Run

Follow the steps below to run the full ETMS system (C++ backend + Node.js server + React frontend).

---

### 🛠️ 1. Compile the C++ Backend

Navigate to the `backend-cpp/` folder and compile the main C++ file:

```bash
cd ETMS_backend
g++ -std=c++17 main.cpp Graph.cpp TransportManager.cpp Vehicle.cpp Request.cpp Person.cpp -o etms
```
This will generate the etms executable.

### 2. Start the Node.js Server
The server acts as a bridge between the frontend and the C++ backend.
```bash
(in ETMS_backend)
npm install   # only required once
node server.js
```
This will start your server on http://localhost:3001/

### 3. Run the React Frontend
In a new terminal, go to the frontend directory:
```bash
cd ../ETMS_Frontend
npm install   # only required once
npm run dev   # or npm start
```

### 4. Test It
Open the React frontend in your browser.
Submit an emergency request.
Watch the vehicle dispatch happen, and see it return to origin after 10 seconds.

## 🙏 Acknowledgements

Developed as a simulation project combining real-time systems and graph theory with frontend design.  
A solo project by **Olivia Chattopadhyay** ✨

---

> *"Saving minutes saves lives." – ETMS guiding principle*