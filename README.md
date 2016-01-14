# Homebridge KlikAan-KlikUit plugin

This is a plugin for [Homebridge](https://github.com/nfarina/homebridge) to allow controlling your KlikAan-KlikUit outlets.

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
        "address"   : "A",
        "device"    : "1",
        "service"   : "Lightbulb"
    },
    {
        "accessory" : "KaKu",
        "name"      : "licht keuken",
        "address"   : "A",
        "device"    : "2",
    }
]
```
