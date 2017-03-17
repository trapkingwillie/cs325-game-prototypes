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



        game.load.audio('ding', 'assets/ding.mp3');//gameplay music
        game.load.audio('background', 'assets/background.mp3');//winning music
        // game.load.audio('lose', 'assets/lose.mp3');//losing music
    }
    
    var landscape;
    var vip;
    var secret_service;
    var questionNumber = Math.floor(Math.random()*28+1);
    var aButton;
    var bButton;
    var cButton;
    var dButton;
    var eButton;
    var button;
    var questionsAnswered = 0;
    var saved = false;
    var failed = false;
    var ding;
    var laugh;
    var background;


    
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
        ding = game.add.audio('ding');
        laugh = game.add.audio('laugh');
        background = game.add.audio('background');
        background.play();
        background.loop = true;

    }


        function AButton()
    {
        if(button==='A')
        {
            questionsAnswered+=1;
            questionNumber = Math.floor(Math.random()*28+1);
            ding.play();
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
            questionNumber = Math.floor(Math.random()*28+1);
            ding.play();
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
            questionNumber = Math.floor(Math.random()*28+1);
            ding.play();
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
            questionNumber = Math.floor(Math.random()*28+1);
            ding.play();
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
            questionNumber = Math.floor(Math.random()*28+1);
            ding.play();
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
      background.mute = true;
      
    }

    function render()
    {
        if(questionsAnswered===3)
        {
            saved = true;
            background.mute = true;
        }

      if(failed===false && saved===false)
      {
      if((questionNumber===1 || questionNumber===0) && failed===false)
            {
            game.debug.text('In what year was the constitution ratified?', 32, 32);
            game.debug.text('A: 1776, B: 1865, C: 1900, D: 2001, E: 1642', 32, 64);
            button = 'A';//good
            }
            if(questionNumber===2&& failed===false)
            {
            game.debug.text('What event caused the Great Depression?', 32, 32);
            game.debug.text('A: None, B: Wall Street Crash of 1929, C: WWII, D: Cold War, E: WWII', 32, 64);
            button = 'B';//good
            }
            if(questionNumber===3&& failed===false)
            {
            game.debug.text('What country invaded Poland to start World War II?', 32, 32);
            game.debug.text('A: Bolivia, B: Austria, C: Germany, D: Russia, E: Mexico', 32, 64);
            button = 'C';//good
            }
            if(questionNumber===4 && failed===false)
            {
            game.debug.text('In what year did the US Civil War begin?', 32, 32);
            game.debug.text('A: 1776, B: 1840, C: 1902, D: 1861, E: 1860', 32, 64);
            button = 'D';//good
            }
            if(questionNumber===5&& failed===false)
            {
            game.debug.text('What event started the US Civil War?', 32, 32);
            game.debug.text('A: None, B: Spanish War, C: WWII, D: WWI, E: Attack on Ft. Sumter', 32, 64);
            button = 'E';//good
            }
            if(questionNumber===6 && failed===false)
            {
            game.debug.text('What speech initiated the freeing of slaves in the US?', 32, 32);
            game.debug.text('A: Emancipation Proclamation, B: US Address, C: USA Address, D: None, E: FTS', 32, 64);
            button = 'A';//good
            }
            if(questionNumber===7 && failed===false)
            {
            game.debug.text('Expansion into the American ____ was termed the "Gilded Age"', 32, 32);
            game.debug.text('A: Northeast, B: West, C: Southeast, D: North, E: East', 32, 64);
            button = 'B';//good
            }
            if(questionNumber===8 && failed===false)
            {
            game.debug.text('Which muckraking journalist of the Progressive Era wrote "The Jungle"?', 32, 32);
            game.debug.text('A: J. Smith, B: A. Winston, C: Upton Sinclair, D: WEB DuBois, E: J. Shill', 32, 64);
            button = 'C';//good
            }
            if(questionNumber===9 && failed===false)
            {
            game.debug.text('In what year did the US enter World War I?', 32, 32);
            game.debug.text('A: 1904, B: 1910, C: 1944, D: 1918, E: 1911', 32, 64);
            button = 'D'//good
            }
            if(questionNumber===10 && failed===false)
            {
            game.debug.text('Which amendment gave women the right to vote?', 32, 32);
            game.debug.text('A: 16, B: 17, C: 18, D: 21, E: 19', 32, 64);
            button = 'E';
            }
            if(questionNumber===11 && failed ===false)
            {
            game.debug.text('Which amendment started Prohibition in the US?', 32, 32);
            game.debug.text('A: 18, B: 21, C: 10, D: 11, E: 15', 32, 64);
            button = 'A';//good
            }
            if(questionNumber===12 && failed===false)
            {
               game.debug.text('A nuclear bomb was dropeed on this Japanese city to stop WWII.', 32, 32);
               game.debug.text('A: Tokyo, B: Hiroshima, C: Bangkok, D: Abilene, E: None', 32, 64);
               button = 'B'; 

            }
            if(questionNumber===13 && failed===false)
            {
               game.debug.text('Another nuclear bomb was dropeed on this Japanese city to stop WWII.', 32, 32);
               game.debug.text('A: None, B: Abilene, C: Nagasaki, D: Shiro, E: Iwo Jima', 32, 64);
               button = 'C'; 

            }
            if(questionNumber===14 && failed===false)
            {
               game.debug.text('The Cold War involved (chiefly) the US and ____.', 32, 32);
               game.debug.text('A: Russia, B: Germany, C: Turkey D: Soviet Union, E: Poland', 32, 64);
               button = 'D'; 

            }
            if(questionNumber===15 && failed===false)
            {
               game.debug.text('In response to the creation of NATO, the USSR created the _____', 32, 32);
               game.debug.text('A: Communist Pact, B: USSP, C: None, D: Stalin Paper, E: Warsaw Pact', 32, 64);
               button = 'E'; 

            }
            if(questionNumber===16 && failed===false)
            {
               game.debug.text('Ronald Reagan was a member of the ____ political party', 32, 32);
               game.debug.text('A: Republican, B: Libertarian, C: Communist, D: Liberal, E: Democratic', 32, 64);
               button = 'A'; 

            }
            if(questionNumber===17 && failed===false)
            {
               game.debug.text('In what year was President Bill Clinton impeached?', 32, 32);
               game.debug.text('A: 1976, B: 1998, C: 2001, D: 2005, E: 2016', 32, 64);
               button = 'B'; 

            }
            if(questionNumber===17 && failed===false)
            {
               game.debug.text('In what year did the US (officially) invade Iraq?', 32, 32);
               game.debug.text('A: 1989, B: 2001, C: 2003, D: 2005, E: 2011', 32, 64);
               button = 'C'; 

            }
            if(questionNumber===18 && failed===false)
            {
               game.debug.text('In what year did the Great Recession occur?', 32, 32);
               game.debug.text('A: 1929, B: 2001, C: 1999, D: 2008, E: 2017', 32, 64);
               button = 'D'; 

            }
            if(questionNumber===19 && failed===false)
            {
               game.debug.text('Obamacare is also known as:', 32, 32);
               game.debug.text('A: AFA, B: EIO, C: ELO, D: AAA, E: Affordable Care Act', 32, 64);
               button = 'E'; 

            }
            if(questionNumber===20 && failed===false)
            {
               game.debug.text('Donald Trump appointed ___ to be US Attorney General', 32, 32);
               game.debug.text('A: Jeff Sessions, B: Bill Clinton, C: J. Mattis, D: DMX, E: Future', 32, 64);
               button = 'A'; 

            }

            if(questionNumber===21 && failed===false)
            {
               game.debug.text('Which state was settled by the Spanish?', 32, 32);
               game.debug.text('A: VA, B: IL, C: CA, D: FL, E: AL', 32, 64);
               button = 'D'; 

            }
            if(questionNumber===22 && failed===false)
            {
               game.debug.text('Which Continental Congress declared America independent?', 32, 32);
               game.debug.text('A: 1, B: None, C: 3, D: 7, E: 2', 32, 64);
               button = 'E'; 

            }
            if(questionNumber===23 && failed===false)
            {
               game.debug.text('Who was the first US President?', 32, 32);
               game.debug.text('A: Washington, B: Jefferson, C: None, D: Hamilton, E: Thomas', 32, 64);
               button = 'A'; 

            }
            if(questionNumber===24 && failed===false)
            {
               game.debug.text('Which of the following is not a Republican virtue?', 32, 32);
               game.debug.text('A: Civic Duty, B: Wealth, C: Virtue, D: None, E: Opposition to Aristocracy', 32, 64);
               button = 'B'; 

            }
            if(questionNumber===25 && failed===false)
            {
               game.debug.text('What are the first 10 Amendments known as?', 32, 32);
               game.debug.text('A: Ten Things, B: None, C: Bill of Rights, D: Constitution, E: Authorizations', 32, 64);
               button = 'C'; 

            }
            if(questionNumber===26 && failed===false)
            {
               game.debug.text('The Civil War was fought between the Union and the ______', 32, 32);
               game.debug.text('A: Axis, B: Alternative, C: None, D: Confederacy, E: USSR', 32, 64);
               button = 'D'; 

            }
            if(questionNumber===27 && failed===false)
            {
               game.debug.text('In what year did the US declare war on Germany (WWI)?', 32, 32);
               game.debug.text('A: 1911, B: 1912, C: 1913, D: 1916, E: 1917', 32, 64);
               button = 'E'; 

            }
            if(questionNumber===28 && failed===false)
            {
               game.debug.text('Which President created the "New Deal"?', 32, 32);
               game.debug.text('A: FDR, B: Clinton, C: Bush, D: Obama, E: Washington', 32, 64);
               button = 'A'; 

            }
        }

            if(failed===true)
        {
            game.debug.text('You fail; game over.', 32, 96);


        }
        if(saved ===true && failed===false)
        {
            game.debug.text('You win - the VIP is saved!', 32, 96);


        }

    }


    
    function update() 
    {

    }
      



};