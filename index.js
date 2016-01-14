const execSync = require('child_process').execSync;

var Service, Characteristic;

module.exports = function(homebridge) {
  Service        = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-klikaan-klikuit', 'KaKu', KaKuAccessory);
};

function KaKuAccessory(log, config) {
  this.log     = log;
  this.name    = config.name;
  this.service = new Service[config.service || 'Outlet'](this.name);

  this.service.getCharacteristic(Characteristic.On).on('set', (value, callback) => {
    var cmd = [ 'kaku', config.address, config.device, value ? 'on' : 'off' ].join(' ');
    this.log('[cmdline]', cmd);
    try {
      execSync(cmd);
      return callback();
    } catch(e) {
      return callback(e);
    }
  });
};

KaKuAccessory.prototype.getServices = function() {
  return [ this.service ];
};
