/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Preloader = function(game) {
    this.background = null;
    this.preloadBar = null;

    this.ready = false;
};

BasicGame.Preloader.prototype = {
    preload: preload,
    create: create,
    update: update
};

function preload() {
    console.log("%cStarting game state Preloader", "color:white; background:green");
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, "icon");
    this.preloadBar.anchor.setTo(0.5, 0.5);

    this.load.setPreloadSprite(this.preloadBar);
    

//======================= load all in game assets ============================================
    // Loads images
    this.game.load.image( 'world', 'assets/ForestBackground.png' );
    this.game.load.image( 'wizard', 'assets/Mage.png');
    this.game.load.image( 'monster', 'assets/Specter.png');
    this.game.load.image( 'magic', 'assets/Boltshot.png');
        
    // loads sound
    this.game.load.audio( 'castSound', 'assets/magicshot.mp3');
    this.game.load.audio( 'backgroundMusic', 'assets/AnimalCrossing-TownHall.ogg');
}

function create() {
    this.preloadBar.cropEnabled = false;
}

function update()
{
    this.preloadBar.angle += 1;
    if(this.cache.isSoundDecoded('backgroundMusic') && this.ready === false) {
        this.ready = true;
        this.state.start("Menu");
    }
}