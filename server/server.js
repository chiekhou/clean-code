const express = require('express')
const dotenv = require("dotenv");
dotenv.config();
const app = express()
const routes = require('./routes')
app.use(express.json())
const port = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.PORT || 5000;

const db = require('./db/models/index');

app.use(routes)
app.use('*', (req,res) => {
  res.status(404).end()
})

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

 db.sequelize.sync().then(() => {
}).catch((err) => {
  console.log('Failed to sync db: ' + err.message);
})

module.exports =  {app, server};