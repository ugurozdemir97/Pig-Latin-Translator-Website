
/* ------------- VARIABLES -------------- */

// NOTEBOOK IMAGE
const image = document.querySelector(".bookimg");

// BOOKMARKS
const piglatin = document.querySelector(".piglatin");
const bird = document.querySelector(".bird");

// STICKERS
const pigStickers = document.querySelectorAll(".pigstickers");
const birdStickers = document.querySelectorAll(".birdstickers");

// TEXT AREA
let pageTitle = document.querySelector(".title");
const textarea = document.querySelector("textarea");
const translation = document.querySelector(".translation");

// SELECTED LANGUAGE
let language = "bird";

// SELECTED VARIATION
let variation = "g";

// LETTERS
let vowelArray = ["a","e","i","o","u"];
let punctuationArray = [".", ",", ":", ";", "!", "+", "-", "/", "*", "%", "\"", "&", "(", ")", "?"];
let punctuation = "";
let word = "";

/* ---------- CHANGE DESIGN ------------- */

if (window.innerWidth < 700) {
    image.src = "./Images/Booksmall.png";
}

window.addEventListener("resize", (event) => {
    if (window.innerWidth < 700) {
        image.src = "./Images/Booksmall.png";
    } else {
        image.src = "./Images/Book.png";
    }
});

/* ---------- CHANGE LANGUAGE ------------- */

piglatin.addEventListener("click", toggleInBook);
bird.addEventListener("click", toggleInBook);

function toggleInBook () {

    if (this.classList[0] == "bird") {  // If bird language is selected adjust classes and change title
    
        bird.classList.remove("inbook");
        piglatin.classList.add("inbook");
        pageTitle.innerText = "Bird Language";
        document.title = "Bird Language";

        pigStickers.forEach(s => {
            s.classList.add("shadowed");
            s.classList.remove("selected");
        })

        birdStickers.forEach(s => {
            s.classList.remove("remove");
        })

        birdStickers[3].classList.add("selected");

        language = "bird";  // Selected language is "bird" and the defauld variation is "g"
        variation = "g";

    } else {  // If pig latin is selected

        bird.classList.add("inbook");
        piglatin.classList.remove("inbook");
        pageTitle.innerText = "Pig Latin";
        document.title = "Pig Latin";

        pigStickers.forEach((s) => {
            s.classList.remove("shadowed");
        })

        birdStickers.forEach(s => {
            s.classList.add("remove");
            s.classList.remove("selected");
        })

        pigStickers[2].classList.add("selected");

        language = "pig";  // Selected language is "pig" and the defauld variation is "yay"
        variation = "yay";
    }
}

/* ---------- CHANGE VARIATION ------------- */

birdStickers.forEach(s => {
    s.addEventListener("click", selectVariation);
})

pigStickers.forEach(s => {
    s.addEventListener("click", selectVariation);
})

function selectVariation () {

    // Doesn't allow selecting pig latin variations if selected language is bird
    if ((language == "bird" && this.classList[0] == "birdstickers") || language == "pig")  {

        pigStickers.forEach(s => {
            s.classList.remove("selected");
        })
        birdStickers.forEach(s => {
            s.classList.remove("selected");
        })
        this.classList.add("selected");
        variation = this.classList[2];  // Change selected variation
    }
}

/* ---------- TRANSLATE BIRD LANGUAGE ------------- */

textarea.addEventListener("input", translate);

function translate () {

    if (language == "bird") {

        let text = "";

        for (let i = 0; i < textarea.value.length; i++) {

            switch (textarea.value[i].toLowerCase()) {  // If there is a vowel add "vowel variation vowel"
                case "a":
                    text += `a${variation}a`;
                    break;
                case "e":
                    text += `e${variation}e`;
                    break;
                case "u":
                    text += `u${variation}u`;
                    break;
                case "ü":
                    text += `ü${variation}ü`;
                    break;
                case "ı":
                    text += `ı${variation}ı`;
                    break;
                case "i":
                    text += `i${variation}i`;
                    break;
                case "o":
                    text += `o${variation}o`;
                    break;
                case "ö":
                    text += `ö${variation}ö`;
                    break;
                default:  // If any other char add the char
                    text += textarea.value[i].toLowerCase();
            }
        }

        translation.innerText = (text.charAt(0).toLocaleUpperCase('TR') + text.slice(1))
        .replace(/([!?.]\s+)([a-z])/g, function(m, $1, $2) {
            return $1+$2.toLocaleUpperCase('TR');});;  // Display it by capitalising it

    } else {

        let text = "";
        
        if (textarea.value != "") {

            let words = textarea.value.toLowerCase().split(" ");

            words.forEach(eachWord => {

                // Check every word to see if there is a punctuation
                for (let i = 0; i < eachWord.length; i++) {

                    if (punctuationArray.includes(eachWord[i])) {  // If there is a punctuation in the word replace it.

                        // So the word "okay." will not be "okay.yay" but will be "okayyay."
                        punctuation += eachWord[i];

                    } else {
                        word += eachWord[i];
                    }
                }

                if (vowelArray.includes(word[0])) {  // If the word starts with vowel show "word variation"
                    text += word + variation + punctuation + " ";
                } else if (word.length <= 1) {  // If the word is an empty string or a single consonant show it
                    text += word + punctuation;
                } else {  // If the word starts with a consonant place it to the end and add "ay"
                    text += word.substring(1) + word.charAt(0) + "ay" + punctuation + " ";
                }

                punctuation = "";
                word = "";
            })
        }

        translation.innerText = (text.charAt(0).toUpperCase() + text.slice(1))
        .replace(/([!?.]\s+)([a-z])/g, function(m, $1, $2) {
            return $1+$2.toUpperCase();});
    }
}
