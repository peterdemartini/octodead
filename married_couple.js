var tessel = require('tessel'),
		meshblu = require('skynet-mqtt'),
		gpio = tessel.port.GPIO,
		heads = {};

heads.manHead = gpio.digital[1];
heads.womanHead = gpio.digital[0];

console.log('Starting...');
var creds = {
	uuid : 'f2cf1431-5a6d-11e4-9f73-8997656f04a3',
	token : 'mewc5bh2dsglow29echdwp0i6akedn29',
	qos : 0
};

var conn = meshblu.createConnection(creds);
function toggleHead(type){
	console.log(type + ': ON');
	heads[type].output(1);

	setTimeout(function(){
		console.log(type + ': OFF');
		heads[type].output(0);
	}, 500);
}
conn.on('ready', function(){
	console.log('Connected to Meshblu');

	conn.on('message', function(message){
		var head;
		if(typeof message.payload === 'string'){
			head = message.payload;
		}else{
			head = 'manHead';
		}

	  toggleHead(head);
  });

});

conn.on('notReady', function(){
	console.log('Error connecting to Meshblu');
});

