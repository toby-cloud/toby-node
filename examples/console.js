

/** console.js
 *
 * usage: `node console.js <botId> <botPassword>`
 *
 * Simple console application to connect and interact with your bots.
 *
 */


//
// Simple example showing how to connect a bot to Toby.
// Replace botId and secret with your bot's credentials.
//

var toby = require('../lib/toby.js');
var findHashtags = require('../lib/hashtag.js').findHashtags;
var removeHashtags = require('../lib/hashtag.js').removeHashtags;

var botId = process.argv[2];
var secret = process.argv[3];

if (!(botId && secret)) {
  console.log("usage: node console.js <botId> <botPassword>");
  process.exit(1);
}

// we successfully connected
function on_connect() {
  console.log("connected!");
  bot.follow([botId], function() {
    console.log("followed" + botId)
  });

  startPrompt();
}

// we received a message with a tag we are subscribed to
function on_message(from, message) {
  if (from == "@hook") {
    process.stdout.write("\b\b\b\b" + from + " " + JSON.stringify(message) + "\n>>> ");
  } else {
    process.stdout.write("\b\b\b\b" + from + " " + message.message + "\n>>> ");
  }

  if (message.ackTag) {
    var payload = {
      message: "I received your message: " + message.message,
      messageType: "TEXT",
      tags: [message.ackTag],
    }
    //bot.send(payload);
  }
}

var bot = new toby.Bot(botId, secret, on_connect, on_message);
bot.start();

function startPrompt() {

  process.stdout.write(">>> ");
  var stdin = process.openStdin();

  stdin.addListener("data", function(d) {
    var str = d.toString().trim();

    if (str) {
		    var payload = {
			   message: removeHashtags(str),
			   messageType: "TEXT",
			   tags: findHashtags(str),
               ackTag: botId
		  }

      bot.send(payload);
    }
    process.stdout.write(">>> ");
  });

}
