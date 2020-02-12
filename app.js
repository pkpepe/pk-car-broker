
/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger Platform Quick Start Tutorial
 *
 * This is the completed code for the Messenger Platform quick start tutorial
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `npm install`
 * 3. Update the VERIFY_TOKEN
 * 4. Add your PAGE_ACCESS_TOKEN to your environment vars
 *
 */

'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// Imports dependencies and set up http server
const 
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  

  // Parse the request body from the POST
  let body = req.body;

  

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);   

      

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {
        
        handlePostback(sender_psid, webhook_event.postback);
      }
      
    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});


app.get('/setgsbutton',function(req,res){
    setupGetStartedButton(res);    
});

app.get('/setpersistentmenu',function(req,res){
    setupPersistentMenu(res);    
});

app.get('/clear',function(req,res){    
    removePersistentMenu(res);
});


// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  
    
  // Check if a token and mode were sent
  if (mode && token) {
    
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

function handleMessage(sender_psid, received_message) {
  let response;
  
  // Checks if the message contains text
   if (received_message.text == "test") {
    response = {
      "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Welcome!",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          }
        ]
      }
    }
    }
  }
  else if (received_message.text == "Hi") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
      response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Hi..Mingalar Par Bya.  How can we help you today?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Sell my car",
            "payload":"one"
          },
          {
            "type":"postback",
            "title":"Find me a car",
            "payload":"two"
          }
        ]
      }
    }
  }
  }
  else if (received_message.text == "Hello") {
   
     response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Hello..Mingalar Par Bya. How can we help you today?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Sell my car",
            "payload":"one"
          },
          {
            "type":"postback",
            "title":"Find me a car",
            "payload":"two"
         
          }
        ]
      }
    }
  }

  }
  else if (received_message.text == "button") {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Try the postback button!",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Sell my car",
            "payload":"one"
          },
          {
            "type":"postback",
            "title":"Find me a car",
            "payload":"two"
          },
          {
            "type":"postback",
            "title":"Trend only",
            "payload":"three"
          }
        ]
      }
    }
  }
  }else if (received_message.text == "slide") {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Welcome!",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          },
          {
            "title":"Welcome!",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          },
          {
            "title":"Welcome!",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We have the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://petersfancybrownhats.com/view?item=103",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          }
        ]
      }
    }
  }
  }
  else if (received_message.text == "ni hao") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `Hao Xie Xie. Ni Hao Mah!`
    }
  }
   else if (received_message.text) {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
    }
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  } 
  
  // Send the response message
  callSendAPI(sender_psid, response);    
}

function handlePostback(sender_psid, received_postback) {
  console.log('ok')
   let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'get_started') {
    response = {
      "text":"Hello! Welcome to PK Car-Broker. Would you please type 'Hi' or 'Hello'"
    }
  }

else if (payload === 'one') {
  response ={
    "text" : "Please enter you vehicle information below"
  }
}
else if (payload === 'two'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Choosing a type of vehicle you are looking for",
        "buttons":[ 
          {
            "type":"postback",
            "title":"SUVs",
            "payload":"suv"
          },
          {
            "type":"postback",
            "title":"Sedan",
            "payload":"sed"
          },
          {
            "type":"postback",
            "title":"Minivans",
            "payload":"mini"
          }
        ]
      }
    }
  }
  }

  else if (payload === 'mini') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"2013 Honda Fit Shuttle",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/86171030_102456341342971_5236349205873688576_n.jpg?_nc_cat=110&_nc_eui2=AeGdBiFegBevbDZIyGu26Qc3KzsAcpqTop4NCWUksAqWDi3r7YKSKb6B-Oyq1R6FyzPQmynZQq70AxV5CMCtH028kJrtQiO5BCyKKWhww8LQWQ&_nc_ohc=97aIkwvxUh4AX8Yz77e&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=89ff1b619ffd67704ea2d2809bdd145d&oe=5EB9E396",
            "subtitle":"MMK : 250 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.everycar.jp/detail.php?make=honda&model=fit-shuttle&id=725721",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.everycar.jp/detail.php?make=honda&model=fit-shuttle&id=725721",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
           {
            "title":"2004 Toyota Wish",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/84394208_102497734672165_2684528394506338304_n.jpg?_nc_cat=106&_nc_eui2=AeGMGmlfPWwAp5gBHq21VT1FkcQtaTsDc0yycvz3h59qLeuZV-mThfM7g0ImjAZ63pQoG0QSaYTrsCzDo1DgtPZ52M9UK9IszNiwHQ6_oOLp5A&_nc_ohc=c3beta0dbM8AX95CPhc&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=9e3f27692acf5de198eddf6de0ba8bf9&oe=5ED293FF",
            "subtitle":"MMK : 220 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.heincarrental.com/vehicles/toyota-wish/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.heincarrental.com/vehicles/toyota-wish/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
           {
            "title":"2012 Mitsubishi Colt Plus",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/86193222_102511374670801_1688282318990475264_n.jpg?_nc_cat=107&_nc_eui2=AeFFgQH3QZjtFcLjWn3Rjq8yLrJo1TvGCOqpz0BkT2ilQHVgk8tdGKJeIoarRPIHXDeoDc0CspiA9o4r5S6O4Vu8mNBlwD_ENNOpZDJ88vv2LQ&_nc_ohc=BlPQjyzMvJYAX--l25M&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=0a0a2d3b162f8851ff1462cbdcf60f2a&oe=5ED37B21",
            "subtitle":"MMK : 210 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://blauda.com/idx/25546.html",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://blauda.com/idx/25546.html",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
          {
            "title":"2010 Toyota Noah",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/84209186_102517074670231_7546471381198700544_n.jpg?_nc_cat=108&_nc_eui2=AeFICcVzim4m44Xkr1MINzq8Jqo7asHuCZxk_aL-El7LuiueSmNq4JJRKeMAAPnUTP58B4T7_bcxZ-gicMvdcVGoVzayDFtdluiMx4lVZVN9zA&_nc_ohc=13BC1bcdKfUAX-fPIre&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=09dcfe4dade2a20997dc0ea6e4f55122&oe=5EB56ACB",
            "subtitle":"MMK : 240 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.aajapancars.com/Stock/136916-TOYOTA-NOAH-ZRR70-0351776",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.aajapancars.com/Stock/136916-TOYOTA-NOAH-ZRR70-0351776",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
          {
            "title":"2005 Volkswagen New Bettle",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/84663096_102520038003268_3565139283100565504_n.jpg?_nc_cat=106&_nc_eui2=AeGKcsR5tyDJwoS8vvkGl6rn8_LcH0OkYbNSPZ0GMAT40Ynv3jTF8xeY2urRUl_PczC2v-URviXgPomifWJIMkeW5JsDPxCm8RjnF1makXhZpA&_nc_ohc=0tdY9XY8r7QAX9hiq36&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=e0f5b850f1c4824ca4ced1f3ae98453d&oe=5EC3C5A6",
            "subtitle":"MMK : 123 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.myanmarcarmarketplace.com/for-sale/volkswagen/volkswagen-new-beetle_i8",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.myanmarcarmarketplace.com/for-sale/volkswagen/volkswagen-new-beetle_i8",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          }
        ]
      }
    }
  }
  }

  else if (payload === 'suv') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"2005 Toyota Harrier",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/84501492_102529838002288_7785866037869674496_n.jpg?_nc_cat=104&_nc_eui2=AeECr4wM5QRK-nr2Mg8DzpC9QMaPApvwDcI6Nz0Eo1B0qlgVeLCVCv7uOwtq96bIRaSXFLctzBDEjfQeEIvRf7qAEiUtGxqZCdp9K23qU24UFw&_nc_ohc=CuU9i3fo2fcAX-tcpL6&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=f019efe897280ba54aa900ca817d2e3c&oe=5ED40444",
            "subtitle":"MMK : 445 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.car-tana.com/detail/61e16398ab9e67ec5a55c8d8b4cda413",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.car-tana.com/detail/61e16398ab9e67ec5a55c8d8b4cda413",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
           {
            "title":"2010 Toyota Vanguard",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/85151776_102536018001670_8430566072385536000_n.jpg?_nc_cat=102&_nc_eui2=AeEa2PSUBVeS6OKvntVnjI-jpk7ztg8yac_S7hcAUFRxtkaZO8UkOZ2KZlZvuOkHcLbQIK5vjaFlsVPvrOwKBZPQ-AndlEbZtVUkmip5IrcgiQ&_nc_ohc=AyviV4GkHm8AX_9v63d&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=c9ecd7927c59414c32668a40fb9245e0&oe=5EC550CA",
            "subtitle":"MMK : 650 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.myanmarcarmarketplace.com/for-sale/toyota/toyota-vanguard_i9",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.myanmarcarmarketplace.com/for-sale/toyota/toyota-vanguard_i9",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
           {
            "title":"2006 Toyota Hilux Surf",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/84578833_102538674668071_5961625579936546816_n.jpg?_nc_cat=103&_nc_eui2=AeHhJKt_Bk7NvLN5EozksSS7TRezBc-Twpquzk1qOQlyQhmNWZzzEz9ftGa1bZAdIhTHcze5Ep_BGjgjr2aWPsEXgec0huZcjlsgxo0G4BXPkQ&_nc_ohc=nPUd2jBIga8AX-cxlL3&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=b72205fd050f96ec6c9965bb2bbcf1f9&oe=5EFFDABD",
            "subtitle":"MMK : 225kh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.japanesevehicle-sy.com/2013/01/2001-toyota-hilux-surf-ssr-x-4wd-to.html",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.japanesevehicle-sy.com/2013/01/2001-toyota-hilux-surf-ssr-x-4wd-to.html",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
          {
            "title":"2006 Toyota Kluger",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/84611929_102540228001249_4904819134107222016_n.jpg?_nc_cat=103&_nc_eui2=AeFKoX9o1_6SY8J3rGLEU_TzFlZZblILEKVu1dGKl1kgbfF00GpbIfyVcuCIf4VwcFYdlWWeHwxq-ro5ZZhIPh5shzCnWsqaqPUjXHZWISIBKA&_nc_ohc=2akem8R6StYAX_oWYeJ&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=61d58855fab3a647b8cf2e46b5c79cb1&oe=5ED5BF5F",
            "subtitle":"MMK : 520 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.picknbuy24.com/detail/?refno=0120291271",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.picknbuy24.com/detail/?refno=0120291271",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
          {
            "title":"2013 Toyota Prado",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/86276762_102544041334201_5268035601977835520_n.jpg?_nc_cat=102&_nc_eui2=AeGUC2StGbli_AgXVC2ZQigqPXPTSdQ_Sr8M9GfALPthF8MHIE_n3ndIf8AAInRx92_BiP8226-vU1TyHShNWaEYWCshV1pVEFZfVlq6uGRPPQ&_nc_ohc=8GX1YfOAdAAAX9i3pSy&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=a8a5ed23a2a93ec94c898c125bf1f2a4&oe=5EBF17BE",
            "subtitle":"MMK : 660 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.mymyancar.com/en/vehicle_listings/ad-toyota-prado-ayeyarwady-import-dubai-1505",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.mymyancar.com/en/vehicle_listings/ad-toyota-prado-ayeyarwady-import-dubai-1505",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          }
        ]
      }
    }
  }
  }
    else if (payload === 'sed') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"2004 Toyota Mark 2",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/p720x720/84551911_102583907996881_3474842852742135808_o.jpg?_nc_cat=107&_nc_eui2=AeFTt5P5ACiYEyAX4EreMLH7qWFEaiX7F4DsJl5hR9PrdJXyq46-skymD4lZ6b0CPgC5Y38JSanNxKJBdfDEhwoOpSA1DHRXR1O3TO5uHJjLAg&_nc_ohc=wYOcnPJ3hscAX8gpN2V&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&_nc_tp=6&oh=d9d2a10f59bbcc7c2e1e8cf99476edab&oe=5F037224",
            "subtitle":"MMK : 250 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.usedcarsmyanmar.com/used-toyota-mark-ii-2004-in-japan-car-auction-uss-yokohama/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.usedcarsmyanmar.com/used-toyota-mark-ii-2004-in-japan-car-auction-uss-yokohama/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
           {
            "title":"2004 Toyota Crown",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/84676069_102585864663352_1603042813191127040_n.jpg?_nc_cat=105&_nc_eui2=AeHlX8TBzftLr14QHji309b2jWEl-ZQcfv3SZJ_GR8eu8oqouix_BJNdmW1tchonXA1CGEo9C0Q7AFupZQy1Zo0kWX9xk_6zn6LFVWnAg7xq1Q&_nc_ohc=zaqcL9uVb7QAX_NuRdW&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=7a7a70fe72f90ccdd697196f17243169&oe=5EFE6BE9",
            "subtitle":"MMK : 420 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.japanesecartrade.com/2766078-japan-used-toyota-crown-sedan-car-2004.html",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.japanesecartrade.com/2766078-japan-used-toyota-crown-sedan-car-2004.html",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
           {
            "title":"2010 Toyota Camry",
            "image_url":"https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-9/84559906_102672461321359_1848718468690477056_n.jpg?_nc_cat=101&_nc_eui2=AeHFkh8fvedCQDqRRwMvBnMmj85Xye1dn3LIR7pYy1E2vNMt-N_aQLB4Fp_UzxceQagtyds1j7Waft59MU4fLdb05UwbNmgbGAnAKWb-7OMSdw&_nc_ohc=lC1Rc2oPh88AX8HShFz&_nc_pt=1&_nc_ht=scontent-sin6-2.xx&oh=fdab058ee41e0a204c11fc46bf1898f6&oe=5EC1D3C8",
            "subtitle":"MMK : 320 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.japanesecartrade.com/3384635-japan-used-toyota-camry-sedan-car-2010.html",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.japanesecartrade.com/3384635-japan-used-toyota-camry-sedan-car-2010.html",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
          {
            "title":"2005 Toyota Mark X",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/p720x720/86253261_102592601329345_4494208982025502720_o.jpg?_nc_cat=108&_nc_eui2=AeHhuX9sJrYCklnpnO3KQqoaoA4ypLO7gZcBrgXBsxZ_WGyKRHMI8kuwct6qqWa-Zhh4n8tb-ODDPnxmWQRQdYuQ6wccf-Lzc9rN0MEJfHA8YA&_nc_ohc=J7RB3iwcaZwAX83Z5l7&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&_nc_tp=6&oh=5adbe25c9a66f8fc702366bc00d1e784&oe=5EC7F1FE",
            "subtitle":"MMK : 240 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.usedcarsmyanmar.com/used-toyota-mark-x-2008-in-japan-car-auction-uss-kyushu/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.usedcarsmyanmar.com/used-toyota-mark-x-2008-in-japan-car-auction-uss-kyushu/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          },
          {
            "title":"2018 KIA Optima",
            "image_url":"https://scontent.fmdl4-2.fna.fbcdn.net/v/t1.0-9/84611927_102597167995555_8749900176493117440_n.jpg?_nc_cat=101&_nc_eui2=AeETAIG-mQ1jdW0ARwOImJnU4Ps9YHPQoLUv-oWhX8lbOXU2ddi-vh_JQxS6UOTZsrcTNfVbSQJ9ZpFjyvNXRW7SdYYpKylYVKRdWAKnX2Ykaw&_nc_ohc=uspEaLM2KdgAX_WvESR&_nc_pt=1&_nc_ht=scontent.fmdl4-2.fna&oh=f9c1fdbc538239841926d0514e4e6339&oe=5EC0B763",
            "subtitle":"MMK : 560 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.autobidmaster.com/en/carfinder-online-auto-auctions/lot/61228969/COPART_2018_KIA_OPTIMA_EX_SALVAGE_VEHICLE_TITLE_FT_WORTH_TX/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.autobidmaster.com/en/carfinder-online-auto-auctions/lot/61228969/COPART_2018_KIA_OPTIMA_EX_SALVAGE_VEHICLE_TITLE_FT_WORTH_TX/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc"
              }              
            ]      
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Choosing a type of vehicle you are looking for",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"Sedan",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}


function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}


function setupGetStartedButton(res){
        var messageData = {
                "get_started":{"payload":"get_started"}                
        };
        // Start the request
        request({
            url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            form: messageData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                res.send(body);

            } else { 
                // TODO: Handle errors
                res.send(body);
            }
        });
    } 



function setupPersistentMenu(res){
        var messageData = { 
            "persistent_menu":[
                {
                  "locale":"default",
                  "composer_input_disabled":false,
                  "call_to_actions":[
                      {
                        "title":"Info",
                        "type":"nested",
                        "call_to_actions":[
                            {
                              "title":"Help",
                              "type":"postback",
                              "payload":"HELP_PAYLOAD"
                            },
                            {
                              "title":"Contact Me",
                              "type":"postback",
                              "payload":"CONTACT_INFO_PAYLOAD"
                            }
                        ]
                      },
                      {
                        "type":"web_url",
                        "title":"Visit website ",
                        "url":"http://www.google.com",
                        "webview_height_ratio":"full"
                    }
                ]
            },
            {
              "locale":"zh_CN",
              "composer_input_disabled":false
            }
          ]          
        };
        // Start the request
        request({
            url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            form: messageData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                res.send(body);

            } else { 
                // TODO: Handle errors
                res.send(body);
            }
        });
    } 



function removePersistentMenu(res){
        var messageData = {
                "fields": [
                   "persistent_menu" ,
                   "get_started"                 
                ]               
        };
        // Start the request
        request({
            url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            form: messageData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                res.send(body);

            } else { 
                // TODO: Handle errors
                res.send(body);
            }
        });
    } 
