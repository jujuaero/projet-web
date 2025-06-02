let boutonBurger = null;
const nav = document.querySelector('.headerNav'); 
const navLinks = document.querySelector('.nav-links');

function ResizeScreen(){
    if(window.innerWidth <= 800){
        if(!boutonBurger){
            createBouttonBurger();
        }
    } else {
        removeBouttonBurger();
    }
}

function createBouttonBurger(){
    boutonBurger = document.createElement('button');
    boutonBurger.classList.add('menu-burger');
    
    // Créer les 3 barres du menu burger
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('span');
        bar.classList.add('burger-bar');
        boutonBurger.appendChild(bar);
    }

    boutonBurger.addEventListener('click', () => {
        navLinks.classList.toggle("open");
        boutonBurger.classList.toggle("open");
    });
    
    nav.appendChild(boutonBurger);
}

function removeBouttonBurger(){
    if(boutonBurger){
        boutonBurger.remove();
        boutonBurger = null;
        navLinks.classList.remove("open");
    }
}

window.addEventListener('resize', ResizeScreen);
ResizeScreen();

document.addEventListener('DOMContentLoaded', function() {
    let boutonBurger = null;
    const nav = document.querySelector('.headerNav'); 
    const navLinks = document.querySelector('.nav-links');
    
    function ResizeScreen(){
        if(window.innerWidth <= 800){
            if(!boutonBurger){
                createBouttonBurger();
            }
        } else {
            removeBouttonBurger();
        }
    }
    
    function createBouttonBurger(){
        boutonBurger = document.createElement('button');
        boutonBurger.classList.add('menu-burger');
        
        for (let i = 0; i < 3; i++) {
            const bar = document.createElement('span');
            bar.classList.add('burger-bar');
            boutonBurger.appendChild(bar);
        }
    
        boutonBurger.addEventListener('click', () => {
            navLinks.classList.toggle("open");
            boutonBurger.classList.toggle("open");
        });
        
        nav.appendChild(boutonBurger);
    }
    
    function removeBouttonBurger(){
        if(boutonBurger){
            boutonBurger.remove();
            boutonBurger = null;
            navLinks.classList.remove("open");
        }
    }
    
    window.addEventListener('resize', ResizeScreen);
    ResizeScreen();
});