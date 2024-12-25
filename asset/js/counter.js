// ✏️ Prima di tutto dobbiamo cercare e ottenere il contenitore del display e il contenitore dei pulsanti dal DOM (ci serviranno dopo per appendere il primo il relativo valore e al secondo i relativi pulsanti), dopodiché dobbiamo assegnare ad una variabile il valore iniziale del display, che ovviamente sarà uguale a 0:

// Qui cerchiamo e otteniamo il contenitore del display e il contenitore dei pulsanti dal DOM
const displayContatore = document.querySelector('.contatore'); // contenitore display
const pulsantiContatore = document.querySelector('.pulsanti'); // contenitore pulsanti

// Qui memorizziamo il valore iniziale del contatore nella variabile "risultato" e poi creiamo il testo dinamico per i numeri da mettere all'interno del display
let risultato = 0;
displayContatore.innerText = risultato;  // testo del valore iniziale all'interno di <div class="contatore">

// ✏️ Ora dobbiamo creare i pulsanti dinamici da appendere al contenitore dei pulsanti:

// Qui creiamo il pulsante di decremento
const bottoneDecremento = document.createElement('button');
bottoneDecremento.className = 'decremento';
bottoneDecremento.innerText = '-';
pulsantiContatore.append(bottoneDecremento); // appendiamo il nuovo bottone all'interno di <div class="pulsanti">

// Qui creiamo il pulsante di reset
const bottoneReset = document.createElement('button');
bottoneReset.className = 'reset';
bottoneReset.innerText = 'Reset';
pulsantiContatore.append(bottoneReset); // appendiamo il nuovo bottone all'interno di <div class="pulsanti">

// Qui creiamo il pulsante di incremento
const bottoneIncremento = document.createElement('button');
bottoneIncremento.className = 'incremento';
bottoneIncremento.innerText = '+';
pulsantiContatore.append(bottoneIncremento); // appendiamo il nuovo bottone all'interno di <div class="pulsanti">

// ✏️ Ora dobbiamo rendere il valore del numero nel display dinamico attraverso la gestione degli eventi:

// Qui gestiamo l'incremento del contatore
bottoneIncremento.addEventListener('click', function() {
    risultato++;
    displayContatore.innerText = risultato;
    colore();
});

// Qui gestiamo il decremento del contatore
bottoneDecremento.addEventListener('click', function() {
    risultato--;
    displayContatore.innerText = risultato;
    colore();
});

// Qui gestiamo il reset del contatore
bottoneReset.addEventListener('click', function() {
    risultato = 0;
    displayContatore.innerText = risultato;
    colore();
});

// ✏️ Ora dobbiamo rendere condizionali i colori (se positivi verdi, se negativi rossi, uguale a 0 sarà invariato)

// Qui creiamo la funzione per cambiare il colore del display in base al valore del contatore
function colore() {
    if (risultato > 0) {
        displayContatore.style.color = '#2fa142';
    } else if (risultato < 0) {
        displayContatore.style.color = '#d63131';
    } else {
        displayContatore.style.color = '';
    }
}