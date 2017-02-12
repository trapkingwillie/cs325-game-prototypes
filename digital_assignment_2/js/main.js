window.onload = function() {    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image( 'police', 'assets/police_car.png', 100, 100 );
        game.load.image('criminals', 'assets/getaway_car.png', 100, 100);
        game.load.image('city', 'assets/city.png', 50, 50);
        game.load.image('arrest', 'assets/arrest.png', 50, 50);
        game.load.image('evidence', 'assets/evidence.png', 50, 50);
        game.load.image('skeleton', 'assets/skeleton.png', 50, 50);
        game.load.image('skeleton2', 'assets/skeleton.png', 50, 50);
        game.load.image('skeleton3', 'assets/skeleton.png', 50, 50);
        game.load.audio('door_closing', 'assets/jail_door.mp3');
    }
    
    var police;
    var criminals;
    var city;
    var skeleton = 0;
    var door_closing = 0;
    var criminals_arrested = 0;
    var gameOver = 0;
    var police_Up = 0;
    var police_Down = 0;
    var police_Left = 0;
    var police_Right = 0;
    var position1 = (Math.random()*100)+20;
    var position2 = (Math.random()*700)+20;
    var arrest_button;
    var skeleton2 = 0;
    var skeleton3 = 0;
    var skeleton_pickup = 0;
    var skeleton_button;
    var evidence;
    var skelFound = false;
    var skel2Found = false;
    

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
        game.time.events.add(Phaser.Timer.SECOND*(Math.random()*75), stopTimer, this);
        game.physics.enable([police, criminals], Phaser.Physics.ARCADE);
        police.body.onCollide = new Phaser.Signal();
        police.body.onCollide.add(criminalsCaught, this);
        var style = { font: "25px Times New Roman", fill: "#000000", align: "right" };
        var text = game.add.text( 675, 15, "Police Revenge!", style );
        text.anchor.setTo( 0.5, 0.0 );
    }

    function criminalsCaught()
    {
        arrest_button = game.add.button(0, 400, 'arrest', triggered_button, this, 2,1,0);
        arrest_button.scale.setTo(0.17, 0.17);
    }

    function skeletonFound()
    {
        skelFound = true;
    }

    function skeleton2Found()
    {
        skel2Found = true;
    }

    function skeleton3Found()
    {
        if(skelFound && skel2Found)
        {
            skeleton_button = game.add.button(0, 500, 'evidence', skeleton_button_press, this, 2,1,0);
            skeleton_button.scale.setTo(0.17, 0.17);
        }
    }

    function triggered_button()
    {
        criminals_arrested = 1;
        door_closing = game.add.audio('door_closing');
        door_closing.play();
        skeleton = game.add.sprite( (Math.random()*600), (Math.random()*350)+20, 'skeleton' );
        skeleton2 = game.add.sprite( (Math.random()*600), (Math.random()*350)+20, 'skeleton2' );
        skeleton3 = game.add.sprite( (Math.random()*600), (Math.random()*300)+20, 'skeleton3' );
        skeleton.scale.setTo(0.25, 0.25);
        skeleton2.scale.setTo(0.25, 0.25);
        skeleton3.scale.setTo(0.25, 0.25);
        game.physics.enable([skeleton, skeleton2, skeleton3], Phaser.Physics.ARCADE);
        skeleton.body.onCollide = new Phaser.Signal()
        skeleton.body.onCollide.add(skeletonFound, this);
        skeleton2.body.onCollide = new Phaser.Signal()
        skeleton2.body.onCollide.add(skeleton2Found, this);
        skeleton3.body.onCollide = new Phaser.Signal()
        skeleton3.body.onCollide.add(skeleton3Found, this);
    }

        function skeleton_button_press()
    {
        skeleton_pickup = 1;
        door_closing = game.add.audio('door_closing');
        door_closing.play();
    }

    function stopTimer()
    {
        gameOver = 1;       
    }

    function render() 
    {
        game.debug.text('Catch the criminals! You have until the timer reaches zero. '+game.time.events.duration, 32, 64);

        if (criminals_arrested===1 && skeleton_pickup===1 && gameOver === 0)
        {
        var winningStyle = { font: "25px Times New Roman", fill: "#000000", align: "center" };
        var winningText = game.add.text( 100, 300, "You caught the ciminals before time expired! You got revenge!", winningStyle );
            //game.debug.text('You caught the criminals before time expired! You got revenge!', 100, 500);
             
        }

        if(criminals_arrested===0 && gameOver ===1) 
        {
        var escapeStyle = { font: "25px Times New Roman", fill: "#000000", align: "center" };
        var escapeText= game.add.text( 100, 300, "You did not get revenge; the criminal escaped!", escapeStyle );
            //game.debug.text('You did not get revenge; the criminals escaped!', 100, 500);
            
        }

        if(gameOver === 1 && skeleton_pickup ===0)
        {
            
        var lostGameStyle = { font: "25px Times New Roman", fill: "#000000", align: "center" };
        var lostGameText = game.add.text( 100, 350, "You did not solve the murder mystery.", lostGameStyle );
            //game.debug.text('You did not solve the murder mystery.', 100, 550);
        }
}
    
    function update() {
        
        game.physics.arcade.collide(police, criminals);

        if(gameOver === 0 && criminals_arrested ===1) 
        {
            game.physics.arcade.collide(police, skeleton);
            game.physics.arcade.collide(police, skeleton2);
            game.physics.arcade.collide(police, skeleton3);
        }

        if(gameOver === 0) 
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
