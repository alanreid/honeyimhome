
Honey, I'm home!
============

Make stuff happen automatically when you get home! (and when you leave)

This library monitors when your phone connects to your home network and makes things happen, like turning your lights on.

### Example
```javascript

var honeyimhome = new HoneyImHome();

honeyimhome.addAction(hueAction({
  transitionSpeed: 10
}));

honeyimhome.setDeviceFinder(fritzboxDeviceFinder({
  ip: '192.168.0.1',
  password: 'secret',
  requestInterval: 3000
}));

var device = honeyimhome.findDevice('My-iPhone');

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

```

### Setup
1. `npm install honeyimhome`
2. Create a new file and import the package `honeyimhome` package.
3. Set at least one action. Available actions are located in the `actions` folder.
4. Set a device finder. This adapter defines how you will look for your device. Available device finders are located in the `device-finders` folder.
5. Define what should happen when a device connects or disconnects.

### Actions
Actions are plugins that are executed when a device connects or disconnects. You have to set at least one. You may build your own actions as well and integrate them seamlessly with honeyimhome.

Example:
```javascript
honeyimhome.addAction(hueAction(config));
```

#### HueAction
The Hue action allows you to turn your Hue lamps on and off.

The first time you run this script, honeyimhome will connect to your Philips Hue Bridge and register a username. You will have to press the button on the Hue Bridge to authorize it. When this happens, a username hash will appear in your console. You can use that username in your configuration parameters to avoid having to register your app every time it runs.

**HueAction configuration parameters**

* `transitionSpeed` is the transition time of the fade-in and fade-out effect (in milliseconds) (optional).

* `username` is the username hash the Hue Bridge provides after pressing the button. If you don't privide this, it will ask you to press the button every time you run this (optional).

* `ipaddress` is the local IP address of your Hue Bridge. If you don't provide this, it will be autodetected. Please note that providing it will make it faster (optional).


### Device Finder
A device finder is in charge of finding your device and you're required to set one to make this work. Since device finders are rather specific to each router, you may build your own.

Example:
```javascript
honeyimhome.setDeviceFinder(fritzboxDeviceFinder(config));
```

#### FritzboxDeviceFinder
The included device finder is for Fritzbox routers. It logs in, goes to the status page and gets looks for the specified device on the status page. To do this, it needs you to specify the router's IP address, the password and how often you would like to have status updates.

**FritzboxDeviceFinder configuration parameters**

* `ip` is the IP address of your Fritzbox router (required).

* `username` is your router's username (optional).

* `password` is your router's password (required).

* `requestInterval` is the frequency of the status updates (required).

* `sid` is the session ID of the router. You may want to cache this to make requests faster (optional).


### License
This software is distributed under the Apache 2.0 License: http://www.apache.org/licenses/LICENSE-2.0
