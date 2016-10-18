'use strict';
const path = require('path');

let Service, Characteristic;

module.exports = homebridge => {
  Service        = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerPlatform('homebridge-klikaan-klikuit', 'KlikAanKlikUit', KaKuPlatform);
}

class KaKuPlatform {

  constructor(log, config) {
    this.log    = log = log.bind(log, '[homebridge-klikaan-klikuit]');
    this.config = config;

    // Load driver module.
    let driver = config.driver || { type : process.env.H_KAKU_DRIVER || 'rpi' };
    try {
      let Driver = require( path.resolve(__dirname, 'drivers', driver.type) );
      this.log(`using driver '${ driver.type }'`);
      // Instantiate driver.
      this.driver = new Driver(log, config);
    } catch(e) {
      throw Error(`Unable to load driver '${ driver.type }': ${ e.message }`);
    }
  }

  accessories(callback) {
    return callback( (this.config.accessories || []).map(acc => {
      acc.type = acc.type || 'Outlet';
      // Validate type.
      if (! Service[ acc.type ]) {
        throw Error(`Unknown device type '${ acc.type }'`);
      }
      this.log(`adding ${ acc.type.toLowerCase() } '${ acc.name }' (address = ${ acc.address }, device = ${ acc.device })`);
      return new KaKuAccessory(acc, this.driver, this.log);
    }) );
  }

}

class KaKuAccessory {

  constructor(config, driver, log) {
    this.name    = config.name; // needs to be set
    this.service = new Service[config.type](config.name);

    let previousState = null;
    this.service.getCharacteristic(Characteristic.On).on('set', (value, callback) => {
      if (value === previousState) return callback();
      previousState = value;
      log(`switching ${ config.type.toLowerCase() } '${ config.name }' (address = ${ config.address }, device = ${ config.device }) ${ value ? 'on' : 'off' }`);
      driver.switch(config.address, config.device, value);
      return callback();
    });

    if (config.dimmable) {
      if (typeof config.address === 'number') {
        let previousLevel = -1;
        this.service.getCharacteristic(Characteristic.Brightness).on('set', (level, callback) => {
          // Convert 0-100 (Homekit) to 0-15 (Kaku).
          level = Math.ceil((level / 100) * 15);

          // If the previously set level is the same as the new level, don't perform the operation
          // (setting the same value twice seems to turn off the device).
          if (level === previousLevel) return callback();
          previousLevel = level;
          
          // Dim the device.
          log(`dimming ${ config.type.toLowerCase() } '${ config.name }' (address = ${ config.address }, device = ${ config.device }) to level ${ level }`);
          driver.dim(config.address, config.device, level);

          // Done.
          return callback();
        });
      } else {
        log(`[WARNING] old-style devices cannot be dimmed, please adjust your configuration for device '${ this.name }'`);
      }
    }
  }

  getServices() {
    return [ this.service ];
  }

}
