function checkQuiz() {
        const answers = ['b','c','a','c','b','a','a','c','a','a'];
        let score = 0;
        for(let i=1;i<=10;i++) {
            const q = document.querySelector('input[name="q'+i+'"]:checked');
            if(q && q.value === answers[i-1]) score++;
        }
        let msg = `<h2>Résultat : ${score}/10</h2>`;
        if(score === 10) msg += '<p>Parfait ! Tu connais le site par cœur !</p>';
        else if(score >= 7) msg += '<p>Bravo ! Tu connais bien le site.</p>';
        else if(score >= 4) msg += '<p>Pas mal, mais tu peux encore explorer le site !</p>';
        else msg += '<p>Essaie encore, tu découvriras plein de choses !</p>';
        document.getElementById('quiz-result').innerHTML = msg;
    }