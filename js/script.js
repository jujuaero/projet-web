var perso = document.querySelector(".perso");
var obstacles = document.querySelector(".obstacles");
var obstacles2 = document.querySelector(".obstacles2");
var jeu = document.querySelector(".jeu");
var compteur = 0;
var jeuEnCours = false;
var record = parseInt(localStorage.getItem('iceRaceRecord')) || 0;

var oursFrames = [
    "../images/ours1.png",
    "../images/ours2.png",
    "../images/ours3.png",
    "../images/ours4.png"
];
var oursInterval = null;
var currentFrame = 0;

window.addEventListener('load', function() {
    document.getElementById("record").innerHTML = ("Record : " + record);
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        if (jeuEnCours) {
            sauter();
        }
    }
});

function start(){
    obstacles.style.animation = "block 1.5s infinite linear";
    compteur = 0;
    jeuEnCours = true;
    perso.style.backgroundImage = "url('ours1.png')";
    perso.style.top = "88px";
    document.getElementById("p").innerHTML = ("Score : " + compteur);
    jeu.classList.add("bg-anim");
    startOursAnimation();
    verification();
}

function startOursAnimation() {
    if (oursInterval) clearInterval(oursInterval);
    currentFrame = 0;
    oursInterval = setInterval(function() {
        currentFrame = (currentFrame + 1) % oursFrames.length;
        perso.style.backgroundImage = "url('" + oursFrames[currentFrame] + "')";
    }, 120);
}

function stopOursAnimation() {
    if (oursInterval) clearInterval(oursInterval);
    perso.style.backgroundImage = "url('../images/casse.png')";
}

function updateRecord() {
    if (compteur > record) {
        record = compteur;
        localStorage.setItem('iceRaceRecord', record);
        document.getElementById("record").innerHTML = ("Record : " + record);
        console.log("Nouveau record ! " + record);
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function getInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function P(){
    if(compteur == 0){
        perso.style.backgroundImage = "url('icon2.png')";
        perso.style.top = "88px";
        document.getElementById("p").innerHTML = ("Score : " + compteur);
    }
    var alea = getInteger(1, 2);
    var aleatime = 1 + getInteger(1, 5) * 0.1;
    var tout = "block " + aleatime +"s infinite linear";
    if(alea == 2){
        obstacles.style.animation = tout;
    } else {
        obstacles2.style.animation = tout;
    }
    sleep(aleatime);
    if (perso.style.backgroundImage != "url('casse.png')"){
        P();
    }
}

function sauter(){
    if(!jeuEnCours) return;
    
    if(perso.classList != "animation"){
        perso.classList.add('animation');
    }
    setTimeout(function(){
        perso.classList.remove('animation');
    }, 500), verification()
}

function verification(){
    var verification = setInterval(function(){
        var persoTop = parseInt(window.getComputedStyle(perso).getPropertyValue("top"));
        var obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));
        var obstaclesLeft2 = parseInt(window.getComputedStyle(obstacles2).getPropertyValue("left"));
        
        if(obstaclesLeft < 100 && obstaclesLeft > 0 && persoTop >= 60 ){
            jeuEnCours = false;
            updateRecord();
            stopOursAnimation();
            perso.style.top = "133px";
            setTimeout('', 500);
            obstacles.style.animation = "none";
            obstacles2.style.animation = "none";
            jeu.classList.remove("bg-anim");
            clearInterval(verification);
        }
        
        compteur = ++compteur;
        if(obstaclesLeft <= 0){
            if(compteur >= 1000){
                compteur = compteur + 3;
                document.getElementById("p").innerHTML = ("Score : " + compteur);
            } else {
                compteur = compteur;
                document.getElementById("p").innerHTML = ("Score : " + compteur);
            }
        }
    }, 0);
}


