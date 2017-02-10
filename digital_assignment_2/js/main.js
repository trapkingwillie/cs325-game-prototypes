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
        game.load.image( 'police', 'assets/police_car.png', 100, 100 );
        game.load.image('criminals', 'assets/getaway_car.png', 100, 100);
        game.load.image('city', 'assets/city.png', 50, 50);
        game.load.image('arrest', 'assets/arrest.png', 50, 50);
        game.load.audio('door_closing', 'assets/jail_door.mp3');
    }
    
    var police;
    var criminals;
    var city;
    var door_closing = 0;
    var criminals_arrested = 0;
    var gameOver = 0;
    var police_Up = 0;
    var police_Down = 0;
    var police_Left = 0;
    var police_Right = 0;
    var position1 = (Math.random()*100);
    var position2 = (Math.random()*700);
    var arrest_button;
    

    function create() {


        game.physics.startSystem(Phaser.Physics.ARCADE);
        city = game.add.sprite( game.world.centerX, game.world.centerY, 'city' );
        city.anchor.setTo(0.5,0.5);
        police = game.add.sprite( game.world.centerX, game.world.centerY, 'police' );
        criminals = game.add.sprite(position1, position2, 'criminals');
        police_Up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        police_Down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        police_Right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        police_Left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        police.scale.setTo(0.17,0.17);
        criminals.scale.setTo(0.25, 0.25);
        criminals.anchor.set(0);
        game.add.tween(criminals).to( {x: (Math.random()*700), y: (Math.random()*550)}, 20000, Phaser.Easing.Bounce.Out, true);
        game.time.events.add(Phaser.Timer.SECOND*(Math.random()*60), stopTimer, this);

        game.physics.enable([police, criminals], Phaser.Physics.ARCADE);


        police.body.onCollide = new Phaser.Signal();
        police.body.onCollide.add(criminalsCaught, this);


        var style = { font: "25px Times New Roman", fill: "#ffffff", align: "right" };
        var text = game.add.text( 675, 15, "Police Revenge!", style );
        text.anchor.setTo( 0.5, 0.0 );

    }

    function criminalsCaught()
    {
        arrest_button = game.add.button(100, 100, 'arrest', triggered_button, this, 2,1,0);
        arrest_button.scale.setTo(0.17, 0.17);
    }

    function triggered_button()
    {
        criminals_arrested = 1;
        door_closing = game.add.audio('door_closing');
        door_closing.play();
    }

    function stopTimer()
    {
        gameOver = 1;       
    }

    function render() 
    {
        // game.debug.text('Stay on the map and avoid asteroids for: '+ countdown.duration, 32, 32);
        // game.debug.text('You have survived '+iterationsOfCounter+' iterations of this game. Good job!', 32, 56);
        game.debug.text('Catch the criminals! You have until the timer reaches zero. '+game.time.events.duration, 32, 64);

        if (criminals_arrested===1 && gameOver === 0)
        {
            game.debug.text('You caught the criminals before time expired! You got revenge!', 100, 300);
             
        }

        if(criminals_arrested===0 && gameOver ===1) 
        {
            game.debug.text('You did not get revenge; the criminals escaped!', 100, 300);
            
        }
}
    
    function update() {
        
        game.physics.arcade.collide(police, criminals);

        if(gameOver === 0 && criminals_arrested ===0) 
        {

        if(police_Up.isDown) 
            {
                police.y-=25;
            }
        else if (police_Down.isDown) 
            {
                police.y+=25;
            }
        else if (police_Left.isDown) 
            {
                police.x-=25;
            }
        else if (police_Right.isDown) 
            {
                police.x+=25;
            }
        }

      
    }

};
