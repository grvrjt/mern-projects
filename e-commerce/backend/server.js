const app = require('./app')
const dotenv = require('dotenv')
//config
dotenv.config({ path: 'backend/config/config.env' })
const connectDatabase = require('./config/database')

// Connecting to the database
connectDatabase()
app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT)
})
