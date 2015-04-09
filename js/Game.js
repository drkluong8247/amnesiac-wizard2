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
    this.score1 = 0;
    this.health1 = 30;
    this.isAlive1 = true;
    
    //player 2 variables
    this.player2 = null;
    this.keys2 = null;
    this.XDir2 = null;
    this.yDir2 = null;
    this.bolts2 = null;
    this.nextFire2 = null;
    this.score2 = 0;
    this.health2 = 30;
    this.isAlive2 = true;
    
    //shared player variables
    this.fireRate = 300;
    this.skillCoolDown = 5000;
    
    //enemies
    this.enemies = null;
    this.enemyKilled = 0;
    
    //sound
    this.fx = null;
    this.music = null;
    
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
        
        if(this.keys1.q.isDown && this.isAlive1)
        {
            this.fire1();
        }
        
        if(this.keys1.e.isDown && this.isAlive1)
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
        
        if(this.keys2.u.isDown && this.isAlive2)
        {
            this.fire2();
        }
        
        if(this.keys2.o.isDown && this.isAlive2)
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
    };
    
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
    };
    
    //initializes enemies
    this.createEnemies = function()
    {
        //modified from Invaders
        for(var y = 0; y < 10; y++)
        {
            var enemy = this.enemies.create(0, this.game.rnd.integer() % 700 + 50, 'monster');
            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.bounce.set(1);
            enemy.body.velocity.x = game.rnd.integer() % 150 + 50;
            enemy.body.velocity.y = game.rnd.integer() % 150 + 50;
            enemy.body.collideWorldBounds = true;
            enemy.health = 3;
        }
        
        this.enemies.x = 1100;
        this.enemies.y = 0;
    };
    
    //player 1 hits enemy
    this.magicHandler1 = function(bolt, enemy)
    {
        bolt.kill();
        enemy.health -= 1;
        this.score1 += 1;
        if(enemy.health <= 0)
        {
            this.revive(enemy);
            this.score1 += 3;
        }
    };
    
    //player 2 hits enemy
    this.magicHandler2 = function(bolt, enemy)
    {
        bolt.kill();
        enemy.health -= 1;
        this.score2 += 1;
        if(enemy.health <= 0)
        {
            this.revive(enemy);
            this.score2 += 3;
        }
    };
    
    //player 1 hits player2
    this.pvpHandler1 = function(player, bolt)
    {
        bolt.kill();
        this.health2 -= 1;
        this.score1 += 1;
        if(this.health2 <= 0)
        {
            this.score1 += 30;
            player.kill();
            this.isAlive2 = false;
        }
    };
    
    //player 2 hits player1
    this.pvpHandler2 = function(player, bolt)
    {
        bolt.kill();
        this.health1 -= 1;
        this.score2 += 1;
        if(this.health1 <= 0)
        {
            this.score2 += 30;
            player.kill();
            this.isAlive1 = false;
        }
    };
    
    //enemy hits player 1
    this.enemyHandler1 = function(player, enemy)
    {
        enemy.kill();
        this.health1 -= 2;
        if(this.health1 <= 0)
        {
            player.kill();
            this.isAlive1 = false;
        }
        this.revive(enemy);
    }
    
    //enemy hits player 2
    this.enemyHandler2 = function(player, enemy)
    {
        enemy.kill();
        this.health2 -= 2;
        if(this.health2 <= 0)
        {
            player.kill();
            this.isAlive2 = false;
        }
        this.revive(enemy);
    }
    
    //revives enemies as needed
    this.revive = function(enemy)
    {
        this.enemyKilled++;
        if(this.enemyKilled < 199)
        {
            enemy.reset(1100, this.game.rnd.integer() % 700 + 50);
            enemy.health = 3;
            enemy.body.velocity.x = game.rnd.integer() % 200;
            enemy.body.velocity.y = game.rnd.integer() % 200;
        }
        if(this.enemyKilled == 199)
        {
        }
    };
};

BasicGame.Game.prototype = {
    create: create,
    update: update,
    render: render
};

function create() {
    //create background
    this.world = this.game.add.tileSprite(0, 0, 1200, 800, 'world');
    
    //creates player 1
    this.player1 = this.game.add.sprite( this.game.world.centerX/2, this.game.world.centerY/2, 'wizard');
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
    this.player2 = this.game.add.sprite( this.game.world.centerX/2, this.game.world.centerY*3/2, 'wizard2');
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
    
    
    //enemies
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.createEnemies();
    
    
    //sound
    this.fx = this.game.add.audio('castSound');
    this.music = this.game.add.audio('backgroundMusic', 1, true);
    this.music.play('', 0, 1, true);
}

function update(){
    //check player input
    this.checkKeys1();
    this.checkKeys2();
    
    //check collision
    this.game.physics.arcade.overlap(this.bolts1, this.enemies, this.magicHandler1, null, this);
    this.game.physics.arcade.overlap(this.bolts2, this.enemies, this.magicHandler2, null, this);
    
    this.game.physics.arcade.overlap(this.bolts1, this.player2, this.pvpHandler1, null, this);
    this.game.physics.arcade.overlap(this.bolts2, this.player1, this.pvpHandler2, null, this);
    
    this.game.physics.arcade.overlap(this.enemies, this.player1, this.enemyHandler1, null, this);
    this.game.physics.arcade.overlap(this.enemies, this.player2, this.enemyHandler2, null, this);
    
}

function render()
{
    this.game.debug.text('Player1: ' + this.health1 + '/30', 300, 750);
    this.game.debug.text('Score:' + this.score1, 300, 770);
    this.game.debug.text('Multi-shot: ', 300, 790);
    
    this.game.debug.text('Player2: ' + this.health2 + '/30', 700, 750);
    this.game.debug.text('Score:' + this.score2, 700, 770);
    this.game.debug.text('Double Slash: ', 700, 790);
}