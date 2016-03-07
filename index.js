
function HoneyImHome() {

  var deviceFinder;
  var hasActions = false;

  this.addAction = function(action) {
    this[action.name] = action.init;
    hasActions = true;
    return this;
  };

  this.setDeviceFinder = function(df) {
    deviceFinder = df;
    return this;
  };

  this.findDevice = function(deviceName) {

    if(deviceFinder === undefined) {
      throw 'Please define a Device Finder.';
    }

    if(!hasActions) {
      throw 'Please define at least one action.';
    }

    return deviceFinder.findDevice(deviceName);
  };

};

module.exports = HoneyImHome;
