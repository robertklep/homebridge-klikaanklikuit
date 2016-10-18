'use strict';
class DriverBase {
  constructor(log, config) {
    this.log    = log;
    this.config = config;
  }

  switch(address, device, value) {
    this.log(`'.switch()' command not implemented by driver`);
  }

  on(address, device) {
    return this.switch(address, device, true);
  }

  off(address, device) {
    return this.switch(address, device, false);
  }

  dim(address, device, value) {
    this.log(`'.dim()' command not implemented by driver`);
  }
}

module.exports = DriverBase;
