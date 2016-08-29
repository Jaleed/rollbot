var Discord = require("discord.js");
var fs = require('fs');
var roller = require('roller');

var rollbot = new Discord.Client();

rollbot.on("message", function(message) {
  var channel_id = message.channel.id;
  var match_data = message.content.match(/\/roll ([0-9]+)d([0-9]+)/);

  if(match_data) {
    var n_dice = parseInt(match_data[1], 10);
    var n_sides = parseInt(match_data[2], 10);

    var dice = roller.roll(n_dice, n_sides);

    var message_content = "";
    var roll_user = message.author;

    if(n_dice > 1) {
      var sum = dice.reduce(function(prev, curr) {
        return prev + curr;
      });

      message_content = roll_user.mention() + ": " + dice.join(", ") + " (" + sum + ")";
    } else {
      message_content = roll_user.mention() + ": " + dice[0];
    }

    rollbot.sendMessage(channel_id, message_content);
  }
});

fs.readFile("config.json", function(err, data) {
  var auth_token =  JSON.parse(data).discord_token;
  rollbot.loginWithToken(auth_token);
  console.log("Bot started.");
});
