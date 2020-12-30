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
app.get('/', (req, res) => {
    console.log("Her")
    
    res.send('Hello World');
});


app.post('/postOrder/32584700330044',(req,res)=>{
  var string = req.body.customer_name;
  string+=" NA"
    string = string.split(" ");
  var order_data;
  console.log(req.body);
  order_data={
      "order": {
        "line_items": [
          {
            "variant_id": 32584700330044,
            "price": req.body.order_sales_value,
            "quantity":1
          }
        ],
        "customer":{
          "first_name":string[0],
          "last_name":string[1]
        },
        "billing_address": {
          "first_name": string[0],
          "last_name": string[1],
          "address1":req.body.shipping_address_line1,
          "address2": req.body.shipping_address_line2,
          "phone": req.body.shipping_address_phone,
          "city": req.body.shipping_address_city,
          "province": req.body.shipping_address_state,
          "country": "India",
          "zip": req.body.shipping_address_pincode
        },
        "shipping_address": {
          "first_name": string[0],
          "last_name": string[1],
          "address1":req.body.shipping_address_line1,
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
    if(!order_data.order.shipping_address){
      res.send({"status":"Address Not Found"});
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




app.post('/postOrder/32250324058172',(req,res)=>{
  var string = req.body.customer_name;
  string+=" NA"
    string = string.split(" ");
  var order_data;
  console.log(req.body);
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
          "first_name":string[0],
          "last_name":string[1]
        },
        "billing_address": {
          "first_name": string[0],
          "last_name": string[1],
          "address1":req.body.shipping_address_line1,
          "address2": req.body.shipping_address_line2,
          "phone": req.body.shipping_address_phone,
          "city": req.body.shipping_address_city,
          "province": req.body.shipping_address_state,
          "country": "India",
          "zip": req.body.shipping_address_pincode
        },
        "shipping_address": {
          "first_name": string[0],
          "last_name": string[1],
          "address1":req.body.shipping_address_line1,
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
    if(!order_data.order.shipping_address){
      res.send({"status":"Address Not Found"});
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

//Macadamia
app.post('/postOrder/32675645980732',(req,res)=>{
    var string = req.body.customer_name;
    string+=" NA"
      string = string.split(" ");
    var order_data;
    console.log(req.body);
    order_data={
        "order": {
          "line_items": [
            {
              "variant_id": 32675645980732,
              "price": req.body.order_sales_value,
              "quantity":1
            }
          ],
          "customer":{
            "first_name":string[0],
            "last_name":string[1]
          },
          "billing_address": {
            "first_name": string[0],
            "last_name": string[1],
            "address1":req.body.shipping_address_line1,
            "address2": req.body.shipping_address_line2,
            "phone": req.body.shipping_address_phone,
            "city": req.body.shipping_address_city,
            "province": req.body.shipping_address_state,
            "country": "India",
            "zip": req.body.shipping_address_pincode
          },
          "shipping_address": {
            "first_name": string[0],
            "last_name": string[1],
            "address1":req.body.shipping_address_line1,
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
      if(!order_data.order.shipping_address){
        res.send({"status":"Address Not Found"});
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


//E-luminance
  app.post('/postOrder/32675646046268',(req,res)=>{
    var string = req.body.customer_name;
    string+=" NA"
      string = string.split(" ");
    var order_data;
    console.log(req.body);
    order_data={
        "order": {
          "line_items": [
            {
              "variant_id": 32675646046268,
              "price": req.body.order_sales_value,
              "quantity":1
            }
          ],
          "customer":{
            "first_name":string[0],
            "last_name":string[1]
          },
          "billing_address": {
            "first_name": string[0],
            "last_name": string[1],
            "address1":req.body.shipping_address_line1,
            "address2": req.body.shipping_address_line2,
            "phone": req.body.shipping_address_phone,
            "city": req.body.shipping_address_city,
            "province": req.body.shipping_address_state,
            "country": "India",
            "zip": req.body.shipping_address_pincode
          },
          "shipping_address": {
            "first_name": string[0],
            "last_name": string[1],
            "address1":req.body.shipping_address_line1,
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
      if(!order_data.order.shipping_address){
        res.send({"status":"Address Not Found"});
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
  var string = req.body.customer_name;
  string+=" NA"
    string = string.split(" ");
  const bearer=req.headers['authorization'];
      if(!bearer.includes(process.env.ACCESS_TOKEN_SECRET)){
        res.sendStatus(403);
        return;
      }
  
    console.log(req.body)
    var order_data;
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
            "first_name": string[0],
          "last_name": string[1],
          },
          "billing_address": {
            "first_name": string[0],
          "last_name": string[1],
            "address1":req.body.shipping_address_line1,
            "phone": req.body.shipping_address_phone,
            "city": req.body.shipping_address_city,
            "province": req.body.shipping_address_state,
            "country": "India",
            "zip": req.body.shipping_address_pincode
          },
          "shipping_address": {
            "first_name": string[0],
          "last_name": string[1],
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
      if(!order_data.order.shipping_address){
      res.send({"status":"Address Not Found"});
      return;
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
    console.log('Example app listening port'+port);
});
