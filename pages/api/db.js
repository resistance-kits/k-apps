const mongoose = require('mongoose')
const DB = "mongodb://localhost:27017/kpolls"
import Polls from './model/pollModel'
const dbConnect = async () => mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(async (con) => {
    console.log('DB Connection Successfull!!!');
  })
  .catch((e) => {
    console.log(e)
  });

module.exports = dbConnect
