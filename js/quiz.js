let questions = [];
let tempsInterval;
let tempsQuiz = 300; 
let pseudo = "";

async function loadQuestions() {
  const response = await fetch("../json/question.json");
  const questions = await response.json();
  return questions.sort(() => 0.5 - Math.random()).slice(0, 20);
}

function apparitionQuestion(q){
    const quizContainer = document.getElementById("question-quiz");
    quizContainer.innerHTML = ""; 
    
    q.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "quiz-question";
        
        const filset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = `Question ${index + 1} : ${question.question}`;
        filset.appendChild(legend);

        if(question.type === "radio" || question.type === "checkbox") {
            question.options.forEach(option => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = question.type;
                input.name = `q${question.id}`;
                input.value = option;
                
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                filset.appendChild(label);
            });
        } else if(question.type === "text") {
            const input = document.createElement("textarea");
            input.name = `q${question.id}`;
            input.rows = 4;
            filset.appendChild(input);
        }
        
        questionDiv.appendChild(filset);
        
        quizContainer.appendChild(questionDiv);
    });
}

function starTimer(){
    tempsInterval = setInterval(function () {
        tempsQuiz--;
        const minutes = Math.floor(tempsQuiz / 60);
        const seconds = tempsQuiz % 60;
        const timerElement = document.getElementById("timer");
        timerElement.textContent = `Temps restant : ${minutes}m ${seconds}s`;

        if (tempsQuiz <= 0) {
            timerElement.textContent = "Temps écoulé !";
            checkQuiz();
        }
    }, 1000);
}

function verificationInfo(){
    var input = document.getElementById("start-form").querySelectorAll("input");
    var allFilled=true;
    var emailValid=true;

    input.forEach(function(item) {
        if (!item.value.trim()) {
            allFilled = false;
        }
        if (item.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(item.value.trim())) {
                emailValid = false;
            }
        }
    });

    if (!allFilled) {
        alert("Veuillez remplir tous les champs !");
    } else if (!emailValid) {
        alert("Veuillez entrer une adresse e-mail valide !");
    } else{

        var bouton = document.getElementById("start-button");
        pseudo= document.getElementById("pseudo").value.trim();
        bouton.style.display = "none";

        var debut=5;
        var debutTimer= document.createElement("p");
        debutTimer.textContent = debut + " secondes";
        debutTimer.style.color = "#3358a3";
        debutTimer.style.fontSize = "1.6em";
        debutTimer.style.fontWeight = "bold";
        debutTimer.style.textAlign = "center";

        var start = document.getElementById("start-form");
        start.appendChild(debutTimer);

        var interval = setInterval(async function () {
            debut--;
            debutTimer.textContent = debut + " secondes";

            if(debut === 0){
                clearInterval(interval);
                debutTimer.style.display = "none";
                questions = await loadQuestions();
                apparitionQuestion(questions);
                document.getElementById("start-button").style.display = "none";
                starTimer();
                document.getElementById("quiz-button").style.display = "block";
            }
        }, 1000);

        const formElements = document.querySelectorAll("#start-form input, #start-form button, #start-form textarea, #start-form select");
        formElements.forEach(el => {
            el.disabled = true;
        });
        
    }

}

function checkQuiz() {
    clearInterval(tempsInterval);

    const donnee= new FormData(document.getElementById("quiz-form"));
    let score=0;

    questions.forEach(question => {

        let reponse;
        if (question.type === "checkbox") {
            reponse = donnee.getAll(`q${question.id}`).map(a => a.trim().toLowerCase());
        } else {
            const value = donnee.get(`q${question.id}`);
            if (value === null || value.trim() === "") {
                reponse = [];
            }else{
                reponse = [value.trim().toLowerCase()];
            }
        }

        const bonnesReponse = question.correct.map(a => a.trim().toLowerCase());


        if(question.type === "radio" || question.type === "text") {
;
            if (reponse.length === 1 && bonnesReponse.includes(reponse[0])) {
                score++;
            }
        }else{
            if (reponse.length === bonnesReponse.length && reponse.every(answer => bonnesReponse.includes(answer))) {
                score++;
            }
        }
    });

    const Score=document.getElementById("user-score");
    if(score === 20) Score.textContent = `Félicitations ${pseudo} ! Tu connais le site par cœur ! Vous avez atteint le ${score} sur ${questions.length}.`;
        else if(score >= 15) Score.textContent = `Bravo ${pseudo} ! Tu connais bien le site ! Vous avez atteint le ${score} sur ${questions.length}.`;
        else if(score >= 10) Score.textContent = `Pas mal ${pseudo} ! Mais tu peux encore explorer le site ! Vous avez atteint le ${score} sur ${questions.length}.`;
        else if(score >= 7) Score.textContent = `Essaie encore ${pseudo} ! Tu découvriras plein de choses ! Vous avez atteint le ${score} sur ${questions.length}.`;
        else Score.textContent = `Oh non ${pseudo} ! Tu as encore beaucoup à découvrir sur le site ! Vous avez atteint le ${score} sur ${questions.length}.`;
    Score.style.display = "block";

    const resultat = JSON.parse(localStorage.getItem("scoreboard") || "[]");
    resultat.push({ pseudo: pseudo, score});
    resultat.sort((a, b) => b.score - a.score);
    localStorage.setItem("scoreboard", JSON.stringify(resultat));
    renderScoreboard(resultat);
    document.getElementById("quiz-button").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("reload-button").style.display = "block";
}

function resetQuiz() {
    const startForm = document.getElementById("start-form");
    startForm.reset();

    const formElements = document.querySelectorAll("#start-form input, #start-form button, #start-form textarea, #start-form select");
        formElements.forEach(el => {
            el.disabled = false;
        });

    document.getElementById("question-quiz").innerHTML = "";
    document.getElementById("user-score").textContent = "";
    document.getElementById("timer").textContent = "";
    document.getElementById("timer").style.display = "block";

    pseudo = "";
    document.getElementById("reload-button").style.display = "none";
}

function resetScoreboard() {
    var q=confirm("Es-tu sûr de vouloir supprimer tous les scores ?");
    if (q) {
        localStorage.removeItem("scoreboard"); 
        document.getElementById("scoreboard-body").innerHTML = ""; 
        document.getElementById("user-score").textContent = ""; 
        document.getElementById("reset-scoreboard").style.display = "none";
        document.getElementById("scoreboard").style.display = "none";
    }
}

function renderScoreboard(resultat) {
    document.getElementById("scoreboard").style.display = "table";
    document.getElementById("reset-scoreboard").style.display = "block";
    
    const scoreboard = document.getElementById("scoreboard-body");
    scoreboard.innerHTML = ""; 

    resultat.forEach(entre => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${entre.pseudo}</td><td>${entre.score}</td>`;
        scoreboard.appendChild(row);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  const resultat = JSON.parse(localStorage.getItem("scoreboard")) || [];
  if (resultat.length > 0) {
    renderScoreboard(resultat);
  }
});