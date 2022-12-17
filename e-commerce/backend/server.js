const app = require('./app')
const dotenv = require('dotenv')
//config
dotenv.config({ path: 'backend/config/config.env' })
const connectDatabase = require('./config/database')

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}



// Connecting to the database
connectDatabase()
const server = app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT)
})


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
