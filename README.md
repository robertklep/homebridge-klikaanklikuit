# Homebridge KlikAanKlikUit plugin

This is a plugin for [Homebridge](https://github.com/nfarina/homebridge) to allow controlling your KlikAanKlikUit devices. This plugin is meant to run on Raspberry Pi's (or boards with a similar GPIO setup), using a cheap 433Mhz transmitter (see [this page](https://domoticproject.com/controlling-433-mhz-remote-raspberry-pi/) for more information on how to connect the transmitter to your Raspberry Pi).

**DISCLAIMER**: this plugin is not in any way endorsed by, or related to, COCO International B.V. or Trust International B.V.

## Installation

```
$ npm i homebridge-klikaanklikuit -g
```

Homebridge plugins need to be installed globally, so the `-g` is mandatory. You may need to use `sudo` as well.

## Configuration

First, you need a working Homebridge installation.

Once you have that working, edit `~/.homebridge/config.json` and add a new platform containing accessories:

```
"platforms" : [{
  "platform" : "KlikAanKlikUit",
  "driver"   : {
    "type" : "rpi",
    "pin"  : 8
  },
  "accessories" : [
    {
      "name"     : "Light Kitchen",
      "type"     : "Lightbulb",
      "dimmable" : true,
      "address"  : "C",
      "device"   : "2"
    },
    {
      "name"     : "Outlet Garage",
      "type"     : "Outlet",
      "address"  : "A",
      "device"   : "1"
    },
    {
      "name"     : "LED lamp",
      "type"     : "Lightbulb",
      "dimmable" : true,
      "address"  : 1337,
      "device"   : 0
    }
  ]
}, ...]
```

There is only one supported driver, `rpi`. The `pin` property reflects the physical GPIO pin that the 433Mhz transmitter is connected to. The default is pin 11 (which is GPIO17).

The plugin supports both old-style (configurable through a rotary switch) and new-style (self-learning) KlikAanKlikUit devices. Old-style devices are addressed using a string (`A`, `B`, ...) and a device number. New-style devices are addressed using a number, which is either the unique code of your remote, or a code that you can pick yourself. In case of the latter, you need your device to learn the new code (put it in learning mode and send the _"On"_ command from the Home app).

Dimming is only supported for new-style devices.

Only supports Homebridge services that respond to the _"On"_ characteristic (which are _"Outlet"_, _"Lightbulb"_ and _"Switch"_). The service for each device it set through the `type` property.
