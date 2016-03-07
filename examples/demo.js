var fritzboxDeviceFinder = require('../device-finders/fritzbox'),
    hueAction = require('../actions/hue'),
    HoneyImHome = require('../index');


var honeyimhome = new HoneyImHome();

honeyimhome.addAction(hueAction({
  transitionSpeed: 10
}));

honeyimhome.setDeviceFinder(fritzboxDeviceFinder({
  ip: '192.168.0.1',
  password: 'secret',
  requestInterval: 3000
}));

var device = honeyimhome.findDevice('Alans-iPhone');

device.on('connected', function() {
  honeyimhome.hue(function(hue) {
    hue.turnOn();
  });
});

device.on('disconnected', function() {
  honeyimhome.hue(function(hue) {
    hue.turnOff();
  });
});
