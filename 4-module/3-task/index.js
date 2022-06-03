function highlight(table) {
  
  for (let i = 1; i < table.rows.length; i++) {
   
    if (table.rows[i].cells[3].getAttribute('data-available') == "true") {
      table.rows[i].classList.add("available")
    }
    else if (table.rows[i].cells[3].getAttribute('data-available') == "false") {
      table.rows[i].classList.add("unavailable")
    }
    else if (table.rows[i].cells[3].getAttribute('data-available') == null)
     table.rows[i].setAttribute("hidden", "true")
  }

  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[2].innerHTML == "m") {
      table.rows[i].classList.add("male")
    }
    else if (table.rows[i].cells[2].innerHTML == "f") {
      table.rows[i].classList.add("female")
    }
  }

  for (let i = 1; i < table.rows.length; i++) {
    if (parseInt(table.rows[i].cells[1].innerHTML, 10)< 18) {
      table.rows[i].style ="text-decoration: line-through";
    }

  }
    return table;
}
