const express = require('express');
const db = require('./db/config')
const route = require('./controllers/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5001
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const host = '0.0.0.0';


//Setup Express App
const app = express();
// Middleware
app.use(bodyParser.json());
// Set up CORS  
app.use(cors())
//API Routes
app.use('/api', route);

app.get('/', async (req, res) => {

    res.send('Welcome to my world...')

    //! for Delete folder ./uploads
    // const folderPath = './uploads'; // Use the appropriate path here
    // try {
    //     function removeFolderRecursive(folderPath) {
    //         if (fs.existsSync(folderPath)) {
    //             fs.readdirSync(folderPath).forEach(file => {
    //                 const curPath = path.join(folderPath, file);

    //                 if (fs.lstatSync(curPath).isDirectory()) {
    //                     removeFolderRecursive(curPath); // Recursive call for subdirectories
    //                 } else {
    //                     fs.unlinkSync(curPath); // Delete file
    //                 }
    //             });

    //             fs.rmdirSync(folderPath); // Remove empty directory
    //             console.log(`Folder ${folderPath} and its contents have been removed.`);
    //         }
    //     }
    //     removeFolderRecursive(folderPath);
    //     res.send({ message: `Folder ${folderPath} and its contents have been removed.` });
    // } catch (err) {
    //     console.error(`Error removing folder: ${err.message}`);
    //     res.status(500).send({ message: `Error removing folder: ${err.message}` });
    // }
});

// Get port from environment and store in Express.

const server = app.listen(port, host, () => {
    const protocol = (process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port } = server.address();
    const externalHost = process.env.EC2_PUBLIC_IP || address === '::' || address === '0.0.0.0' ? '16.171.18.120' : address;
    console.log(`Server listening at ${protocol}://${externalHost}:${port}`);
});

// Connect to MongoDB
const DATABASE_URL = process.env.DB_URL;

const DATABASE = process.env.DB;

db(DATABASE_URL, DATABASE);