function dropDown(p) {
  const e = document.getElementsByClassName("dropDown")[0];
  const d = ["block", "none"];

  e.style.display = d[p];

  const t = ['0px','0px,-10px'];
  setTimeout(() => {
    e.style.transform = 'translate('+t[p]+')';
  },0);
}

function category(c) {
  const item = document.getElementById("item-" + c).innerHTML;
  document.getElementsByName("typeFloor")[0].value = item;
}

$(document).ready(function () {
  $("#budget").maskMoney();
});


let language;

document.querySelector(".dropdown ul li a").forEach((item) => {
  item.addEventListener("click", (event) => {
    const valueSelected = event.target.textContent.trim();

    language = valueSelected;
  });
})

function mudaMascara() {
  console.log(language)
  if (language == "English") {
    $('#valor').maskMoney('mask', {thousands:',', decimal:'.'});
  } else if (language == "pt-BR") {
    $('#valor').maskMoney('mask', {thousands:'.', decimal:','});
  }
}