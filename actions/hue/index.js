var hue = require('node-hue-api'),
    lightState = hue.lightState,
    hueApi;


var HueAction = function(config) {

  return {
    name: 'hue',
    init: function(apiCallback) {
      getBridge(function(bridgeIp) {
        getUsername(function(username) {

          hueApi = new hue.HueApi(bridgeIp, username);

          var api = {
            turnOn: function() {
              getLights(function(lights) {
                changeState(lights, true);
              });
            },
            turnOff: function() {
              getLights(function(lights) {
                changeState(lights, false);
              });
            }
          };

          apiCallback(api);
        });
      });
    }
  };

  function getBridge(bridgeCallback) {
    if(!config.bridgeIp) {
      hue.nupnpSearch().then(function(bridges) {

        var bridge = {};
        if(bridges !== undefined && bridges.length > 0) {
          bridge = bridges[0];
        }

        config.bridgeIp = bridge.ipaddress;
        bridgeCallback(config.bridgeIp)

      }).done();
    } else {
      bridgeCallback(config.bridgeIp);
    }
  }

  function getUsername(usernameCallback) {

    if(!config.username) {

      (new hue.HueApi()).registerUser(config.bridgeIp, 'Honey, Im home!')
        .then(function(username) {
          config.username = username;
          console.log('Your Hue username is: ', username);
          usernameCallback(username);
        })
        .fail(function(err) {
          console.error('Hue Bridge: ' + err.message);
        })
        .done();

      if(!config.username) {
        setTimeout(function() {
          getUsername(usernameCallback);
        }, 1000)
      }
    } else {
      usernameCallback(config.username);
    }
  }

  function getLights(lightsCallback) {
    hueApi.lights().then(function(results) {
      lightsCallback(results.lights);
    }).done();
  }

  function changeState(lights, turnOn) {
    for(var i in lights) {

      var state = lightState.create().transitionTime(config.transitionSpeed);

      if(lights[i].state.on && !turnOn) {
        state.off();
        hueApi.setLightState(lights[i].id, state).done();
      }
      else if(!lights[i].state.on && turnOn) {
        state.on().brightness(100);
        hueApi.setLightState(lights[i].id, state).done();
      }

    }
  }

};

module.exports = HueAction;
