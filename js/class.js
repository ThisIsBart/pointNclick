document.getElementById("mainTitle").innerText = "ghost game";

const offsetCharacterX = 10;
const offsetCharacterY = 16;

const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");


gameWindow.onclick = function(event){
    var rect = gameWindow.getBoundingClientRect();
    var x = event.clientX - rect.left; // event's x position
    var y = event.clientY - rect.top; // event's y position
    mainCharacter.style.left = x - offsetCharacterX + 'px';
    mainCharacter.style.top = y - offsetCharacterY + 'px';
    //console.log(x);
}