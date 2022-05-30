
function showSalary(users, age) {

  const adults = users
    .filter(user => user["age"] <= age)
    .map( user => {
      return  user["name"] + ", " + user["balance"];   
    } ) 
 return adults.join("\n");
}