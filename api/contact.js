const https = require('https');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message } = req.body;
        const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

        const payload = JSON.stringify({
            data: [{
                Timestamp: timestamp,
                Name: name || '',
                Email: email || '',
                Subject: subject || '',
                Message: message || ''
            }]
        });

        const SHEETDB_URL = 'https://sheetdb.io/api/v1/0nqaanv4rcrgy';
        const url = new URL(SHEETDB_URL);

        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const response = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ status: res.statusCode, data }));
            });
            req.on('error', reject);
            req.write(payload);
            req.end();
        });

        console.log('Contact form submitted:', { email, subject });
        res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ success: false, error: 'Failed to submit form' });
    }
};