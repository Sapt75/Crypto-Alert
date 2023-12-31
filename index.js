const fetch = require("node-fetch");
require('dotenv').config()
const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const client = require("twilio")(accountSid, authToken);
const express = require('express')
const app = express()
const port = 3000


async function callMe() {
  let data = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10`, {
    method: "GET",
    headers: {
      'X-CMC_PRO_API_KEY': '7ae15807-6bc8-4af6-b8a1-c5f42bcfc552',
    }
  })

  let res = await data.json()

  if ((Math.round(res.data[1].quote.USD.price) > 1960)) {
    client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: "+919875619471",
      from: "+14068023855",
    })
      .then(call => console.log(call.sid));

  }
}







app.get('/', async (req, res) => {
  callMe()
    res.send("Successful")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






