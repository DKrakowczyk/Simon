var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


$(document).keypress(function(event) {
  if (level == 0) {
    nextSequence();
    $("#desc").fadeOut();
  }
});

window.addEventListener('touchstart', function () {
  if (level == 0) {
    nextSequence();
    $("#desc").fadeOut();
  }
});

$(".btn").click(function() {
  if (level > 0) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(this.id);
    checkAnser(userClickedPattern.length);
  }
});

function nextSequence() {
  var r = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[r];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  console.log(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
  if(level>5){
  $("#level-title").css("color","#6D7993");
  $(".description").text("GOOD");
  $("#desc").fadeIn();

  }
  if(level>10){
  $("#desc").fadeOut();
  $("#level-title").css("color","#96858F");
  $(".description").text("AMAZING");
  $("#desc").fadeIn();

  }
  if(level>20){
  $("#desc").fadeOut();
  $("#level-title").css("color","#000");
  $(".description").text("FLAWLESS");
  $("#desc").fadeIn();

  }
  else{
    $("#level-title").css("color","#FFF");
  }
}

function playSound(button) {
  var audio;
  switch (button) {
    case "red":
      audio = new Audio("sounds/1.mp3");
      audio.play();
      break;

    case "green":
      audio = new Audio("sounds/2.mp3");
      audio.play();
      break;

    case "yellow":
      audio = new Audio("sounds/3.mp3");
      audio.play();
      break;

    case "blue":
      audio = new Audio("sounds/4.mp3");
      audio.play();
      break;

    case "bad":
      audio = new Audio("sounds/bad.mp3");
      audio.play();
      break;

    default:
      audio = new Audio("sounds/bad.mp3");
      audio.play();
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

function checkAnser(currentLevel) {
  var success;

  for (var i = 0; i < currentLevel; i++) {
    if (userClickedPattern[i] == gamePattern[i]) {
      success = true;
    } else {
      success = false;

    }
  }
  if (!success) {
    playSound("bad");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over,Press Any Key to Restart");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
  }
  if (currentLevel == gamePattern.length) {

    if (success) {

      setTimeout(nextSequence, 700);

      userClickedPattern = [];
    }

  }
}
