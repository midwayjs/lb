const { spawn } = require('child_process');
const fs = require('fs');
const { join } = require('path');
fs.open(join(__dirname, 'ipc.test.js'), (err, fd) => {
    console.log('fd', process.pid, err, fd);
    spawn('sleep', ['10000'], {
        stdio: [0,1,2,'ipc']
    });
    new Promise(resolve => {
        setTimeout(resolve, 10000000)
    });
})