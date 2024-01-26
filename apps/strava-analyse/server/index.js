require('dotenv').config()

const { run } = require('./server')

try {
    run()
    console.log('[app] - server start')
} catch(err) {
    console.log('app] - crashed')
    console.error(err)
    process.exit(1)
}
