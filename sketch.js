var bg, bg_image;
var bob, bob_img, bob_gamelost_img;

var invisibleGround;
var invisibleTopLayer;
var lion, lion_img, bear, bear_img, elephant, elephant_img, fox, fox_img, snake, snake_img, tiger, tiger_img;
var animalsGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
    bg_image = loadImage("bg.jpg");

    // =====PLAYING CHARACTER=====
    bob_img = loadAnimation("bob_1.png", "bob_2.png");

    bob_gamelost_img = loadAnimation("bob_gamelost.png", "bob_gamelost.png");

    // =====NON-PLAYING CHARACTERS=====
    lion_img = loadImage("lion.png");
    bear_img = loadImage("snake.png");
    elephant_img = loadImage("elephant.png");
    fox_img = loadImage("fox.png");
    snake_img = loadImage("snake.png");
    tiger_img = loadImage("tiger.png");
}

function setup() {
    createCanvas(1200, 700);
    bg = createSprite(900, 380);
    bg.addImage(bg_image);
    bg.scale = 0.257;
    // if scale decrease, then other values such as image length increases

    bob = createSprite(100, 600);
    bob.addAnimation("moving", bob_img);
    bob.addImage(bob_gamelost_img)
    bob.scale = 0.5;

    invisibleGround = createSprite(0, 670, 2400, 20);
    invisibleGround.visible = false;

    invisibleTopLayer = createSprite(0, 290, 2400, 20);
    invisibleTopLayer.visible = false;


    /* lion = createSprite();
     lion.addAnimation("moving", lion_img);
 
     bear = createSprite();
     bear.addAnimation("moving", bear_img);
 
     elephant = createSprite();
     elephant.addAnimation("moving", elephant_img);
 
     fox = createSprite();
     fox.addAnimation("moving", fox_img);
 
     snake = createSprite();
     snake.addAnimation("moving", snake_img);
 
     tiger = createSprite();
     tiger.addAnimation("moving", tiger_img);*/

    animalsGroup = new Group();



}

function draw() {
    background(0);




    if (gameState === PLAY) {

        bg.velocityX = -8;

        bob.changeAnimation(bob_gamelost_img);

        if (bg.x < 370) {
            bg.x = bg.width / 8;
        }

        // && bob.y >= 100

        if (keyDown("space")) {
            bob.velocityY = -13;
        }


        console.log(bob.y);


        bob.velocityY = bob.velocityY + 0.435;

        bob.collide(invisibleGround)
        // bob.collide(invisibleTopLayer)

        if (bob.collide(invisibleTopLayer)) {
            bob.y = 600;
        }


        if (animalsGroup.collide(bob)) {
            gameState = END;

        }
    }
    else if (gameState === END) {
        //  restart button and game over text
        bg.velocityX = 0;
        animalsGroup.setVelocityXEach(0);
        animalsGroup.setVelocityYEach(0);
        bob.velocityY = 0.0;
        animalsGroup.setVisibleEach(false);
        bob.changeImage(bob_gamelost_img);
    }





    spawnAnimals();

    drawSprites();
}

function spawnAnimals() {
    if (frameCount % 150 === 0) {
        animals = createSprite(1100, 600, 35, 55);
        animals.velocityX = -8;
        var rand = Math.round(random(1, 6));
        switch (rand) {
            case 1: animals.addImage(lion_img);
                break;
            case 2: animals.addImage(bear_img);
                break;
            case 3: animals.addImage(elephant_img);
                break;
            case 4: animals.addImage(fox_img);
                break;
            case 5: animals.addImage(snake_img);
                break;
            case 6: animals.addImage(tiger_img);
                break;
            default: break;
        }
        animals.scale = 0.17;
        animals.lifetime = 138;
        animalsGroup.add(animals);
    }
}