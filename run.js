var forever = require('forever-monitor');

var child = new (forever.Monitor)('rollbot.js', {
  'silent': false,
  'pidFile': './rollbot.pid',
  'logFile': './rollbot.log',
  'outFile': './rollbot.out',
  'errFile': './rollbot.err',
  'args': []
});

child.on('restart', function() {
  console.log('Bot was restarted by forever.js');
});

child.on('exit:code', function(code) {
  console.error('Script exited with code ' + code);
})

child.start();