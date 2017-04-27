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
        game.load.image('failedImage', 'assets/failedImage.png', 150, 150);
        game.load.image('successImage', 'assets/successImage.png', 150, 150);
        game.load.image('background', 'assets/directions.png', 150, 150);
        game.load.image('arms', 'assets/arms.png', 150, 150);
        game.load.image('clock', 'assets/clock.png', 150, 150);
        game.load.image('splash', 'assets/splash.png', 150, 150);
        game.load.image('easy', 'assets/easy.png', 150, 150);
        game.load.image('hard', 'assets/hard.png', 150, 150);
        game.load.image('hardGrid', 'assets/hardGrid.png', 150, 150);
        game.load.image('moveUp', 'assets/moveUp.png', 150, 150);
        game.load.image('sonarUp', 'assets/sonarUp.png', 150, 150);

        game.load.audio('ding', 'assets/ding.mp3');//whoosh
        game.load.audio('buzzer', 'assets/buzzer.mp3');
        game.load.audio('sonar', 'assets/sonar.mp3');
        game.load.audio('servo', 'assets/servo.mp3');
        game.load.audio('move', 'assets/move.mp3');
        game.load.audio('backgroundMusic', 'assets/background.mp3');//winning music
        //game.load.audio('lose', 'assets/lose.mp3');//losing music
    }
    
var positionTreasureX = Math.floor(Math.random()*500)+100;
var positionTreasureY = Math.floor(Math.random()*300)+1;
var positionRobotX = Math.floor(Math.random()*500)+100;
var positionRobotY = Math.floor(Math.random()*300)+1;
var positionClockX = Math.floor(Math.random()*500)+100;
var positionClockY = Math.floor(Math.random()*300)+1;
var positionMovesX = Math.floor(Math.random()*500)+100;
var positionMovesY = Math.floor(Math.random()*300)+1;
var positionSonarX = Math.floor(Math.random()*500)+100;
var positionSonarY = Math.floor(Math.random()*300)+1;
var distanceX = positionTreasureX-positionRobotX;
var distanceY = positionTreasureY-positionRobotY;
var distanceSonarX = positionSonarX-positionRobotX;
var distanceSonarY = positionSonarY-positionRobotY;
var distanceClockX = positionClockX-positionRobotX;
var distanceClockY = positionClockY-positionRobotY;
var distanceMovesX = positionMovesX-positionRobotX;
var distanceMovesY = positionMovesY-positionRobotY;
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
var moves = 22;
var win = false;
var failed = false;
var completionTime = 0;
var failedImage;
var successImage;
var read = false;
var robotSkip;
var background;
var gameTimer = 0;
var arms;
var robotArms;
var ding;
var buzzer;
var background;
var backgroundMusic;
var deactivate = false;
var sonar;
var servo;
var move;
var played = false;
var winLine1;
var winLine2;
var lossLine1;
var lossLine2;
var textType;
var clock;
var currentX = 0;
var currentY = 0;
var splash;
var difficultySelected;
var easyGame;
var hardGame;
var easy;
var hard;
var hardGrid;
var movesIncrease;
var sonarIncrease;



    
    function create() {

        game.time.events.add(Phaser.Timer.SECOND*(6), directions, this);
        ding = game.add.audio('ding');
        buzzer = game.add.audio('buzzer');
        backgroundMusic = game.add.audio('backgroundMusic');
        sonar = game.add.audio('sonar');
        servo = game.add.audio('servo');
        move = game.add.audio('move');
        //whoosh for movement, bell ding for directions and win, servo for robot arm, sonar ping for sonar, and buzzer for loss.
        //lose = game.add.audio('lose');
        // game.time.events.add(Phaser.Timer.SECOND*(120), failedAction, this);

        // read = true;
        // background = game.add.sprite(0, 0, 'background');
        // robotSkip = game.add.button(425, 440, 'robot', gameStart, this, 2, 1, 0);
        // robotSkip.scale.setTo(0.2, 0.2);
        textType = { font: "bold 22px Times New Roman", fill: "#fff"};
        splash = game.add.sprite(0, 0, 'splash');
        loadingText = game.add.text(435, 700, "Loading...", textType);
        //select difficulty for game - dictates currents.




        //background.play();
    }

    function directions()
    {

            read = true;
        background = game.add.sprite(0, 0, 'background');
        easyGame = game.add.button(425, 350, 'easy', gameStartEasy, this, 2, 1, 0);
        easyGame.scale.setTo(0.7, 0.7);
        hardGame = game.add.button(435, 500, 'hard', gameStartHard, this, 2, 1, 0);
        hardGame.scale.setTo(0.15, 0.15);
        textType = { font: "bold 22px Times New Roman", fill: "#fff"};

    }

    function gameStartEasy()
    {

        read = false;
        easyGame.inputEnabled = false;
        hardGame.inputEnabled = false;
        ding.play();
        difficultySelected = 0;
        begin();
        
    }

    function gameStartHard()
    {

        read = false;
        easyGame.inputEnabled = false;
        hardGame.inputEnabled = false;
        currentX = Math.floor(Math.random()*10)+1;
        currentY = Math.floor(Math.random()*10)+1;
        difficultySelected = 1;
        ding.play();
        begin();

    }

    function begin()
    {
        gameTimer = game.time.create(false);
        gameTimer.loop(1000, loopControl, this);
        gameTimer.start();
        backgroundMusic.play();
        if(difficultySelected===0)
        {
        grid = game.add.sprite(0, 0, 'grid');
        }
        if(difficultySelected===1)
        {
            grid = game.add.sprite(0,0, 'hardGrid');
            movesIncrease = game.add.sprite(positionMovesX, positionMovesY, 'moveUp');
            movesIncrease.scale.setTo(0.2, 0.2);
            sonarIncrease = game.add.sprite(positionSonarX, positionSonarY, 'sonarUp');
            sonarIncrease.scale.setTo(0.1, 0.1);
        }
        // game.time.events.add(Phaser.Timer.SECOND *(120), failedAction, this);
        robot = game.add.sprite(positionRobotX, positionRobotY, 'robot');
        robot.scale.setTo(0.1, 0.1);
        treasure = game.add.sprite(positionTreasureX, positionTreasureY, 'treasure');
        treasure.scale.setTo(0.25, 0.25);

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
        robotArms = game.add.button(300, 710, 'arms', armsDeployed, this, 2, 1, 0);
        robotArms.scale.setTo(0.20, 0.20);
        clock = game.add.sprite(positionClockX, positionClockY, 'clock');
        clock.scale.setTo(0.015, 0.015);
    }

    function loopControl()
    {
        completionTime++;
        if(completionTime%10===0 && difficultySelected ===1)
        {
            positionRobotX-=currentX;
            positionRobotY-=currentY;
            positionTreasureX+=currentX;
            positionTreasureY+=currentY;
            positionClockX+=currentX;
            positionClockY+=currentY;
            distanceX = positionTreasureX-positionRobotX;
            distanceY = positionTreasureY-positionRobotY;
            distanceClockX = positionClockX-positionRobotX;
            distanceClockY = positionClockY-positionRobotY;

        }
    }

    function upFunction()
    {
        if(deactivate===false)
        {
        //decrease distanceY by 50.
        move.play();
        distanceY+=50;
        distanceClockY+=50;
        moves-=1;
    }
        if(deactivate === true)
        {
            up_arrow.inputEnabled = false;

        }

    }

    function downFunction()
    {
        if(deactivate===false)
        {
        //increase distanceY by 50.
        move.play();
        distanceY-=50;
        distanceClockY-=50;
        moves-=1;
    }
        if(deactivate===true)
        {
            down_arrow.inputEnabled = false;

        }

    }

    function leftFunction()
    {
        if(deactivate===false)
        {
        //decrease distanceX by 50.
        move.play();
        distanceX+=50;
        distanceClockX+=50;
        moves-=1;
    }
        if(deactivate===true)
        {
            left_arrow.inputEnabled = false;

        }

    }

    function rightFunction()
    {   
        if(deactivate===false)
        {
        //increase distanceX by 50.
        move.play();
        distanceX-=50;
        distanceClockX-=50;
        moves-=1;
    }
        if(deactivate===true)
        {
            right_arrow.inputEnabled = false;

        }
        
    }

    function distanceRequest()
    {
        if(deactivate===true || distanceRequests===0)
        {
            operatorRequest.inputEnabled = false;

        }
        if(difficultySelected===1)
        {
            moves-=1;
        }
        if(deactivate===false)
        {
        if(distanceRequests>0)
        {
            sonar.play();//placeholder - add in sonar sound.
        distance = true; //controls whether or not the distance is shown.
        distanceRequests-=1;
        game.time.events.add(Phaser.Timer.SECOND*(5), distanceTimer, this);
        }
}

    }

    function armsDeployed()
    {
        if(deactivate===true)
        {
            robotArms.inputEnabled = false;

        }
        if(difficultySelected===1)
        {
            moves-=1;
        }
        if(deactivate===false && Math.abs(distanceY)<30 && Math.abs(distanceX)<30)//fix, because there are negatives
        {
            gameTimer.stop();
            //servo.play();
            win = true;
            distance = false;
            successImage = game.add.sprite(0, 0, 'successImage');
            ding.play();
            successImage.scale.setTo(0.5, 0.5);
            robotArms.destroy();
    }
        if(deactivate===false && Math.abs(distanceClockY)<30 && Math.abs(distanceClockX)<30)//fix, because there are negatives
        {
            // gameTimer.stop();
            // //servo.play();
            // win = true;
            // distance = false;
            // successImage = game.add.sprite(0, 0, 'successImage');
            ding.play();
            // successImage.scale.setTo(0.5, 0.5);
            // robotArms.destroy();
            if(completionTime>15)
            {
            completionTime-=15;
        }
        if(completionTime<15)
        {
            completionTime=0;
        }
    }
            if(deactivate===false && Math.abs(distanceMovesX)<30 && Math.abs(distanceMovesY)<30)//fix, because there are negatives
        {
            // gameTimer.stop();
            // //servo.play();
            // win = true;
            // distance = false;
            // successImage = game.add.sprite(0, 0, 'successImage');
            ding.play();
            // successImage.scale.setTo(0.5, 0.5);
            // robotArms.destroy();
            moves+=10;
    }
                if(deactivate===false && Math.abs(distanceSonarX)<30 && Math.abs(distanceSonarY)<30)//fix, because there are negatives
        {
            // gameTimer.stop();
            // //servo.play();
            // win = true;
            // distance = false;
            // successImage = game.add.sprite(0, 0, 'successImage');
            ding.play();
            // successImage.scale.setTo(0.5, 0.5);
            // robotArms.destroy();
            distanceRequests+=5;
    }
    if(win===false && clocked===false)
    {
        failedAction();
    }

    }

    function distanceTimer()
    {
        //controls the distance boolean.
        distance = false;
    }

    function failedAction()
    {
    failedImage = game.add.sprite(0, 0, 'failedImage');
    failed = true;
    deactivate = true;
    backgroundMusic.mute = true;
    buzzer.play();
    robotArms.destroy();
    up_arrow.destroy();
down_arrow.destroy();
left_arrow.destroy();
right_arrow.destroy();
operatorRequest.destroy();
played = true;


    }

    function render()
    {
        //if distance===true, show the distance. The timer will only allow a distance to be shown for 5 seconds.
        //utilize distanceX and distanceY to show the distance between the robot and the treasure.
        //if distanceX and distanceY between the robot and the treasure are <50, the player has discovered
        //the treasure, and has won the game.
        if(difficultySelected===0)
        {
        if(completionTime >130 && played===false)
        {
            failedAction();
            

        }
    }
            if(difficultySelected===1)
        {
        if(completionTime >70 && played===false)
        {
            failedAction();
            

        }
    }
        if(moves<1 && played===false)
        {
            failedAction();
            

        }
        if(played===true)
        {
            // game.debug.text('You did not locate the treasure.', 32, 16);
            lossLine1 = game.add.text(32, 32, "You did not locate the treasure.", textType);
        }
        if(distance===false || read===false)
        {
            game.debug.text(' ', 32, 16);
        }

        if(win===true)
        {
            distance = false;

            // game.debug.text('You located the treasure in '+completionTime+' seconds.', 32, 16);
            // game.debug.text('You utilized '+(22-moves)+' moves.', 32, 32);
            winLine1 = game.add.text(32, 32, "You located the treasure in "+completionTime+" seconds, ", textType);
            winLine2 = game.add.text(32, 56, "You utilized "+(22-moves)+" moves.", textType);
            deactivate = true;
            backgroundMusic.mute = true;
        }

        if(read===true)
        {
    game.debug.text('You robot is randomly placed on the sea floor, and is looking for treasure.', 32, 16);
                game.debug.text('The initial position of the treasure is given on the grid...', 32, 36);
    game.debug.text('but this is only the initial position. Use the SONAR Operator to give text', 32, 56);
    game.debug.text('updates as to your relative position to the treasure. You can only use ', 32, 76);
    game.debug.text('SONAR five times, and you only have 22 moves (and two minutes of battery),', 32, 96);
    game.debug.text('so move quickly, and choose your position updates wisely - each 50 pixel move corresponds to ', 32, 116);
                game.debug.text('1.67 meters in that direction. Once you are within 1 meter (30 px) of the treasure, deploy', 32, 136);
    game.debug.text('the robot arms to pick up the treasure. Be careful to only activate the ', 32, 156);
    game.debug.text('arms when you are within 1 meter of the treasure - they may get snagged ', 32, 176);
    game.debug.text('on the ocean floor and trap your robot for distances greater than 1 meter (30px).', 32, 196);
    game.debug.text('Note: This version of SONAR software displays distance measurements in pixels.', 32, 256);
        game.debug.text('A positive distance reading indicates right/down (x/y), and a negative reading, the inverse.', 32, 276);

        game.debug.text('Click the robot below to proceed, once you are comfortable with these directions.', 32, 316);
        }
        if(distance===true && distanceRequests >0)
        {
            game.debug.text('The treasure is '+distanceX+' px away (X), and '+distanceY+' px away (Y)', 32, 16);
            game.debug.text('The clock is '+distanceClockX+' px away (X), and '+distanceClockY+' px away (Y)', 32, 32);
        }

        // if(failed===true || moves<1)
        // {
        //     distance = false;
        //     deactivate = true;
        //     up_arrow.destroy();
        //     down_arrow.destroy();
        //     left_arrow.destroy();
        //     right_arrow.destroy();
        //     operatorRequest.destroy();
            
        // }

    }


    
    function update() 
    {

    }
      
};