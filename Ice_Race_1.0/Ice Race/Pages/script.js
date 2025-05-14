var perso = document.querySelector(".perso");
var obstacles = document.querySelector(".obstacles");
var obstacles2 = document.querySelector(".obstacles2");
var compteur = 0;

function start(){obstacles.style.animation = "block 1.5s infinite linear";compteur = 0;perso.style.backgroundImage = "url('icon2.png')";perso.style.top = "88px";document.getElementById("p").innerHTML = ("Score : " + compteur);}
function sleep(milliseconds) {const date = Date.now();let currentDate = null;do {currentDate = Date.now();} while (currentDate - date < milliseconds);}
function getInteger(min, max) {  return Math.floor(Math.random() * (max - min + 1) ) + min;}

function P(){
	if(compteur=0){perso.style.backgroundImage = "url('icon2.png')";perso.style.top = "88px";document.getElementById("p").innerHTML = ("Score : " + compteur);}
	var alea = getInteger(1, 2);
	var aleatime = 1 + getInteger(1, 5) * 0.1;
	var tout = "block " + aleatime +"s infinite linear";
if(alea=2){obstacles.style.animation = tout;}
else{obstacles2.style.animation = tout;}
sleep(aleatime);
if (perso.style.backgroundImage != "url('casse.png')"){P();}
}



function sauter(){
    // function pour faire sauter le personnage
    if(perso.classList != "animation"){perso.classList.add('animation');}
    setTimeout(function(){perso.classList.remove('animation');},500), verification()}

	

//verifier si  l'obstacle touche le personnage
function verification(){
	var verification = setInterval(function(){var persoTop = parseInt(window.getComputedStyle(perso).getPropertyValue("top"));
	var obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));
	var obstaclesLeft2 = parseInt(window.getComputedStyle(obstacles2).getPropertyValue("left"));
    	if(obstaclesLeft<100 && obstaclesLeft >0 && persoTop>= 60){
			perso.style.backgroundImage = "url('casse.png')";
			perso.style.top = "133px";
			setTimeout('',500);
        	obstacles.style.animation = "none";}
			compteur = ++compteur;
			if(obstaclesLeft <= 0){if(compteur>=1000){compteur = compteur+3;document.getElementById("p").innerHTML = ("Score : " + compteur);}
			else{compteur = compteur;document.getElementById("p").innerHTML = ("Score : " + compteur);}}},0)}


			