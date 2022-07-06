export default function promiseClick(button) {
  return new Promise( function (resolve, reject){
    button.onclick((event) => resolve(event));
  })
  
}

promiseClick(button)
  .then((event) => console.log(event));
