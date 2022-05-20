function ucFirst(str) {
	if(!!str === true){
 let newString = str[0].toUpperCase() + str.slice(1);
 return newString;
} return str;
}
alert(ucFirst(""));