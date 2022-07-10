const cron = require('node-cron')

const cronJob = (fn) => {
  cron.schedule('* * * * *', fn)
}

cronJob(() => console.log('running on the min'))
