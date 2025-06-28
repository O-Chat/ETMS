// const http = require('http');
// const fs = require('fs');
// const { exec } = require('child_process');
// const path = require('path');

// const PORT = 3001;

// const server = http.createServer((req, res) => {
//     if (req.method === 'POST' && req.url === '/dispatch') {
//         let body = '';

//         req.on('data', chunk => {
//             body += chunk.toString();
//         });

//         req.on('end', () => {
//             // Write incoming request to input file
//             const inputPath = path.join(__dirname, 'incoming_request.json');
//             fs.writeFileSync(inputPath, body);

//             // Run the C++ executable
//             const execPath = path.join(__dirname, 'etms'); // ✅ updated from 'etms_binary'

//             exec(`"${execPath}"`, (error, stdout, stderr) => {
//                 if (error) {
//                     console.error(`Execution error: ${error}`);
//                     res.writeHead(500, { 'Content-Type': 'application/json' });
//                     res.end(JSON.stringify({ error: 'Failed to execute ETMS backend' }));
//                     return;
//                 }

//                 // Read the output file and send it back
//                 const outputPath = path.join(__dirname, 'output.json');
//                 fs.readFile(outputPath, 'utf8', (err, data) => {
//                     if (err) {
//                         console.error('Failed to read output file:', err);
//                         res.writeHead(500, { 'Content-Type': 'application/json' });
//                         res.end(JSON.stringify({ error: 'Output file not found' }));
//                         return;
//                     }

//                     res.writeHead(200, {
//                         'Content-Type': 'application/json',
//                         'Access-Control-Allow-Origin': '*'
//                     });
//                     res.end(data);
//                 });
//             });
//         });
//     } else if (req.method === 'OPTIONS') {
//         // Handle CORS preflight request
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
// });

const http = require('http');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const PORT = 3001;

const defaultVehiclesPath = path.join(__dirname, 'vehicles_default.json');
const vehiclesPath = path.join(__dirname, 'vehicles.json');
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

            exec(`"${execPath}"`, (error, stdout, stderr) => {
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
                    // ✅ Parse output.json to extract vehicle data
                    const output = JSON.parse(data);
                    const updatedVehicle = output.vehicle; // contains id, type, current_location

                    // ✅ Update vehicles.json
                    const vehiclesPath = path.join(__dirname, 'vehicles.json');
                    fs.readFile(vehiclesPath, 'utf8', (err, vehicleData) => {
                        if (err) {
                            console.error('Failed to read vehicles.json:', err);
                            return;
                        }

                        let vehicles = JSON.parse(vehicleData);

                        // Find and update the matching vehicle
                        vehicles = vehicles.map((v) =>
                            v.id === updatedVehicle.id ? { ...v, location: updatedVehicle.current_location } : v
                        );

                        fs.writeFileSync(vehiclesPath, JSON.stringify(vehicles, null, 2));
                    });

                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
                    res.end(data);
                });
            });
        });

    } else if (req.method === 'GET' && req.url === '/vehicles') {
        const vehiclesPath = path.join(__dirname, 'vehicles.json');

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


