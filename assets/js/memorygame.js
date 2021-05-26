let startBtn = document.getElementById("start");
let brands = [
    "mp3",
    "plane",
    "ring",
    "robot",
    "shoe",
    "suitcase",
    "palm-tree",
    "piggy-bank",
    "earth",
    "mario",
    "flower",
    "Yoshi",
    "Android_robot",
    "instagram",
    "xucxac",
    "color",
    "loa",
    "chicken",
];
let memorygame = document.getElementById("boardgame");

startBtn.addEventListener("click", () => {
    let brandsCopy = [...brands];
    memorygame.innerHTML = "";
    let diff = parseInt(document.getElementById("difficulty").value);

    //check and create card
    if (diff === 2 || diff === 4 || diff === 6) {
        var pickedBrands = [];
        for (let i = (diff * diff) / 2; i > 0; i--) {
            let randomBrand = brandsCopy.splice(
                Math.floor(Math.random() * brandsCopy.length),
                1
            ); // tranh trung lap
            pickedBrands.push(randomBrand);
            pickedBrands.push(randomBrand);
        }
        for (let i = 0; i < diff; i++) {
            let row = document.createElement("div");
            for (let j = 0; j < diff; j++) {
                let card = document.createElement("div");
                card.classList.add("card");

                let front_face = document.createElement("img");
                front_face.classList.add("front-face");
                front_face.setAttribute(
                    "src",
                    "./assets/images/memory_game/" +
                        pickedBrands.splice(
                            Math.floor(Math.random() * pickedBrands.length),
                            1
                        ) +
                        ".png"
                );
                let back_face = document.createElement("div");
                back_face.classList.add("back-face");
                card.appendChild(front_face);
                card.appendChild(back_face);
                row.appendChild(card);
            }
            memorygame.appendChild(row);
        }
    } else {
        alert("Gia tri khong hop le!");
    }

    //Flip effect
    flipCard();
});

function flipCard() {
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) =>
        card.addEventListener("click", function () {
            this.classList.add("flip");

            //match card
            let flipCards = document.querySelectorAll(".flip");
            let frontFlipCard = document.querySelectorAll(".flip .front-face");
            if (flipCards.length == 2) {
                if (
                    frontFlipCard[0].getAttribute("src") ==
                    frontFlipCard[1].getAttribute("src")
                ) {
                    flipCards[0].classList.add("matched");
                    flipCards[1].classList.add("matched");
                }
                setTimeout(() => {
                    flipCards[0].classList.remove("flip");
                    flipCards[1].classList.remove("flip");
                }, 500);
            }
        })
    );
}
