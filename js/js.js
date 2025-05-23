function black_white() {
  document.querySelector("#p").innerHTML = "This game...";
  document.querySelector("#p").style.color="black";
}
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
function y0() {
  document.querySelector("#p").style.color="#3bb9cc";
  document.querySelector("#p").innerHTML = ".";
  document.body.style.backgroundImage = "url('Images/Back.png')";
  closeNav();
}
function y30() {
  document.querySelector("#p").style.color="#3bb9cc";
  document.querySelector("#p").innerHTML = ".";
  document.body.style.backgroundImage = "url('Images/Back-.png')";
  closeNav();
}
function y100() {
  document.querySelector("#p").style.color="#3bb9cc";
  document.querySelector("#p").innerHTML = ".";
  document.body.style.backgroundImage = "url('Images/Back--.png')";
  closeNav();
}