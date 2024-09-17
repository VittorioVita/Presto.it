let number1 = document.querySelector('#number1');
let number2 = document.querySelector('#number2');
let number3 = document.querySelector('#number3');

function crea_intervallo(elemento, numMax, tempo) {
    let counter = 0;
    let intervallo = setInterval(() => {
        if (counter < numMax) {
            counter++;
            elemento.innerText = counter;
        } else {
            clearInterval(intervallo);
        }
    }, tempo);
}

let controllo_ripetzione = false;

let osserva = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !controllo_ripetzione) {
            crea_intervallo(number1, 200, 50);
            crea_intervallo(number2, 1200, 5);
            crea_intervallo(number3, 500, 10);

            controllo_ripetzione = true;
        }
    });
});

// Funzione per controllare la visibilità iniziale
function checkVisibility() {
    if (!controllo_ripetzione) {
        if (number1.getBoundingClientRect().top < window.innerHeight) {
            crea_intervallo(number1, 200, 50);
            crea_intervallo(number2, 1200, 5);
            crea_intervallo(number3, 500, 10);
            controllo_ripetzione = true;
        }
    }
}

// Controlla visibilità iniziale
checkVisibility();

// Continua a osservare gli elementi
osserva.observe(number1);
osserva.observe(number2);
osserva.observe(number3);



let hamburger = document.querySelector('.hamburger');
hamburger.addEventListener("click", function() {
  document.body.classList.toggle('open');
});
