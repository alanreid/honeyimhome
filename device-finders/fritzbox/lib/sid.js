
var casper = require('casper').create();
var baseUrl = 'http://' + casper.cli.get('ip');
var username = casper.cli.get('username');
var password = casper.cli.get('password').replace(/\_/g, '');

casper.start();

casper.thenOpen(baseUrl + '/logincheck.lua', function() {
  this.fill('#uiMainForm', { username: username, uiPass: password }, true);
});

casper.then(function() {
  console.log(this.getCurrentUrl().split('sid=')[1]);
});

casper.run();
