window.onload = function() {   
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image( 'landscape', 'assets/landscape.jpg', 150, 150 );
        game.load.image( 'amnesiac_guy', 'assets/amnesiac_guy.png', 150, 150 );
        game.load.image( 'food', 'assets/food.png', 150, 150 );
        game.load.image( 'soul', 'assets/soul.png', 150, 150 );
        game.load.image( 'heart', 'assets/heart.png', 150, 150 );
        game.load.image( 'brain', 'assets/brain.png', 150, 150 );
        game.load.image( 'money', 'assets/money.png', 150, 150 );
        game.load.image( 'home', 'assets/home.png', 150, 150 );
        game.load.image( 'realPerson', 'assets/realPerson.png', 150, 150 );
        game.load.image('personMachine', 'assets/personMachine.png', 150, 150);
        game.load.audio('explosion', 'assets/explosion.mp3');
    }
    
    var food;
    var soul;
    var heart;
    var brain;
    var money;
    var landscape;
    var amnesiac_guy;
    var explosion;
    var timeUp = false;
    var lastPiece;
    var bit1;
    var timeUp;
    var personMachine;
    var firstPart = Math.floor(Math.random()*5)+1;
    var firstCollision = 0;
    var found = false;
    var visitedMachine = false;
    var chances = 3;
    var newPerson = false;
    var realPerson;
    var home;
    var backgroundFade;
    var goneHome = false;
    
    function create() {

        game.add.tileSprite(0,0, 3000, 1500, 'landscape');
        game.world.setBounds(0,0,3000, 1500);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        amnesiac_guy = game.add.sprite(0, 1265, 'amnesiac_guy');
        food = game.add.sprite((Math.random()*1200+(Math.random()*50)+10), 1265, 'food');
        soul = game.add.sprite((Math.random()*1200+(Math.random()*100)+20), 1265, 'soul');
        heart = game.add.sprite((Math.random()*1200+(Math.random()*150)+30), 1265, 'heart');
        brain = game.add.sprite((Math.random()*1200+(Math.random()*200)+40), 1265, 'brain');
        money = game.add.sprite((Math.random()*1200+(Math.random()*250)+50), 1265, 'money');
        home = game.add.sprite(30, 900, 'home');
        realPerson = game.add.sprite(60, 1265, 'realPerson');
        personMachine = game.add.sprite(3, 1265, 'personMachine');
        amnesiac_guy.scale.setTo(0.175,0.175);
        home.scale.setTo(0.5,0.5);
        food.scale.setTo(0.175,0.175);
        realPerson.scale.setTo(0.10,0.10);
        brain.scale.setTo(0.175,0.175);
        soul.scale.setTo(0.175,0.175);
        money.scale.setTo(0.175,0.175);
        heart.scale.setTo(0.175,0.175);
        personMachine.scale.setTo(0.175, 0.175);
        game.physics.enable([amnesiac_guy, brain, soul, food, home, money, realPerson, heart, personMachine], Phaser.Physics.ARCADE);
        brain.body.onCollide = new Phaser.Signal();
        brain.body.onCollide.add(brainHit, this);
        heart.body.onCollide = new Phaser.Signal();
        heart.body.onCollide.add(heartHit, this);
        soul.body.onCollide = new Phaser.Signal();
        soul.body.onCollide.add(soulHit, this);
        money.body.onCollide = new Phaser.Signal();
        money.body.onCollide.add(moneyHit, this);  
        food.body.onCollide = new Phaser.Signal();
        food.body.onCollide.add(foodHit, this);
        home.body.onCollide = new Phaser.Signal();
        home.body.onCollide.add(homeHit, this);
        brain.body.immovable = true;
        soul.body.immovable = true;
        food.body.immovable = true;
        heart.body.immovable = true;
        money.body.immovable = true;
        home.body.immovable = true;
        personMachine.body.immovable = true;
        personMachine.body.onCollide = new Phaser.Signal();
        personMachine.body.onCollide.add(machineCollision, this);
        game.camera.follow(amnesiac_guy);
        explosion = game.add.audio('explosion');

        var style = { font: "25px Times New Roman", fill: "#ffffff", align: "right" };
        var text = game.add.text( 675, 15, "Amnesia", style );
        text.anchor.setTo( 0.5, 0.0 );
        


    }

    function homeHit()
    {
        if(newPerson = true)
        {
            goneHome = true;
        }
    }
    function brainHit()
    {
        if(firstCollision===0 && chances>=0)
        {
            firstCollision = 1;
            chances-=1;
        }
    }

    function heartHit()
    {
        if(firstCollision===0 && chances>=0)
        {
            firstCollision = 2;
            chances-=1;
        }

    }

    function soulHit()
    {
        if(firstCollision===0 && chances>=0)
        {
            firstCollision = 3;
            chances-=1;
        }


    }

    function moneyHit()
    {
        if(firstCollision===0 && chances>=0)
        {
            firstCollision = 4;
            chances-=1;
        }

    }

    function foodHit()
    {
        if(firstCollision===0 && chances>=0)
        {
            firstCollision = 5;
            chances-=1;
        }


    }

    function machineCollision()
    {
        if(found===true)
        {
        explosion.play();
        visitedMachine = true;
        newPerson = true;
        game.camera.follow(realPerson);


        }

        else
        {
            found = false;
            firstCollision = 0;
            
        }

        

    }

    function render() 
    {
        if(chances>0 && found===false)
        {
            game.debug.text('You have '+chances+' chances left.', 195, 550);
        }
        if(chances===0)
        {
            game.debug.text('You lose. Skeltl has forgotten the critical piece.', 195, 550);
        }
        if(firstCollision===firstPart)
        {
        found = true;
        if(found===true && visitedMachine===true && goneHome===true)
        game.debug.text('You made Skeltl into a real person again, and he went home!', 150, 525);
        }

        if(found===false && chances>=0)
        {
            game.debug.text('You have not found the critical piece yet.', 195, 525);
        }


 
    }
    
    function update() 
    {
        game.physics.arcade.collide(brain, amnesiac_guy);
        game.physics.arcade.collide(heart, amnesiac_guy);
        game.physics.arcade.collide(soul, amnesiac_guy);
        game.physics.arcade.collide(money, amnesiac_guy);
        game.physics.arcade.collide(food, amnesiac_guy);
        game.physics.arcade.collide(personMachine, amnesiac_guy);
        game.physics.arcade.collide(realPerson, home);


        if(newPerson===false)
        {
        if(game.input.mousePointer.isDown)
        {
            game.physics.arcade.moveToPointer(amnesiac_guy, 400);

            if(Phaser.Rectangle.contains(amnesiac_guy.body, game.input.x, game.input.y))
            {
                amnesiac_guy.body.velocity.setTo(0,0);
            }
        }

        else
        {
            amnesiac_guy.body.velocity.setTo(0,0);
        }      
    }
            if(newPerson===true && goneHome===false)
            {
            if(game.input.mousePointer.isDown)
        {
            game.physics.arcade.moveToPointer(realPerson, 400);

            if(Phaser.Rectangle.contains(realPerson.body, game.input.x, game.input.y))
            {
                realPerson.body.velocity.setTo(0,0);
            }
        }

        else
        {
            realPerson.body.velocity.setTo(0,0);
        } 
    }
}

};
