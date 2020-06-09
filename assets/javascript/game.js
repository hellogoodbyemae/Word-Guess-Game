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
    {title: "material girl", artist: "Madonna"},
    {title: "rich girl", artist: "Hall & Oates"},
    {title: "just like heaven", artist: "The Cure"},
    {title: "when doves cry", artist: "Prince"},
    {title: "all night long", artist: "Lionel Richie"},
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

//begin the game >>>>

songTitle.style.display = "none";

wins.textContent = score;

songName = songs[songIndex].title;
displaySong();

var chances = songName.length + 5;
remainingChances.textContent = chances;

console.log(songName);


document.onkeydown = function(event) {
    if (songIndex === songs.length) {
        return;
    } 
    
    if (chances===0){ 
        word.textContent = "GAME OVER";
        return;
    }

    var key = event.key;  

    if(!(songName.indexOf(key) === -1) &&
    (correctChoicesArray.indexOf(key)===-1)){
   
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


        word.textContent = placeholder.join("");

    } else if (incorrectLettersArray.indexOf(key) === -1 && 
            (correctChoicesArray.indexOf(key)===-1)){


            incorrectLettersArray.push("" + key);

            letters.textContent = incorrectLettersArray;


            chances--;
            remainingChances.textContent = chances;

            

    } 


    if (chances===0){ 
        word.textContent = "GAME OVER";
        return;
    }
    
    
    var strPlaceholder = placeholder.join("");

    if(songName===strPlaceholder){

        score++;
        wins.textContent = score;

        songTitle.textContent= songName + " by " + songs[songIndex].artist;
        songTitle.style.display = "block";

        songIndex++;

        console.log(songIndex);

        songName = songs[songIndex%songs.length].title;
        placeholder=[];
        displaySong();

        chances = songName.length + 5;
        remainingChances.textContent = chances;
        incorrectLettersArray = []
        letters.textContent = incorrectLettersArray;

    } 

};