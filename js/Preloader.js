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
    game.load.image( 'world', 'assets/ForestBackground.png' );
    game.load.image( 'wizard', 'assets/Mage.png');
    game.load.image( 'monster', 'assets/Specter.png');
    game.load.image( 'magic', 'assets/Boltshot.png');
        
    // loads sound
    game.load.audio( 'castSound', 'assets/magicshot.mp3');
    game.load.audio( 'backgroundMusic', 'assets/AnimalCrossing-TownHall.ogg');
}

function create() {
    this.preloadBar.cropEnabled = false;
}

function update()
{
    
    if(this.cache.isSoundDecoded('backgroundMusic') && this.ready === false) {
        this.ready = true;
        this.state.start("Menu");
    }
}