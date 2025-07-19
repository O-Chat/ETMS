

// import React, { useState, useEffect } from 'react';

// const vehicleIcons = {
//   Ambulance: '🚑',
//   FireTruck: '🚒',
//   PoliceCar: '🚓'
// };

// function App() {
//   const [sectors, setSectors] = useState([]);
//   const [vehicles, setVehicles] = useState([
//     { id: 'A1', type: 'Ambulance', location: 'Sector1' },
//     { id: 'A2', type: 'Ambulance', location: 'Sector12' },
//     { id: 'F1', type: 'FireTruck', location: 'Sector24' },
//     { id: 'P1', type: 'PoliceCar', location: 'Sector35' }
//   ]);
//   const [form, setForm] = useState({
//     request_id: '',
//     reporter: { name: '', age: '', id: '' },
//     location: '',
//     urgency: '',
//     type: 'MEDICAL'
//   });
//   const [response, setResponse] = useState(null);

//   useEffect(() => {
//     const grid = [];
//     for (let i = 1; i <= 100; i++) {
//       grid.push(`Sector${i}`);
//     }
//     setSectors(grid);
//   }, []);

//   const getVehicleAt = (sector) => {
//     return vehicles
//       .filter((v) => v.location === sector)
//       .map((v) => vehicleIcons[v.type])
//       .join(' ');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (['name', 'age', 'id'].includes(name)) {
//       setForm({ ...form, reporter: { ...form.reporter, [name]: value } });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch('http://localhost:3001/dispatch', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         ...form,
  //         reporter: { ...form.reporter, age: Number(form.reporter.age) },
  //         urgency: Number(form.urgency)
  //       })
  //     });
  //     const data = await res.json();
  //     setResponse(data);
  //   } catch (error) {
  //     console.error('Error sending request:', error);
  //   }
  // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:3001/dispatch', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form)
//       });
  
//       const data = await res.json();
//       setResponse(data);
  
//       // Move the vehicle to new location in vehicles array
//       const { vehicle, location } = data;
  
//       if (vehicle && location) {
//         setVehicles((prevVehicles) =>
//           prevVehicles.map((v) =>
//             v.id === vehicle.id ? { ...v, location: location } : v
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Error sending request:', error);
//     }
//   };
  

//   return (
//     <div className="min-h-screen p-6 bg-gray-100 font-sans">
//       <header className="text-center mb-6">
//         <h1 className="text-4xl font-bold text-red-600">🚨 EMERGENCY TRANSPORT MAINTENANCE SYSTEM</h1>
//         <h2 className="text-lg text-gray-700 mt-2">By Olivia</h2>
//       </header>

//       {/* Grid */}
//       <div className="grid grid-cols-10 gap-2 max-w-5xl mx-auto mb-10">
//         {sectors.map((sector, index) => (
//           <div
//             key={index}
//             className="border border-gray-400 bg-white rounded-md p-1 text-xs h-16 flex flex-col justify-between items-center shadow-sm"
//           >
//             <div className="font-semibold">{sector}</div>
//             <div className="text-lg">{getVehicleAt(sector)}</div>
//           </div>
//         ))}
//       </div>

//       {/* Interface */}
//       <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
//         >
//           <h3 className="text-xl font-bold mb-4 text-blue-600">Submit Emergency Request</h3>
//           <div className="flex flex-col gap-3">
//             <input
//               name="request_id"
//               placeholder="Request ID"
//               value={form.request_id}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <input
//               name="name"
//               placeholder="Reporter Name"
//               value={form.reporter.name}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <input
//               name="age"
//               type="number"
//               placeholder="Age"
//               value={form.reporter.age}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <input
//               name="id"
//               placeholder="Reporter ID"
//               value={form.reporter.id}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <input
//               name="location"
//               placeholder="Location (e.g., Sector50)"
//               value={form.location}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <input
//               name="urgency"
//               type="number"
//               placeholder="Urgency (1-10)"
//               value={form.urgency}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <select
//               name="type"
//               value={form.type}
//               onChange={handleChange}
//               className="p-2 border rounded"
//             >
//               <option value="MEDICAL">MEDICAL</option>
//               <option value="FIRE">FIRE</option>
//               <option value="CRIME">CRIME</option>
//             </select>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//             >
//               Submit Request
//             </button>
//           </div>
//         </form>

//         {/* Response */}
//         {response && (
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//             <h3 className="text-xl font-bold mb-2 text-green-600">🚗 Dispatch Result</h3>
//             <pre className="text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from 'react';

// const vehicleIcons = {
//   Ambulance: '🚑',
//   FireTruck: '🚒',
//   PoliceCar: '🚓'
// };

// function App() {
//   const [sectors, setSectors] = useState([]);
  
//   const [vehicles, setVehicles] = useState([]);

//   const [form, setForm] = useState({
//     request_id: '',
//     reporter: { name: '', age: '', id: '' },
//     location: '',
//     urgency: '',
//     type: 'MEDICAL'
//   });
//   const [response, setResponse] = useState(null);

//   useEffect(() => {
//     const grid = [];
//     for (let i = 1; i <= 100; i++) {
//       grid.push(`Sector${i}`);
//     }
//     setSectors(grid);
//     // Fetch vehicles from backend
//   fetch('http://localhost:3001/vehicles')
//   .then((res) => res.json())
//   .then((data) => {
//     setVehicles(data);
//   })
//   .catch((error) => {
//     console.error('Failed to load vehicles:', error);
//   });
//   }, []);
//    // }, []);

//   // 🔁 Poll every 5s to update vehicle locations from vehicles.json
//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetch('http://localhost:3001/vehicles')
//         .then((res) => res.json())
//         .then((data) => {
//           setVehicles(data);
//         })
//         .catch((error) => {
//           console.error('Auto-refresh failed:', error);
//         });
//     }, 5000); // every 5 seconds

//     return () => clearInterval(interval);
//   }, []);


//   // 🚗 Fetch updated vehicle location from output.json
//   // const fetchOutput = async () => {
//   //   try {
//   //     const res = await fetch('http://localhost:3001/output'); // backend route to serve output.json
//   //     const data = await res.json();
//   //     const { vehicle, location } = data;

//   //     if (vehicle && location) {
//   //       setVehicles((prevVehicles) =>
//   //         prevVehicles.map((v) =>
//   //           v.id === vehicle.id ? { ...v, location } : v
//   //         )
//   //       );
//   //     }
//   //   } catch (err) {
//   //     console.error('Error fetching output.json:', err);
//   //   }
//   // };

//   // Optional: enable auto-refresh every few seconds
//   /*
//   useEffect(() => {
//     const interval = setInterval(fetchOutput, 5000);
//     return () => clearInterval(interval);
//   }, []);
//   */

//   const getVehicleAt = (sector) => {
//     return vehicles
//       .filter((v) => v.location === sector)
//       .map((v) => vehicleIcons[v.type])
//       .join(' ');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (['name', 'age', 'id'].includes(name)) {
//       setForm({ ...form, reporter: { ...form.reporter, [name]: value } });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:3001/dispatch', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...form,
//           reporter: { ...form.reporter, age: Number(form.reporter.age) },
//           urgency: Number(form.urgency)
//         })
//       });
  
//       const data = await res.json();
//       setResponse(data);
  
//       // 🔁 Immediately refresh vehicle list
//       const vehicleRes = await fetch('http://localhost:3001/vehicles');
//       const updatedVehicles = await vehicleRes.json();
//       setVehicles(updatedVehicles);
  
//     } catch (error) {
//       console.error('Error sending request:', error);
//     }
//   };
  

//   return (
//     <div className="min-h-screen p-6 bg-gray-100 font-sans">
//       <header className="text-center mb-6">
//         <h1 className="text-4xl font-bold text-red-600">🚨 EMERGENCY TRANSPORT MAINTENANCE SYSTEM</h1>
//         <h2 className="text-lg text-gray-700 mt-2">By Olivia</h2>
//       </header>

//       {/* Grid */}
//       <div className="grid grid-cols-10 gap-2 max-w-5xl mx-auto mb-10">
//         {sectors.map((sector, index) => (
//           <div
//             key={index}
//             className="border border-gray-400 bg-white rounded-md p-1 text-xs h-16 flex flex-col justify-between items-center shadow-sm"
//           >
//             <div className="font-semibold">{sector}</div>
//             <div className="text-lg">{getVehicleAt(sector)}</div>
//           </div>
//         ))}
//       </div>

//       {/* Interface */}
//       <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
//         >
//           <h3 className="text-xl font-bold mb-4 text-blue-600">Submit Emergency Request</h3>
//           <div className="flex flex-col gap-3">
//             <input
//               name="request_id"
//               placeholder="Request ID"
//               value={form.request_id}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <input
//               name="name"
//               placeholder="Reporter Name"
//               value={form.reporter.name}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <input
//               name="age"
//               type="number"
//               placeholder="Age"
//               value={form.reporter.age}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <input
//               name="id"
//               placeholder="Reporter ID"
//               value={form.reporter.id}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <input
//               name="location"
//               placeholder="Location (e.g., Sector50)"
//               value={form.location}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <input
//               name="urgency"
//               type="number"
//               placeholder="Urgency (1-10)"
//               value={form.urgency}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded"
//             />
//             <select
//               name="type"
//               value={form.type}
//               onChange={handleChange}
//               className="p-2 border rounded"
//             >
//               <option value="MEDICAL">MEDICAL</option>
//               <option value="FIRE">FIRE</option>
//               <option value="CRIME">CRIME</option>
//             </select>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//             >
//               Submit Request
//             </button>
//           </div>
//         </form>

//         {/* Response */}
//         {response && (
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//             <h3 className="text-xl font-bold mb-2 text-green-600">🚗 Dispatch Result</h3>
//             <pre className="text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
//import { FaAmbulance, FaFireExtinguisher, FaPoliceCar } from 'react-icons/fa';


const vehicleIcons = {
  Ambulance: '🚑',
  FireTruck: '🚒',
  PoliceCar: '🚓'
};

function App() {
  const [sectors, setSectors] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [form, setForm] = useState({
    request_id: '',
    reporter: { name: '', age: '', id: '' },
    location: '',
    urgency: '',
    type: 'MEDICAL'
  });
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const grid = [];
    for (let i = 1; i <= 100; i++) {
      grid.push(`Sector${i}`);
    }
    setSectors(grid);
    fetch('http://localhost:3001/vehicles')
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error('Failed to load vehicles:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:3001/vehicles')
        .then((res) => res.json())
        .then((data) => setVehicles(data))
        .catch((error) => console.error('Auto-refresh failed:', error));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // const getVehicleAt = (sector) => {
  //   return vehicles
  //     .filter((v) => v.location === sector)
  //     .map((v) => (
  //       <span key={v.id} className="text-xl bg-yellow-200 rounded-full px-2 py-1">
  //         {vehicleIcons[v.type]}
  //       </span>
  //     ));
  // };
  const getVehicleAt = (sector) => {
  return vehicles
    .filter((v) => v.location === sector)
    .map((v) => {
      const typeMap = {
        Ambulance: <span className="text-red-600 font-bold">AMB</span>,
        FireTruck: <span className="text-orange-500 font-bold">FIRE</span>,
        PoliceCar: <span className="text-blue-600 font-bold">POL</span>
      };
      return <span key={v.id}>{typeMap[v.type]}</span>;
    });
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['name', 'age', 'id'].includes(name)) {
      setForm({ ...form, reporter: { ...form.reporter, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          reporter: { ...form.reporter, age: Number(form.reporter.age) },
          urgency: Number(form.urgency)
        })
      });

      const data = await res.json();
      setResponse(data);

      const vehicleRes = await fetch('http://localhost:3001/vehicles');
      const updatedVehicles = await vehicleRes.json();
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
  <div className="min-h-screen flex flex-col bg-gray-900">
   {/* Header */}
<header
  className="text-white py-5 px-10 shadow-lg"
  style={{ backgroundColor: '#111163ff' }}
>
  <div className="flex flex-col md:flex-row justify-between items-center">
    <div className="text-3xl font-extrabold tracking-wide flex items-center gap-2">
      🚨 ETMS <span className="hidden md:inline">|</span>
      <span className="text-lg font-medium md:ml-2 text-gray-300">
        Emergency Transport Management System
      </span>
    </div>
    <div className="text-sm mt-2 md:mt-0 text-gray-400">Developed by Olivia</div>
  </div>
</header>


    {/* Main Content */}
    <div className="flex flex-col md:flex-row p-6 gap-6 flex-1">
      {/* Left: City Map + Legend */}
      <div className="md:w-2/3 flex flex-col gap-6">
  {/* City Map */}
  <div className="bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-700">
    <h2 className="text-4xl font-bold text-center mb-4 text-green-300">
      🗺️ CITY MAP <span className="text-lg text-green-500">(Sector Wise)</span>
    </h2>

    <div className="grid grid-cols-10 gap-2">
      {sectors.map((sector, index) => {
        const vehiclesHere = getVehicleAt(sector);

        const isHospital = [1, 12, 24].includes(index + 1);
        const isFireStation = [35, 47].includes(index + 1);
        const isPoliceStation = [58, 69, 82, 100].includes(index + 1);

        let bgClass = 'bg-gray-800 border-gray-600';
        if (isHospital) bgClass = 'bg-red-900 border-pink-500';
        else if (isFireStation) bgClass = 'bg-yellow-800 border-yellow-400';
        else if (isPoliceStation) bgClass = 'bg-blue-900 border-blue-400';
        else if (vehiclesHere.length) bgClass = 'border-yellow-400 bg-gray-700';

        return (
          <div
            key={index}
            className={` h-16 flex flex-col justify-between items-center py-1 px-1 shadow-md border ${bgClass} hover:scale-105 transition duration-300 ease-in-out`}
            title={`Sector ${index + 1}`}
          >
            <div className="text-gray-300 text-xs font-semibold">{index + 1}</div>
            <div
              className={`text-lg font-bold ${
                vehiclesHere === 'AMB'
                  ? 'text-pink-400'
                  : vehiclesHere === 'FIRE'
                  ? 'text-yellow-400'
                  : vehiclesHere === 'POL'
                  ? 'text-blue-400'
                  : 'text-gray-400'
              }`}
            >
              {vehiclesHere}
            </div>
          </div>
        );
      })}
    </div>
  </div>

  {/* Legend */}
  <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-md p-6">
    <h3 className="text-2xl font-bold text-gray-200 mb-4">🔍 Legend</h3>

    <div className="space-y-3 border border-gray-700 p-4 rounded-lg">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-2">
        <div className="w-6 h-6 bg-red-900 border border-pink-500 rounded-sm"></div>
        <span className="text-pink-300 font-semibold text-lg">Hospital (Sector 1, 12, 24)</span>
      </div>
      <div className="flex items-center gap-3 border-b border-gray-700 pb-2">
        <div className="w-6 h-6 bg-yellow-800 border border-yellow-400 rounded-sm"></div>
        <span className="text-yellow-300 font-semibold text-lg">Fire Station (Sector 35, 47)</span>
      </div>
      <div className="flex items-center gap-3 border-b border-gray-700 pb-2">
        <div className="w-6 h-6 bg-blue-900 border border-blue-400 rounded-sm"></div>
        <span className="text-blue-300 font-semibold text-lg">Police Station (Sector 58, 69, 82, 100)</span>
      </div>
      <div className="flex items-center gap-3 border-b border-gray-700 pb-2">
        <div className="w-6 h-6 bg-gray-700 border border-yellow-400 rounded-sm"></div>
        <span className="text-yellow-200 font-semibold text-lg">Vehicle Present</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-gray-800 border border-gray-600 rounded-sm"></div>
        <span className="text-gray-300 font-semibold text-lg">Normal Sector</span>
      </div>
    </div>
  </div>
</div>

      {/* Right: Form + Response */}
      <div className="md:w-1/3 flex flex-col gap-6">
        {/* Form */}
      <form
  onSubmit={handleSubmit}
  className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700 text-white"
>
  <h3 className="text-xl font-bold mb-4">🚑 Submit Emergency Request</h3>
  <hr className="border-t border-gray-600 mb-4" />
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <label className="w-32">Request ID:</label>
      <input
        name="request_id"
        placeholder="Request ID"
        value={form.request_id}
        onChange={handleChange}
        required
        className="flex-1 p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div className="flex items-center gap-3">
      <label className="w-32">Reporter Name:</label>
      <input
        name="name"
        placeholder="Name"
        value={form.reporter.name}
        onChange={handleChange}
        required
        className="flex-1 p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div className="flex items-center gap-3">
      <label className="w-32">Age:</label>
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={form.reporter.age}
        onChange={handleChange}
        required
        className="flex-1 p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div className="flex items-center gap-3">
      <label className="w-32">Reporter ID:</label>
      <input
        name="id"
        placeholder="ID"
        value={form.reporter.id}
        onChange={handleChange}
        required
        className="flex-1 p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div className="flex items-center gap-3">
      <label className="w-32">Location:</label>
      <input
        name="location"
        placeholder="e.g., Sector50"
        value={form.location}
        onChange={handleChange}
        required
        className="flex-1 p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div className="flex items-center gap-3">
      <label className="w-32">Urgency (1-10):</label>
      <input
        name="urgency"
        type="number"
        placeholder="1-10"
        value={form.urgency}
        onChange={handleChange}
        required
        className="flex-1 p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div className="flex items-center gap-3">
      <label className="w-32">Type:</label>
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="flex-1 p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="MEDICAL">MEDICAL</option>
        <option value="FIRE">FIRE</option>
        <option value="CRIME">CRIME</option>
      </select>
    </div>
    <button
      type="submit"
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 self-start mt-2"
    >
      Submit Request
    </button>
  </div>
</form>



        {/* Response */}
       {response && (
  <div className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700">
    <h3 className="text-xl font-bold mb-2 text-green-400">📦 Dispatch Result</h3>
    <hr className="border-t border-gray-600 mb-4" />
    <pre className="text-sm text-gray-200 whitespace-pre-wrap">
      {JSON.stringify(response, null, 2)}
    </pre>
  </div>
)}

      </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-800 text-white py-3 text-center text-sm">
      © 2025 Emergency Transport Management System | Built with ❤️ by Olivia
    </footer>
  </div>
);
}
export default App;