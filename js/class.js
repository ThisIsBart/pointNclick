document.getElementById("mainTitle").innerText = "ghost game";

const offsetCharacterX = 10;
const offsetCharacterY = 16;

const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const heroSounds = document.getElementById("heroSounds");

gameWindow.onclick = function(event){
    var rect = gameWindow.getBoundingClientRect();
    var x = event.clientX - rect.left; // event's x position
    var y = event.clientY - rect.top; // event's y position
    mainCharacter.style.left = x - offsetCharacterX + 'px';
    mainCharacter.style.top = y - offsetCharacterY + 'px';
    //console.log(x);
    switch(event.target.id) {
        case "door1":
            //do something
            console.log("knock knock");
            heroSounds.play();
            break;
        case "platform":
            //do something else
            console.log("nice and dry");
            break;
        default:
            console.log("hmm...");
            break;
    }
}