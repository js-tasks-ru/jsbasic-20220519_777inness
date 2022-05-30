function getMinMax(str) {
  let arr = str.split(" ");
  let arrNumber = arr.filter(item => isFinite(parseInt(item)));

  return {
    min: Math.min(...arrNumber),
    max: Math.max(...arrNumber)
   }

}