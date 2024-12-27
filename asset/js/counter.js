// Funzione auto-eseguita per evitare di contaminare lo spazio globale
(function () {
    // Riferimenti agli elementi del DOM
    const counterEl = document.getElementById("counter");

    // Bottoni
    const incrementBtn = document.getElementById("increment");
    const decrementBtn = document.getElementById("decrement");
    const resetBtn = document.getElementById("reset");
    const doubleBtn = document.getElementById("double");
    const halveBtn = document.getElementById("halve");

    // Configurazione iniziale
    const config = {
        allowNegative: false, // Se false, non permette valori negativi
        localStorageKey: "counterValue", // Chiave per salvare il contatore
    };

    // Stato del contatore
    let counter = parseInt(localStorage.getItem(config.localStorageKey)) || 0;

    // Variabile per gestire l'auto-incremento/decremento
    let holdInterval;

    /**
     * Aggiorna il contatore visivamente e nel localStorage
     * @param {number} value - Nuovo valore del contatore
     */
    function updateCounter(value) {
        counter = value;
        counterEl.textContent = counter;
        localStorage.setItem(config.localStorageKey, counter);
        updateButtonStates(); // Aggiorna lo stato dei pulsanti
    }

    /**
     * Aggiorna lo stato dei pulsanti in base al valore del contatore
     */
    function updateButtonStates() {
        decrementBtn.disabled = counter <= 0;
        resetBtn.disabled = counter === 0;
        doubleBtn.disabled = counter === 0;
        halveBtn.disabled = counter <= 1;
    }

    /**
     * Inizia l'incremento/decremento continuo
     * @param {function} operation - Operazione da eseguire
     */
    function startHold(operation) {
        holdInterval = setInterval(operation, 200);
    }

    /**
     * Ferma l'incremento/decremento continuo
     */
    function stopHold() {
        clearInterval(holdInterval);
    }

    // Inizializzazione
    updateCounter(counter);

    // Event Listeners
    incrementBtn.addEventListener("click", () => {
        updateCounter(counter + 1);
    });

    decrementBtn.addEventListener("click", () => {
        if (counter > 0) {
            updateCounter(counter - 1);
        }
    });

    resetBtn.addEventListener("click", () => {
        updateCounter(0);
    });

    doubleBtn.addEventListener("click", () => {
        updateCounter(counter * 2);
    });

    halveBtn.addEventListener("click", () => {
        updateCounter(Math.floor(counter / 2));
    });

    // Incremento/Decremento continuo con click prolungato
    incrementBtn.addEventListener("mousedown", () => startHold(() => {
        updateCounter(counter + 10);
    }));
    incrementBtn.addEventListener("mouseup", stopHold);
    incrementBtn.addEventListener("mouseleave", stopHold);

    decrementBtn.addEventListener("mousedown", () => startHold(() => {
        if (counter > 0) {
            updateCounter(Math.max(0, counter - 10));
        }
    }));
    decrementBtn.addEventListener("mouseup", stopHold);
    decrementBtn.addEventListener("mouseleave", stopHold);
})();
