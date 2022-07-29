var buttonColours = ["red","blue","green","yellow"]; 
var gamePattern = []; 
var userClickedPattern = []; 
var level = 0; 
var score = 0; 
var started = false;


$(document).keydown(function(event) {
    if(!started){
        $("#level-title").text("Level: " + level); 
        nextSequence(); 
        started = true; 
    }
});

$(".btn").click(function () {
    var userChosenColour = this.id
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour); 
    checkAnswer(userClickedPattern.length-1); 
}); 

function nextSequence() {
    userClickedPattern = []; 
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour); 
     if(level > 0)
    {
      $("#level-title").text("level" + level);
    }
}

function playSound(name){
    var audio = new Audio("sounds/"+name +".mp3");
        audio.play(); 
} 

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed"); 
    setTimeout(function() {
     $("#"+currentColour).removeClass("pressed");
    },100); 
    
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        
        if(userClickedPattern.length === gamePattern.length)
        {
            score++; 
            $("#score").text("Score: "  + score);
             
            setTimeout(function(){
                nextSequence(); 
            }, 1000)
        }
    }
    else{ //if user gets answer wrong
        var audio = new Audio("sounds/wrong.mp3");  //play sound

        //flash background
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        
        $("#level-title").text("Game Over😭 Please press any key to start over")

        startOver(); 
    }
}

function startOver() {
    $("#score").hide(); 
    score = 0; 
    level = 0; 
    gamePattern = []; 
    started = false; 
}






 



