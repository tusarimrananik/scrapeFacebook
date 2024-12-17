// Required modules
const path = require('path');
const { getProfileInfo } = require('./utils/getProfileInfo');
const { setProfileInfo } = require('./utils/setProfileInfo');
const { exec } = require('child_process');

const express = require('express');
const { info } = require('console');

// Set up Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Set view engine
app.set('views', path.join(__dirname, 'views')); // Ensure this path is correct
app.set('view engine', 'ejs');

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.render('index');
});


async function fetchAndSetProfileInfo(url) {
    try {
        // Fetch profile information from the provided URL
        const profileInfo = await getProfileInfo(url);

        // Set profile information and get the screenshot buffer
        const screenshotBuffer = await setProfileInfo(profileInfo);

        return screenshotBuffer;

    } catch (error) {
        console.error('Error fetching or setting profile info:', error);
    }
}

let isProcessing = false;

app.post('/submit', async (req, res) => {
    // Check if a request is already being processed
    if (isProcessing) {
        return res.status(429).json({ error: 'Server is busy. Please try again later.' });
    }

    const submittedUrl = req.body.url;

    if (!submittedUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    isProcessing = true; // Set processing lock

    try {
        const imageBuffer = await fetchAndSetProfileInfo(submittedUrl);
        const imgSrc = `data:image/png;base64,${Buffer.from(imageBuffer).toString('base64')}`;
        res.json({ imgSrc });
    } catch (error) {
        console.error('Error taking screenshot:', error);
        res.status(500).json({ error: 'Failed to take screenshot' });
    } finally {
        isProcessing = false; // Release processing lock
    }
});





// app.post('/run', async (req, res) => {
    // const submittedCode = req.body.code;
    // if (submittedCode === "sleep") {
    //     exec('rundll32.exe powrprof.dll,SetSuspendState 0,1,0', (error, stdout, stderr) => {
    //         if (error) {
    //             console.error(`Error: ${error.message}`);
    //             return;
    //         }
    //         if (stderr) {
    //             console.error(`stderr: ${stderr}`);
    //             return;
    //         }
    //         console.log('PC is going to sleep...');
    //     });
    // } else {
    //     console.log('error')
    // }
// });