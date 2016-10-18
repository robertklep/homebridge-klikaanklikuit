'use strict';
const DriverBase = require('./base');
const KaKu       = require('kaku-rpi');

class RaspberryPiDriver extends DriverBase {

  constructor(log, config) {
    super(log, config);

    // Create driver.
    this.driver = KaKu(config.driver.pin);
    log(`initialized RPi driver (pin ${ config.driver.pin })`);
  }

  switch(address, device, state) {
    this.driver.transmit(address, device, state);
  }

  dim(address, device, level) {
    this.driver.dim(address, device, level);
  }
}

module.exports = RaspberryPiDriver;
