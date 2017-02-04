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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'astronaut', 'assets/astronaut.jpg', 150, 150 );
        game.load.image('earth', 'assets/earth.jpg', 800, 600);
        game.load.image('asteroid', 'assets/asteroid.png', 50, 50);
        game.load.image('asteroid_2', 'assets/asteroid.png', 50, 50);
        game.load.image('asteroid_3', 'assets/asteroid.png', 50, 50);
        game.load.image('asteroid_4', 'assets/asteroid.png', 50, 50);
        game.load.image('asteroid_5', 'assets/asteroid.png', 50, 50);
        game.load.audio('theme', 'assets/digital_assignment_1_music.mid');
    }
    
    var astronaut;
    var asteroid;
    var asteroid_2;
    var asteroid_3;
    var asteroid_4;
    var asteroid_5;
    var earth;
    var themeMusic;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        earth = game.add.sprite( game.world.centerX, game.world.centerY, 'earth' );
        astronaut = game.add.sprite( game.world.centerX, game.world.centerY, 'astronaut' );
        asteroid = game.add.sprite( 0, 0, 'asteroid' );
        asteroid_2 = game.add.sprite( 0, 0, 'asteroid_2' );
        asteroid_3 = game.add.sprite( 150, 0, 'asteroid_3' );
        asteroid_4 = game.add.sprite( 0, 150, 'asteroid_4' );
        asteroid_5 = game.add.sprite( 0, 60, 'asteroid_5' );
        astronaut.scale.setTo(0.5,0.5);
        asteroid.scale.setTo(0.125,0.125);
        asteroid_2.scale.setTo(0.125,0.125);
        asteroid_3.scale.setTo(0.125,0.125);
        asteroid_4.scale.setTo(0.125,0.125);
        asteroid_5.scale.setTo(0.125,0.125);
        themeMusic = game.add.audio('theme');
        themeMusic.play();
        
        

        
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        earth.anchor.setTo(0.5, 0.5);
        astronaut.anchor.setTo( 0.5, 0.5 );
        asteroid.anchor.setTo(0, 0);
        asteroid_2.anchor.setTo(0, 0.5);
        asteroid_3.anchor.setTo(0, 0.5);
        asteroid_4.anchor.setTo(0.5, 0);
        asteroid_5.anchor.setTo(0.5, 0);


        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( astronaut, Phaser.Physics.ARCADE );
        game.physics.enable(asteroid, Phaser.Physics.ARCADE);
        game.physics.enable(asteroid_2, Phaser.Physics.ARCADE);
        game.physics.enable(asteroid_3, Phaser.Physics.ARCADE);
        game.physics.enable(asteroid_4, Phaser.Physics.ARCADE);
        game.physics.enable(asteroid_5, Phaser.Physics.ARCADE);

        astronaut.body.collideWorldBounds = true;
        asteroid.body.collideWorldBounds = false;
        asteroid_2.body.collideWorldBounds = false;
        asteroid_3.body.collideWorldBounds = false;
        asteroid_4.body.collideWorldBounds = false;
        asteroid_5.body.collideWorldBounds = false;
        // Make it bounce off of the world bounds.
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Times New Roman", fill: "#ffffff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Digital Assignment 1", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        astronaut.rotation = game.physics.arcade.accelerateToPointer( astronaut, this.game.input.activePointer, 800, 800, 100 );
        asteroid.rotation = game.physics.arcade.accelerateToPointer( asteroid, this.game.input.activePointer, 100, 100, (Math.random()*500) );
        asteroid_2.rotation = game.physics.arcade.accelerateToPointer( asteroid_2, this.game.input.activePointer, (Math.random()*900), 100, (Math.random()*250) );
        asteroid_3.rotation = game.physics.arcade.accelerateToPointer( asteroid_3, this.game.input.activePointer, 500, (Math.random()*750), 100 );
        asteroid_4.rotation = game.physics.arcade.accelerateToPointer( asteroid_4, this.game.input.activePointer, (Math.random()*500), 850, 800 );
        asteroid_5.rotation = game.physics.arcade.accelerateToPointer( asteroid_5, this.game.input.activePointer, (Math.random()*350), 800, 800 );

    }
};
