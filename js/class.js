document.getElementById("mainTitle").innerText = "ghost game";

const offsetCharacterX = 10;
const offsetCharacterY = 16;

const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const heroSounds = document.getElementById("heroSounds");
const heroPortrait = document.getElementById("mainCharacterPortrait");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
const brainGuyPortrait = document.getElementById("brainGuyPortrait");
const otherSpeech = document.getElementById("otherSpeech");
const inventory = document.getElementById("inventory");
let spokenToBrainGuy = false;
let keyPickedUp = false;
let door = false;

gameWindow.onclick = function(event){
    
    var rect = gameWindow.getBoundingClientRect();
    var x = event.clientX - rect.left; // event's x position
    var y = event.clientY - rect.top; // event's y position
    mainCharacter.style.left = x - offsetCharacterX + 'px';
    mainCharacter.style.top = y - offsetCharacterY + 'px';
    //make platform opaque
    document.getElementById("platformPic").style.opacity = 1;
    switch(event.target.id) {
        case "door1":
            heroSounds.play();
            //do something
            if(!keyPickedUp){
                showSpeechBubble("Top 'o the mornin'!", mainCharacterSpeech, heroPortrait);
                setTimeout(function(){showSpeechBubble("No reply.<br>I'll teach 'em to waste me time.", mainCharacterSpeech, heroPortrait)}, 5000);
            }
            else if(!door) {
                showSpeechBubble("Key fits. Let's get to lootin'.", mainCharacterSpeech, heroPortrait);
                document.getElementById("rustyKey").remove();
                document.getElementById("doorPic").style.opacity = 1;
                setTimeout(function(){
                    let rustyKey = document.createElement("li");
                    rustyKey.id = "money";
                    rustyKey.innerText = "$500,-";
                    inventory.append(rustyKey);
                    showSpeechBubble("Score! This should buy me some Nando's an' then some.", mainCharacterSpeech, heroPortrait)},5000);
            }
            
            break;
        case "platform":
            //make platform transparent
            document.getElementById("platformPic").style.opacity = 0.5;
            if(!spokenToBrainGuy) {
                showSpeechBubble("What's all this, then? <br> Some type o' platform?", mainCharacterSpeech, heroPortrait);
                setTimeout(function(){showSpeechBubble("Useless to me, innit?", mainCharacterSpeech, heroPortrait)}, 5000);

            }
            if(spokenToBrainGuy) {
                showSpeechBubble("'ccording to the gent there should be something hidden near 'ere", mainCharacterSpeech, heroPortrait);
                setTimeout(function(){showSpeechBubble("Looks like 'e wasnae full o' it. There's a key!<br> Well 's mine now.", mainCharacterSpeech, heroPortrait)}, 5000);
                keyPickedUp = true;
                setTimeout(function(){
                    let rustyKey = document.createElement("li");
                    rustyKey.id = "rustyKey";
                    rustyKey.innerText = "Rusty Key";
                    inventory.append(rustyKey);}, 5000);
            }
            
            break;
        case "ghostpic":
            showSpeechBubble("Lovely day for it!<br>What's the talk about town?", mainCharacterSpeech, heroPortrait);
            setTimeout(function(){showSpeechBubble("Ya'll should totally check out that there wooden platform.<br>I'm, like, pretty sure it hides a secret.", otherSpeech, brainGuyPortrait)}, 5000);
            setTimeout(function(){showSpeechBubble("I'll go an' 'ave me a gander then.<br>Cheers!", mainCharacterSpeech, heroPortrait)}, 10000);
            spokenToBrainGuy = true;
            break;
        default:
            hideSpeechBubble(mainCharacterSpeech);
            break;
    }
}

function showSpeechBubble(dialogue, bubble, portrait) {
    bubble.innerHTML = dialogue;
    bubble.style.opacity = 1;
    portrait.style.opacity = 1;
    setTimeout(function(){hideSpeechBubble(bubble, portrait)}, 5000);
}
function hideSpeechBubble(bubble, portrait) {
    portrait.style.opacity = 0;
    bubble.style.opacity = 0;
    bubble.innerHTML = " ... ";
}