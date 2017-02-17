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
    
    function create() {

        game.add.tileSprite(0,0, 3000, 1500, 'landscape');
        game.world.setBounds(0,0,3000, 1500);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        amnesiac_guy = game.add.sprite(0, 1265, 'amnesiac_guy');
        food = game.add.sprite(0, 400, 'food');
        soul = game.add.sprite((Math.random()*1200), 1265, 'soul');
        heart = game.add.sprite((Math.random()*1200), 1265, 'heart');
        brain = game.add.sprite((Math.random()*1200), 1265, 'brain');
        money = game.add.sprite((Math.random()*1200), 1265, 'money');
        amnesiac_guy.scale.setTo(0.175,0.175);
        food.scale.setTo(0.175,0.175);
        brain.scale.setTo(0.175,0.175);
        soul.scale.setTo(0.175,0.175);
        money.scale.setTo(0.175,0.175);
        heart.scale.setTo(0.175,0.175);
        game.physics.enable(amnesiac_guy);
        //game.physics.enable(food, brain, soul, money, heart);
        game.camera.follow(amnesiac_guy);

        game.time.events.add(Phaser.Timer.SECOND*(5), timeEnd, this);
        explosion = game.add.audio('explosion');


        var style = { font: "25px Times New Roman", fill: "#ffffff", align: "right" };
        var text = game.add.text( 675, 15, "Amnesia", style );
        text.anchor.setTo( 0.5, 0.0 );

        // lastPiece = Math.floor(Math.random()*5)+1;
        
        // if(lastPiece===5)
        // {
        //     bit1 = 'brain';

        // }
        
        // if(lastPiece===4)
        // {
        //     bit1 = 'heart';

        // }
        // if (lastPiece===3)
        // {
        //     bit1 = 'soul';

        // }
        // if(lastPiece===2)
        // {
        //     bit1 = 'food';

        // }
        // if (lastPiece===1)
        // {
        //     bit1 = 'money';

        // }

    }

    function timeEnd() 
    {
        timeUp=true;

    }

    function collectItem()
    {
        itemsCollected+=1;
        //if last item isn't collected last, throw error message
    }


    function render() 
    {

 
    }
    
    function update() 
    {


        // if(timeUp===false)
        // {
        //     game.debug.text('The last item must be: '+bit1);
        // }

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

};
