const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3005;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const CACHE_DURATION = {
    '.html': 0,
    '.js': 86400,
    '.css': 86400,
    '.png': 604800,
    '.jpg': 604800,
    '.jpeg': 604800,
    '.gif': 604800,
    '.svg': 604800,
    '.ico': 604800,
    '.woff': 2592000,
    '.woff2': 2592000,
    '.ttf': 2592000
};

const ALLOWED_EXTENSIONS = Object.keys(mimeTypes);

function logRequest(req, statusCode) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${statusCode}`);
}

function isValidPath(requestPath) {
    if (requestPath.includes('..')) {
        return false;
    }
    
    const ext = path.extname(requestPath).toLowerCase();
    if (ext && !ALLOWED_EXTENSIONS.includes(ext)) {
        return false;
    }
    
    return true;
}

function getSafeFilePath(reqUrl) {
    if (!reqUrl || reqUrl === '/') {
        return path.join(__dirname, 'index.html');
    }
    
    try {
        let sanitizedUrl = reqUrl.split('?')[0].split('#')[0];
        
        if (sanitizedUrl.includes('..')) {
            return null;
        }
        
        sanitizedUrl = sanitizedUrl.replace(/^[/\\]+/, '');
        
        const resolvedPath = path.resolve(__dirname, sanitizedUrl);
        
        if (!resolvedPath.startsWith(__dirname + path.sep)) {
            return null;
        }
        
        return resolvedPath;
    } catch (error) {
        console.error('Path resolution error:', error);
        return null;
    }
}

function getCSP() {
    return "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; connect-src 'self' https://sheetdb.io; frame-src 'self' https://hop.clickbank.net; base-uri 'self'; form-action 'self' https://sheetdb.io";
}

const SHEETDB_URL = 'https://sheetdb.io/api/v1/0nqaanv4rcrgy';
const NEWSLETTER_URL = 'https://sheetdb.io/api/v1/4oqn42m78ngca';

function forwardToSheet(body) {
    return new Promise((resolve) => {
        let parsed;
        try { parsed = JSON.parse(body); } catch { resolve(null); return; }
        const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
        const payload = JSON.stringify({
            data: [{
                Timestamp: timestamp,
                Name: parsed.name || '',
                Email: parsed.email || '',
                Subject: parsed.subject || '',
                Message: parsed.message || ''
            }]
        });
        const url = new URL(SHEETDB_URL);
        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });
        req.on('error', (err) => {
            console.error('SheetDB error:', err.message);
            resolve(null);
        });
        req.write(payload);
        req.end();
    });
}

function forwardToNewsletter(body) {
    return new Promise((resolve) => {
        let parsed;
        try { parsed = JSON.parse(body); } catch { resolve(null); return; }
        const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
        const payload = JSON.stringify({
            data: [{
                Timestamp: timestamp,
                Email: parsed.email || ''
            }]
        });
        console.log('Newsletter payload:', payload);
        const url = new URL(NEWSLETTER_URL);
        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log('SheetDB response:', data);
                resolve(data);
            });
        });
        req.on('error', (err) => {
            console.error('SheetDB newsletter error:', err.message);
            resolve(null);
        });
        req.write(payload);
        req.end();
    });
}

function handlePost(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
        console.log(`[${new Date().toISOString()}] POST ${req.url} - Body: ${body}`);
        
        let result;
        if (req.url === '/newsletter') {
            result = await forwardToNewsletter(body);
        } else {
            result = await forwardToSheet(body);
        }
        
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: true, message: 'Form submitted successfully' }));
        logRequest(req, 200);
    });
    req.on('error', () => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Bad request' }));
        logRequest(req, 400);
    });
}

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`);
    try {
        if (req.method === 'POST') {
            handlePost(req, res);
            return;
        }
        
        if (req.method !== 'GET') {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
            logRequest(req, 405);
            return;
        }
        
        const filePath = getSafeFilePath(req.url);
        
        if (!filePath || !isValidPath(req.url)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('Forbidden');
            logRequest(req, 403);
            return;
        }
        
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'text/plain';
        
        const headers = {
            'Content-Type': contentType,
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Content-Security-Policy': getCSP(),
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
        };
        
        if (CACHE_DURATION[ext] > 0) {
            headers['Cache-Control'] = `public, max-age=${CACHE_DURATION[ext]}`;
        } else {
            headers['Cache-Control'] = 'no-cache';
        }
        
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                    logRequest(req, 404);
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Server Error');
                    logRequest(req, 500);
                }
            } else {
                res.writeHead(200, headers);
                res.end(content);
                logRequest(req, 200);
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        logRequest(req, 500);
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Security features enabled: Path traversal protection, Security headers');
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});