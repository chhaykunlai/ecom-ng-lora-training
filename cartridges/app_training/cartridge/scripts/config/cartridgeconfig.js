// Workaround missing API to get the current site cartridge path.
// Place this file under cartridge/scripts/config/ to enable json configurations within current cartridge (site-config, sections/*, events, etc..).
// "cartridgeName" and "_superModule" properties always required, add "eventListeners : true" in case you have events.json within the cartridge.
module.exports = {
    cartridgeName  : this.module.cartridge,
    _superModule   : module.superModule,
    eventListeners : true,
};
