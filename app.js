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
var jwt = require('jsonwebtoken');
var jwks = require('jwks-rsa');
const cors = require('cors');

app.use(cors());
app.use(express.json())




var Shopify = new shopifyAPI({
    shop: 'plumgoodness-2', // MYSHOP.myshopify.com
    shopify_api_key: '02e5684c4c3632e474970c31119aa8b4', // Your API key
    access_token: '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' // Your API password
});
app.use(bodyParser.json()); 
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});
app.get('/', (req, res) => {
    console.log("Here")
    
    res.send('Hello World!');
});
app.get('/orderDetails/:order_id',(req,res)=>{
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  console.log(req.params.order_id)
  url='/admin/api/2020-07/orders.json?name='+req.params.order_id;
  console.log(url)
  Shopify.get(url, function(err, data, headers){
    if(err){
        console.log(err)
        res.send(" Error Here")
        return ;

    }
    else{
      console.log(data)
      if(data.orders!=undefined && req.params.order_id.length==6)
      {
        if(data.orders[0].fulfillment_status)
          res.send({"status":data.orders[0].fulfillment_status});
        else
          res.send({"status":"unfulfilled"})
      }   
      else{
        res.send({"status":"Not Valid Order Number"})
      }
        
      return;
    }
    
  });
  
  return "Not here";
});

app.post('/postOrder/32250324058172',(req,res)=>{
  
  console.log(req.body)
  order_data={
      "order": {
        "line_items": [
          {
            "variant_id": 32250324058172,
            "price": req.body.order_sales_value,
            "quantity":1
          }
        ],
        "customer":{
          "first_name":req.body.customer_name,
          "last_name":"NA"
        },
        "shipping_address": {
          "first_name": req.body.customer_name,
          "last_name": "",
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
    const bearer=req.headers['authorization'];
    if(!bearer.includes(process.env.ACCESS_TOKEN_SECRET)){
      res.sendStatus(403)
      return;
    }
  Shopify.post('/admin/api/2020-07/orders.json', order_data, function(err, data, headers){
      if(err){
          console.log(err)
          return;

      }
      else{
        res.send({"status":"Success"});
      return;
      }
      
    });
  return;
});

app.post('/postOrder/32250224312380',(req,res)=>{
  const bearer=req.headers['authorization'];
      if(!bearer.includes(process.env.ACCESS_TOKEN_SECRET)){
        res.sendStatus(403);
        return;
      }
  
    console.log(req.body)
    order_data={
        "order": {
          "line_items": [
            {
              "variant_id": 32250224312380,
              "price": req.body.order_sales_value,
              "quantity":1
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
      
    Shopify.post('/admin/api/2020-07/orders.json', order_data, function(err, data){
        if(!err){
          res.send({"status":"Success"});
          return;
        }
        else{
          console.log("Here")
        }
        
      });
    return;
})

const port=process.env.port||3000;
app.listen(port, () => {
    console.log('Example app listening on port'+port);
});
