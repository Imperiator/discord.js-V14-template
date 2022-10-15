var prod = process.env.NODE_ENV.trim() == "production";

var token = prod ? process.env.BOT_TOKEN : process.env.DEV_BOT_TOKEN
var clientId = prod ? process.env.BOT_ID : process.env.DEV_BOT_ID
var mongoUrl = prod ? process.env.MONGO_URI : process.env.DEV_MONGO_URI
var inProd = prod

module.exports= {token, clientId, mongoUrl, inProd}