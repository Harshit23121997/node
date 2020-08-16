var shopifyAPI = require('shopify-node-api');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const bodyParser = require('body-parser');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require('cors');

app.use(cors());
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-vkd40bfr.us.auth0.com/.well-known/jwks.json'
}),
audience: 'http://15.207.137.254',
issuer: 'https://dev-vkd40bfr.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);


var Shopify = new shopifyAPI({
    shop: 'plumgoodness-2', // MYSHOP.myshopify.com
    shopify_api_key: '02e5684c4c3632e474970c31119aa8b4', // Your API key
    access_token: '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' // Your API password
});
app.use(bodyParser.json()); 
app.get('/', (req, res) => {
    console.log("Here")
    res.send('Hello World!');
});

app.post('/postOrder',(req,res)=>{
  
    console.log(req.body)
    order_data={
        "order": {
          "line_items": [
            {
              "variant_id": 31666325782588,
              "quantity": 1
            }
          ],
          "customer":{
            "first_name":req.body.customer_name,
            "last_name":"NA"
          },
          "shipping_address": {
            "first_name": req.body.customer_name,
            "last_name": "NA",
            "address1":req.body.shipping_address_line1,
            "address2": req.body.shipping_address_line2,
            "phone": req.body.shipping_address_phone,
            "city": req.body.shipping_address_city,
            "province": req.body.shipping_address_state,
            "country": "India",
            "zip": req.body.shipping_address_pincode
          },
          "email":req.body.shipping_address_email,
          "fulfillment_status": "unfulfilled"
        }
      }
    
    Shopify.post('/admin/api/2020-07/orders.json', order_data, function(err, data, headers){
        if(err){
            console.log(err)
            return;

        }
        res.send({"status":"Success"});
        return;
      });
    return;
})
const port=process.env.port||3000;
app.listen(port, () => {
    console.log('Example app listening on port'+port);
});