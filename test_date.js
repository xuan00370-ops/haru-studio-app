import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./public/new_state.json', 'utf8'));
const state = { currentMonth: 3, currentYear: 2026 };
const marchJobs = data.jobs.filter(job => {
  const jobDate = new Date(job.date);
  return (jobDate.getMonth() + 1) === state.currentMonth && jobDate.getFullYear() === state.currentYear;
});
console.log("March jobs count:", marchJobs.length);
console.log("Total jobs:", data.jobs.length);
const monthCounts = {};
data.jobs.forEach(j => {
  const m = new Date(j.date).getMonth() + 1;
  const y = new Date(j.date).getFullYear();
  const k = `${y}-${m}`;
  monthCounts[k] = (monthCounts[k] || 0) + 1;
});
console.log(monthCounts);
