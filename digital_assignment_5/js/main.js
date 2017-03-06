window.onload = function() {   
    "use strict";
    
    var game = new Phaser.Game( 1000, 750, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image( 'landscape', 'assets/landscape.jpg', 150, 150 );
        game.load.image( 'bomb', 'assets/bomb.png', 150, 150 );
        game.load.image('bomb2', 'assets/bomb.png', 150, 150);
        game.load.image( 'red', 'assets/redButton.png', 150, 150 );
        game.load.image( 'blue', 'assets/blueButton.png', 150, 150 );
        game.load.image( 'green', 'assets/greenButton.png', 150, 150 );
        game.load.image( 'table', 'assets/table.png', 150, 150 );
        game.load.image('battery', 'assets/battery.png', 150, 150);
        game.load.image('robot', 'assets/robot.png', 150, 150);
        game.load.image('water', 'assets/water.png', 150, 150);
        game.load.image('caesar', 'assets/caesar.png', 150, 150);
        game.load.image('mathGuy', 'assets/mathGuy.png', 150, 150);
        game.load.image('paper', 'assets/paper.png', 150, 150);
        game.load.image('blackBackground', 'assets/blackBackground.jpg', 150, 150);
        game.load.image('newLandscape', 'assets/landscape.jpg', 150, 150);
        game.load.audio('explosion', 'assets/explosion.mp3');
        game.load.audio('timer', 'assets/ticking.mp3');
        game.load.audio('snip', 'assets/snip.mp3');
        game.load.audio('win', 'assets/win.mp3');
        game.load.audio('lose', 'assets/lose.mp3');
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
    var messageNumber = Math.floor(Math.random()*32);//controls first bomb message
    var filterNumber = Math.floor(Math.random()*32);//controls second bomb message
    var letter;
    var button;
    var diffused = false;
    var timer;
    var table;
    var snip;
    var bomb2;
    var table2;
    var battery;
    var robot;
    var water;
    var diffused2 = false;
    var bomb2DiffusalAttempt = false;
    var button2;
    var caesar;
    var helpRequired = false;
    var mathHelpRequired = false;
    var mathGuy;
    var paper;
    var paperVariable = Math.floor(Math.random()*10000);
    var hint = false;
    var noShowHint = false;
    var newLandscape;
    var blackBackground;
    var caesar2;
    var mathGuy2;
    var win;
    var lose;

    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        landscape = game.add.sprite(0,0,'landscape');
        bomb = game.add.button(100, 310, 'bomb', bombDiffusal, this, 2, 1, 0);
        bomb2 = game.add.button(415, 310, 'bomb2', bomb2Diffusal, this, 2, 1, 0);
        caesar = game.add.button(620, 310, 'caesar', help, this, 2, 1, 0);
        caesar.scale.setTo(0.5, 0.5);
        mathGuy = game.add.button(10, 300, 'mathGuy', mathHelp, this, 2, 1, 0);
        mathGuy.scale.setTo(0.19, 0.19);
        bomb.scale.setTo(0.35, 0.35);
        bomb2.scale.setTo(0.45, 0.45);
        explosion = game.add.audio('explosion');
        timer = game.add.audio('timer');
        snip = game.add.audio('snip');
        win = game.add.audio('win');
        lose = game.add.audio('lose');

    }

    function help()
    {
        helpRequired = true;
        mathHelpRequired = false;
    }

    function hintGiven()
    {
        if(noShowHint===false)
        {
        hint = true;
        game.time.events.add(Phaser.Timer.SECOND * 0.5, hintTimer, this);
        noShowHint=true;
        helpRequired = false;
        mathHelpRequired = false;
    }
    }

    function mathHelp()
    {
        mathHelpRequired = true;
        helpRequired = false;
    }
    function bombDiffusal()//use for bomb1
    {
            bombDiffusalAttempt = true;
            helpRequired = false;
            mathHelpRequired = false;
            if(hint===false)
            {
            game.time.events.add(Phaser.Timer.SECOND * 120, failedDiffusal, this);
            }
            table = game.add.sprite(-20, 450, 'table');
            table.scale.setTo(1.75, 0.75);
            redButton = game.add.button(160, 515, 'red', redWireButton, this, 2, 1, 0);
            redButton.scale.setTo(0.45, 0.45);
            blueButton = game.add.button(230, 515, 'blue', blueWireButton, this, 2, 1, 0);
            blueButton.scale.setTo(0.38, 0.38);
            greenButton = game.add.button(300, 515, 'green', greenWireButton, this, 2, 1, 0);
            greenButton.scale.setTo(0.45, 0.45);
            robot = game.add.button(400, 525, 'robot', robotButton, this, 2, 1, 0);
            robot.scale.setTo(0.045, 0.045);
            water = game.add.button(500, 535, 'water', waterButton, this, 2, 1, 0);
            water.scale.setTo(0.030, 0.030);
            battery = game.add.button(600, 540, 'battery', batteryButton, this, 2, 1, 0);
            battery.scale.setTo(0.09, 0.09);
            timer.loop = true;
            timer.play();
    }

    function hintTimer()
    {
        hint = false;
    }

    function addBlackBackground()//on explosion, do this
    {
        blackBackground = game.add.sprite(0,0, 'blackBackground');
        blackBackground.scale.setTo(0.63,0.68);
        //insert lose music
        lose.play();

    }

    function addNewForest()//on win, do this
    {
        newLandscape = game.add.sprite(0,0,'newLandscape');
        caesar2 = game.add.button(620, 310, 'caesar', help, this, 2, 1, 0);
        caesar2.scale.setTo(0.5, 0.5);
        mathGuy2 = game.add.button(10, 300, 'mathGuy', mathHelp, this, 2, 1, 0);
        mathGuy2.scale.setTo(0.19, 0.19);
        //insert win music
        win.play();
    }

    function bomb2Diffusal()//used for bomb2
    {
        if(bombDiffusalAttempt===true)
        {
            if(paperVariable %2===0 || paperVariable%3===0)
                {
                    paper = game.add.button(400, 220, 'paper', hintGiven, this, 2, 1, 0);
                    paper.scale.setTo(0.05, 0.05);
                }
        bomb2DiffusalAttempt = true;
        helpRequired = false;
        mathHelpRequired = false;
        }
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

        function batteryButton()
    {
        snip.play();
        if(button2==='battery')
        {
            diffused2 = true;
        }
        else
        {
            failedDiffusal();
        }

    }

        function waterButton()
    {
        snip.play();
        if(button2==='water')
        {
            diffused2 = true;
        }
        else
        {
            failedDiffusal();
        }

    }

        function robotButton()
    {
        snip.play();
        if(button2==='robot')
        {
            diffused2 = true;
        }
        else
        {
            failedDiffusal();
        }

    }

    function failedDiffusal()
    {
        if(diffused===false || diffused2===false)
        {
        explosion.play()
        failed = true;
    }

    }


    function render() 
    {
        if(hint===true && (bombDiffusalAttempt===true && bomb2DiffusalAttempt===true))
        {
            game.debug.text('Your hint is: '+button+button2, 32, 20);
        }
        if(helpRequired===true && mathHelpRequired===false && (bombDiffusalAttempt===false || bomb2DiffusalAttempt===false))
        {
            game.debug.text('A Caesar Cipher requires the message to be moved forwards in the alphabet,', 5,20);
            game.debug.text('based upon the number. For instance, ROT1 of "hi" is "ij".', 5, 35);
        }

        if(mathHelpRequired===true && helpRequired===false && (bombDiffusalAttempt===false || bomb2DiffusalAttempt===false))
        {
            game.debug.text('In order to solve the first equation, find a value,', 5,20);
            game.debug.text('for X that allows the equation to equal zero - i.e., (x-2)=0 -> X=2', 5, 35);
        }
        if(bombDiffusalAttempt===true && bomb2DiffusalAttempt===true)
        {
            //the solution to the equation equals the letter in the message corresponding to a button.
            if((diffused===false || diffused2===false) && failed===false)
            {
              if(hint ===false)
                {  
                    game.debug.text('Diffuse the bombs in: '+game.time.events.duration, 32, 64);
                }
            if((messageNumber===1 || messageNumber===0)&& failed===false)
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

            //start bomb2 messages here, dependent upon the second random variable. Bombs must be 
            //diffused in a sequence - from right to letf. Buttons to diffuse are clicked 1, 2.

            if((filterNumber===1 || filterNumber===0) && failed===false)
            {
                game.debug.text('Message 2: xbufs', 32, 146);
                game.debug.text('Filter: (2x-2)=0', 32, 164);
                button2 = 'water';
            }
            if(filterNumber===2 && failed===false)
            {
                game.debug.text('Message 2: tqdqv', 32, 146);
                game.debug.text('Filter: (x-2)=0', 32, 164);
                button2 = 'robot';
            }
            if(filterNumber===3 && failed===false)
            {
                game.debug.text('Message 2: cbuufsz', 32, 146);
                game.debug.text('Filter: (x^4-1)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===4 && failed===false)
            {
                game.debug.text('Message 2: dcvvgta', 32, 146);
                game.debug.text('Filter: (x-2)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===5 && failed===false)
            {
                game.debug.text('Message 2: qnans', 32, 146);
                game.debug.text('Filter: (x-25)=0', 32, 164);
                button2 = 'robot';
            }
            if(filterNumber===6 && failed===false)
            {
                game.debug.text('Message 2: aexiv', 32, 146);
                game.debug.text('Filter: (x^(1/2)-2)=0', 32, 164);
                button2 = 'water';
            }
            if(filterNumber===7 && failed===false)
            {
                game.debug.text('Message 2: ycvgt', 32, 146);
                game.debug.text('Filter: (x^2-4)=0', 32, 164);
                button2 = 'water';
            }
            if(filterNumber===8 && failed===false)
            {
                game.debug.text('Message 2: fexxivc', 32, 146);
                game.debug.text('Filter: (x^3-64)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===9 && failed===false)
            {
                game.debug.text('Message 2: herej', 32, 146);
                game.debug.text('Filter: (4x-48)=0', 32, 164);
                button2 = 'robot';
            }
            if(filterNumber===10 && failed===false)
            {
                game.debug.text('Message 2: ebobg', 32, 146);
                game.debug.text('Filter: (x^2-169)=0', 32, 164);
                button2 = 'robot';
            }
            if(filterNumber===11 && failed===false)
            {
                game.debug.text('Message 2: gfyyjwd', 32, 146);
                game.debug.text('Filter: (x-5)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===12 && failed===false)
            {
                game.debug.text('Message 2: fjcna', 32, 146);
                game.debug.text('Filter: (x^2-81)=0', 32, 164);
                button2 = 'water';
            }
            if(filterNumber===13 && failed===false)
            {
                game.debug.text('Message 2: eibmz', 32, 146);
                game.debug.text('Filter: (x^(1/3)-2)=0', 32, 164);
                button2 = 'water';
            }
            if(filterNumber===14 && failed===false)
            {
                game.debug.text('Message 2: qpiitgn', 32, 146);
                game.debug.text('Filter: (x^2-225)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===15 && failed===false)
            {
                game.debug.text('Message 2: livin', 32, 146);
                game.debug.text('Filter: (x^2-400)=0', 32, 164);
                button2 = 'robot';
            }
            if(filterNumber===16 && failed===false)
            {
                game.debug.text('Message 2: gkdob', 32, 146);
                game.debug.text('Filter: (x^3-1000)=0', 32, 164);
                button2 = 'water';
            }
            if(filterNumber===17 && failed===false)
            {
                game.debug.text('Message 2: vunnyls', 32, 146);
                game.debug.text('Filter: (x^2-400)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===18 && failed===false)
            {
                game.debug.text('Message 2: vsfsx', 32, 146);
                game.debug.text('Filter: (x^2-16)=0', 32, 164);
                button2 = 'robot';
            }
            if(filterNumber===19 && failed===false)
            {
                game.debug.text('Message 2: hgzzkxe', 32, 146);
                game.debug.text('Filter: (x-6)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===20 && failed===false)
            {
                game.debug.text('Message 2: jgtgl', 32, 146);
                game.debug.text('Filter: (x-18)=0', 32, 164);
                button2 = 'robot';
            }
            if(filterNumber===21 && failed===false)
            {
                game.debug.text('Message 2: zyrrcpw', 32, 146);
                game.debug.text('Filter: (x-24)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===22 && failed===false)
            {
                game.debug.text('Message 2: khuhm', 32, 146);
                game.debug.text('Filter: (x-19)=0', 32, 164);
                button2 = 'robot';
            }
            if(filterNumber===23 && failed===false)
            {
                game.debug.text('Message 2: qunyl', 32, 146);
                game.debug.text('Filter: (x^2-400)=0', 32, 164);
                button2 = 'water';
            }
            if(filterNumber===24 && failed===false)
            {
                game.debug.text('Message 2: lpitg', 32, 146);
                game.debug.text('Filter: (x-15)=0', 32, 164);
                button2 = 'water';
            }
            if(filterNumber===25 && failed===false)
            {
                game.debug.text('Message 2: kjccnah', 32, 146);
                game.debug.text('Filter: (9x-81)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===26 && failed===false)
            {
                game.debug.text('Message 2: rqjjuho', 32, 146);
                game.debug.text('Filter: (x^2-256)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===27 && failed===false)
            {
                game.debug.text('Message 2: vzsdq', 32, 146);
                game.debug.text('Filter: (x^(1/2)-5)=0', 32, 164);
                button2 = 'water';
            }
            if(filterNumber===28 && failed===false)
            {
                game.debug.text('Message 2: ptmxk', 32, 146);
                game.debug.text('Filter: (x-19)=0', 32, 164);
                button2 = 'water';
            }
            if(filterNumber===29 && failed===false)
            {
                game.debug.text('Message 2: bylyd', 32, 146);
                game.debug.text('Filter: (x^2-100)=0', 32, 164);
                button2 = 'robot';
            }
            if(filterNumber===30 && failed===false)
            {
                game.debug.text('Message 2: axkxc', 32, 146);
                game.debug.text('Filter: (x^2-81)', 32, 164);
                button2 = 'robot';
            }
            if(filterNumber===31 && failed===false)
            {
                game.debug.text('Message 2: azssdqx', 32, 146);
                game.debug.text('Filter: (x^(1/2)-5)=0', 32, 164);
                button2 = 'battery';
            }
            if(filterNumber===32 && failed===false)
            {
                game.debug.text('Message 2: ihaalyf', 32, 146);
                game.debug.text('Filter: (x-7)=0', 32, 164);
                button2 = 'battery';
            }

        }


        }
        if(failed===true && (diffused===false || diffused2===false))
        {
            game.debug.text('You fail; game over.', 32, 114);
            timer.mute = true;
            addBlackBackground();

        }
        if(diffused===true && diffused2===true && failed===false)
        {
            game.debug.text('You win - the rainforest is saved!', 32, 114);
            timer.mute = true;
            addNewForest();
        }

    }
    
    function update() 
    {

}

};