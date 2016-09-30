'use strict';
const KaKu = require('kaku-old');

let Service, Characteristic;

module.exports = function(homebridge) {
  Service        = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-klikaan-klikuit', 'KaKu', KaKuAccessory);
};

function KaKuAccessory(log, config) {
  let kaku     = KaKu(config.pin);
  let address  = config.address;
  let device   = config.device;
  this.log     = log;
  this.name    = config.name;
  this.service = new Service[config.service || 'Outlet'](this.name);

  this.service.getCharacteristic(Characteristic.On).on('set', (value, callback) => {
    this.log('Switching outlet %s%s %s', address, device, value ? 'on' : 'off');
    kaku.switch(address, device, value);
    return callback();
  });
};

KaKuAccessory.prototype.getServices = function() {
  return [ this.service ];
};
