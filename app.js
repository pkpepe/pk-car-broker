
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
      "text": "Pick a color:",
      "quick_replies":[
      {
        "content_type":"text",
        "title":"Red",
        "payload":"<POSTBACK_PAYLOAD>",
        "image_url":"http://example.com/img/red.png"
      },
      {
        "content_type":"text",
        "title":"Green",
        "payload":"<POSTBACK_PAYLOAD>",
        "image_url":"http://example.com/img/green.png"
      }
    ]
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
 
    else if (received_message.text === 'Minivans') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Misubishi Delica D2,1.3cc,2wd",
            "image_url":"https://i.imgur.com/gbKFTc8.jpg",
            "subtitle":"MMK : 167 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140612220860716/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140612220860716/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc1"
              }              
            ]      
          },
           {
            "title":"2010 Misubishi Colt Plus",
            "image_url":"https://i.imgur.com/evfqDfU.jpg",
            "subtitle":"MMK : 155 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140530477535557/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140530477535557/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc2"
              }              
            ]      
          },
           {
            "title":"2010 Dihatsu Cool",
            "image_url":"https://i.imgur.com/1BXIlSq.jpg",
            "subtitle":"MMK : 165 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140523607536244/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140523607536244/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc3"
              }              
            ]      
          },
          {
            "title":"2007 Toyota Ractics",
            "image_url":"https://i.imgur.com/SKVAE3s.jpg",
            "subtitle":"MMK : 170 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140520600869878/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140520600869878/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc4"
              }              
            ]      
          },
          {
            "title":"2012 Suzuki Swift",
            "image_url":"https://i.imgur.com/BBocmu5.jpg",
            "subtitle":"MMK : 170 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140844540837484/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140844540837484/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc16"
              }              
            ]      
          },
          {
            "title":"2008 Honda Fit",
            "image_url":"https://i.imgur.com/pPU86Il.jpg",
            "subtitle":"MMK : 188 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140497514205520/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140497514205520/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc5"
              }              
            ]      
          }
        ]
      }
    }
  }
  }
  else if (received_message.text === 'Sedan') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Toyota Mark 2,2000model,2.0cc, Regalia",
            "image_url":"https://i.imgur.com/edMypcb.jpg",
            "subtitle":"MMK : 250 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140544484200823/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140544484200823/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc11"
              }              
            ]      
          },
           {
            "title":"Nissan Cedric 2001",
            "image_url":"https://i.imgur.com/zz18si2.jpg",
            "subtitle":"MMK : 420 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140526790869259/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140526790869259/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc12"
              }              
            ]      
          },
          {
            "title":"Nissan Sunny 2009",
            "image_url":"https://i.imgur.com/vFNZvGg.jpg",
            "subtitle":"MMK : 230 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/141087177479887/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/141087177479887/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc19"
              }              
            ]      
          },
           {
            "title":"Toyota Brevis 2001,3.0cc",
            "image_url":"https://i.imgur.com/0azLEeH.jpg",
            "subtitle":"MMK : 320 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140619837526621/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140619837526621/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc13"
              }              
            ]      
          },
          {
            "title":"Toyota Belta 2009",
            "image_url":"https://i.imgur.com/ZHWuIbz.jpg",
            "subtitle":"MMK : 220 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140841997504405/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140841997504405/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc14"
              }              
            ]      
          },
          {
            "title":"Honda Insight 2009",
            "image_url":"https://i.imgur.com/ykHdyGd.jpg",
            "subtitle":"MMK : 176 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140847464170525/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140847464170525/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc15"
              }              
            ]      
          }
        ]
      }
    }
  }
  }
   else if (received_message.text === 'SUVs') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Hilux surf 1999 SSR G",
            "image_url":"https://i.imgur.com/nRdG4yP.jpg",
            "subtitle":"MMK : 385 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/141094117479193/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/141094117479193/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc20"
              }              
            ]      
          },
           {
            "title":"2010 Toyota Vanguard",
            "image_url":"https://i.imgur.com/c47p6KQ.jpg",
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
                "payload":"sc7"
              }              
            ]      
          },
           {
            "title":"2006 Toyota Hilux Surf",
            "image_url":"https://i.imgur.com/dvCAKLE.jpg",
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
                "payload":"sc8"
              }              
            ]      
          },
          {
            "title":"2006 Toyota Kluger",
            "image_url":"https://i.imgur.com/NGSFtkn.jpg",
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
                "payload":"sc9"
              }              
            ]      
          },
          {
            "title":"2013 Toyota Prado",
            "image_url":"https://i.imgur.com/E2lRwPH.jpg",
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
                "payload":"sc10"
              }              
            ]      
          }
        ]
      }
    }
  }
  }
  else if (received_message.text === 'PickUp') {
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Misubishi Minicab",
            "image_url":"https://i.imgur.com/RR4JwzK.jpgs",
            "subtitle":"MMK : 110 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140806450841293/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140806450841293/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc17"
              }              
            ]      
          },
          {
            "title":"Subaru samber 2008",
            "image_url":"https://i.imgur.com/Ik7ue1a.jpg",
            "subtitle":"MMK : 107 lkh",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/101330348122237/posts/140849497503655/",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.facebook.com/101330348122237/posts/140849497503655/",
                "title":"More Information"
              },{
                "type":"postback",
                "title":"Yes, I'm interested",
                "payload":"sc18"
              }              
            ]      
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
  else if (received_message.text == "Thanks") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `Thank you too :)!`
    }
  }
   else if (received_message.text == "Thank you") {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      "text": `Thank you too :)!`
    }
  }
   
  else if (received_message.attachments) {
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
  else if (received_message.text == "Fill vehicle info") {
    response = {
      "text": "Vehicle Year:"
     
    }
  }
   else if (received_message.text == "1") {
    response = {
      "text": "Vehicle Make:"
     
    }
  }
   else if (received_message.text == "2") {
    response = {
      "text": "Vehicle Model:"
     
    }
  }
   else if (received_message.text == "3") {
    response = {
      "text": "Vehicle Kilo:"
     
    }
  }
   else if (received_message.text == "4") {
    response = {
      "text": "Vehicle Condition:"
     
    }
  }
 else if (received_message.text == "5") {
    response = {
      "text": "Vehicle Description:"
     
    }
  }
   else if (received_message.text == "6") {
    response = {
      "text": "What is the lowest dollar amount you would accept for your vehicle?:"
     
    }
  }
   else if (received_message.text == "7") {
    response = {
      "text": "Would you like to upload an image?:"
     
    }
  }
   else if (received_message.text == "8") {
    response = {
      "text": "Click on 'Send a Message' below. Then press the Camera icon to take a photo."
     
    }
  }
   else if (received_message.text == "9") {
    response = {
      "text": "Would you like to leave a phone number?"
     
    }
  }
   else if (received_message.text == "10") {
    response = {
      "text": "Please enter your ph no:"
     
    }
  }
  else if (received_message.text == "11") {
    response = {
     "text": "You can choice as following",
      "quick_replies":[
      {
        "content_type":"text",
        "title":"Date,Time,Ph No",
        "payload":"dtp"
        
      }
    ]
    }
  }
   else if (received_message.text == "Date,Time,Ph No"){
    response = {
      "text" : "Date:"
    }
   }
   else if (received_message.text == "2020"){
    response = {
      "text" : "Time:"
    }
   }
  else if (received_message.text == "1 pm"){
    response = {
      "text" : "Ph No"
    }
   }
   else if (received_message.text == "09"){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Thank You :). And Where do you want to look? Would you please choice location?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Location",
            "payload":"lc"
          }
          ]
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
    "text" : "You need to fill vehicle information below", 
     "quick_replies":[
      {
        "content_type":"text",
        "title":"Fill vehicle info",
        "payload":"fill"
        
      }
    ]

  }
}
else if (payload === 'two'){
      response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"You can choice as folling",
        "buttons":[ 
          {
            "type":"postback",
            "title":"You can also be viewed by car brand",
            "payload":"viewed"
          },
          {
            "type":"postback",
            "title":"Available Cars!",
            "payload":"three"
          }
        ]
      }
    }
  }
  }
else if (payload === 'viewed'){
      response = {
     "text": "Choose a type of vehicles you are looking for",
      "quick_replies":[
      {
        "content_type":"text",
        "title":"Toyota",
        "payload":"suv",
        "image_url":"http://example.com/img/red.png"
      },
      {
        "content_type":"text",
        "title":"Suzuki",
        "payload":"sedan",
        "image_url":"http://example.com/img/green.png"
      },
       {
        "content_type":"text",
        "title":"Mazda",
        "payload":"mini",
        "image_url":"http://example.com/img/green.png"
      },
      {
        "content_type":"text",
        "title":"Nissan",
        "payload":"mini",
        "image_url":"http://example.com/img/green.png"
      }
    ]
    }
  }



else if (payload === 'three'){
    response = {
     "text": "Choose a type of vehicles you are looking for",
      "quick_replies":[
      {
        "content_type":"text",
        "title":"SUVs",
        "payload":"suv",
        "image_url":"http://example.com/img/red.png"
      },
      {
        "content_type":"text",
        "title":"Sedan",
        "payload":"sedan",
        "image_url":"http://example.com/img/green.png"
      },
       {
        "content_type":"text",
        "title":"Minivans",
        "payload":"mini",
        "image_url":"http://example.com/img/green.png"
      },
        {
        "content_type":"text",
        "title":"PickUp",
        "payload":"pick",
        "image_url":"http://example.com/img/green.png"
      }

    ]
    }
  }




 
    
  else if (payload === 'sc1'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Misubishi Delica. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc2'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2010 Misubishi Colt Plus. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc3'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2010 Dihatsu Cool. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc4'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2007 Toyota Ractics. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc5'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2008 Honda Fit. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc6'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2005 Toyota Harrier. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc7'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2010 Toyota Vanguard. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc8'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2006 Toyota Hilux Surf. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc9'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2006 Toyota Kluger. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc10'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2013 Toyota Prado. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc11'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Toyota Mark 2. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc12'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2001 Nissan Cedric. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc13'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Toyota Brevis 2001. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc17'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Misubishi Minicab. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
   else if (payload === 'sc18'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Subaru samber 2008. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc19'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Nissan Sunny 2009. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
   else if (payload === 'sc20'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Hilux surf 1999 SSR G. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc14'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Toyota Belta 2009. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
}
   else if (payload === 'sc16'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"2012 Suzuki Swift. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'sc15'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Honda Insight 2009. Great Choice. Do you want to make appointment for it?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Yes",
            "payload":"y"
          },
          {
            "type":"postback",
            "title":"No",
            "payload":"n"
          
          }
        ]
      }
    }
  }
  }
  else if (payload === 'y'){
    response = {
     "text": "You can choice as following",
      "quick_replies":[
      {
        "content_type":"text",
        "title":"Date,Time,Ph No",
        "payload":"dtp"
        
      }
    ]
    }
  }

    else if (payload === 'lc'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Choose Location?",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Tea Shop",
            "payload":"ch"
          },
          {
            "type":"postback",
            "title":"Car Market Place",
            "payload":"ch"
          },
          {
            "type":"postback",
            "title":"Restaurant",
            "payload":"ch"
          
          }
        ]
      }
    }
  }
  }
 
  
  else if (payload === 'ch'){
    response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Thank you for joining with Pk Car-Broker. A staff will contact you soon :)",
        "buttons":[ 
          {
            "type":"postback",
            "title":"I want to see agian",
            "payload":"oth"
          }
          ]
        }
    }
  }
  }
  else if (payload === 'n'){
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
  else if (payload === 'oth'){
     response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"You can see here!",
        "buttons":[ 
          {
            "type":"postback",
            "title":"Fine me a car",
            "payload":"two"
          },
          {
            "type":"postback",
            "title":"Sell my car",
            "payload":"one"
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
