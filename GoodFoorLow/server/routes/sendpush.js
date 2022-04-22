const express = require('express');
const app = express();
var path = require("path");
var fcm = require('fcm-notification');
var FCM = new fcm(path.resolve(__dirname,'./privatekey.json'));

class sendpush  {
  static async  sendnoti(message,tokens){
   FCM.sendToMultipleToken(message, tokens, function(err, response) {
      if(err){
        return 'error';
      }else {
        return response;
      }
      })
  }
  
}

module.exports = sendpush;
