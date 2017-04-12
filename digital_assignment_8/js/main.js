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
        game.load.image('solitary', 'assets/solitary.gif', 150, 150);
        game.load.image('escaped', 'assets/escape.png', 150, 150);
        game.load.image('initial', 'assets/initial.png', 150, 150);//payphone scene
        game.load.image('phone', 'assets/box.png', 150, 150);//payphone icon
        game.load.image('replay', 'assets/replay.png', 150, 150);//payphone icon
        game.load.image('splash', 'assets/splash.png', 150, 150);//payphone icon
        game.load.image('loading', 'assets/loading.gif', 150, 150);//payphone icon
        game.load.image('directions', 'assets/directions.png', 150, 150);
        game.load.image('skip', 'assets/skip.png', 150, 150);







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
    var questionNumber = Math.floor(Math.random()*17+1);
    var AI_number = Math.floor(Math.random()*75+15);
    var saved = false;
    var failed = false;
    var ding;
    var buzzer;
    var background;
    var button1;
    var button2;
    var questionsAnswered = 0;
    var guardsComing;
    var success = false;
    var solitary;
    var escaped;
    var initial;
    var phone;
    var displayRiddle;
    var button3;
    var replay;
    var loading;
    var splashScreen;
    var splash = true;
    var buzzerCount = 0;
    var directions;
    var skipDirections;
    var read = false;



    
    function create() {

        // game.time.events.add(Phaser.Timer.SECOND*(AI_number), failedAction, this);
        // jail = game.add.sprite(0,0,'jail');
        // toilet = game.add.button(250, 85, 'toilet', toilet_button, this, 2, 1, 0);
        // toilet.scale.setTo(0.12, 0.12);
        // sink = game.add.button(150, 260, 'sink', sink_button, this, 2, 1, 0);
        // sink.scale.setTo(0.12, 0.12);
        // bars = game.add.button(800, 260, 'bars', bars_button, this, 2, 1, 0);
        // bars.scale.setTo(0.175, 0.175);
        // bed = game.add.button(720, 100, 'bed', bed_button, this, 2, 1, 0);
        // bed.scale.setTo(0.2, 0.2);
        // pillow = game.add.button(430, 100, 'pillow', pillow_button, this, 2, 1, 0);
        // pillow.scale.setTo(0.10, 0.10);
        // right_s = game.add.button(610, 380, 'right_s', right_shelf, this, 2, 1, 0);
        // left_s = game.add.button(470, 350, 'left_s', left_shelf, this, 2, 1, 0);
        // right_s.scale.setTo(0.12, 0.12);
        // left_s.scale.setTo(0.12, 0.12);
        questionsAnswered = 0;
        failed = false;
        escaped = false;
        success = false;
        ding = game.add.audio('ding');
        buzzer = game.add.audio('buzzer');
        background = game.add.audio('background');
        game.time.events.add(Phaser.Timer.SECOND*(6), directions, this);
        splashScreen = game.add.sprite(0, 0, 'splash');
        loading = game.add.sprite(350, 300, 'loading');
        //background.play();
    }

    function guardsComing()
    {
        failed = true;

    }

    function directions()
    {
        read = true;
        directions = game.add.sprite(0, 0, 'directions');
        skipDirections = game.add.button(400, 440, 'skip', phoneBooth, this, 2, 1, 0);
        skipDirections.scale.setTo(0.05, 0.05);
    }

    function phoneBooth()
    {
        skipDirections.inputEnabled = false;
        ding.play();
        splash = false;
        read = false;
        displayRiddle = true;
        initial = game.add.sprite(0, 0, 'initial');
        initial.scale.setTo(0.95, 0.70);
        phone = game.add.button (400, 35, 'phone', callMade, this, 2, 1, 0);
        phone.scale.setTo(0.45, 1.5);

    }

    function replayAction()
    {
        replay.inputEnabled = false;
        buzzerCount = 0;
        questionsAnswered = 0;
        failed = false;
        escaped = false;
        success = false;
        displayRiddle = true;
        AI_number = Math.floor(Math.random()*75+15);
        questionNumber = Math.floor(Math.random()*17+1);
        initial = game.add.sprite(0, 0, 'initial');
        initial.scale.setTo(0.95, 0.70);
        phone = game.add.button (400, 35, 'phone', callMade, this, 2, 1, 0);
        phone.scale.setTo(0.45, 1.5);
        
        
    }

    function callMade()
    {
        phone.inputEnabled = false;
        background.play();
        displayRiddle = false;
        game.time.events.add(Phaser.Timer.SECOND*(AI_number), failedAction, this);
        jail = game.add.sprite(0,0,'jail');
        toilet = game.add.button(250, 85, 'toilet', toilet_button, this, 2, 1, 0);
        toilet.scale.setTo(0.12, 0.12);
        sink = game.add.button(150, 260, 'sink', sink_button, this, 2, 1, 0);
        sink.scale.setTo(0.12, 0.12);
        bars = game.add.button(850, 260, 'bars', bars_button, this, 2, 1, 0);
        bars.scale.setTo(0.05, 0.1);
        bed = game.add.button(670, 100, 'bed', bed_button, this, 2, 1, 0);
        bed.scale.setTo(0.2, 0.08);
        pillow = game.add.button(430, 100, 'pillow', pillow_button, this, 2, 1, 0);
        pillow.scale.setTo(0.10, 0.10);
        right_s = game.add.button(610, 380, 'right_s', right_shelf, this, 2, 1, 0);
        left_s = game.add.button(470, 350, 'left_s', left_shelf, this, 2, 1, 0);
        right_s.scale.setTo(0.12, 0.12);
        left_s.scale.setTo(0.12, 0.12);


    }


        function toilet_button()
    {
        if(success===false && failed===false)
        {
        if(button1==='toilet' || button2==='toilet' || button3==='toilet') 
        {
            if(success===false && failed===false)
            questionsAnswered+=1;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }
    }

toilet.inputEnabled = false;
    }

    function sink_button()
    {
        if(success===false && failed===false)
        {
        if(button1==='sink' || button2==='sink' || button3==='sink')
        {
            questionsAnswered+=1;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }
    }
sink.inputEnabled = false;

    }

        function bars_button()
    {
        if(success===false && failed===false)
        {
        if(button1==='bars' || button2==='bars' || button3==='bars')
        {
            questionsAnswered+=1;
            ding.play();
        }
        else
        {
            buzzer.play()
            failedAction();
        }
    }

bars.inputEnabled = false;
    }

        function bed_button()
    {
        if(success===false && failed===false)
        {
        if(button1==='bed' || button2==='bed' || button3==='bed')
        {
            questionsAnswered+=1;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }
    }
bed.inputEnabled = false;

    }

        function pillow_button()
    {
        if(success===false && failed===false)
        {
        if(button1==='pillow' || button2==='pillow' || button3==='pillow')
        {
            questionsAnswered+=1;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }


    }
    pillow.inputEnabled = false;
}


    function right_shelf()
    {
        if(success===false && failed===false)
        {
        if(button1==='right_s' || button2==='right_s' || button3==='right_s')
        {
            questionsAnswered+=1;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }

    }
    right_s.inputEnabled = false;
}

    function left_shelf()
    {
        if(success===false && failed===false)
        {
        if(button1==='left_s' || button2==='left_s' || button3==='left_s')
        {
            questionsAnswered+=1;
            ding.play();
        }
        else
        {
            buzzer.play();
            failedAction();
        }


    }
    left_s.inputEnabled = false;
}

    function failedAction()
    {
    if(buzzerCount===0)
    {
    buzzer.play();
    failed= true;
    buzzerCount+=1;
    }

    }

    function render()
    {
        if(read===true)
        {
    game.debug.text('Begin with two players sitting opposite one another, the computer in the middle.', 32, 16);
                game.debug.text('Player 1:', 32, 32);
    game.debug.text('Computer facing P1: Memorize the riddles, and click the phone booth to call Player 2.', 32, 64);
    game.debug.text('Once the call is made, turn the computer to face only Player 2. Allow Player 2 to ', 32, 80);
    game.debug.text('ask "yes" or "no" questions, without the words "bed", "sink" "shelf", "toilet", "bars",', 32, 96);
    game.debug.text('or "pillow", or synonyms. Answer all questions before time runs out.', 32, 112);
                game.debug.text('Player 2:', 32, 144);
    game.debug.text('Computer facing P2: Ask Player 1 questions regarding the riddles.', 32, 160);
    game.debug.text('Select either the bed, sink, left/right shelf, pillow, or toilet as answers.', 32, 176);
    game.debug.text('Answer correctly, and escape. Answer incorrectly, and be sent to solitary confinement.', 32, 192);
        game.debug.text('Click the green check mark below to proceed, once you understand these directions.', 32, 300);
        }
    if(failed===true && success===false && splash === false)
    {

    background.mute = true;
    game.debug.text('Player 2:', 32, 32);
    game.debug.text('You were discovered! 25 days in solitary confinement!', 32, 64);
    solitary = game.add.sprite(0,0,'solitary');
    solitary.scale.setTo(0.65, 0.87);
    replay = game.add.button (25, 450, 'replay', replayAction, this, 2, 1, 0);
    replay.scale.setTo(0.15, 0.15);
    
    //lose sound
    }

    // if(questionsAnswered===0)
    // {
    //     game.debug.text('Player 1: ', 32, 15);
    // }

    //     if(questionsAnswered===1)
    // {
    //     game.debug.text('Player 2: ', 32, 15);
    // }
    if(questionsAnswered===3 && failed===false && splash===false)
    {
        background.mute = true;
        game.debug.text('Player 2:', 32, 32);
        game.debug.text('You escaped!', 32, 64);
        success = true;
        escaped = game.add.sprite(0,0,'escaped');
        escaped.scale.setTo(1, 1);
        replay = game.add.button (25, 450, 'replay', replayAction, this, 2, 1, 0);
        replay.scale.setTo(0.15, 0.15);

        
        //win sound
    }
    if(displayRiddle===false && failed===false && success===false && splash === false)
    {
    game.debug.text('Player 2:', 32, 16);
    game.debug.text('Guards will arrive in: '+AI_number+' seconds.', 32, 32);

    }
      if(failed===false && displayRiddle===true)
      {
        game.debug.text('Player 1:', 32, 16);
      if((questionNumber===1 || questionNumber===0) && failed===false)
            {
            game.debug.text('snk ur teeth n2 this', 32, 32);
            game.debug.text('iron', 32, 48);
            game.debug.text('feathers', 32, 64);
            button1 = 'sink';//good
            button2 = 'bars';
            button3 = 'pillow';

            }
            if(questionNumber===2&& failed===false)
            {
            game.debug.text('locked door', 32, 32);
            game.debug.text('mattress', 32, 48);
            game.debug.text('hot water', 32, 64);
            button1 = 'bars';//good
            button2 = 'bed';
            button3 = 'sink';
            }
            if(questionNumber===3&& failed===false)
            {
            game.debug.text('turn left 4 times', 32, 32);
            game.debug.text('turn right 4 times', 32, 48);
            game.debug.text('lay your head', 32, 64);
            button1 = 'right_s';//good
            button2 = 'left_s';
            button3 = 'pillow';
            }
            if(questionNumber===4 && failed===false)
            {
            game.debug.text('soft head', 32, 32);
            game.debug.text('out of soap', 32, 48);
            game.debug.text('rusty iron', 32, 64);
            button1 = 'pillow';//good
            button2 = 'sink';
            button3 = 'bars';
            }
            if(questionNumber===5&& failed===false)
            {
            game.debug.text('1 gallon per flush', 32, 32);
            game.debug.text('clank', 32, 48);
            game.debug.text('cold water', 32, 64);
            button1 = 'toilet';//good
            button2 = 'bars';
            button3 = 'sink';
            }
            if(questionNumber===6 && failed===false)
            {
            game.debug.text('spigot', 32, 32);
            game.debug.text('not wrong', 32, 48);
            game.debug.text('not right', 32, 64);
            button1 = 'sink';//good
            button2 = 'right_s';
            button3 = 'left_s';
            }
            if(questionNumber===7 && failed===false)
            {
            game.debug.text('head', 32, 32);
            game.debug.text('sheetz', 32, 48);
            game.debug.text('le**', 32, 64);
            button1 = 'pillow';//good
            button2 = 'bed';
            button3 = 'left_s';
            }
            if(questionNumber===8 && failed===false)
            {
            game.debug.text('correct', 32, 32);
            game.debug.text('linens', 32, 48);
            game.debug.text('too much sauce', 32, 64);
            button1 = 'right_s';//good
            button2 = 'bed';
            button3 = 'toilet';
            }
            if(questionNumber===9 && failed===false)
            {
            game.debug.text('no privacy flush', 32, 32);
            game.debug.text('correct shelf', 32, 48);
            game.debug.text('fluffy', 32, 64);
            button1 = 'toilet';//good
            button2 = 'right_s';
            button3 = 'pillow';
            }
            if(questionNumber===10 && failed===false)
            {
            game.debug.text('tpp of bed', 32, 32);
            game.debug.text('old iron', 32, 48);
            game.debug.text('nap time', 32, 64);
            button1 = 'pillow';
            button2 = 'bars';
            button3 = 'bed';
            }
            if(questionNumber===11 && failed ===false)
            {
            game.debug.text('8 hours a night', 32, 32);
            game.debug.text('dirty paws', 32, 48);
            game.debug.text('keepin u in', 32, 64);
            button1 = 'bed';//good
            button2 = 'sink';
            button3 = 'bars;'
            }
            if(questionNumber===12 && failed===false)
            {
               game.debug.text('no freedom, cant leave', 32, 32);
               game.debug.text('hand makes an L', 32, 48);
               game.debug.text('hand does not make an L', 32, 64);
               button1 = 'bars'; 
               button2 = 'left_s';
               button3 = 'right_s';

            }
            if(questionNumber===13 && failed===false)
            {
               game.debug.text('wrong wrong wrong', 32, 32);
               game.debug.text('good answers are ___', 32, 48);
               game.debug.text('need a key', 32, 64);
               button1 = 'left_s'; 
               button2 = 'right_s';
               button3 = 'bars';

            }
            if(questionNumber===14 && failed===false)
            {
               game.debug.text('higher shelf', 32, 32);
               game.debug.text('2 knobs', 32, 48);
               game.debug.text('lower shelf', 32, 64);
               button1 = 'right_s';
               button2 = 'sink'; 
               button3 = 'left_s';

            }
            if(questionNumber===15 && failed===false)
            {
               game.debug.text('scrub ur face', 32, 32);
               game.debug.text('indigestion', 32, 48);
               game.debug.text('top job putting shelves in', 32, 64);
               button1 = 'sink'; 
               button2 = 'toilet';
               button3 = 'right_s';

            }
            if(questionNumber===16 && failed===false)
            {
               game.debug.text('dispose of evidence in ___', 32, 32);
               game.debug.text('plw fight', 32, 48);
               game.debug.text('two pipes', 32, 64);
               button1 = 'toilet'; 
               button2 = 'pillow';
               button3 = 'sink';

            }
            if(questionNumber===17 && failed===false)
            {
               game.debug.text('___case', 32, 32);
               game.debug.text('sleep tight', 32, 48);
               game.debug.text('put things up higher', 32, 64)
               button1 = 'pillow'; 
               button2 = 'bed';
               button3 = 'right_s';

            }


    }
}



    
    function update() 
    {

    }
      
};