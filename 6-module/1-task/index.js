/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement("table");

    const header = ["Имя", "Возраст", "Зарплата", "Город"];
    const thead = document.createElement('thead');

    const tr = document.createElement("tr");
    for (let key in header) {
      let th = document.createElement("th");
      th.innerHTML = header[key];
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    this.elem.appendChild(thead);
    this.setUpTable();
  }

  setUpTable() {
    let tbody = document.createElement("tbody");
    for (let row of this.rows) {
      let tr = document.createElement("tr");
      for (let key in row) {
        const cell = row[key];
        let td = document.createElement("td");
        td.innerHTML = cell;
        tr.appendChild(td);
      };
      let button = document.createElement("button");
      button.innerHTML = "X";
      let td = document.createElement('td');
      td.appendChild(button);
      tr.appendChild(td);


      button.onclick = function (event) {
        let target = event.target;
        if (target != button) return;
        tr.remove();

      }
      tbody.appendChild(tr);
    }
    this.elem.appendChild(tbody);
  }
}
