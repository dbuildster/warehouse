const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const unirest = require("unirest");

app.get('/api/getShipment/:shipperID', (req, res) => {
  const request = unirest("GET", "https://warehouseautomationapi.azurewebsites.net/api/getShipment/"+req.params.shipperID);
  request.headers({"x-functions-key": process.env.HOSTKEY });

  request.end(function (response) {
    if (response.error) throw new Error(response.error);


    res.json(response.body || {});
  });

});

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port} .`);
});