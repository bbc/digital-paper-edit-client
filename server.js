const os = require('os');
const cluster = require('cluster');

const cpuCount = os.cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    stats.increment('processes_killed');
    console.log(`Worker ${ worker.process.pid } died`);
    cluster.fork();
  });
} else {
  require('./app');
}
