const mongoose = require('mongoose');


const connectDatabase = () => {
mongoose.connect(process.env.DB_LOCAL_URL ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
}

module.exports = connectDatabase;
