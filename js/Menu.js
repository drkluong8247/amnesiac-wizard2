/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Menu = function(game) {

    // local vars
    this.background = null;
    this.enter = null;
    this.gameTime = -1;
    this.enterClicked = false;
    this.buttonSound = null;

    // local funcs
    this.clickEnter = function() {

        if(this.enterClicked == false) {
            this.enterClicked = true;
            this.gameTime = this.game.time.now + 1000;
            this.buttonSound.play();
        }
    }

};

BasicGame.Menu.prototype = {
    create: create,
    update: update
};

function create() {
    console.log("%cStarting game state Menu", "color:white; background:green");


    // load background
    this.background = this.game.add.image(0, 0, 'menuBackground');

    // set up button sound
    this.buttonSound = this.game.add.audio('ding');

    // set up button sprite
    this.enter = this.game.add.sprite(600, 600, 'enter');
    this.enter.scale.setTo(.5,.5);
    this.enter.anchor.setTo(.5,.5);
    this.enter.inputEnabled = true;
    this.enter.events.onInputDown.add(this.clickEnter, this);
}

function update() {
    if(this.gameTime > 0 && this.game.time.now >= this.gameTime) {
        this.state.start('Instructions');
        //this.state.start('Game');
    }
}

