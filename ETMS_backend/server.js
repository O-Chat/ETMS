// const http = require('http');
// const fs = require('fs');
// const { exec } = require('child_process');
// const path = require('path');

// const PORT = 3001;

// const defaultVehiclesPath = path.join(__dirname, 'vehicles_default.json');
// const vehiclesPath = path.join(__dirname, 'vehicles.json');

// // Reset vehicles.json to default at server start
// try {
//     fs.copyFileSync(defaultVehiclesPath, vehiclesPath);
//     console.log('✅ vehicles.json has been reset to default.');
// } catch (err) {
//     console.error('❌ Failed to reset vehicles.json:', err);
// }

// const server = http.createServer((req, res) => {
//     if (req.method === 'POST' && req.url === '/dispatch') {
//         let body = '';

//         req.on('data', chunk => {
//             body += chunk.toString();
//         });

//         req.on('end', () => {
//             const inputPath = path.join(__dirname, 'incoming_request.json');
//             fs.writeFileSync(inputPath, body);

//             const execPath = path.join(__dirname, 'etms');

//             // Execute C++ backend
//             exec(`"${execPath}" dispatch`, (error, stdout, stderr) => {
//                 if (error) {
//                     console.error(`Execution error: ${error}`);
//                     res.writeHead(500, { 'Content-Type': 'application/json' });
//                     res.end(JSON.stringify({ error: 'Failed to execute ETMS backend' }));
//                     return;
//                 }

//                 const outputPath = path.join(__dirname, 'output.json');
//                 fs.readFile(outputPath, 'utf8', (err, data) => {
//                     if (err) {
//                         console.error('Failed to read output file:', err);
//                         res.writeHead(500, { 'Content-Type': 'application/json' });
//                         res.end(JSON.stringify({ error: 'Output file not found' }));
//                         return;
//                     }

//                     const output = JSON.parse(data);
//                     const updatedVehicle = output.vehicle;

//                     if (!updatedVehicle) {
//                         console.log("ℹ️ No vehicle dispatched.");
//                         res.writeHead(200, {
//                             'Content-Type': 'application/json',
//                             'Access-Control-Allow-Origin': '*'
//                         });
//                         res.end(data);
//                         return;
//                     }

//                     // ✅ Update vehicles.json (set available: false)
//                     fs.readFile(vehiclesPath, 'utf8', (err, vehicleData) => {
//                         if (err) {
//                             console.error('Failed to read vehicles.json:', err);
//                             return;
//                         }

//                         let vehicles = JSON.parse(vehicleData);

//                         vehicles = vehicles.map((v) =>
//                             v.id === updatedVehicle.id
//                                 ? {
//                                       ...v,
//                                       location: updatedVehicle.current_location,
//                                       available: false
//                                   }
//                                 : v
//                         );

//                         fs.writeFileSync(vehiclesPath, JSON.stringify(vehicles, null, 2));
//                         console.log(`🚓 Vehicle ${updatedVehicle.id} marked unavailable.`);

//                         // ⏱ Re-enable vehicle in 10 seconds
//                         // setTimeout(() => {
//                         //     exec(`"${execPath}" markAvailable ${updatedVehicle.id}`, (err, stdout, stderr) => {
//                         //         if (err) {
//                         //             console.error(`❌ Failed to mark vehicle available:`, err);
//                         //         } else {
//                         //             console.log(`✅ Vehicle ${updatedVehicle.id} marked available.`);
//                         //         }
//                         //     });
//                         // }, 10000);
//                     });

//                     // ✅ Respond to frontend
//                     res.writeHead(200, {
//                         'Content-Type': 'application/json',
//                         'Access-Control-Allow-Origin': '*'
//                     });
//                     res.end(data);
//                 });
//             });
//         });

//     } else if (req.method === 'GET' && req.url === '/vehicles') {
//         const vehiclesPath = path.join(__dirname, 'vehicles.json');

//         fs.readFile(vehiclesPath, 'utf8', (err, data) => {
//             if (err) {
//                 console.error('Failed to read vehicles.json:', err);
//                 res.writeHead(500, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ error: 'Could not read vehicles data' }));
//                 return;
//             }

//             res.writeHead(200, {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*'
//             });
//             res.end(data);
//         });

//     } else if (req.method === 'OPTIONS') {
//         res.writeHead(204, {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
//             'Access-Control-Allow-Headers': 'Content-Type',
//         });
//         res.end();

//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Not found');
//     }
// });

// server.listen(PORT, () => {
//     console.log(`🚑 ETMS backend running at http://localhost:${PORT}`);
// }); //i think my server.js is causing problems.. maybe it is rewriting with old values pls check

const http = require('http');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const PORT = 3001;

const defaultVehiclesPath = path.join(__dirname, 'vehicles_default.json');
const vehiclesPath = path.join(__dirname, 'vehicles.json');

// Reset vehicles.json to default at server start
try {
    fs.copyFileSync(defaultVehiclesPath, vehiclesPath);
    console.log('✅ vehicles.json has been reset to default.');
} catch (err) {
    console.error('❌ Failed to reset vehicles.json:', err);
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/dispatch') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const inputPath = path.join(__dirname, 'incoming_request.json');
            fs.writeFileSync(inputPath, body);

            const execPath = path.join(__dirname, 'etms');

            // Execute C++ backend
            exec(`"${execPath}" dispatch`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Execution error: ${error}`);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Failed to execute ETMS backend' }));
                    return;
                }

                const outputPath = path.join(__dirname, 'output.json');
                fs.readFile(outputPath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Failed to read output file:', err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Output file not found' }));
                        return;
                    }

                    const output = JSON.parse(data);
                    const updatedVehicle = output.vehicle;

                    if (!updatedVehicle) {
                        console.log("ℹ️ No vehicle dispatched.");
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        });
                        res.end(data);
                        return;
                    }

                    // ✅ Update vehicles.json (set available: false + new location)
                    fs.readFile(vehiclesPath, 'utf8', (err, vehicleData) => {
                        if (err) {
                            console.error('Failed to read vehicles.json:', err);
                            return;
                        }

                        let vehicles = JSON.parse(vehicleData);

                        vehicles = vehicles.map((v) =>
                            v.id === updatedVehicle.id
                                ? {
                                      ...v,
                                      location: updatedVehicle.current_location,
                                      available: false
                                  }
                                : v
                        );

                        fs.writeFileSync(vehiclesPath, JSON.stringify(vehicles, null, 2));
                        console.log(`🚓 Vehicle ${updatedVehicle.id} marked unavailable at ${updatedVehicle.current_location}.`);

                        // ⏱ Return to base after 10 seconds
                        setTimeout(() => {
                            // Read original (base) location
                            fs.readFile(defaultVehiclesPath, 'utf8', (err, defaultData) => {
                                if (err) {
                                    console.error('❌ Failed to read vehicles_default.json:', err);
                                    return;
                                }

                                const defaults = JSON.parse(defaultData);
                                const baseVehicle = defaults.find(v => v.id === updatedVehicle.id);

                                if (!baseVehicle) {
                                    console.warn(`⚠️ No base found for vehicle ${updatedVehicle.id}`);
                                    return;
                                }

                                // Read live vehicles again
                                fs.readFile(vehiclesPath, 'utf8', (err, liveData) => {
                                    if (err) {
                                        console.error('❌ Failed to read vehicles.json:', err);
                                        return;
                                    }

                                    let currentVehicles = JSON.parse(liveData);

                                    currentVehicles = currentVehicles.map(v =>
                                        v.id === updatedVehicle.id
                                            ? {
                                                  ...v,
                                                  location: baseVehicle.location,
                                                  available: true
                                              }
                                            : v
                                    );

                                    fs.writeFileSync(vehiclesPath, JSON.stringify(currentVehicles, null, 2));
                                    console.log(`🔁 Vehicle ${updatedVehicle.id} returned to base at ${baseVehicle.location}`);
                                });
                            });
                        }, 10000);
                    });

                    // ✅ Respond to frontend
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
                    res.end(data);
                });
            });
        });

    } else if (req.method === 'GET' && req.url === '/vehicles') {
        fs.readFile(vehiclesPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Failed to read vehicles.json:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Could not read vehicles data' }));
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(data);
        });

    } else if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });
        res.end();

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`🚑 ETMS backend running at http://localhost:${PORT}`);
});
