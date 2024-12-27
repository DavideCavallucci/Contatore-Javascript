// Funzione auto-eseguita per evitare di contaminare lo spazio globale
(function () {
    // Riferimenti agli elementi del DOM
    const counterEl = document.getElementById("counter"); // Elemento visuale del contatore
    const incrementBtn = document.getElementById("increment"); // Bottone per incrementare
    const decrementBtn = document.getElementById("decrement"); // Bottone per decrementare
    const resetBtn = document.getElementById("reset"); // Bottone per resettare
    const doubleBtn = document.getElementById("double"); // Bottone per raddoppiare
    const halveBtn = document.getElementById("halve"); // Bottone per dimezzare

    // Configurazione iniziale
    const config = {
        allowNegative: false, // Se false, impedisce valori negativi
        localStorageKey: "counterValue", // Chiave per salvare il contatore in localStorage
    };

    // Stato iniziale del contatore, recuperato dal localStorage o impostato a 0
    let counter = parseInt(localStorage.getItem(config.localStorageKey)) || 0;

    // Variabile per gestire l'incremento/decremento continuo
    let holdInterval;

    /**
     * Aggiorna il valore del contatore sullo schermo e nel localStorage
     * @param {number} value - Il nuovo valore del contatore
     */
    function updateCounter(value) {
        counter = value;
        counterEl.textContent = counter; // Aggiorna l'elemento del contatore
        localStorage.setItem(config.localStorageKey, counter); // Salva il valore
        updateButtonStates(); // Aggiorna lo stato dei pulsanti
    }

    /**
     * Disabilita o abilita i pulsanti in base al valore del contatore
     */
    function updateButtonStates() {
        decrementBtn.disabled = counter <= 0; // Disabilita se contatore <= 0
        resetBtn.disabled = counter === 0; // Disabilita se contatore è 0
        doubleBtn.disabled = counter === 0; // Disabilita se contatore è 0
        halveBtn.disabled = counter <= 1; // Disabilita se contatore <= 1
    }

    /**
     * Avvia un'operazione continua (incremento/decremento)
     * @param {function} operation - Funzione da eseguire ripetutamente
     */
    function startHold(operation) {
        holdInterval = setInterval(operation, 200); // Esegue ogni 200ms
    }

    /**
     * Ferma l'operazione continua (incremento/decremento)
     */
    function stopHold() {
        clearInterval(holdInterval); // Interrompe il setInterval
    }

    // Inizializza il contatore visivamente e aggiorna lo stato dei pulsanti
    updateCounter(counter);

    // Event Listeners per le operazioni di base
    incrementBtn.addEventListener("click", () => updateCounter(counter + 1));
    decrementBtn.addEventListener("click", () => {
        if (counter > 0) updateCounter(counter - 1);
    });
    resetBtn.addEventListener("click", () => updateCounter(0));
    doubleBtn.addEventListener("click", () => updateCounter(counter * 2));
    halveBtn.addEventListener("click", () => updateCounter(Math.floor(counter / 2)));

    // Gestione dell'incremento continuo al click prolungato
    incrementBtn.addEventListener("mousedown", () => startHold(() => updateCounter(counter + 10)));
    incrementBtn.addEventListener("mouseup", stopHold);
    incrementBtn.addEventListener("mouseleave", stopHold);

    // Gestione del decremento continuo al click prolungato
    decrementBtn.addEventListener("mousedown", () => startHold(() => {
        if (counter > 0) updateCounter(Math.max(0, counter - 10));
    }));
    decrementBtn.addEventListener("mouseup", stopHold);
    decrementBtn.addEventListener("mouseleave", stopHold);
})();
