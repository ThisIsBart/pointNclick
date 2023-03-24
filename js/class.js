document.getElementById("mainTitle").innerText = "ghost game";

const offsetCharacterX = 10;
const offsetCharacterY = 16;

const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const heroSounds = document.getElementById("heroSounds");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");

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
            showSpeechBubble("Lovely day for it!");
            heroSounds.play();
            break;
        case "platform":
            //do something else
            showSpeechBubble("What's all this, then? <br> Something new?");
            break;
        case "ghostpic":
            showSpeechBubble("Top 'o the mornin'!<br>You know of a good haunt near here?")
            break;
        default:
            hideSpeechBubble();
            break;
    }
}

function showSpeechBubble(dialogue) {
    mainCharacterSpeech.innerHTML = dialogue;
    mainCharacterSpeech.style.opacity = 1;
}
function hideSpeechBubble() {
    mainCharacterSpeech.style.opacity = 0;
    mainCharacterSpeech.innerHTML = " ... ";
}