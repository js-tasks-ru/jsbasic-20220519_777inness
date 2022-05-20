function truncate(str, maxlength) {
  if(str.length>maxlength){
     let newString = str.slice(0, maxlength-1) + "…";
      return newString;
  }return str;
  }
  