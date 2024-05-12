var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var  userClickedPattern=[];
var level = 0;
var i=0;
var start=false;
// var randomNumber;

function playSound(name){
  var audio = new Audio("./sounds/"+name+".mp3");
        audio.play();
}

function animatePress(currentColour){
 $("#"+currentColour).addClass("pressed");
 setTimeout(function () {
  $("#"+currentColour).removeClass("pressed");
 },100);
}

function nextSequence(){

  randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour =buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
level += 1;
$("h1").text("Level "+ level);
userClickedPattern=[];
i=0;
        
 }

    

        
function handler(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern[userClickedPattern.length-1]);//passing the last index

 
  
  
}


$(".btn").on( "click", handler );

$("body").on( "keypress", function(){
  if(!start){
    nextSequence();
    start = true;
  }
} );

function checkAnswer(currentLevel){
  
  if(currentLevel===gamePattern[i]){
    console.log("success");
    i++;
    // console.log(i);
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(nextSequence,1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startover();
  }
  
  function startover(){
    gamePattern=[];
    userClickedPattern=[];
    i=0;
    level=0;
    start=false;
  }

}
      


