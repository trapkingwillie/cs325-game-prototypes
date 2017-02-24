window.onload = function() {   
    "use strict";
    
    var game = new Phaser.Game( 1000, 750, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image( 'landscape', 'assets/landscape.jpg', 150, 150 );
        game.load.image( 'bomb', 'assets/bomb.png', 150, 150 );
        game.load.image( 'red', 'assets/redButton.png', 150, 150 );
        game.load.image( 'blue', 'assets/blueButton.png', 150, 150 );
        game.load.image( 'green', 'assets/greenButton.png', 150, 150 );
        game.load.audio('explosion', 'assets/explosion.mp3');
    }
    
    var landscape;
    var bomb;
    var redButton;
    var greenButton;
    var blueButton;
    var bombDiffusalAttempt = false;
    var explosion;
    var failed = false;
    var messageNumber = Math.floor(Math.random()*12);
    var letter;
    var button;
    var diffused = false;

    
    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        landscape = game.add.sprite(0,0,'landscape');
        bomb = game.add.button(670, 425, 'bomb', bombDiffusal, this, 2, 1, 0);
        bomb.scale.setTo(1, 1);
        explosion = game.add.audio('explosion');

        // var style = { font: "25px Times New Roman", fill: "#ffffff", align: "right" };
        // var text = game.add.text( 675, 15, "EOD: Ecoterrorism Prevention", style );
        // text.anchor.setTo( 0.5, 0.0 );

            



        


    }

    function bombDiffusal()
    {
            bombDiffusalAttempt = true;
            game.time.events.add(Phaser.Timer.SECOND * 60, failedDiffusal, this);
            redButton = game.add.button(250, 550, 'red', redWireButton, this, 2, 1, 0);
            redButton.scale.setTo(0.5, 0.5);
            blueButton = game.add.button(400, 550, 'blue', greenWireButton, this, 2, 1, 0);
            blueButton.scale.setTo(0.5, 0.5);
            greenButton = game.add.button(550, 550, 'green', blueWireButton, this, 2, 1, 0);
            greenButton.scale.setTo(0.5, 0.5);


    }

    function greenWireButton()
    {
        if(button==='green')
        {
            diffused = true;
        }
        else
        {
            failedDiffusal();
        }

    }

    function redWireButton()
    {
        if(button==='red')
        {
            diffused = true;
        }
        else
        {
            failedDiffusal();
        }

    }

    function blueWireButton()
    {
        if(button==='blue')
        {
            diffused = true;
        }
        else
        {
            failedDiffusal();
        }

    }

    function failedDiffusal()
    {
        explosion.play()
        failed = true;

    }


    function render() 
    {
        if(bombDiffusalAttempt===true)
        {
            //the solution to the equation equals the letter in the message corresponding to a button.
            game.debug.text('Diffuse the bomb in: '+game.time.events.duration, 32, 64);
            if(messageNumber===1&& failed===false)
            {
            game.debug.text('Message: Rarely good boys behave badly', 32, 96);
            game.debug.text('Filter: (x^2-1)', 32, 114);
            button = 'red';
            }
            if(messageNumber===2&& failed===false)
            {
            game.debug.text('Message: Bog readily grows beards', 32, 96);
            game.debug.text('Filter: (x^2-9x+18)', 32, 114);
            button = 'green';
            }
            if(messageNumber===3&& failed===false)
            {
            game.debug.text('Message: Great booming grasshoppers read', 32, 96);
            game.debug.text('Filter: (x^2-36)', 32, 114);
            button = 'blue';
            }
            if(messageNumber===4 && failed===false)
            {
            game.debug.text('Message: Really bad groupies rave', 32, 96);
            game.debug.text('Filter: (x^4-20+4)', 32, 114);
            button = 'blue';
            }
            if(messageNumber===5&& failed===false)
            {
            game.debug.text('Message: Trees are people too', 32, 96);
            game.debug.text('Filter: (x^5-20x+8)', 32, 114);
            button = 'red';
            }
            if(messageNumber===6 && failed===false)
            {
            game.debug.text('Message: Animals are people too', 32, 96);
            game.debug.text('Filter: (x^100-150x+50)', 32, 114);
            button = 'red';
            }
            if(messageNumber===7 && failed===false)
            {
            game.debug.text('Message: Recycling garbage rules', 32, 96);
            game.debug.text('Filter: (x^3-27+3x-9)', 32, 114);
            button = 'green';
            }
            if(messageNumber===8 && failed===false)
            {
            game.debug.text('Message: Good motives, bad actions', 32, 96);
            game.debug.text('Filter: (x^2-9+4276x^0-1)', 32, 114);
            button = 'green';
            }
            if(messageNumber===9 && failed===false)
            {
            game.debug.text('Message: Boom! Goes the dynamite.', 32, 96);
            game.debug.text('Filter: (x^7-64x+32-x^5)', 32, 114);
            button = 'blue;'
            }
            if(messageNumber===10 && failed===false)
            {
            game.debug.text('Message: Better run fast, polluter', 32, 96);
            game.debug.text('Filter: ln(2)-2x+2', 32, 114);
            button = 'red';
            }
            if(messageNumber===11 && failed ===false)
            {
            game.debug.text('Message: Explosions are fun', 32, 96);
            game.debug.text('Filter: (x^99+243x-242)', 32, 114);
            button = 'red';
            }


        }
        if(failed===true && diffused===false)
        {
            game.debug.text('You fail; game over.', 32, 132);

        }
        if(diffused===true && failed===false)
        {
            game.debug.text('You win - the rainforest is saved!', 32, 132);

        }

    }
    
    function update() 
    {

}

};