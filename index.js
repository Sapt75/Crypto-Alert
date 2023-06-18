const fetch = require("node-fetch");
const accountSid = "AC20a295a486412d9836b9b2fc499cc8b4";
const authToken = "9df761ac766ed9e98780f39260f27abd";
const client = require("twilio")(accountSid, authToken);
const express = require('express')
const app = express()
const port = 3000



async function getData() {
  let data = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10`, {
    method: "GET",
    headers: {
      'X-CMC_PRO_API_KEY': '7ae15807-6bc8-4af6-b8a1-c5f42bcfc552',
    }
  })

  let res = await data.json()

  if ((Math.round(res.data[1].quote.USD.price) > 1729)) {
    client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: "+919875619471",
      from: "+14068023855",
    })
      .then(call => console.log(call.sid));

  }
}



app.get('/', (req, res) => {
  getData()
  res.send("Succesful")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






