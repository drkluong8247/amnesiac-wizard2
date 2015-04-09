/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Game = function(game) {
    //background
    this.world = null;
    
    //player 1 variables
    this.player1 = null;
    this.keys1 = null;
    this.XDir1 = null;
    this.yDir1 = null;
    this.bolts1 = null;
    this.nextFire1 = null;
    
    //player 2 variables
    this.player2 = null;
    this.keys2 = null;
    this.XDir2 = null;
    this.yDir2 = null;
    this.bolts2 = null;
    this.nextFire2 = null;
    
    //shared player variables
    this.fireRate = 300;
    this.skillCoolDown = 5000;
    
    //sound
    this.fx = null;
    
    //checks player 1 input
    this.checkKeys1 = function() {
        
        //player 1 movement
        if(this.keys1.w.isDown)
        {
            this.player1.body.velocity.y = -150;
            this.player1.body.velocity.x = 0;
            this.xDir1 = 0;
            this.yDir1 = -1;
        }
        else if(this.keys1.s.isDown)
        {
            this.player1.body.velocity.y = 150;
            this.player1.body.velocity.x = 0;
            this.xDir1 = 0;
            this.yDir1 = 1;
        }
        else if(this.keys1.a.isDown)
        {
            this.player1.body.velocity.x = -150;
            this.player1.body.velocity.y = 0;
            this.xDir1 = -1;
            this.yDir1 = 0;
        }
        else if(this.keys1.d.isDown)
        {
            this.player1.body.velocity.x = 150;
            this.player1.body.velocity.y = 0;
            this.xDir1 = 1;
            this.yDir1 = 0;
        }
        else
        {
            this.player1.body.velocity.x = 0;
            this.player1.body.velocity.y = 0;
        }
        
        if(this.keys1.q.isDown)
        {
            this.fire1();
        }
        
        if(this.keys1.e.isDown)
        {
            
        }
    };
    
    //checks player 2 input
    this.checkKeys2 = function() {
        
        //player 2 movement
        if(this.keys2.i.isDown)
        {
            this.player2.body.velocity.y = -150;
            this.player2.body.velocity.x = 0;
            this.xDir2 = 0;
            this.yDir2 = -1;
        }
        else if(this.keys2.k.isDown)
        {
            this.player2.body.velocity.y = 150;
            this.player2.body.velocity.x = 0;
            this.xDir2 = 0;
            this.yDir2 = 1;
        }
        else if(this.keys2.j.isDown)
        {
            this.player2.body.velocity.x = -150;
            this.player2.body.velocity.y = 0;
            this.xDir2 = -1;
            this.yDir2 = 0;
        }
        else if(this.keys2.l.isDown)
        {
            this.player2.body.velocity.x = 150;
            this.player2.body.velocity.y = 0;
            this.xDir2 = 1;
            this.yDir2 = 0;
        }
        else
        {
            this.player2.body.velocity.x = 0;
            this.player2.body.velocity.y = 0;
        }
        
        if(this.keys2.u.isDown)
        {
            this.fire2();
        }
        
        if(this.keys2.o.isDown)
        {
            
        }
    };
    
    //player 1 fires
    this.fire1 = function()
    {
        if (this.game.time.now > this.nextFire1 && this.bolts1.countDead() > 0)
        {
            this.nextFire1 = this.game.time.now + this.fireRate;

            var bolt = this.bolts1.getFirstExists(false);

            bolt.reset(this.player1.x, this.player1.y);

            bolt.body.velocity.x = 350 * this.xDir1;
            bolt.body.velocity.y = 350 * this.yDir1;
            
            this.fx.play();
        }
    }
    
    //player 2 fires
    this.fire2 = function()
    {
        if (this.game.time.now > this.nextFire2 && this.bolts2.countDead() > 0)
        {
            this.nextFire2 = this.game.time.now + this.fireRate;

            var bolt = this.bolts2.getFirstExists(false);

            bolt.reset(this.player2.x, this.player2.y);

            bolt.body.velocity.x = 350 * this.xDir2;
            bolt.body.velocity.y = 350 * this.yDir2;
            
            this.fx.play();
        }
    }
};

BasicGame.Game.prototype = {
    create: create,
    update: update
};

function create() {
    //create background
    this.world = this.game.add.tileSprite(0, 0, 1200, 800, 'world');
    
    //creates player 1
    this.player1 = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'wizard');
    this.player1.anchor.setTo( 0.5, 0.5 );
    this.game.physics.enable( this.player1, Phaser.Physics.ARCADE );
    this.player1.body.collideWorldBounds = true;
    
    //creates input for player 1
    this.keys1 = {};
    this.keys1.w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.keys1.a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.keys1.s = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.keys1.d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.keys1.q = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.keys1.e = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    
    //initializes direction for player 1
    this.xDir1 = 0;
    this.yDir1 = 1;
    
    //magic bolts for player 1
    this.bolts1 = this.game.add.group();
    this.bolts1.enableBody = true;
    this.bolts1.physicsBodyType = Phaser.Physics.ARCADE;
    this.bolts1.createMultiple(30, 'magic', 0, false);
    this.bolts1.setAll('anchor.x', 0.5);
    this.bolts1.setAll('anchor.y', 0.5);
    this.bolts1.setAll('outOfBoundsKill', true);
    this.bolts1.setAll('checkWorldBounds', true);
    this.nextFire1 = 0;
    
    
    //creates player 2
    this.player2 = this.game.add.sprite( this.game.world.centerX/2, this.game.world.centerY, 'wizard2');
    this.player2.anchor.setTo( 0.5, 0.5 );
    this.game.physics.enable( this.player2, Phaser.Physics.ARCADE );
    this.player2.body.collideWorldBounds = true;
    
    //creates input for player 1
    this.keys2 = {};
    this.keys2.i = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.keys2.j = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
    this.keys2.k = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
    this.keys2.l = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    this.keys2.u = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
    this.keys2.o = this.game.input.keyboard.addKey(Phaser.Keyboard.O);
    
    //initializes direction for player 1
    this.xDir2 = 0;
    this.yDir2 = 1;
    
    //magic bolts for player 2
    this.bolts2 = this.game.add.group();
    this.bolts2.enableBody = true;
    this.bolts2.physicsBodyType = Phaser.Physics.ARCADE;
    this.bolts2.createMultiple(30, 'magic2', 0, false);
    this.bolts2.setAll('anchor.x', 0.5);
    this.bolts2.setAll('anchor.y', 0.5);
    this.bolts2.setAll('outOfBoundsKill', true);
    this.bolts2.setAll('checkWorldBounds', true);
    this.nextFire1 = 0;
    
    //sound
    this.fx = this.game.add.audio('castSound');
}

function update(){
    this.checkKeys1();
    this.checkKeys2();
}
