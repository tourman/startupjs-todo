import init from 'startupjs/init'
import orm from './model'
import startupjsServer from 'startupjs/server'

// Init startupjs ORM.
init({ orm })

// Check '@startupjs/server' readme for the full API
startupjsServer({ getHead }, ee => {
  ee.on('routes', expressApp => {
    expressApp.get('/api', async (req, res) => {
      let { model } = req

      let $counter = model.at('counters.first')
      await $counter.subscribeAsync()

      let $todo = model.at('todo.first')
      await $todo.subscribeAsync()

      res.json({ name: 'Test API', counter: $counter.get(), todo: $todo.get() })
    })
  })
})

function getHead (appName) {
  return `
    <title>HelloWorld</title>
    <!-- Put vendor JS and CSS here -->
  `
}
