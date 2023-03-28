document.getElementById("mainTitle").innerText = "ghost game";
// Offset to center hero
const offsetCharacterX = 10;
const offsetCharacterY = 16;
// Global things
const gameWindow = document.getElementById("gameWindow");
const inventory = document.getElementById("inventory");
// Elements belonging to the hero
const mainCharacter = document.getElementById("mainCharacter");
const heroSounds = document.getElementById("heroSounds");
const heroPortrait = document.getElementById("mainCharacterPortrait");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
// NPCs
const otherSpeech = document.getElementById("otherSpeech");
const brainGuyPortrait = document.getElementById("brainGuyPortrait");
const cellarPortrait = document.getElementById("cellarPortrait");
// Event flags
let spokenToBrainGuy = false;
let keyPickedUp = false;
let door = false;

gameWindow.onclick = function(event){
    // Have the hero go where the mouse was clicked
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
            // Before the key is picked up
            if(!keyPickedUp){
                showSpeechBubble("Top 'o the mornin'!", mainCharacterSpeech, heroPortrait);
                setTimeout(function(){showSpeechBubble("No reply.<br>I'll teach 'em to waste me time.", mainCharacterSpeech, heroPortrait)}, 5000);
            }
            // The first time you get here with the key
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
                door = true;
            }
            // Subsequent times after you get the key
            else{
                showSpeechBubble("I should bolt 'fore the owner get's back.", mainCharacterSpeech, heroPortrait);
            }
            break;
        case "platform":
            // Make platform transparent
            document.getElementById("platformPic").style.opacity = 0.5;
            // Before you've spoken to brain guy
            if(!spokenToBrainGuy) {
                showSpeechBubble("What's all this, then? <br> Some type o' platform?", mainCharacterSpeech, heroPortrait);
                setTimeout(function(){showSpeechBubble("Useless to me, innit?", mainCharacterSpeech, heroPortrait)}, 5000);
            }
            // After you've spoken to brain guy but before you picked up the key
            else if(!keyPickedUp) {
                showSpeechBubble("'ccording to the gent there should be something hidden near 'ere", mainCharacterSpeech, heroPortrait);
                setTimeout(function(){showSpeechBubble("Looks like 'e wasnae full o' it. There's a key!<br> Well 's mine now.", mainCharacterSpeech, heroPortrait)}, 5000);
                keyPickedUp = true;
                setTimeout(function(){
                    let rustyKey = document.createElement("li");
                    rustyKey.id = "rustyKey";
                    rustyKey.innerText = "Rusty Key";
                    inventory.append(rustyKey);}, 5000);
            }
            // After you've picked up the key
            else{
                showSpeechBubble("Picked right clean", mainCharacterSpeech, heroPortrait);
            }
            break;
        case "ghostpic":
            // If you haven't picked up the key yet
            if(!keyPickedUp) {
                showSpeechBubble("Lovely day for it!<br>What's the talk about town?", mainCharacterSpeech, heroPortrait);
                setTimeout(function(){showSpeechBubble("Ya should totes check out that wooden platform.<br>I'm, like, pretty sure I saw something shiny.", otherSpeech, brainGuyPortrait)}, 5000);
                setTimeout(function(){showSpeechBubble("I'll go an' 'ave me a gander then.<br>Cheers!", mainCharacterSpeech, heroPortrait)}, 10000);
                spokenToBrainGuy = true;
            }
            // After you picked up the key
            else {
                showSpeechBubble("Well? What's the scoop?<br>find anything good?", otherSpeech, brainGuyPortrait);
                setTimeout(function(){showSpeechBubble("Whot's it to ya? Ya yank!<br> I ain't tellin'ya nothin'", mainCharacterSpeech, heroPortrait)}, 5000);
                setTimeout(function(){showSpeechBubble("Like, chill, nerd!<br>I was, like, just being polite, you freak.", otherSpeech, brainGuyPortrait)}, 10000);
            }
            break;
        // Initiate the conversation tree
        case "cellar":
            showSpeechBubble("Knock, knock.", mainCharacterSpeech, heroPortrait);
            setTimeout(function(){showSpeechBubble("Who's there?", otherSpeech, cellarPortrait)}, 5000);
            setTimeout(cellarTree, 10000);
            break;
        // Conversation tree option 1
        case "option1":
            hideSpeechBubble(mainCharacterSpeech, heroPortrait);
            showSpeechBubble("I wasn't expecting you!", otherSpeech, cellarPortrait);
            setTimeout(function(){showSpeechBubble("No-one expects the Spanish Inquisistion", mainCharacterSpeech, heroPortrait)}, 5000);
            break;
        // Conversation tree option 2
        case "option2":
            hideSpeechBubble(mainCharacterSpeech, heroPortrait);
            showSpeechBubble("Alex who?", otherSpeech, cellarPortrait);
            setTimeout(function(){showSpeechBubble("Alex plain after you open the door.", mainCharacterSpeech, heroPortrait)}, 5000);
            break;
        // Conversation tree option 3
        case "option3":
            hideSpeechBubble(mainCharacterSpeech, heroPortrait);
            showSpeechBubble("Maybe a tenner'll refresh your memory.", otherSpeech, cellarPortrait);
            let tenner = document.createElement("li");
            tenner.id = "tenner";
            tenner.innerText = "$10,-";
            inventory.append(tenner);
            setTimeout(function(){showSpeechBubble("I'm the main character. Who want's to know?", mainCharacterSpeech, heroPortrait)}, 5000);
            setTimeout(function(){showSpeechBubble("My memory's a bit lacking as of late.", otherSpeech, cellarPortrait)}, 10000);
            setTimeout(function(){showSpeechBubble("How's this for a refresher?", mainCharacterSpeech, heroPortrait); document.getElementById("tenner").remove()}, 15000);
            setTimeout(function(){showSpeechBubble("I'm the cellar used to test the conversation tree", otherSpeech, cellarPortrait)}, 20000);
        default:
            //hideSpeechBubble(mainCharacterSpeech, heroPortrait);
            break;
    }
}
//displays the matching speech bubble and calls the hide function after 5000 ms
function showSpeechBubble(dialogue, bubble, portrait) {
    bubble.innerHTML = dialogue;
    bubble.style.opacity = 1;
    portrait.style.opacity = 1;
    setTimeout(function(){hideSpeechBubble(bubble, portrait)}, 5000);
}
//hides the matching speech bubble
function hideSpeechBubble(bubble, portrait) {
    portrait.style.opacity = 0;
    bubble.style.opacity = 0;
    bubble.innerHTML = " ... ";
}
// Conversation tree when talking to the cellar
function cellarTree() {
    // Turn the speech balloon into a list
    mainCharacterSpeech.innerHTML = "<ul id=\"multipeChoice\"></ul>";
    // Create the options as list items
    let option1 = document.createElement("li");
    let option2 = document.createElement("li");
    let option3 = document.createElement("li");
    // Give them ids
    option1.id = "option1";
    option2.id = "option2";
    option3.id = "option3";
    // Fill the options with text
    option1.innerText = "The Spanish inquisition";
    option2.innerText = "Alex";
    option3.innerText = "I don't know. Maybe you could refresh my memory.";
    // Append them to the speech bubble
    mainCharacterSpeech.append(option1);
    mainCharacterSpeech.append(option2);
    mainCharacterSpeech.append(option3);
    mainCharacterSpeech.style.opacity = 1;
    heroPortrait.style.opacity = 1;
}