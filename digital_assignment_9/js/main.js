window.onload = function() {   
    "use strict";
    
    var game = new Phaser.Game( 1024, 768, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image( 'grid', 'assets/grid.png', 150, 150 );//space landscape
        game.load.image('robot', 'assets/robot.png', 150, 150);
        game.load.image('treasure', 'assets/treasure.png', 150, 150);
        game.load.image('up_arrow', 'assets/up_arrow.png', 150, 150);
        game.load.image('down_arrow', 'assets/down_arrow.png', 150, 150);
        game.load.image('left_arrow', 'assets/left_arrow.png', 150, 150);
        game.load.image('right_arrow', 'assets/right_arrow.png', 150, 150);
        game.load.image('operatorRequest', 'assets/operatorRequest.png', 150, 150);








        // game.load.audio('ding', 'assets/ding.mp3');//gameplay music
        // game.load.audio('buzzer', 'assets/buzzer.mp3');
        // game.load.audio('background', 'assets/background.mp3');//winning music
        // game.load.audio('lose', 'assets/lose.mp3');//losing music
    }
    
var positionTreasureX = Math.floor(Math.random()*900)+1;
var positionTreasureY = Math.floor(Math.random()*600)+1;
var positionRobotX = Math.floor(Math.random()*900)+1;
var positionRobotY = Math.floor(Math.random()*600)+1;
var distanceX = positionTreasureX-positionRobotX;
var distanceY = positionTreasureY-positionRobotY;
var distanceRequests = 5;
var operatorRequest;
var grid;
var robot;
var treasure;
var up_arrow;
var down_arrow;
var left_arrow;
var right_arrow;
var distance;
var moves = 15;
var close = false;
var win = false;
var failed = false;
var completionTime = 0;
var gameTimer;





    
    function create() {


        // ding = game.add.audio('ding');
        // buzzer = game.add.audio('buzzer');
        // background = game.add.audio('background');
        // game.time.events.add(Phaser.Timer.SECOND*(120), failedAction, this);
        grid = game.add.sprite(0, 0, 'grid');
        robot = game.add.sprite(positionRobotX, positionRobotY, 'robot');
        robot.scale.setTo(0.1, 0.1);
        treasure = game.add.sprite(positionTreasureX, positionTreasureY, 'treasure');
        treasure.scale.setTo(0.25, 0.25);
        // textType = { font: "bold 16px Times New Roman", fill: "#fff"};
        up_arrow = game.add.button(375, 710, 'up_arrow', upFunction, this, 2, 1, 0);
        up_arrow.scale.setTo(0.08, 0.08);
        down_arrow = game.add.button(450, 710, 'down_arrow', downFunction, this, 2, 1, 0);
        down_arrow.scale.setTo(0.08, 0.08);
        left_arrow = game.add.button(525, 710, 'left_arrow', leftFunction, this, 2, 1, 0);
        left_arrow.scale.setTo(0.08, 0.08);
        right_arrow = game.add.button(600, 710, 'right_arrow', rightFunction, this, 2, 1, 0);
        right_arrow.scale.setTo(0.08, 0.08);
        operatorRequest = game.add.button(675, 710, 'operatorRequest', distanceRequest, this, 2, 1, 0);
        operatorRequest.scale.setTo(0.1, 0.1);
        gameTimer = game.time.create(false);
        gameTimer.loop(1000, loopControl, this);
        gameTimer.start();


        //background.play();
    }

    function loopControl()
    {
        completionTime++;
    }

    function upFunction()
    {
        //decrease distanceY by 50.
        distanceY+=50;
        moves-=1;
        if(failed===true)
        {
            up_arrow.inputEnabled = false;

        }

    }

    function downFunction()
    {
        //increase distanceY by 50.
        distanceY-=50;
        moves-=1;
        if(failed===true)
        {
            down_Arrow.inputEnabled = false;

        }

    }

    function leftFunction()
    {
        //decrease distanceX by 50.
        distanceX+=50;
        moves-=1;
        if(failed===true)
        {
            left_arrow.inputEnabled = false;

        }

    }

    function rightFunction()
    {   
        //increase distanceX by 50.
        distanceX-=50;
        moves-=1;
        if(failed===true)
        {
            right_arrow.inputEnabled = false;

        }
        
    }

    function distanceRequest()
    {
        if(distanceRequests>0)
        {
        distance = true; //controls whether or not the distance is shown.
        distanceRequests-=1;
        game.time.events.add(Phaser.Timer.SECOND*(5), distanceTimer, this);
        }


    }

    function distanceTimer()
    {
        //controls the distance boolean.
        distance = false;
    }

    function failedAction()
    {
    failed = true;
    buzzer.play();


    }

    function render()
    {
        //if distance===true, show the distance. The timer will only allow a distance to be shown for 5 seconds.
        //utilize distanceX and distanceY to show the distance between the robot and the treasure.
        //if distanceX and distanceY between the robot and the treasure are <50, the player has discovered
        //the treasure, and has won the game.
        if(distance===true && distanceRequests >0)
        {
            game.debug.text('The treasure is '+distanceX+' meters away (X), and '+distanceY+' meters away (Y)', 32, 16);
        }
        if(distance===false)
        {
            game.debug.text(' ', 32, 16);
        }
        if(distanceX <50 && distanceY<50)
        {

            gameTimer.stop();
            win = true;
            distance = false;
            game.debug.text('You located the treasure in '+completionTime+' seconds.', 32, 16);

        }
        if(failed===true || moves===0)
        {
            distance = false;
            game.debug.text('You did not locate the treasure.', 32, 16);
        }

    }


    
    function update() 
    {

    }
      
};