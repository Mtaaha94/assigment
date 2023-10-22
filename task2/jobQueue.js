const Redis = require('ioredis');
const redis = new Redis();


async function createJob(data) {
  const jobId = await redis.incr('jobId');
  await redis.hset('jobs', jobId, JSON.stringify(data));
  await redis.lpush('jobQueue', jobId);
  return jobId;
}


async function processJobs() {
  while (true) {
    const jobId = await redis.rpop('jobQueue');
    if (jobId) {
      const jobData = await redis.hget('jobs', jobId);
      const data = JSON.parse(jobData);
      
    
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    
      console.log(`Job ${jobId} processed with data: ${JSON.stringify(data)}`);
    }
  }
}


async function getJobStatus(jobId) {
  const jobData = await redis.hget('jobs', jobId);
  if (jobData) {
    return JSON.parse(jobData);
  }
  return null;
}

module.exports = { createJob, processJobs, getJobStatus };
