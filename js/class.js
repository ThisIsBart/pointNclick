document.getElementById("mainTitle").innerText = "ghost game";

const offsetCharacterX = 10;
const offsetCharacterY = 16;

const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const heroSounds = document.getElementById("heroSounds");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
const otherSpeech = document.getElementById("otherSpeech");

gameWindow.onclick = function(event){
    
    var rect = gameWindow.getBoundingClientRect();
    var x = event.clientX - rect.left; // event's x position
    var y = event.clientY - rect.top; // event's y position
    mainCharacter.style.left = x - offsetCharacterX + 'px';
    mainCharacter.style.top = y - offsetCharacterY + 'px';
    //console.log(x);
    document.getElementById("platformPic").style.opacity = 1;
    switch(event.target.id) {
        case "door1":
            //do something
            showSpeechBubble("Top 'o the mornin'!", mainCharacterSpeech);
            heroSounds.play();
            break;
        case "platform":
            //do something else
            event.target.style.opacity = 0;
            document.getElementById("platformPic").style.opacity = 0.5;
            showSpeechBubble("What's all this, then? <br> Something new?", mainCharacterSpeech);
            break;
        case "ghostpic":
            showSpeechBubble("Lovely day for it!<br>You know of a good haunt near here?", mainCharacterSpeech);
            setTimeout(function(){showSpeechBubble("Ya'll should totally check out that there wooden platform.<br>I'm, like, pretty sure it hides a secret.", otherSpeech)}, 5000);
            setTimeout(function(){showSpeechBubble("I'll go an' 'ave me a gander then.<br>Cheers!", mainCharacterSpeech)}, 10000);
            break;
        default:
            hideSpeechBubble(mainCharacterSpeech);
            break;
    }
}

function showSpeechBubble(dialogue, bubble) {
    bubble.innerHTML = dialogue;
    bubble.style.opacity = 1;
    setTimeout(function(){hideSpeechBubble(bubble)}, 5000);
}
function hideSpeechBubble(bubble) {
    bubble.style.opacity = 0;
    bubble.innerHTML = " ... ";
}