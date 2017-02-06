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
        game.load.image('asteroids', 'assets/asteroid.png', 50, 50);
        game.load.audio('theme', 'assets/digital_assignment_1_music.mp3');
    }
    
    var astronaut;
    var astronaut_up;
    var astronaut_down;
    var astronaut_left;
    var astronaut_right;
    var earth;
    var theme;
    var loopControl;
    var asteroids;
    var countdown;
    
    function create() {


        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = (Math.random()*300);
        game.physics.arcade.gravity.x = (Math.random()*150);
        earth = game.add.sprite( game.world.centerX, game.world.centerY, 'earth' );
        astronaut = game.add.sprite( game.world.centerX, game.world.centerY, 'astronaut' );
        earth.anchor.setTo(0.5, 0.5);
        astronaut.anchor.setTo( 0.5, 0.5 );
        astronaut.scale.setTo(0.5,0.5);
        astronaut_up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        astronaut_down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        astronaut_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        astronaut_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);

        countdown = game.time.create(true);
        countdown.loop((Math.random()*75000));
        countdown.start();
        asteroids = game.add.group()
        asteroids.scale.setTo(0.25,0.25);
        for(loopControl=0; loopControl<(Math.random()*77); loopControl++)
        {
            asteroids.create((Math.random()*1000), (Math.random()*1800), 'asteroids');
        }

        game.physics.enable([asteroids, astronaut], Phaser.Physics.ARCADE);


        theme = game.add.audio('theme');
        theme.play();

        

        var style = { font: "25px Times New Roman", fill: "#ffffff", align: "right" };
        var text = game.add.text( 675, 15, "Digital Assignment 1", style );
        text.anchor.setTo( 0.5, 0.0 );
    }

    function render() 
    {
        game.debug.text('Stay on the map and avoid asteroids for: '+ countdown.duration, 32, 32);


    }
    
    function update() {

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
};
