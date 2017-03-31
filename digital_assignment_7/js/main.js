window.onload = function() {   
    "use strict";
    
    var game = new Phaser.Game( 946, 532, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image( 'jail', 'assets/jail.jpg', 150, 150 );//space landscape
        game.load.image('toilet', 'assets/box.png', 150, 150);
        game.load.image('sink', 'assets/box.png', 150, 150);
        game.load.image('bars', 'assets/box.png', 150, 150);
        game.load.image('bed', 'assets/box.png', 150, 150);
        game.load.image('pillow', 'assets/box.png', 150, 150);
        game.load.image('right_s', 'assets/box.png', 150, 150);
        game.load.image('left_s', 'assets/box.png', 150, 150);




        game.load.audio('ding', 'assets/ding.mp3');//gameplay music
        game.load.audio('buzzer', 'assets/buzzer.mp3');
        game.load.audio('background', 'assets/background.mp3');//winning music
        // game.load.audio('lose', 'assets/lose.mp3');//losing music
    }
    
    var jail;
    var toilet;
    var sink;
    var bars;
    var bed;
    var pillow;
    var right_s;
    var left_s;
    var questionNumber = Math.floor(Math.random()*28+1);
    var AI_number = Math.floor(Math.random()*35+15);
    var saved = false;
    var failed = false;
    var ding;
    var buzzer;
    var background;
    var button;
    var questionsAnswered = 0;
    var guardsComing;
    var success = false;



    
    function create() {

        game.time.events.add(Phaser.Timer.SECOND*(AI_number), guardsComing, this);
        jail = game.add.sprite(0,0,'jail');
        toilet = game.add.button(250, 85, 'toilet', toilet_button, this, 2, 1, 0);
        toilet.scale.setTo(0.175, 0.175);
        sink = game.add.button(150, 260, 'sink', sink_button, this, 2, 1, 0);
        sink.scale.setTo(0.175, 0.175);
        bars = game.add.button(800, 260, 'bars', bars_button, this, 2, 1, 0);
        bars.scale.setTo(0.175, 0.175);
        bed = game.add.button(720, 100, 'bed', bed_button, this, 2, 1, 0);
        bed.scale.setTo(0.2, 0.2);
        pillow = game.add.button(430, 100, 'pillow', pillow_button, this, 2, 1, 0);
        pillow.scale.setTo(0.10, 0.10);
        right_s = game.add.button(610, 380, 'right_s', right_shelf, this, 2, 1, 0);
        left_s = game.add.button(470, 350, 'left_s', left_shelf, this, 2, 1, 0);
        right_s.scale.setTo(0.175, 0.175);
        left_s.scale.setTo(0.175, 0.175);
        ding = game.add.audio('ding');
        buzzer = game.add.audio('buzzer');
        background = game.add.audio('background');
        background.play();
    }

    function guardsComing()
    {
        background.mute = true;
        failed = true;
    }


        function toilet_button()
    {
        if(button==='toilet')
        {
            questionsAnswered+=1;
            questionNumber+=7;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }


    }

    function sink_button()
    {
        if(button==='sink')
        {
            questionsAnswered+=1;
            questionNumber+=7;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }

    }

        function bars_button()
    {
        if(button==='bars')
        {
            questionsAnswered+=1;
            questionNumber+=7;
            ding.play();
        }
        else
        {
            buzzer.play()
            failedAction();
        }


    }

        function bed_button()
    {
        if(button==='bed')
        {
            questionsAnswered+=1;
            questionNumber+=7;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }


    }

        function pillow_button()
    {
        if(button==='pillow')
        {
            questionsAnswered+=1;
            questionNumber+=7;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }


    }


    function right_shelf()
    {
        if(button==='right_s')
        {
            questionsAnswered+=1;
            questionNumber+=7;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }

    }

    function left_shelf()
    {
        if(button==='left_s')
        {
            questionsAnswered+=1;
            questionNumber+=7;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }


    }

    function failedAction()
    {
    background.mute = true;
    failed= true;
    }

    function render()
    {
    if(failed===true && success===false)
    {
    background.mute = true;
    game.debug.text('You fail; game over.', 32, 96);
    
    //lose sound
    }
    if(questionsAnswered===2 && failed===false)
    {
        game.debug.text('You and your partner escaped!', 32, 96);
        success = true;
        background.mute = true;
        //win sound
    }
      if(failed===false && questionsAnswered<=1)
      {
        game.debug.text('Guards will arrive in: '+AI_number+' seconds.', 32, 64);
      if((questionNumber===1 || questionNumber===0) && failed===false)
            {
            game.debug.text('snk ur teeth n2 this', 32, 32);
            button = 'sink';//good

            }
            if(questionNumber===2&& failed===false)
            {
            game.debug.text('food not sitting well', 32, 32);
            button = 'toilet';//good
            }
            if(questionNumber===3&& failed===false)
            {
            game.debug.text('feathers', 32, 32);
            button = 'pillow';//good
            }
            if(questionNumber===4 && failed===false)
            {
            game.debug.text('early day tmrw', 32, 32);
            button = 'bed';//good
            }
            if(questionNumber===5&& failed===false)
            {
            game.debug.text('all drs lkkd', 32, 32);
            button = 'bars';//good
            }
            if(questionNumber===6 && failed===false)
            {
            game.debug.text('if ur nt right, ur...', 32, 32);
            button = 'left_s';//good
            }
            if(questionNumber===7 && failed===false)
            {
            game.debug.text('if ur not wrong, ur...', 32, 32);
            button = 'right_s';//good
            }
            if(questionNumber===8 && failed===false)
            {
            game.debug.text('wsh_ur_hndz', 32, 32);
            button = 'sink';//good
            }
            if(questionNumber===9 && failed===false)
            {
            game.debug.text('too much sauce', 32, 32);
            button = 'toilet'//good
            }
            if(questionNumber===10 && failed===false)
            {
            game.debug.text('lay ur hd dwn', 32, 32);
            button = 'pillow';
            }
            if(questionNumber===11 && failed ===false)
            {
            game.debug.text('clean sheets', 32, 32);
            button = 'bed';//good
            }
            if(questionNumber===12 && failed===false)
            {
               game.debug.text('clank', 32, 32);
               button = 'bars'; 

            }
            if(questionNumber===13 && failed===false)
            {
               game.debug.text('turn right 4 times', 32, 32);
               button = 'left_s'; 

            }
            if(questionNumber===14 && failed===false)
            {
               game.debug.text('turn left 4 times', 32, 32);
               button = 'right_s'; 

            }
            if(questionNumber===15 && failed===false)
            {
               game.debug.text('out of soap', 32, 32);
               button = 'sink'; 

            }
            if(questionNumber===16 && failed===false)
            {
               game.debug.text('flush', 32, 32);
               button = 'toilet'; 

            }
            if(questionNumber===17 && failed===false)
            {
               game.debug.text('plw fight', 32, 32);
               button = 'pillow'; 

            }
            if(questionNumber===17 && failed===false)
            {
               game.debug.text('nap tm', 32, 32);
               button = 'bed'; 

            }
            if(questionNumber===18 && failed===false)
            {
               game.debug.text('iron', 32, 32);
               button = 'bars'; 

            }
            if(questionNumber===19 && failed===false)
            {
               game.debug.text('all ur stuff is lft', 32, 32);
               button = 'left_s'; 

            }
            if(questionNumber===20 && failed===false)
            {
               game.debug.text('ur on th rght trk', 32, 32);
               button = 'right_s'; 

            }

            if(questionNumber===21 && failed===false)
            {
               game.debug.text('wttr hot', 32, 32);
               button = 'sink'; 

            }
            if(questionNumber===22 && failed===false)
            {
               game.debug.text('have a seat', 32, 32);
               button = 'toilet'; 

            }
            if(questionNumber===23 && failed===false)
            {
               game.debug.text('head', 32, 32);
               button = 'pillow'; 

            }
            if(questionNumber===24 && failed===false)
            {
               game.debug.text('blanket', 32, 32);
               button = 'bed'; 

            }
            if(questionNumber===25 && failed===false)
            {
               game.debug.text('rusty', 32, 32);
               button = 'bars'; 

            }
            if(questionNumber===26 && failed===false)
            {
               game.debug.text('lwr shlf', 32, 32);
               button = 'left_s'; 

            }
            if(questionNumber===27 && failed===false)
            {
               game.debug.text('uppr shlf', 32, 32);
               button = 'right_s'; 

            }
            if(questionNumber===28 && failed===false)
            {
               game.debug.text('drain pipes', 32, 32);
               button = 'sink'; 

            }
            if(questionNumber===29 && failed===false)
            {
               game.debug.text('porcelain', 32, 32);
               button = 'toilet'; 

            }
            if(questionNumber===30 && failed===false)
            {
               game.debug.text('sft hed', 32, 32);
               button = 'pillow'; 

            }
            if(questionNumber===31 && failed===false)
            {
               game.debug.text('mttrs', 32, 32);
               button = 'bed'; 

            }
            if(questionNumber===32 && failed===false)
            {
               game.debug.text('drz', 32, 32);
               button = 'bars'; 

            }
            if(questionNumber===33 && failed===false)
            {
               game.debug.text('wll lw', 32, 32);
               button = 'left_s'; 

            }
            if(questionNumber===34 && failed===false)
            {
               game.debug.text('wll hi', 32, 32);
               button = 'right_s'; 
        }
    }

    }



    
    function update() 
    {

    }
      
};