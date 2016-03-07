
var casper = require('casper').create();
var baseUrl = 'http://' + casper.cli.get('ip');
var deviceName = casper.cli.get('device');
var sid = casper.cli.get('sid');

casper.start();

casper.thenOpen(baseUrl + '/net/network_user_devices.lua?sid=' + sid, function() {
  
  var status = this.evaluate(function(device) {
    var regex = new RegExp(device, 'gi');
    return regex.test(document.getElementById('uiLanActive').innerHTML) ? 'connected' : 'disconnected';
  }, deviceName);

  casper.echo(status);
});

casper.run();
