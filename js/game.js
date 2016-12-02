//fullscreen
function toggleFullscreen(elem) {
  elem = elem || document.documentElement;
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

document.getElementById("btnFullscreen").addEventListener("click", function() {
	toggleFullscreen();
});
//game
var nextBtn = document.getElementById("next");
//text lvl1
var text = document.getElementById("text");
var l1t1 = "Hello, wat are you doing here?";
var l1t2 = "Anyways, lets play a game.";
var l1t3 = "There are two doors the left one is the wrong one and the right one is the right one.";
//text lvl2
var l2t1 = "Try opening the door.";
var l2t2 = "You have a key!";
//text lvl3
var l3t1 = "Do you think you can hack?";
var l3t2 = "Try to unlock a secret door.";
var l3t3 = "Do you need help?";
var l3t4 = "Try typing hack.";
var l3t5 = "You need to 'open secret door'.";
//text lvlA
var lAt1 = "A nice cliff, what a great choice you've made!";
var lAt2 = "I'm so nice that I have locked the door for you.";
var lAt3 = "What are you going to do?";
var lAt4 = "Stay here and starve to death, or jump down and have a small chance of surviving.";
//text lvlB
var lBt1 = "No hacking for you? So left or right?"

var bg = document.getElementById("background");
var doorOne = document.getElementById("door-1");
var doorTwo = document.getElementById("door-2");
var doorThree = document.getElementById("door-3");
var doorMat = document.getElementById("door-mat");
var door = document.getElementsByClassName("doors")[0];
var key = document.getElementById("door3key");
var screenOfDeath = document.getElementById("screen-of-death");
var winScreen = document.getElementById("win-screen");
var computerScreen = document.getElementById("screen");
var arrows = document.getElementsByClassName("arrows");
var safeGearFront = document.getElementById("safe-gear-front");
var door3Key = false;
//title screen
function start() {
	console.log("Start");
	document.getElementById("title-screen").style.display = "none";
	document.getElementById("myAudio").pause(); document.getElementById("myAudio").currentTime = 0;
	document.getElementById("lvl1").style.display = "inline";
  bg.style.backgroundImage = "url(media/bg-wall.jpg)";
	text.innerHTML = l1t1;
}
//doors
function door1() {
  lvlA();
  doorSound();
}

function door2() {
  lvl2();
  doorSound();
}

function doorSound() {
  var y = Math.floor(Math.random() * 2) + 1;
  if (y < 2) {
    document.getElementById("audioDoor1").play();
  }
  else {
    document.getElementById("audioDoor2").play();
  }
}

function dead() {
  if (text.innerHTML == lAt4 || text.innerHTML == lBt1) {
    document.getElementById("lvl1").style.display = "none";
    screenOfDeath.style.display = "block";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#0000aa";
    console.log("You're dead");
    document.getElementById("audioWaves").pause(); document.getElementById("audioWaves").currentTime = 0;
    document.onkeypress = function reloadPage() {
    location.reload();
    }
  }
}

function win() {
  if (text.innerHTML == lBt1) {
    document.getElementById("lvl1").style.display = "none";
    winScreen.style.display = "block";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#0000aa";
    console.log("You win!");
    document.getElementById("audioWin").play();
    document.onkeypress = function reloadPage() {
    location.reload();
    }
  }
}

function lvl2() {
  console.log("level 2");
  doorOne.remove();
  doorTwo.remove();
  doorThree.style.display = "block";
  doorMat.style.display = "block";
  door.style.alignItems = "center";
  door.style.flexDirection = "column";
  text.innerHTML = l2t1;
  nextBtn.style.visibility = "hidden";
}

function lvlA() {
  console.log("level A");
  document.getElementById("audioWaves").play();
  bg.style.backgroundImage = "url(media/cliff.jpg)";
  bg.style.backgroundRepeat = "no-repeat";
  bg.style.backgroundSize = "cover";
  doorOne.remove();
  doorTwo.remove();
  text.innerHTML = lAt1;
  nextBtn.style.visibility = "initial";
  action = 1;
}

function lvl3() {
  console.log("level 3");
  doorThree.remove();
  desk.style.display = "block";
  vent.style.display = "block";
  computerScreen.style.display = "block";
  door.style.top = "40%";
  text.innerHTML = l3t1;
  nextBtn.style.visibility = "initial";
  action = 1;
}

function lvlB() {
  console.log("level B");
  document.getElementById("audioVent").play(); //audio for vent
  bg.style.backgroundImage = "url(media/air-vent.png)";
  bg.style.backgroundRepeat = "no-repeat";
  bg.style.backgroundSize = "cover";
  desk.remove();
  vent.remove();
  computerScreen.remove();
  nextBtn.style.visibility = "hidden";
  text.innerHTML = lBt1;
  arrows[0].style.display = "inline";
  arrows[1].style.display = "inline";
  door.style.flexDirection = "row";
  door.style.top = "50%";
}

function lvl4() {
  console.log("level 4");
  desk.remove();
  vent.remove();
  computerScreen.remove();
  text.innerHTML = l4t1;
  nextBtn.style.visibility = "initial";
  action = 1;
}

function textCheck() {
  var textarea = document.getElementById("screen-input");
  var textValue = textarea.value.toLowerCase();
  if (textValue=="hack") {
    console.log("hack started...");
    textarea.value = "hack started...\n";
  }
  else if (textValue=="hack started...\nopen secret door") {
        console.log("door unlocked");
        textarea.value = "Door Unlocked!";
        text.innerHTML = "You have unlocked the secret door!"
        nextBtn.style.visibility = "hidden";
        setTimeout(function(){lvl4()}, 1000);
    }
}

function door3() {
  if (door3Key == true) {
    lvl3();
    doorSound();
  }
  else {
    text.innerHTML = "The door is locked!";
    document.getElementById("audioLockedDoor").play();
  }
}

function doormat() {
  doorMat.style.filter = "opacity(0)";
  doorMat.style.transitionDuration = "1s";
  setTimeout( showKey, 600 );
  function showKey() {
    doorMat.remove();
    key.style.display = "block";
    key.style.filter = "opacity(5)";
    key.style.transitionDuration = "1s";
  }
}
function keyCollect() {
  door3Key = true;
  key.style.filter = "opacity(0)";
  key.style.transitionDuration = "1s";
  text.innerHTML = l2t2;
}

function ventOpen() {
  document.getElementById("audioVent").play();
  setTimeout(function(){lvlB()}, 4000);
}
var degr = 0;
var degrPlusMinus = true;
var vartimeOut;
var timeMS = 1500;
function rotateSafe() {
  
  if (degrPlusMinus == true) {
    degr += 1;
  }
  else {
    degr -= 1;
  }

  if (degr == 360 || degr == -360) {
    degr = 0;
  }
  //26

  if (degr <= 97 && degr >= 102) {
    console.log("else 26");
    clearTimeout(vartimeOut);
  }
  else if (degr >= 97 && degr <= 102) {
    console.log("if 26");
    vartimeOut = setTimeout(function(){degrPlusMinus = false; console.log("false");}, timeMS);
  }

  if (degr >= -164 && degr <= -170) {
    console.log("else 50");
    clearTimeout(vartimeOut);
  }
  else if (degr <= -164 && degr >= -170) {
    console.log("if 50");
    vartimeOut = setTimeout(function(){degrPlusMinus = true; console.log("true");}, timeMS);
  }
  safeGearFront.style.transform = "rotate(" + degr + "deg)";
}

action = 1;
function Next() {
  if (action == 1) {
    if (text.innerHTML == l1t1){
      text.innerHTML = l1t2;
    }
    else if (text.innerHTML == lAt1) {
      text.innerHTML = lAt2;
    }
    else if (text.innerHTML == l3t1) {
      text.innerHTML = l3t2;
    }
    action = 2;
  }

    
  else if (action == 2) {
    if (text.innerHTML == l1t2){
      text.innerHTML = l1t3;
      nextBtn.style.visibility = "hidden";
    }
    else if (text.innerHTML == lAt2) {
      text.innerHTML = lAt3;
    }
    else if (text.innerHTML == l3t2) {
      text.innerHTML = l3t3;
    }
    action = 3;
  }

  else if (action == 3){
    if (text.innerHTML == lAt3) {
      text.innerHTML = lAt4;
      nextBtn.style.visibility = "hidden";
      setTimeout(dead, 300000);
    }
    else if (text.innerHTML == l3t3) {
      text.innerHTML = l3t4;
    }
    action = 4;
  }

  else if (action == 4) {
    if (text.innerHTML == l3t4) {
      text.innerHTML = l3t5;
      nextBtn.style.visibility = "hidden";
    }
  }
  
}