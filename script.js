// etape 1 , la navBar qui disparait
const navBar = document.querySelector("nav");
const toggleButton = document.getElementById("toggleButton");
let mouseMove = 0;
let isEffectEnabled = true;

toggleButton.addEventListener("click", () => {
    isEffectEnabled = !isEffectEnabled;
    if (isEffectEnabled) {
        toggleButton.textContent = "Désactiver";
    } else {
        toggleButton.textContent = "Activer";
        navBar.style.display = "flex"; // Assurez-vous que la barre est visible lorsque l'effet est désactivé.
    }
});

window.addEventListener("mousemove", (e) => {
    if (!isEffectEnabled) return; // Si l'effet est désactivé, ne pas continuer.

    let mouseActu = e.clientY;

    if (mouseActu > mouseMove) {
        navBar.style.display = "none";
    } else {
        navBar.style.display = "flex";
    }

    mouseMove = mouseActu;
});

// etape 2, menu burger et sideBar

let burger = document.querySelector('#burger');
let sideBar = document.querySelector('#sideBar');
let sideBarDoor = false;

burger.addEventListener('click', () => {
    if (sideBarDoor) {
        sideBar.style.left = '-200px';
    } else {
        sideBar.style.left = '0';
    }
    sideBarDoor = !sideBarDoor; 
});

//etape 3 , changer le body de color

function aleatoireCouleur() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
}

function changeBackgroundColor() {
    const newColor = aleatoireCouleur();
    document.body.style.backgroundColor = newColor;
}

setInterval(changeBackgroundColor, 1000); 

// etape 4, generation auto de citation

const data = [
    "Phrase 1",
    "Phrase 2",
    "Phrase 3",
    "Phrase 4",
    "Phrase 5",
];

const generator = document.getElementById("generator");
let dernierePhrase = -1;

function displayRandomData() {
    const randomIndex = getRandomIndex();
    generator.textContent = data[randomIndex];
}

function getRandomIndex() {
    let nouvellePhrase;
    do {
        nouvellePhrase = Math.floor(Math.random() * data.length);
    } while (nouvellePhrase === dernierePhrase); 
    dernierePhrase = nouvellePhrase;
    return nouvellePhrase;
}

displayRandomData(); 

setInterval(displayRandomData, 5000); 

//étape 5 , un formulaire qui ajoute des ajout de lutilisateur, supprimable par un clique

const inputChose = document.getElementById("inputChose");
const outputChose = document.getElementById("outputChose");

inputChose.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const input = inputChose.elements.textInput;
    const inputValue = input.value.trim();

    if (inputValue !== "") {
        const paragraphe = document.createElement("p");
        paragraphe.textContent = inputValue;

        outputChose.appendChild(paragraphe);

        paragraphe.addEventListener("click", function() {
            outputChose.removeChild(paragraphe);
        });

        input.value = ""; // Clear the input field
    }
});

//etape 6, gestion d'intervals

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const annonce = document.getElementById("annonce");
const console = document.getElementById("console");
const clearConsole = document.getElementById("clearConsole");

let interON = null;

startButton.addEventListener("click", function() {
    if (interON === null) {
        interON = setInterval(function() {
            const message = "Interval is running\n";
            annonce.textContent += message;
            console.scrollTop = console.scrollHeight;
            
        }, 2000);
        } 
    
});

stopButton.addEventListener("click", function() {
    if (interON !== null) {
        clearInterval(interON);
        interON = null;
        const message = "Interval stopped\n";
        annonce.textContent += message;
    }
});

clearConsole.addEventListener("click", function() {
    annonce.textContent = ""; // Vide la console
});

