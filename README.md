
[![npm version](https://badge.fury.io/js/toby.svg)](https://badge.fury.io/js/toby) [![Build Status](https://travis-ci.org/toby-cloud/toby-node.svg?branch=master)](https://travis-ci.org/toby-cloud/toby-node)

## Installation

The easiest way to install **toby-node** is from [NPM](https://npmjs.org). You can run
the command below to instally the library:

```bash
npm install toby
```

Or you can [clone the source code](https://github.com/toby-cloud/toby-node.git) for **toby-node**,
and install from there.

```bash
git clone https://github.com/toby-cloud/toby-node.git
cd toby-node
npm install
```

Then in your code:

```javascript
var toby = require("path/to/toby-node");
```

### Testing your installation

Try connecting to Toby with your user bot, like this:

```javascript
var botId = '{{ username }}'; // Your username from toby.cloud
var secret = '{{ password }}'; // Your password from toby.cloud

var toby = require('toby');

// the callback to be executed when connected
function onConnect() {
  console.log("Connected!");
}

// the callback to be executed when disconnected
function onDisconnect() {
  console.log("Disconnected!");
}

// the callback to be executed when message received
function onMessage(message) {
  console.log("message received:", message.toString());
}

var bot = new toby.Bot(botId, secret, onConnect, onDisconnect, onMessage);
bot.start();
```
