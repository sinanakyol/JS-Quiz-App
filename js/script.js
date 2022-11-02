// OOP: Nesne Tabanlı Programlama

const quiz = new Quiz(sorular);

let btn_startDOM = document.querySelector(".btn-start");
btn_startDOM.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex) {
    document.querySelector(".quiz_box").classList.add("active");
    startTimer(10);
    startTimeLiner();
    soruGoster(quiz.soruGetir());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    document.querySelector(".btn-next").classList.remove("show");
  }
});

let btn_nextDOM = document.querySelector(".btn-next");
btn_nextDOM.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex + 1) {
    quiz.soruIndex += 1;
    clearInterval(counter);
    clearInterval(counter_line);
    startTimer(10);
    startTimeLiner();
    soruGoster(quiz.soruGetir());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    document.querySelector(".btn-next").classList.remove("show");
  } else {
    clearInterval(counter);
    clearInterval(counter_line);
    document.querySelector(".quiz_box").classList.remove("active");
    document.querySelector(".score_box").classList.add("active");
    skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
  }
  document.querySelector(".time_text").innerHTML = "Time"; // Yeni soruda <Süre Bitti> textini düzeltmek için.
});

// Testi Bitir.
let btn_quitDOM = document.querySelector(".btn-quit");
btn_quitDOM.addEventListener("click", function () {
  window.location.reload(); //sayfa tekrar yüklenir. (en baştan)
});

// Tekrar Başlat.
let btn_replayDOM = document.querySelector(".btn-replay");
btn_replayDOM.addEventListener("click", function () {
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;
  btn_startDOM.click();
  document.querySelector(".score_box").classList.remove("active");
});

const optionList = document.querySelector(".option-list");
const correctIcon = '<div class="icon"><i class="fa-solid fa-check"></i></div>';
const incorrectIcon =
  '<div class="icon"><i class="fa-solid fa-xmark"></i></div>';

function soruGoster(soru) {
  let question = `<span>${soru.soruMetni}</span>`;
  let options = "";

  for (let cevap in soru.cevapSecenekleri) {
    options += `
        <div class="option">
          <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
        </div>
      `;
  }

  document.querySelector(".question-text").innerHTML = question;
  optionList.innerHTML = options;

  const option = optionList.querySelectorAll(".option");

  for (let opt of option) {
    opt.setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(option) {
  clearInterval(counter);
  clearInterval(counter_line);
  let cevap = option.querySelector("span b").textContent;
  let soru = quiz.soruGetir();

  if (soru.cevabiKontrolEt(cevap)) {
    quiz.dogruCevapSayisi += 1;
    option.classList.add("correct");
    option.insertAdjacentHTML("beforeend", correctIcon);
  } else {
    option.classList.add("incorrect");
    option.insertAdjacentHTML("beforeend", incorrectIcon);
  }

  for (let i = 0; i < optionList.children.length; i++) {
    optionList.children[i].classList.add("disabled");
  }

  document.querySelector(".btn-next").classList.add("show");
}

function soruSayisiniGoster(soruSirasi, toplamSoru) {
  let tag = `<span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>`;
  document.querySelector(".quiz_box .question_index").innerHTML = tag;
}

function skoruGoster(toplamSoru, dogruCevap) {
  let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
  document.querySelector(".score_box .score_text").innerHTML = tag;
}

let time_textDOM = document.querySelector(".time_text");
let time_secondDOM = document.querySelector(".time_second");
let counter;

function startTimer(time) {
  counter = setInterval(timer, 1000); // 1000 => 1sn

  function timer() {
    time_secondDOM.textContent = time;
    time--;

    //Süre Dolduğunda;
    if (time < 0) {
      clearInterval(counter); //Saniyeyi Sıfırlar.

      time_textDOM.innerHTML = "Time's Up";

      let cevap = quiz.soruGetir().dogruCevap;

      for (let option of optionList.children) {
        if (option.querySelector("span b").textContent == cevap) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", correctIcon);
        }

        option.classList.add("disabled");
      }

      btn_nextDOM.classList.add("show");
    }
  }
}

let time_lineDOM = document.querySelector(".time_line");
let counter_line;
function startTimeLiner() {
  let line_width = 0;

  counter_line = setInterval(timer, 28);

  function timer() {
    line_width += 1;
    time_lineDOM.style.width = line_width + "px";

    if (line_width > 399) {
      clearInterval(counter_line);
    }
  }
}
