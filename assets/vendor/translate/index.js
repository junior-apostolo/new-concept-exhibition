const titleEl = document.querySelector(".title");
const subTitleEl = document.querySelector(".subTitle");
const aboutNavEl = document.querySelector("#aboutNav");
const servicesNavEl = document.querySelector("#servicesNav");
const contactNavEl = document.querySelector("#contactNav");
const aboutUsEl = document.querySelector("#aboutUs");
const languageSelected = document.querySelector(".language-selected");
const descAbout = document.querySelector("#aboutDescription1");
const descAboutSecond = document.querySelector("#aboutDescription2");
const frequentlyTitle = document.querySelector("#frequentlyTitle")
const questionDesc = document.querySelector("#questionDesc")
const faq1 = document.querySelector("#faq1")
const faq2 = document.querySelector("#faq2")
const faq3 = document.querySelector("#faq3")
const faq4 = document.querySelector("#faq4")
const answer1 = document.querySelector("#answer1")
const answer2 = document.querySelector("#answer2")
const answer3 = document.querySelector("#answer3")
const answer4 = document.querySelector("#answer4")

const titleService = document.querySelector("#titleService")
const serviceDesc = document.querySelector("#serviceDesc")
const serviceCard1 = document.querySelector("#serviceCard1")
const serviceCard2 = document.querySelector("#serviceCard2")
const serviceCard3 = document.querySelector("#serviceCard3")
const serviceCard4 = document.querySelector("#serviceCard4")
const textCard1 = document.querySelector("#textCard1")
const textCard2 = document.querySelector("#textCard2")
const textCard3 = document.querySelector("#textCard3")
const textCard4 = document.querySelector("#textCard4")
const titleTeam = document.querySelector("#titleTeam")
const descTeam = document.querySelector("#descTeam")

const contactForm = document.querySelector("#contactForm")
const descriptionContact = document.querySelector("#descriptionContact")
const address = document.querySelector("#address")
const phone = document.querySelector("#phone")
const titleBG = document.querySelector("#titleBG")
const descriptionBG = document.querySelector("#descriptionBG")


import { data } from "../../../locales/language.js";

document.querySelectorAll(".dropdown ul li a").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();

    var valorSelecionado = event.target.textContent.trim();

    if (valorSelecionado === "en-US") {
      languageSelected.textContent = "en-US";
      languageSelected.className = "language-selected change-en";
    } else {
      languageSelected.textContent = "pt-BR";
      languageSelected.className = "language-selected change-br";
    }

    titleEl.textContent = data[valorSelecionado].title;
    subTitleEl.textContent = data[valorSelecionado].subTitle;
    aboutNavEl.textContent = data[valorSelecionado].aboutNavEl;
    servicesNavEl.textContent = data[valorSelecionado].servicesNavEl;
    contactNavEl.textContent = data[valorSelecionado].contactNavEl;
    aboutUsEl.textContent = data[valorSelecionado].aboutUsEl;
    descAbout.textContent = data[valorSelecionado].descAbout;
    descAboutSecond.textContent = data[valorSelecionado].descAboutSecond;
    frequentlyTitle.textContent = data[valorSelecionado].frequentlyTitle;
    questionDesc.textContent = data[valorSelecionado].questionDesc;
    faq1.textContent = data[valorSelecionado].faq1;
    faq2.textContent = data[valorSelecionado].faq2;
    faq3.textContent = data[valorSelecionado].faq3;
    faq4.textContent = data[valorSelecionado].faq4;
    answer1.textContent = data[valorSelecionado].answer1;
    answer2.textContent = data[valorSelecionado].answer2;
    answer3.textContent = data[valorSelecionado].answer3;
    answer4.textContent = data[valorSelecionado].answer4;
    titleService.textContent = data[valorSelecionado].titleService;
    serviceDesc.textContent = data[valorSelecionado].serviceDesc;
    textCard1.textContent = data[valorSelecionado].textCard1;
    textCard2.textContent = data[valorSelecionado].textCard2;
    textCard3.textContent = data[valorSelecionado].textCard3;
    textCard4.textContent = data[valorSelecionado].textCard4;
    serviceCard1.textContent = data[valorSelecionado].serviceCard1;
    serviceCard2.textContent = data[valorSelecionado].serviceCard2;
    serviceCard3.textContent = data[valorSelecionado].serviceCard3;
    serviceCard4.textContent = data[valorSelecionado].serviceCard4;
    titleTeam.textContent = data[valorSelecionado].titleTeam;
    descTeam.textContent = data[valorSelecionado].descTeam;
    descriptionContact.textContent = data[valorSelecionado].descriptionContact
    contactForm.textContent = data[valorSelecionado].contactForm
    address.textContent = data[valorSelecionado].address
    phone.textContent = data[valorSelecionado].phone
    titleBG.textContent = data[valorSelecionado].titleBG
    descriptionBG.textContent = data[valorSelecionado].descriptionBG
  });
});