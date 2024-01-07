let cardsArray = JSON.parse(localStorage.getItem('cards')) || [];

function addCard() {
    const nom = document.getElementById('nomInput').value;
    const descriptif = document.getElementById('descriptifInput').value;
    const lieu = document.getElementById('lieuInput').value;
    const note = document.getElementById('noteInput').value;
    const tips = document.getElementById('tipsInput').value;

    if (nom) {
        cardsArray.push({ nom, descriptif, lieu, note, tips });
        localStorage.setItem('cards', JSON.stringify(cardsArray));
        renderCards();
        clearInputs();
    }
}

function clearInputs() {
    document.getElementById('nomInput').value = '';
    document.getElementById('descriptifInput').value = '';
    document.getElementById('lieuInput').value = '';
    document.getElementById('noteInput').value = '';
    document.getElementById('tipsInput').value = '';
}

function sortCardsBy(category) {
    cardsArray.sort((a, b) => {
        if (typeof a[category] === 'string') {
            return a[category].localeCompare(b[category]);
        } else { // pour les types numériques comme 'note' si elle est stockée en tant que nombre
            return a[category] - b[category];
        }
    });
    localStorage.setItem('cards', JSON.stringify(cardsArray));
    renderCards();
}

function deleteCard(index) {
    cardsArray.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(cardsArray));
    renderCards();
}

function renderCards() {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    cardsArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <textarea readonly>${card.nom}</textarea>
            <textarea readonly>${card.descriptif}</textarea>
            <textarea readonly>${card.lieu}</textarea>
            <textarea readonly>${card.note}</textarea>
            <textarea readonly>${card.tips}</textarea>
            <div><button class="deleteBtn" onclick="deleteCard(${index})">X</button></div>
        `;
        container.appendChild(cardElement);
    });
}

// Initial Render
renderCards();
