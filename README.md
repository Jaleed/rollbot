[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=mdszy&url=http://github.com/mdszy/rollbot&title=rollbot&language=&tags=github&category=software) 

# rollbot

Simply a Discord bot for rolling dice.

# Commands

The only command is `/roll`

Syntax: `/roll xdy` where x is the number of dice to roll and y is the number 
of sides the dice have.

Example: `/roll 2d20` rolls two twenty-sided dice and displays the result and sum of the rolls.

# Usage

1. Rename `config.example.json` to `config.json`
2. Put Discord API key into `config.json`
3. `npm install`
4. `node rollbot.js`

Getting it to join a server is left as an exercise to the reader.

# Credits

Dice image used as the bot's Discord avatar credit of Steaphan Greene, image is [from Wikipedia](https://commons.wikimedia.org/wiki/File:2-Dice-Icon.svg) and is licensed under Creative Commons [Atribution-Share Alike 3.0 Unported](https://creativecommons.org/licenses/by-sa/3.0/deed.en).