window.onload = function() {   
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image( 'landscape', 'assets/landscape.jpg', 150, 150 );//space landscape
        game.load.image( 'vip', 'assets/vip.png', 150, 150 );//president Trump
        game.load.image( 'secret_service', 'assets/secret_service.png', 150, 150 );//secret service agent 1
        game.load.image( 'donkey', 'assets/donkey.png', 150, 150 );//bad guy 1
        game.load.image( 'alternative_facts', 'assets/alternative_facts.png', 150, 150 );//bad guy 2
        game.load.image( 'snowflake', 'assets/snowflake.png', 150, 150 );//bad guy 2
        game.load.image( 'aButton', 'assets/aButton.png', 150, 150 );//bad guy 2
        game.load.image( 'bButton', 'assets/bButton.png', 150, 150 );//bad guy 2
        game.load.image( 'cButton', 'assets/cButton.png', 150, 150 );//bad guy 2
        game.load.image( 'dButton', 'assets/dButton.png', 150, 150 );//bad guy 2
        game.load.image( 'eButton', 'assets/eButton.png', 150, 150 );//bad guy 2
        game.load.image( 'russia', 'assets/russia.png', 150, 150 );//bad guy 2
        game.load.image( 'cnn', 'assets/cnn.png', 150, 150 );//bad guy 2


        // game.load.audio('gunshot', 'assets/gunshot.mp3');//phaser gun sound
        // game.load.audio('music', 'assets/music.mp3');//gameplay music
        // game.load.audio('win', 'assets/win.mp3');//winning music
        // game.load.audio('lose', 'assets/lose.mp3');//losing music
    }
    
    var landscape;
    var vip;
    var secret_service;
    var questionNumber = Math.floor(Math.random()*20+1);
    var aButton;
    var bButton;
    var cButton;
    var dButton;
    var eButton;
    var button;
    var questionsAnswered = 0;
    var saved = false;
    var failed = false;


    
    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        landscape = game.add.sprite(0,0,'landscape');
        vip = game.add.sprite(300,325,'vip');
        secret_service = game.add.sprite(100,225,'secret_service');
        vip.scale.setTo(0.65, 0.65);
        secret_service.scale.setTo(0.65, 0.65);
        addStuff();
        aButton = game.add.button(720, 100, 'aButton', AButton, this, 2, 1, 0);
        aButton.scale.setTo(0.25, 0.25);
        bButton = game.add.button(720, 200, 'bButton', BButton, this, 2, 1, 0);
        bButton.scale.setTo(0.25, 0.25);
        cButton = game.add.button(720, 300, 'cButton', CButton, this, 2, 1, 0);
        cButton.scale.setTo(0.25, 0.25);
        dButton = game.add.button(720, 400, 'dButton', DButton, this, 2, 1, 0);
        dButton.scale.setTo(0.25, 0.25);
        eButton = game.add.button(720, 500, 'eButton', EButton, this, 2, 1, 0);
        eButton.scale.setTo(0.25, 0.25);

    }


        function AButton()
    {
        if(button==='A')
        {
            questionsAnswered+=1;
            questionNumber = Math.floor(Math.random()*20+1);
        }
        else
        {
            failAction();
        }

    }

    function BButton()
    {
        if(button==='B')
        {
            questionsAnswered+=1;
            questionNumber = Math.floor(Math.random()*20+1);
        }
        else
        {
            failAction();
        }

    }

        function CButton()
    {
        if(button==='C')
        {
            questionsAnswered+=1;
            questionNumber = Math.floor(Math.random()*20+1);
        }
        else
        {
            failAction();
        }

    }

        function DButton()
    {
        if(button==='D')
        {
            questionsAnswered+=1;
            questionNumber = Math.floor(Math.random()*20+1);
        }
        else
        {
            failedAction();
        }

    }

        function EButton()
    {
        if(button==='E')
        {
            questionsAnswered+=1;
            questionNumber = Math.floor(Math.random()*20+1);
        }
        else
        {
            failedAction();
        }

    }

    function addStuff()
    {

      if(saved===false)
      {
        var snowflake = game.add.sprite(Math.random()*700+10, 0,'snowflake');
        var donkey = game.add.sprite(Math.random()*700+20 , 0,'donkey');
        var alternative_facts = game.add.sprite(Math.random()*700+30,0,'alternative_facts');
        var russia = game.add.sprite(Math.random()*700+40,0,'russia');
        var cnn = game.add.sprite(Math.random()*700+50,0,'cnn');
        snowflake.scale.setTo(0.25, 0.25);
        donkey.scale.setTo(0.25, 0.25);
        alternative_facts.scale.setTo(0.25, 0.25);
        russia.scale.setTo(0.15, 0.15);
        cnn.scale.setTo(0.9, 0.9);
        game.add.tween(snowflake).to({y: 750}, 10000, Phaser.Easing.Linear.None, true);
        game.add.tween(russia).to({y: 750}, 10000, Phaser.Easing.Linear.None, true);
        game.add.tween(donkey).to({y: 750}, 10000, Phaser.Easing.Linear.None, true);
        game.add.tween(alternative_facts).to({y: 750}, 10000, Phaser.Easing.Linear.None, true);
        game.add.tween(cnn).to({y: 750}, 10000, Phaser.Easing.Linear.None, true);
        game.time.events.add(Phaser.Timer.SECOND * 2.5, addStuff, this);

      }
        


    }

    function failAction()
    {
      failed = true;
    }

    function render()
    {
        if(questionsAnswered===5)
        {
            saved = true;
        }
      if(failed===true)
      {
        game.debug.text('You did not protect Captain Twitterfingers from dangerous circumstances; you fail.', 32, 64);
      }

      if(failed===false && saved===false)
      {
      if((questionNumber===1 || questionNumber===0) && failed===false)
            {
            game.debug.text('In what year was the constitution ratified?', 32, 96);
            game.debug.text('A: 1776, B: 1865, C: 1900, D: 2001, E: 1642', 32, 114);
            button = 'A';//good
            }
            if(questionNumber===2&& failed===false)
            {
            game.debug.text('What event caused the Great Depression?', 32, 96);
            game.debug.text('B: Wall Street Crash of 1929', 32, 114);
            button = 'B';//good
            }
            if(questionNumber===3&& failed===false)
            {
            game.debug.text('What country invaded Poland to start World War II?', 32, 96);
            game.debug.text('C: Germany', 32, 114);
            button = 'C';//good
            }
            if(questionNumber===4 && failed===false)
            {
            game.debug.text('In what year did the US Civil War begin?', 32, 96);
            game.debug.text('D: 1861', 32, 114);
            button = 'D';//good
            }
            if(questionNumber===5&& failed===false)
            {
            game.debug.text('What event started the US Civil War?', 32, 96);
            game.debug.text('E: Attack on Ft. Sumter', 32, 114);
            button = 'E';//good
            }
            if(questionNumber===6 && failed===false)
            {
            game.debug.text('What speech initiated the freeing of slaves in the US?', 32, 96);
            game.debug.text('A: Emancipation Proclamation', 32, 114);
            button = 'A';//good
            }
            if(questionNumber===7 && failed===false)
            {
            game.debug.text('Expansion into the American ____ was termed the "Gilded Age"', 32, 96);
            game.debug.text('B: West', 32, 114);
            button = 'B';//good
            }
            if(questionNumber===8 && failed===false)
            {
            game.debug.text('Which muckraking journalist of the Progressive Era wrote "The Juungle"?', 32, 96);
            game.debug.text('C: Upton Sinclair', 32, 114);
            button = 'C';//good
            }
            if(questionNumber===9 && failed===false)
            {
            game.debug.text('In what year did the US enter World War I?', 32, 96);
            game.debug.text('D: 1918', 32, 114);
            button = 'D'//good
            }
            if(questionNumber===10 && failed===false)
            {
            game.debug.text('Which amendment gave women the right to vote?', 32, 96);
            game.debug.text('E: 19', 32, 114);
            button = 'E';
            }
            if(questionNumber===11 && failed ===false)
            {
            game.debug.text('Which amendment started Prohibition in the US?', 32, 96);
            game.debug.text('A: 18', 32, 114);
            button = 'A';//good
            }
            if(questionNumber===12 && failed===false)
            {
               game.debug.text('A nuclear bomb was dropeed on this Japanese city to stop WWII.', 32, 96);
               game.debug.text('B: Hiroshima', 32, 114);
               button = 'B'; 

            }
            if(questionNumber===13 && failed===false)
            {
               game.debug.text('Another nuclear bomb was dropeed on this Japanese city to stop WWII.', 32, 96);
               game.debug.text('C: Nagasaki', 32, 114);
               button = 'C'; 

            }
            if(questionNumber===14 && failed===false)
            {
               game.debug.text('The Cold War involved (chiefly) the US and ____.', 32, 96);
               game.debug.text('D: Soviet Union', 32, 114);
               button = 'D'; 

            }
            if(questionNumber===15 && failed===false)
            {
               game.debug.text('In response to the creation of NATO, the USSR created the _____', 32, 96);
               game.debug.text('E: Warsaw Pact', 32, 114);
               button = 'E'; 

            }
            if(questionNumber===16 && failed===false)
            {
               game.debug.text('Ronald Reagan was a member of the ____ political party', 32, 96);
               game.debug.text('A: Republican', 32, 114);
               button = 'A'; 

            }
            if(questionNumber===17 && failed===false)
            {
               game.debug.text('In what year was President Bill Clinton impeached?', 32, 96);
               game.debug.text('B: 1998', 32, 114);
               button = 'B'; 

            }
            if(questionNumber===17 && failed===false)
            {
               game.debug.text('In what year did the US (officially) invade Iraq?', 32, 96);
               game.debug.text('C: 2003', 32, 114);
               button = 'C'; 

            }
            if(questionNumber===18 && failed===false)
            {
               game.debug.text('In what year did the Great Recession occur?', 32, 96);
               game.debug.text('D: 2008', 32, 114);
               button = 'D'; 

            }
            if(questionNumber===19 && failed===false)
            {
               game.debug.text('Obamacare is also known as:', 32, 96);
               game.debug.text('E: Patient Protection and Affordable Care Act', 32, 114);
               button = 'E'; 

            }
            if(questionNumber===20 && failed===false)
            {
               game.debug.text('Donald Trump appointed ___ to be US Attorney General', 32, 96);
               game.debug.text('A: Jeff Sessions', 32, 114);
               button = 'A'; 

            }
        }

            if(failed===true)
        {
            game.debug.text('You fail; game over.', 32, 114);

        }
        if(saved ===true && failed===false)
        {
            game.debug.text('You win - the VIP is saved!', 32, 114);

        }

    }


    
    function update() 
    {

    }
      



};