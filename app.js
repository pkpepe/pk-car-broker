
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
            "payload":"sedan"
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
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
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
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
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
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          },
          {
            "title":"2010 Toyota Noah!",
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
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          },
          {
            "title":"2005 Volkswagen New Bettle!",
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
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          },
           {
            "title":"2010 Toyota Vanguard",
            "image_url":"https://images.app.goo.gl/PNhgSh4pxqrEacX5A",
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
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
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
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          },
          {
            "title":"2010 Toyota Noah!",
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
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          },
          {
            "title":"2005 Volkswagen New Bettle!",
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
