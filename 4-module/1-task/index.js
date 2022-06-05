function makeFriendsList(friends) {

  let list = document.createElement('ul');

/*
  let liFirst = document.createElement('li');
  liFirst.innerHTML = `${friends[0].firstName} ${friends[0].lastName}`;
  list.append(liFirst);

  let liSecond = document.createElement('li');
  liSecond.innerHTML = `${friends[1].firstName} ${friends[1].lastName}`;
  list.append(liSecond);

  let liThird = document.createElement('li');
  liThird.innerHTML = `${friends[2].firstName} ${friends[2].lastName}`;
  list.append(liThird);
 */

friends.forEach(element => {
  let li = document.createElement('li');
  li.innerHTML = `${element.firstName} ${element.lastName}`;
  list.append(li);
});

return list;

}

let friends = [
  {
      firstName: 'Artsiom',
      lastName: 'Mezin'
  },
  {
      firstName: 'Ilia',
      lastName: 'Kantor'
  },
  {
      firstName: 'Christopher',
      lastName: 'Michael'
  }
];