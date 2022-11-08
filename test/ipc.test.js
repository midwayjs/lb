const { spawn } = require('child_process');
const { join } = require('path');
const { establish } = require('../node/index');
const proc = spawn('go', ['test'], {
    cwd: join(__dirname, '../'),
    stdio: [0, 1, 2, 'ipc']
});
;(async () => {
    const lb = await establish(proc);
    setInterval(async () => {
        const res = await lb.send({ name: 'xxx'});
        console.log('res', res);
    }, 1000)
})();

