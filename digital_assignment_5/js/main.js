window.onload = function() {   
    "use strict";
    
    var game = new Phaser.Game( 1000, 750, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image( 'landscape', 'assets/landscape.jpg', 150, 150 );
        game.load.image( 'bomb', 'assets/bomb.png', 150, 150 );
        game.load.image( 'red', 'assets/redButton.png', 150, 150 );
        game.load.image( 'blue', 'assets/blueButton.png', 150, 150 );
        game.load.image( 'green', 'assets/greenButton.png', 150, 150 );
        game.load.image( 'table', 'assets/table.png', 150, 150 );
        game.load.audio('explosion', 'assets/explosion.mp3');
        game.load.audio('timer', 'assets/ticking.mp3');
        game.load.audio('snip', 'assets/snip.mp3');
    }
    //multiple 'levels', with bombs corresponding to the level. Mutiple means of diffusing the bombs, with some the are time sensitive. More (better) sound effects, with an emphasis on winning and losing 
    //(the events and sound effects that occur when one wins/loses).
    
    var landscape;
    var bomb;
    var redButton;
    var greenButton;
    var blueButton;
    var bombDiffusalAttempt = false;
    var explosion;
    var failed = false;
    var messageNumber = Math.floor(Math.random()*32);
    var letter;
    var button;
    var diffused = false;
    var timer;
    var table;
    var snip;

    
    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        landscape = game.add.sprite(0,0,'landscape');
        bomb = game.add.button(670, 425, 'bomb', bombDiffusal, this, 2, 1, 0);
        bomb.scale.setTo(1, 1);
        explosion = game.add.audio('explosion');
        timer = game.add.audio('timer');
        snip = game.add.audio('snip');

        // var style = { font: "25px Times New Roman", fill: "#ffffff", align: "right" };
        // var text = game.add.text( 675, 15, "EOD: Ecoterrorism Prevention", style );
        // text.anchor.setTo( 0.5, 0.0 );

            



        


    }

    function bombDiffusal()
    {
            bombDiffusalAttempt = true;
            game.time.events.add(Phaser.Timer.SECOND * 60, failedDiffusal, this);
            table = game.add.sprite(300, 450, 'table');
            table.scale.setTo(0.75, 0.75);
            redButton = game.add.button(365, 515, 'red', redWireButton, this, 2, 1, 0);
            redButton.scale.setTo(0.45, 0.45);
            blueButton = game.add.button(440, 515, 'blue', blueWireButton, this, 2, 1, 0);
            blueButton.scale.setTo(0.38, 0.38);
            greenButton = game.add.button(515, 515, 'green', greenWireButton, this, 2, 1, 0);
            greenButton.scale.setTo(0.45, 0.45);
            timer.loop = true;
            timer.play();


    }

    function greenWireButton()
    {
        snip.play();
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
        snip.play();
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
        snip.play();
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
        if(diffused===false)
        {
        explosion.play()
        failed = true;
    }

    }


    function render() 
    {
        if(bombDiffusalAttempt===true)
        {
            //the solution to the equation equals the letter in the message corresponding to a button.
            if(diffused===false && failed===false)
            {
                
            game.debug.text('Diffuse the bomb in: '+game.time.events.duration, 32, 64);
            if(messageNumber===1&& failed===false)
            {
            game.debug.text('Message: Rarely good boys behave badly', 32, 96);
            game.debug.text('Filter: (x^2-1)=0', 32, 114);
            button = 'red';//good
            }
            if(messageNumber===2&& failed===false)
            {
            game.debug.text('Message: Bog readily grows beards', 32, 96);
            game.debug.text('Filter: (x^2-9x+18)=0', 32, 114);
            button = 'green';//good
            }
            if(messageNumber===3&& failed===false)
            {
            game.debug.text('Message: Great booming grasshoppers read', 32, 96);
            game.debug.text('Filter: (x^2-36)=0', 32, 114);
            button = 'blue';//good
            }
            if(messageNumber===4 && failed===false)
            {
            game.debug.text('Message: Really bad groupies rave', 32, 96);
            game.debug.text('Filter: (x^2-7x)=0', 32, 114);
            button = 'blue';//good
            }
            if(messageNumber===5&& failed===false)
            {
            game.debug.text('Message: Trees are people too', 32, 96);
            game.debug.text('Filter: (x^5-20x+8)=0', 32, 114);
            button = 'red';//good
            }
            if(messageNumber===6 && failed===false)
            {
            game.debug.text('Message: Animals are people too', 32, 96);
            game.debug.text('Filter: (x(x)-81)=0', 32, 114);
            button = 'red';//good
            }
            if(messageNumber===7 && failed===false)
            {
            game.debug.text('Message: Recycling garbage rules', 32, 96);
            game.debug.text('Filter: (x^2-9x+8-8)=0', 32, 114);
            button = 'green';//good
            }
            if(messageNumber===8 && failed===false)
            {
            game.debug.text('Message: Good motives, bad actions', 32, 96);
            game.debug.text('Filter: (x^2-9x+9x-1)=0', 32, 114);
            button = 'green';//good
            }
            if(messageNumber===9 && failed===false)
            {
            game.debug.text('Message: Boom! Goes the dynamite.', 32, 96);
            game.debug.text('Filter: (x^7-x^5-x^3-x)=0', 32, 114);
            button = 'blue;'//good
            }
            if(messageNumber===10 && failed===false)
            {
            game.debug.text('Message: Better run fast, polluter', 32, 96);
            game.debug.text('Filter: (6x-36)=0', 32, 114);
            button = 'red';
            }
            if(messageNumber===11 && failed ===false)
            {
            game.debug.text('Message: Explosions are fun', 32, 96);
            game.debug.text('Filter: (x^2-144)=0', 32, 114);
            button = 'red';//good
            }
            if(messageNumber===12 && failed===false)
            {
               game.debug.text('Message: All good things must end', 32, 96);
               game.debug.text('Filter: (x^3-64)=0', 32, 114);
               button = 'green'; 

            }
            if(messageNumber===13 && failed===false)
            {
               game.debug.text('Message: The organization must be stopped', 32, 96);
               game.debug.text('Filter: (x^2-25)=0', 32, 114);
               button = 'red'; 

            }
            if(messageNumber===14 && failed===false)
            {
               game.debug.text('Message: Smog is terrible for the environment.', 32, 96);
               game.debug.text('Filter: (x^2-16+4x-x^2)=0', 32, 114);
               button = 'green'; 

            }
            if(messageNumber===15 && failed===false)
            {
               game.debug.text('Message: Forests must be saved.', 32, 96);
               game.debug.text('Filter: (x^2-x^3+18)=0', 32, 114);
               button = 'red'; 

            }
            if(messageNumber===16 && failed===false)
            {
               game.debug.text('Message: We are the ecoterrorists.', 32, 96);
               game.debug.text('Filter: (x^2-(14)^3+14)=0', 32, 114);
               button = 'red'; 

            }
            if(messageNumber===17 && failed===false)
            {
               game.debug.text('Message: Next target - your refineries', 32, 96);
               game.debug.text('Filter: (x^2-64)=0', 32, 114);
               button = 'green'; 

            }
            if(messageNumber===17 && failed===false)
            {
               game.debug.text('Message: The refinery will be hit at noon', 32, 96);
               game.debug.text('Filter: ((x^2-16)+(4y-16))=0; X and Y are equal', 32, 114);
               button = 'red'; 

            }
            if(messageNumber===18 && failed===false)
            {
               game.debug.text('Message: Future generations will thank us', 32, 96);
               game.debug.text('Filter: (x^2-25)=0', 32, 114);
               button = 'green'; 

            }
            if(messageNumber===19 && failed===false)
            {
               game.debug.text('Message: Be aware of environmental damage.', 32, 96);
               game.debug.text('Filter: The slope of the line y=x', 32, 114);
               button = 'blue'; 

            }
            if(messageNumber===20 && failed===false)
            {
               game.debug.text('Message: By our hands, the environment will be saved.', 32, 96);
               game.debug.text('Filter: ((x^3-1)(Y^3-1))=0; X and Y are equal', 32, 114);
               button = 'blue'; 

            }
            if(messageNumber===21 && failed===false)
            {
               game.debug.text('Message: The only way to fix carelessness is action', 32, 96);
               game.debug.text('Filter: (x-18)=0', 32, 114);
               button = 'red'; 

            }
            if(messageNumber===22 && failed===false)
            {
               game.debug.text('Message: Conservation is critical', 32, 96);
               game.debug.text('Filter: (x-6)=0', 32, 114);
               button = 'red'; 

            }
            if(messageNumber===23 && failed===false)
            {
               game.debug.text('Message: Better solve the riddle', 32, 96);
               game.debug.text('Filter: (x-9+8)=0', 32, 114);
               button = 'blue'; 

            }
            if(messageNumber===24 && failed===false)
            {
               game.debug.text('Message: Save the rainforest', 32, 96);
               game.debug.text('Filter: (x(x)-64)=0', 32, 114);
               button = 'red'; 

            }
            if(messageNumber===25 && failed===false)
            {
               game.debug.text('Message: Good environments are critical', 32, 96);
               game.debug.text('Filter: (x^75-1)=0', 32, 114);
               button = 'green'; 

            }
            if(messageNumber===26 && failed===false)
            {
               game.debug.text('Message: Green grass, tall trees, harmony', 32, 96);
               game.debug.text('Filter: (x-16)=0', 32, 114);
               button = 'red'; 

            }
            if(messageNumber===27 && failed===false)
            {
               game.debug.text('Message: Be better to the environment', 32, 96);
               game.debug.text('Filter: (x-32+12-19)', 32, 114);
               button = 'blue'; 

            }
            if(messageNumber===28 && failed===false)
            {
               game.debug.text('Message: Cut the green wire', 32, 96);
               game.debug.text('Filter: (x-8)=0', 32, 114);
               button = 'red'; 

            }
            if(messageNumber===29 && failed===false)
            {
               game.debug.text('Message: Cut the blue wire', 32, 96);
               game.debug.text('Filter: (x^2-169)=0', 32, 114);
               button = 'red'; 

            }
            if(messageNumber===30 && failed===false)
            {
               game.debug.text('Message: Cut the red wire, before you die', 32, 96);
               game.debug.text('Filter: (x^2-(14^2))=0', 32, 114);
               button = 'blue'; 

            }
            if(messageNumber===31 && failed===false)
            {
               game.debug.text('Message: You are going to fail', 32, 96);
               game.debug.text('Filter: (x^3-125)=0', 32, 114);
               button = 'red'; 

            }
        }


        }
        if(failed===true && diffused===false)
        {
            game.debug.text('You fail; game over.', 32, 114);
            timer.mute = true;

        }
        if(diffused===true && failed===false)
        {
            game.debug.text('You win - the rainforest is saved!', 32, 114);
            timer.mute = true;
        }

    }
    
    function update() 
    {

}

};