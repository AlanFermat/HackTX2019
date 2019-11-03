const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companySchema = new Schema(
  {
    // id: { type: Number, required: true, unique: true },
  name: String,
  revenue: Number,
	profit: Number, 
	assets: Number, 
	market_value: Number, 
  employees: Number,
  positive_tweets: Number,
  negative_tweets: Number,
  neutral_tweets: Number
  },
  { autoIndex: false }
);

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
