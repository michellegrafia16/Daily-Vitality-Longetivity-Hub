const https = require('https');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;
        const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

        const payload = JSON.stringify({
            data: [{
                Timestamp: timestamp,
                Email: email || ''
            }]
        });

        const SHEETDB_URL = 'https://sheetdb.io/api/v1/4oqn42m78ngca';
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

        console.log('Newsletter subscribed:', { email });
        res.status(200).json({ success: true, message: 'Subscribed successfully' });
    } catch (error) {
        console.error('Newsletter error:', error);
        res.status(500).json({ success: false, error: 'Failed to subscribe' });
    }
};