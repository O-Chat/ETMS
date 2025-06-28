

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
import React, { useState, useEffect } from 'react';

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
    // Fetch vehicles from backend
  fetch('http://localhost:3001/vehicles')
  .then((res) => res.json())
  .then((data) => {
    setVehicles(data);
  })
  .catch((error) => {
    console.error('Failed to load vehicles:', error);
  });
  }, []);

  // 🚗 Fetch updated vehicle location from output.json
  // const fetchOutput = async () => {
  //   try {
  //     const res = await fetch('http://localhost:3001/output'); // backend route to serve output.json
  //     const data = await res.json();
  //     const { vehicle, location } = data;

  //     if (vehicle && location) {
  //       setVehicles((prevVehicles) =>
  //         prevVehicles.map((v) =>
  //           v.id === vehicle.id ? { ...v, location } : v
  //         )
  //       );
  //     }
  //   } catch (err) {
  //     console.error('Error fetching output.json:', err);
  //   }
  // };

  // Optional: enable auto-refresh every few seconds
  /*
  useEffect(() => {
    const interval = setInterval(fetchOutput, 5000);
    return () => clearInterval(interval);
  }, []);
  */

  const getVehicleAt = (sector) => {
    return vehicles
      .filter((v) => v.location === sector)
      .map((v) => vehicleIcons[v.type])
      .join(' ');
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
  
      // 🔁 Immediately refresh vehicle list
      const vehicleRes = await fetch('http://localhost:3001/vehicles');
      const updatedVehicles = await vehicleRes.json();
      setVehicles(updatedVehicles);
  
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  

  return (
    <div className="min-h-screen p-6 bg-gray-100 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-red-600">🚨 EMERGENCY TRANSPORT MAINTENANCE SYSTEM</h1>
        <h2 className="text-lg text-gray-700 mt-2">By Olivia</h2>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-10 gap-2 max-w-5xl mx-auto mb-10">
        {sectors.map((sector, index) => (
          <div
            key={index}
            className="border border-gray-400 bg-white rounded-md p-1 text-xs h-16 flex flex-col justify-between items-center shadow-sm"
          >
            <div className="font-semibold">{sector}</div>
            <div className="text-lg">{getVehicleAt(sector)}</div>
          </div>
        ))}
      </div>

      {/* Interface */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h3 className="text-xl font-bold mb-4 text-blue-600">Submit Emergency Request</h3>
          <div className="flex flex-col gap-3">
            <input
              name="request_id"
              placeholder="Request ID"
              value={form.request_id}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              name="name"
              placeholder="Reporter Name"
              value={form.reporter.name}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={form.reporter.age}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              name="id"
              placeholder="Reporter ID"
              value={form.reporter.id}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              name="location"
              placeholder="Location (e.g., Sector50)"
              value={form.location}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              name="urgency"
              type="number"
              placeholder="Urgency (1-10)"
              value={form.urgency}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="MEDICAL">MEDICAL</option>
              <option value="FIRE">FIRE</option>
              <option value="CRIME">CRIME</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit Request
            </button>
          </div>
        </form>

        {/* Response */}
        {response && (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-2 text-green-600">🚗 Dispatch Result</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
