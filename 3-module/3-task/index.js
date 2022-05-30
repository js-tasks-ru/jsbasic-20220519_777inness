function camelize(str) {
  let arr = str.split("-");
  let newArr = arr.map( item => arr.indexOf(item)==0? item : item[0].toUpperCase() + item.slice(1));
  let upperCaseStr = newArr.join("");
  return upperCaseStr ;
 }