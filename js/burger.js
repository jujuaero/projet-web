let boutonBurger=null;
const nav=document.querySelector('nav');
const navLinks=document.querySelector('.nav-links');

function ResizeScreen(){
    if(window.innerWidth<=800){
        if(!boutonBurger){
            createBouttonBurger();
        }
    }else{
        removeBouttonBurger();
    }
}

function createBouttonBurger(){
    boutonBurger=document.createElement('button');
    boutonBurger.classList.add('menu-burger');
    boutonBurger.innerHTML='menu';

    boutonBurger.addEventListener('click',() =>{
        navLinks.classList.toggle("open");
    })
    nav.appendChild(boutonBurger);
}

function removeBouttonBurger(){
    if(boutonBurger){
        boutonBurger.remove();
        boutonBurger=null;
        navLinks.classList.remove("open");
    }
}

window.addEventListener('resize',ResizeScreen);
ResizeScreen();