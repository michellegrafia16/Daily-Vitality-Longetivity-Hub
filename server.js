const http = require('http');
const fs = require('fs');
const path = require('path');

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

const ALLOWED_EXTENSIONS = Object.keys(mimeTypes);

function logRequest(req, statusCode) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${statusCode}`);
}

function isValidPath(requestPath) {
    const normalizedPath = path.normalize(requestPath);
    if (normalizedPath.includes('..')) {
        return false;
    }
    
    const ext = path.extname(normalizedPath).toLowerCase();
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
        const sanitizedUrl = reqUrl.split('?')[0].split('#')[0];
        
        const normalizedPath = path.normalize(sanitizedUrl);
        
        if (normalizedPath.includes('..')) {
            return null;
        }
        
        const resolvedPath = path.resolve(__dirname, normalizedPath);
        
        if (!resolvedPath.startsWith(__dirname + path.sep) && resolvedPath !== __dirname) {
            return null;
        }
        
        return resolvedPath;
    } catch (error) {
        console.error('Path resolution error:', error);
        return null;
    }
}

const server = http.createServer((req, res) => {
    try {
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
            'X-XSS-Protection': '1; mode=block'
        };
        
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