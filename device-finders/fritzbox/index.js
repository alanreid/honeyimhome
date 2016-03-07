var exec = require('child_process').exec,
    events = require('events'),
    eventEmitter = new events.EventEmitter();


function FritzboxDeviceFinder(config) {

  var that = this;
  var sid = '';
  var device = new Device();

  return {
    findDevice: function(deviceName) {
      getSid(function(sid) {
        statusTimer(deviceName, sid);
      });
      return device;
    }
  };

  function getSid(cb) {
    if(!sid) {
      exec('casperjs ' + __dirname + '/lib/sid.js --ip=' + config.ip + ' --password=_' + config.password + '_', function(error, stdout, stderr) {
        sid = stdout.replace('\n', '');
        cb(sid);
      });
    } else {
      cb(sid);
    }
  };

  function getDeviceStatus(deviceName, sid) {
    exec('casperjs ' + __dirname + '/lib/activedevice.js --ip=' + config.ip + ' --sid=' + sid + ' --device=' + deviceName, function(error, stdout, stderr) {

      var status = stdout.replace('\n', '');

      if(status === 'connected') {
        device.emit('connected');
      }
      else if(status === 'disconnected') {
        device.emit('disconnected');
      }

    });
  };

  function statusTimer(deviceName, sid) {
    getDeviceStatus(deviceName, sid);
    setTimeout(function() {
      statusTimer(deviceName, sid);
    }, config.requestInterval);
  };

};

function Device() {
  events.EventEmitter.call(this);
}

Device.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = FritzboxDeviceFinder;
