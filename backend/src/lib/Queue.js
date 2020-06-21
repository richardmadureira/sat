const Queue = require('bull');
const config = require('../config');
const jobs = require('../jobs');

const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, config.redis),
    name: job.key,
    handle: job.handle
}));

module.exports = {
    queues,
    add(name, data) {
        const queue = this.queues.find(queue => queue.name === name);
        return queue.bull.add(data);
    },
    process() {
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);
            queue.bull.on('failed', (job, err) => {
                console.log('Falha no Job', queue.key, job.data);
                console.err(err);
            });
        })
    }
}




// const mailQueue = new Queue(registrationMail.key, config.redis);

// mailQueue.on('failed', (job, error) => {
//     console.log('Job failed', job.data);
//     console.error(error);
// })

// module.exports = mailQueue;