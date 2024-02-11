const express = require('express');

const app = express();
const fs = require('fs');
const hls = require('hls-server');
const server = app.listen(3000)





app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');

});

new hls(server, {
    provider: {
        exists: (req, callback) => {
            const ext = req.url.split('.').pop();
            if (ext === 'm3u8' || ext === 'ts') {
                fs.access(__dirname + req.url, fs.constants.F_OK, (err) => {
                    if (!err) {
                        console.log('file not exists');
                    }
                    callback(null, !err);
                });
            } else {
                callback(null, true);
            }
        },
        getManifestStream: (req, callback) => {
            const stream = fs.createReadStream(__dirname + req.url);
            callback(null, stream);
        },
        getSegmentStream: (req, callback) => {
            const stream = fs.createReadStream(__dirname + req.url);
            callback(null, stream);
        }
    }
});






