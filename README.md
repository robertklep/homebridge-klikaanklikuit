# Homebridge KlikAan-KlikUit plugin

This is a plugin for [Homebridge](https://github.com/nfarina/homebridge) to allow controlling your (old-style) KlikAan-KlikUit outlets. This plugin is meant to run on Raspberry Pi's (or boards with a similar GPIO setup).

You'll need an external executable (`kaku`) that will take three arguments: address (A-Z), device number (1-4) and state (on/off).

My own setup is based [on this blogpost](http://weejewel.tweakblogs.net/blog/8665/lampen-schakelen-met-een-raspberry-pi).

## Installation

```
$ npm i robertklep/homebridge-klikaan-klikuit -g
```

Homebridge plugins need to be installed globally, so the `-g` is mandatory.

## Configuration

First, you need a working Homebridge installation.

Once you have that working, edit `~/.homebridge/config.json` and add a new accessory:

```
"accessories": [
    ...
    {
        "accessory" : "KaKu",
        "name"      : "licht woonkamer",
        "pin"       : 11,
        "address"   : "A",
        "device"    : "1",
        "service"   : "Lightbulb"
    },
    {
        "accessory" : "KaKu",
        "name"      : "licht keuken",
        "pin"       : 11,
        "address"   : "A",
        "device"    : "2",
    }
]
```

`pin` is the physical GPIO pin that the 433Mhz transmitter is connected to.

## Disclaimer

Has only been tested with, and therefore only supports, the older KaKu outlets (not the self-learning kind, but the kind that needs to be configured through a rotary dip switch).
