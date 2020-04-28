// Variables
var wins = document.getElementById("wins");
var word = document.getElementById("word");
var remainingChances = document.getElementById("chances");
var letters = document.getElementById("letters");
var songTitle = document.getElementById("song-title");
var placeholder = [];
var incorrectLettersArray = [];
var correctChoicesArray=[];
var score = 0;
var songIndex = 0;
var songs = [
    {title: "like a virgin", artist: "Madonna"},
    {title: "take on me", artist: "AH-HA"},
    {title: "message in a bottle", artist: "Police"},
    {title: "i ran", artist: "A Flock of Seaguls"},
    {title: "come sail away", artist: "Styx"},
];
var songName;

function displaySong() {
    if(songIndex <= songs.length-1) {
        
        for (var i = 0; i<songName.length;i++) {
            if(songName[i]===" "){
                placeholder.push(" ");
            }else if(songName[i] === "'") {
                placeholder.push("'");
            } else{
            placeholder.push("_");
            }
        }
        word.textContent = placeholder.join("");

    }
}

//=========================================================================================================================


//begin the game >>>>

// hide the song title at the top of the screen
songTitle.style.display = "none";

// set wins equal to zero
wins.textContent = score;

//display song at index zero on screen in hangman style
songName = songs[songIndex].title;
displaySong();

//determine number of chances
var chances = songName.length + 5;
remainingChances.textContent = chances;

//display song title in the console
console.log(songName);


//trigger event function on key press
document.onkeydown = function(event) {
    //do nothing when game is over
    if (songIndex === songs.length) {
        return;
    } 
    
    if (chances===0){   // user runs out of chances end game
        word.textContent = "GAME OVER";
        return;
    }

    // declare variable for event key
    var key = event.key;  

    //verify whether or not the letter exists in the string random, if not then add it to letters array AND verify if the letter already exists in the correctChoicesArray
    if(!(songName.indexOf(key) === -1) &&
    (correctChoicesArray.indexOf(key)===-1)){
    // user chose letter that is in the random song string. insert that letter into the string at the appropriate indices 
    var indexes = [];
    function correctGuess(){
        for(i=0; i < songName.length ; i++) {
            if(key === songName[i]) {
                indexes.push(i);
            }
        
        }
        for(i=0; i < indexes.length ; i++) {
            placeholder.splice(indexes[i],0,key);
            placeholder.splice(indexes[i]+1, 1);
        }   
    }

    correctGuess();


        // Display the correctly chosen letter on the page
        word.textContent = placeholder.join("");
        // console.log("indices of " + key  + ": " + indexes);

    } else if (incorrectLettersArray.indexOf(key) === -1 && 
            (correctChoicesArray.indexOf(key)===-1)){


            // add key to letters lettersArray
            incorrectLettersArray.push("" + key);
            //update DOM to show letters that have been selected
            letters.textContent = incorrectLettersArray;

            //take one chance away and update the chance counter
            chances--;
            remainingChances.textContent = chances;

            

    } 


    if (chances===0){   // user runs out of chances end game
        word.textContent = "GAME OVER";
        return;
    }
    
    
    // new song or end game
    //placeholder is an array. turn it into a string
    var strPlaceholder = placeholder.join("");

    if(songName===strPlaceholder){
        // increase score by 1
        score++;
        wins.textContent = score;
        // display title at top of screen
        songTitle.textContent= songName + " by " + songs[songIndex].artist;
        songTitle.style.display = "block";

        // increase songIndex by 1
        songIndex++;
        // display next song
        console.log(songIndex);

        songName = songs[songIndex%songs.length].title;
        placeholder=[];
        displaySong();

        // update chances
        chances = songName.length + 5;
        remainingChances.textContent = chances;
        incorrectLettersArray = []
        letters.textContent = incorrectLettersArray;

    } 


    /// end of event
};