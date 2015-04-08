/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Game = function(game) {
     this.world = null;
};

BasicGame.Game.prototype = {
    create: create,
    update: update
};

function create() {
    this.world = this.game.add.tileSprite(0, 0, 1200, 800, 'world');
}

function update() {
}
