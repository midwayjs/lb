;(async () => {
    console.log('child', process.pid)
    new Promise(resolve => {
        setTimeout(resolve, 10000000)
    });
})()