var Discord = require("discord.js");
var fs = require('fs');

var rollbot = new Discord.Client();

// A list of channels that the bot will respond to commands in.
var active_channels = ["dnd"];

var roll = function(dice, sides) {
  var rolls = [];
  var min = 1;
  var max = sides;

  if(dice > 100 || sides > 100) {
    return false;
  }
  
  for(var i = 0; i < dice; i++) {
    // Get a random number between min (inclusive) and max (inclusive)
    rolls[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return(rolls);
};


rollbot.on("message", function(message) {
  if(active_channels.indexOf(message.channel.name) != -1) {
    var channel_id = message.channel.id;
    var match_data = message.content.match(/\/roll ([0-9]+)d([0-9]+)/);
    if(match_data) {
      n_dice = parseInt(match_data[1], 10);
      n_sides = parseInt(match_data[2], 10);
      var dice = roll(n_dice, n_sides);
      if(!dice) {
        rollbot.sendMessage(channel_id, "There's no reason you need those sorts of numbers.");
        return;
      }

      var message_content = "";

      if(n_dice > 1) {
        var sum = dice.reduce(function(prev, curr) {
          return prev + curr;
        });

        message_content = dice.join(", ") + " (" + sum + ")";
      } else {
        message_content = dice[0];
      }


      rollbot.sendMessage(channel_id, message_content);
    }
  }
});

fs.readFile("auth.json", function(err, data) {
  var auth_token =  JSON.parse(data).token;
  rollbot.loginWithToken(auth_token);
});
