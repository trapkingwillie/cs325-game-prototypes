window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image( 'astronaut', 'assets/astronaut.png', 150, 150 );
        game.load.image('earth', 'assets/earth.jpg', 800, 600);
        game.load.image('asteroid1', 'assets/asteroid.png', 50, 50);
        game.load.image('asteroid2', 'assets/asteroid.png', 50, 50);
        game.load.image('asteroid3', 'assets/asteroid.png', 50, 50);
        game.load.audio('theme', 'assets/digital_assignment_1_music.mp3');
        game.load.audio('applause', 'assets/applause.mp3');
        game.load.audio('explosion', 'assets/explosion.mp3');
    }
    
    var astronaut;
    var astronaut_up;
    var astronaut_down;
    var astronaut_left;
    var astronaut_right;
    var earth;
    var theme;
    var loopControl;
    var asteroid1;
    var asteroid2;
    var asteroid3;
    var position1 = (Math.random()*450);
    var position2 = (Math.random()*400);
    var position3 = (Math.random()*600);
    var position4 = (Math.random()*320);
    var position5 = (Math.random()*150);
    var position6 = (Math.random()*200);
    var gameOver = 0;
    var message = 0;
    var asteroidHit = 0;
    var applause;
    var explosion;

    
    function create() {


        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = (Math.random()*300);
        game.physics.arcade.gravity.x = (Math.random()*150);
        earth = game.add.sprite( game.world.centerX, game.world.centerY, 'earth' );
        astronaut = game.add.sprite( game.world.centerX, game.world.centerY, 'astronaut' );
        asteroid1 = game.add.sprite(position1, position2, 'asteroid1');
        asteroid2 = game.add.sprite(position3, position4, 'asteroid2');
        asteroid3 = game.add.sprite(position5, position6, 'asteroid3');
        earth.anchor.setTo(0.5, 0.5);
        astronaut.anchor.setTo( 0.5, 0.5 );
        astronaut.scale.setTo(0.5,0.5);
        asteroid1.scale.setTo(0.25,0.25);
        asteroid2.scale.setTo(0.25,0.25);
        asteroid3.scale.setTo(0.25,0.25);
        astronaut_up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        astronaut_down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        astronaut_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        astronaut_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

        // countdown = game.time.create(false);
        // countdown.loop((Math.random()*30000), iterationsOfCounter, this);
        // countdown.start();
        game.time.events.add(Phaser.Timer.SECOND*(Math.random()*100), stopTimer, this);

        game.physics.enable([asteroid1, asteroid2, asteroid3, astronaut], Phaser.Physics.ARCADE);
        theme = game.add.audio('theme');
        explosion = game.add.audio('explosion');
        applause = game.add.audio('applause');
        theme.play();


        astronaut.body.onCollide = new Phaser.Signal();
        astronaut.body.onCollide.add(asteroidCollision, this);
        asteroid1.body.onCollide = new Phaser.Signal();
        asteroid1.body.onCollide.add(asteroidCollision, this);
        asteroid2.body.onCollide = new Phaser.Signal();
        asteroid2.body.onCollide.add(asteroidCollision, this);
        asteroid3.body.onCollide = new Phaser.Signal();
        asteroid3.body.onCollide.add(asteroidCollision, this);

        var style = { font: "25px Times New Roman", fill: "#ffffff", align: "right" };
        var text = game.add.text( 675, 15, "Space Escape", style );
        text.anchor.setTo( 0.5, 0.0 );

    }

    function asteroidCollision()
    {
        asteroidHit = 1;
    }

    function stopTimer()
    {
        gameOver = 1;
        
    }

    function render() 
    {
        // game.debug.text('Stay on the map and avoid asteroids for: '+ countdown.duration, 32, 32);
        // game.debug.text('You have survived '+iterationsOfCounter+' iterations of this game. Good job!', 32, 56);
        game.debug.text('Avoid asteroids and keep Astronaut John on the game map for: '+game.time.events.duration, 32, 64);

        if (asteroidHit===1)
        {
            game.debug.text('Game Over, you hit an asteroid!!', 300, 300);
            explosion.play();        
        }

        if(astronaut.x>800 && gameOver ===0 && asteroidHit ===0) 
        {
            game.debug.text('Game Over, you went off the map!', 300, 300);
            message = 1;
            explosion.play();
        }

        else if (astronaut.x<0 && gameOver ===0 && asteroidHit ===0)
        {
            game.debug.text('Game Over, you went off the map!', 300, 300);
            message = 1;
            explosion.play();
        }

        else if(astronaut.y>600 && gameOver ===0 && asteroidHit ===0)
        {
            game.debug.text('Game Over, you went off the map!', 300, 300);
            message = 1;
            explosion.play();
        }

        else if (astronaut.y<0 && gameOver ===0 && asteroidHit ===0)
        {
            game.debug.text('Game Over, you went off the map!', 300, 300);
            message = 1;
            explosion.play();
        }


        if(gameOver ===1 && message === 0 && asteroidHit ===0) 
        {
           game.debug.text('Game Over! You win!', 400, 400);
           applause.play();
        }

    }
    
    function update() {
        
game.physics.arcade.collide(astronaut, asteroid1);
game.physics.arcade.collide(astronaut, asteroid2);
game.physics.arcade.collide(astronaut, asteroid3);


        if(message===0 && gameOver === 0 && asteroidHit ===0) 
        {

        if(astronaut_up.isDown) 
            {
                astronaut.y-=50;
            }
        else if (astronaut_down.isDown) 
            {
                astronaut.y+=50;
            }
        else if (astronaut_left.isDown) 
            {
                astronaut.x-=50;
            }
        else if (astronaut_right.isDown) 
            {
                astronaut.x+=50;
            }
        }
      
    }
};
