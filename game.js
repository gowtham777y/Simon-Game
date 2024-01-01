var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;
var currlevel ;
var buttonColours = ["red","blue","green","yellow"];

$(document).keydown(function(){
    if (start != true){
        nextSequence();
        start = true;
    }
});

function StartGame(){
    start = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}


function nextSequence(){
    level= level+1;
    userClickedPattern=[];
    currlevel = 0;
    $("h1").text("Level "+level);
    var colour = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[colour];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
}



$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    makeSound(userChosenColour);
    // console.log(userClickedPattern);
    currlevel = currlevel+1;
    checkAnswer(currlevel);
})

function checkAnswer(currlevel){
    console.log(currlevel + " "+ level);
    if (userClickedPattern[currlevel-1] === gamePattern[currlevel-1] && currlevel > 0){
        // currlevel = currlevel +1;
        // console.log(userClickedPattern);
        // console.log(gamePattern);
        if (currlevel === level){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        // console.log("Wrong");
        // console.log(userClickedPattern);
        // console.log(gamePattern);
        $("h1").text("Game Over, press any key to Start");
        var audio = new Audio("/sounds/wrong.mp3");
        audio.play();
        StartGame();
    }
    // console.log(currlevel);
}



function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        // makeSound(currentColour);
        $("#"+currentColour).removeClass("pressed");
    },100);
}


function makeSound(randomChosenColour){
    switch (randomChosenColour){
        case "green":
            var audio = new Audio("./sounds/green.mp3");
            audio.play();
        case "blue":
            var audio = new Audio("./sounds/blue.mp3");
            audio.play();
        case "red":
            var audio = new Audio("./sounds/red.mp3");
            audio.play();
        case "yellow":
            var audio = new Audio("./sounds/yellow.mp3");
            audio.play();
        case "wrong":
            // var audio = new Audio("./sounds/wrong.mp3");
            audio.play();
        default:
            return;
    }
}