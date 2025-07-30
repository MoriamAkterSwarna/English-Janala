const getAllLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      displayLevels(data.data);
    });
};
const getLevelWords = (level) => {
  getEl("loader").classList.remove("hidden");
  getEl("word-container").classList.add("hidden");
  fetch(`https://openapi.programming-hero.com/api/level/${level}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      removeActive();
      getEl(`level-${level}-btn`).classList.add("active");
      displayWords(data.data);
    });
};
const loadWordDetail = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayWordDetail(data.data);
    });
};
const removeActive = (e) => {
  for (let btn of document.getElementsByClassName("level-btn")) {
    btn.classList.remove("active");
  }
};

const displayWordDetail = (data) => {
  console.log(data);

  getEl("modal-container").innerHTML = `
   
  <div class=" border p-3 border-sky-100 space-y-6">
    
        <h1 class="text-3xl">${
          data.word
        } (<i class="fa-solid fa-microphone"></i> : ${data.pronunciation})</h1>

        <div>
            <h1 class="text-xl font-bangla">Meaning</h1>
            <h1 class="text-xl font-bangla">${
              data.meaning ? data.meaning : "অর্থ পাওয়া যায়নি"
            }</h1>
        </div>

        <div>
            <h1 class="text-xl font-bangla">Example</h1>
            <h1 class="text-lg ">${data.sentence}</h1>
        </div>

        <div>
            <h1 class="text-xl font-bangla">সমার্থক শব্দ গুলো</h1>
            <div class="flex gap-3 flex-wrap hidden">
            ${data.synonyms
              .map((w) => `<button class="btn">${w}</button>`)
              .join(" ")}
            
            </div>
            <div class="flex gap-3 flex-wrap">
            ${data.synonyms
              .map((w) => `<button class="btn">${w}</button>`)
              .join(" ")}
            
           
            </div>
        
        </div>

    
    
    
  
  </div>
  
  `;
  getEl("my_modal_1").showModal();
};

// const increasePoints = (points) => {
//   getEl("pts").innerText = parseInt(getEl("pts").innerText) + parseInt(points);
//   getEl("success").showModal();
// };

const displayWords = (data) => {
  getEl("loader").classList.add("hidden");
  getEl("word-container").classList.remove("hidden");
  getEl("word-container").innerHTML = "";

  if (data.length == 0) {
    getEl("word-container").classList.remove("lg:grid-cols-3");
    getEl("word-container").innerHTML = `
          <div id="current-lesson" class="text-center py-10 col-span-full space-y-6">
            <img class="block mx-auto" src="./assets/alert-error.png" />
            <p class="font-bangla text-stone-500">
              এই  Lesson এ এখনো কোন Vocabulary  যুক্ত করা হয়নি।
            </p>
            <h2 class="font-bangla text-stone-800 text-4xl">
              নেক্সট  Lesson এ যান
            </h2>
          </div>
    
    `;
  } else {
    getEl("word-container").classList.add("lg:grid-cols-3");
  }
  data.forEach((word) => {
    const newCard = document.createElement("div");
    newCard.className = "card bg-base-100 shadow-xl p-5";

    newCard.innerHTML = `
            <div
              class="card-body border hover:bg-sky-50 transition-all duration-1000 border-sky-100 rounded text-center"
            >
              <h2 class="text-2xl font-semibold">${word.word}</h2>
              <p class="font-bangla text-xl"></p>
              <p class="font-bangla">Meaning /Pronounciation</p>
              <p class="font-bangla text-2xl">"${
                word.meaning ? word.meaning : "অর্থ নেই"
              } / ${word.pronunciation}"</p>

              <div class="card-actions justify-between">
                <button class="btn" onclick="loadWordDetail('${word.id}')">
                  <i class="fa-solid fa-circle-info"></i>
                </button>
               
                <button class="btn" onclick="pronounceWord('${word.word}')">
                  <i class="fa-solid fa-volume-high"></i>
                </button>
                
              </div>
            
            </div>
    `;

    getEl("word-container").append(newCard);
  });
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // Japanese
  window.speechSynthesis.speak(utterance);
}
const displayLevels = (data) => {
  data.forEach((lesson) => {
    const buttonBox = document.createElement("div");
    buttonBox.innerHTML = `<button id="level-${lesson.level_no}-btn" onclick="getLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary level-btn">
          <i  class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}
        </button>`;

    getEl("level-container").append(buttonBox);
  });
};

getEl("start-btn").addEventListener("click", () => {
  let userName = getEl("user-name-input").value;
  let userPass = getEl("user-pass-input").value;

  if (userName.length == 0) {
    return Swal.fire({
      title: "আপনার নাম দিন",
      text: "আমাদের কে আপনার পরিচয় দিতে হবে",
      icon: "error",
    });
  }
  if (userPass != "123456") {
    return Swal.fire({
      title: "ভুল লগ-ইন কোড",
      text: "123456 লগ-ইন কোড এ দিয়ে প্রবেশ করুন",
      icon: "error",
    });
  }
  Swal.fire({
    title: "অভিনন্দন",
    text: "চলুন আজ নতুন কিছু শেখা যাক ",
    icon: "success",
  });

  hideEl("hero");
  showEl("nav");
  showEl("playground");
  showEl("faq");
});

getEl("logout-btn").addEventListener("click", () => {
  hideEl("faq");
  hideEl("playground");
  hideEl("nav");
  showEl("hero");
});

getAllLevels();

hideEl("faq");
hideEl("playground");
hideEl("nav");
showEl("hero");
