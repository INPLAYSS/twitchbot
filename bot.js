var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var FormData = require('form-data');



const tmi = require('tmi.js');
let comms =llamadacomms();
let repon =llamadares();
let pal = llamadapal();

comms = JSON.parse("[" + comms + "]");
repon = JSON.parse("[" + repon + "]");
pal = JSON.parse("[" + pal + "]");
console.log(typeof(comms));
console.log(typeof(repon));
console.log(typeof(pal));
console.log(comms);
console.log(repon);
console.log(pal);
console.log(llamadar("inplayss"));

const opts = {
	options: {
		debug: true 
		},
	connection: {
    reconnect: true,
    secure: true,
    timeout: 180000,
    reconnectDecay: 1.4,
    reconnectInterval: 1000
	},
	identity: {
		username: "inplayss",
		password: "oauth:wsxn239fdtszeqpcpfud5vg94y48w6"
	},
	channels: [ 
	"RevenCup"
	]
};

// Create a client with our options
const client = new tmi.client(opts);
// Connect to Twitch:
client.connect();


client.on('disconnected', (reason) => {
  onDisconnectedHandler(reason);
})

client.on('connected', (address, port) => {
  onConnectedHandler(address, port);
})

client.on('reconnect', () => {
  reconnectHandler();
})



client.on('message', (channel, userstate, message, self) => {
  if(self) {
    return
  }

  if (userstate.username === "inplayss") {
    console.log(`Not checking bot's messages.`)
    return
  }

	if(message.toLowerCase() === '!hello') {
    hello(channel, userstate);
    return
  }
  
  comms =llamadacomms();
  repon =llamadares();
  pal = llamadapal();

  comms = JSON.parse("[" + comms + "]");
  repon = JSON.parse("[" + repon + "]");
  pal = JSON.parse("[" + pal + "]");
  console.log("COMPLETADO"+ userstate.username);
  
  rellenar(userstate.username);

  onMessageHandler(channel, userstate, message, self);
})


function onMessageHandler (channel, userstate, message, self) {
  checkTwitchChat(userstate, message, channel)
}


function onDisconnectedHandler(reason) {
  console.log(`Disconnected: ${reason}`)
}


function onConnectedHandler(address, port) {
  console.log(`Connected: ${address}:${port}`)
}


function reconnectHandler () {
  console.log('Reconnecting...')
}

function hello (channel, userstate) {
  client.say(channel, `@${userstate.username}, heya!`)
  console.log(userstate.id);
}


function checkTwitchChat(userstate, message, channel) {
  console.log(message);
  console.log(userstate.username);
  console.log(parseInt(llamadar(userstate.username)));
  let shouldSendMessage = false;
  shouldSendMessage = esMayuscula(message);
  
  
  if (shouldSendMessage) {
    // tell user
	if(impar(parseInt(llamadar(userstate.username))) || parseInt(llamadar(userstate.username)) == 0){
		
    client.say(channel, `@${userstate.username}, sorry!  Your message was deleted.`)
    // delete message
    client.deletemessage(channel, userstate.id);
	
	llamadarsum(userstate.username,parseInt(llamadar(userstate.username)));
  } else if(!impar(parseInt(llamadar(userstate.username))) & parseInt(llamadar(userstate.username))!= 0 ) {
	  client.timeout(channel,userstate.username, 600, "Es tu segundo aviso y como tal te llevas un timeout de 10min. No lo repitas la proxima vez");
	  llamadarsum(userstate.username,parseInt(llamadar(userstate.username)));
  }
  }
}

function esMayuscula(letra)
{
	
	/*var i = 0;
	var character = "";
	var c = 0;
	for(var i = 0;i <= letra.length; i++){
		character = letra.charAt(i);
		
		if (!isNaN(character * 1)){
        return false;
    }else{
		 if (character === character.toUpperCase() && character != " ") {
            c++;
        } else {
			
		}
	}
	}
	
	if(c >= letra.length){
		return true;
	}else {
		return false;
	}*/
	
	return letra.toUpperCase();
}


// Called every time a message comes in
/*function onMessageHandler (target, context, msg, self) {
	// Ignore messages from the bot

	/*let isMod = user.mod || user['user-type'] === 'mod';
	let isBroadcaster = channel.slice(1) === user.username;
	let isModUp = isMod || isBroadcaster;

  // Remove whitespace from chat message
  const commandName = msg.trim();
  const t = target.replace("#", "@");

  // If the command is known, let's execute it
 /* if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num} ` + t);
    console.log(`* Executed ${commandName} command`);*/
  /*} else {
    console.log(`* Unknown command ${commandName}`);
  }
  for(let i = 0; i < comms.length; i++){
  if (commandName ===comms[i]){
	  client.say(target, repon[i]);
  }  
}

//MOD COMMANDS
	/*if (commandName ==='!addcom'){
	  client.say(target, "Añade contenido al comando");
  } else if(commandName === "!addcom ") {
	  let name = msg.replace("!addcom ", "");
	  console.log(name);
	  
  }
// Function called when the "dice" command is issued
}
*/









function rollDice () {
  const sides = 10;
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}







function llamadacomms()
{
var req = new XMLHttpRequest();
req.open('GET', 'http://192.168.50.112/comms.php', false);
req.send(null);
if (req.status == 200)
  console.log(req.responseText);
	return req.responseText;

}
function llamadares()
{
var req = new XMLHttpRequest();
req.open('GET', 'http://192.168.50.112/respon.php', false);
req.send(null);
if (req.status == 200)
  console.log(req.responseText);
	return req.responseText;

}

function llamadapal()
{
var req = new XMLHttpRequest();
req.open('GET', 'http://192.168.50.112/pal.php', false);
req.send(null);
if (req.status == 200)
  console.log(req.responseText);
	return req.responseText;
}

function impar(a){
		if(a%2==0){
			return false;
		} else {
			return true;
		}
			
}

function llamadar(user)
{	
	var req = new XMLHttpRequest();
	req.open('GET', 'http://192.168.50.112/nums.php?user='+user,false);
	req.send('user='+user);
	req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
		
        console.log(req.response);
    }
}


if (req.status == 200)
  console.log("*"+req.responseText+"*");
	return req.responseText;
}

function llamadarsum(user, num)
{
	var req = new XMLHttpRequest();
	req.open('GET', 'http://192.168.50.112/sum.php?user='+user+'&num='+num,false);
	req.send('user='+user+'&num='+num);
	req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
		
        console.log(req.response);
    }
}


if (req.status == 200)
  console.log("*"+req.responseText+"*");
}

function rellenar(user)
{
	var req = new XMLHttpRequest();
	req.open('GET', 'http://192.168.50.112/ren.php?user='+user,false);
	req.send('user='+user);
	req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
		
        console.log(req.response);
    }
}


if (req.status == 200)
  console.log("*"+req.responseText+"*");
	return req.responseText;

}
	