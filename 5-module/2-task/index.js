/*
let btn = document.querySelector('toggle-text-button');
let text = document.querySelector('text');
btn.addEventListener('click', () => text.getAttribute(hidden) ? text.hidden = false : text.hidden = true);
let btn = document.querySelector('.toggle-text-button');
let text = document.querySelector('#text');

function toggleText() {
  btn.onclick = function(){
if(text.hidden) {
  text.hidden == false;
  
} else {
  text.hidden == true;
}
  }
}
console.log(toggleText());
*/



function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');

  btn.onclick = () => {
    text.hidden = !text.hidden;
  };
}


