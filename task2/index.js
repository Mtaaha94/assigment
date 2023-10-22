const express = require('express');
const app = express();
const port = 3000;

const { createJob, processJobs, getJobStatus } = require('./jobQueue');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Job Queue System with Redis');
});

app.post('/createJob', async (req, res) => {
  const data = req.body;
  const jobId = await createJob(data);
  res.json({ jobId });
});

app.get('/jobStatus/:id', async (req, res) => {
  const jobId = req.params.id;
  const jobStatus = await getJobStatus(jobId);
  if (jobStatus) {
    res.json(jobStatus);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


processJobs().catch(err => console.error(err));
