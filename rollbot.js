var Discord = require("discord.js");
var request = require("request");
var fs = require('fs');

var rollbot = new Discord.Client();

var roll = function(dice, sides) {
  var rolls = [];
  var min = 1;
  var max = sides;
  
  for(var i = 0; i < dice; i++) {
    // Get a random number between min (inclusive) and max (inclusive)
    rolls[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return(rolls);
};


rollbot.on("message", function(message) {
  if(message.channel.name === "dnd") {
    var channel_id = message.channel.id;
    var match_data = message.content.match(/\/roll ([0-9]+)d([0-9]+)/);
    if(match_data) {
      n_dice = parseInt(match_data[1], 10);
      n_sides = parseInt(match_data[2], 10);
      var dice = roll(n_dice, n_sides);
      var sum = dice.reduce(function(prev, curr) {
        return prev + curr;
      });

      var message_content = dice.join(", ") + " (" + sum + ")";

      rollbot.sendMessage(channel_id, message_content);
    }
  }
});

fs.readFile("auth.json", function(err, data) {
  var auth_token =  JSON.parse(data).token;
  rollbot.loginWithToken(auth_token);
});
