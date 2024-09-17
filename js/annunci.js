

let hamburger = document.querySelector('.hamburger');
hamburger.addEventListener("click", function() {
  document.body.classList.toggle('open');
});



let cont_annunci = document.querySelector('#cont_annunci');

fetch('annunci.json')
    .then(response => response.json())
    .then(data => {
        
        function creaCardAnnunci() {

            data.forEach(annuncio => {
                    
    
                let colonna = document.createElement('div');

                colonna.classList.add('justify-content-center', 'col-lg-4', 'col-md-4', 'col-sm-12', 'mb-2');

                colonna.innerHTML = `
                        <div class="card shadow">
                        <img src="${annuncio.immagine}" class="card-img-top" >
                        <div class="card-body">
                        <h5 class="card-title">${annuncio.Regione}</h5>
                        <p class="card-text">
                            <em>Euro</em> <strong>${annuncio.prezzo}</strong>
                        </p>
                        
                        </div>
                    </div>
                `;
                cont_annunci.appendChild(colonna);

            });  

        }

        creaCardAnnunci();
})


document.addEventListener('DOMContentLoaded', function () {
    // Selezione degli elementi
    const filterRegione = document.querySelector('#filter-regione');
    const filterPiscina = document.querySelector('#filter-piscina');
    const filterGiardino = document.querySelector('#filter-giardino');
    const filterPrezzo = document.querySelector('#filter-prezzo');
    const filterMetri = document.querySelector('#filter-metri');
    const resetFilters = document.querySelector('#reset-filters');
    const contAnnunci = document.querySelector('#cont_annunci');
    
    // URL del file JSON
    const jsonFileUrl = 'annunci.json'; // Sostituisci con il percorso corretto
    
    let annunci = [];
    
    // Funzione per caricare e visualizzare gli annunci
    function loadAnnunci() {
        fetch('annunci.json')
            .then(response => response.json())
            .then(data => {
                annunci = data;
                displayAnnunci(annunci);
                populateRegioneFilter(annunci);
            })
            .catch(error => console.error('Errore nel caricamento degli annunci:', error));
    }
    
    // Funzione per visualizzare gli annunci
    function displayAnnunci(filteredAnnunci) {
        contAnnunci.innerHTML = ''; // Pulisce gli annunci esistenti
        filteredAnnunci.forEach(annuncio => {
            const card = document.createElement('div');
            card.className = 'col-12 col-md-5 col-lg-4 mb-3';
            card.innerHTML = `
                <div class="card rounded-0 myShadow">
                    <img src="${annuncio.immagine}" class="card-img-top rounded-0" alt="Immagine di ${annuncio.Regione}">
                    <div class="card-body">
                        <h5 class="card-title">Regione: ${annuncio.Regione}</h5>
                        <p class="card-text"><strong>Prezzo:</strong> €${annuncio.prezzo.toFixed(2)}</p>
                        <p class="card-text"><strong>Metri Quadrati:</strong> ${annuncio.metri_quadrati} m²</p>
                        <p class="card-text"><strong>Camere:</strong> ${annuncio.numero_camere}</p>
                        <p class="card-text"><strong>Giardino:</strong> ${annuncio.giardino ? 'Sì' : 'No'}</p>
                        <p class="card-text"><strong>Piscina:</strong> ${annuncio.piscina ? 'Sì' : 'No'}</p>
                        <p class="card-text"><strong>Vista Mare:</strong> ${annuncio.vista_mare ? 'Sì' : 'No'}</p>
                        <a href="#" class="myButton">Dettagli</a>
                    </div>
                </div>
            `;
            contAnnunci.appendChild(card);
        });
    }
    
    // Funzione per popolare il filtro delle regioni
    function populateRegioneFilter(annunci) {
        const regioni = new Set(annunci.map(a => a.Regione));
        filterRegione.innerHTML = '<option value="">Tutte le Regioni</option>';
        regioni.forEach(regione => {
            const option = document.createElement('option');
            option.value = regione;
            option.textContent = regione;
            filterRegione.appendChild(option);
        });
    }
    
    // Funzione per filtrare gli annunci
    function filterAnnunci() {
        const regione = filterRegione.value;
        const piscina = filterPiscina.value;
        const giardino = filterGiardino.value;
        const metri_quadrati = parseFloat (filterMetri.value);
        const maxPrezzo = parseFloat(filterPrezzo.value);
        
        const filteredAnnunci = annunci.filter(annuncio => {
            return (regione === '' || annuncio.Regione === regione) &&
                   (piscina === '' || annuncio.piscina.toString() === piscina) &&
                   (giardino === '' || annuncio.giardino.toString() === giardino) &&
                   (isNaN(metri_quadrati) || annuncio.metri_quadrati <= metri_quadrati) &&
                   (isNaN(maxPrezzo) || annuncio.prezzo <= maxPrezzo);
        });
        
        displayAnnunci(filteredAnnunci);
    }
    
    // Event listeners per i filtri
    filterRegione.addEventListener('change', filterAnnunci);
    filterPiscina.addEventListener('change', filterAnnunci);
    filterGiardino.addEventListener('change', filterAnnunci);
    filterPrezzo.addEventListener('input', filterAnnunci);
    filterMetri.addEventListener('input', filterAnnunci);
    
    // Event listener per il reset dei filtri
    resetFilters.addEventListener('click', () => {
        filterRegione.value = '';
        filterPiscina.value = '';
        filterGiardino.value = '';
        filterPrezzo.value = '';
        filterMetri.value = '';
        displayAnnunci(annunci); // Mostra tutti gli annunci
    });
    
    // Carica gli annunci all'avvio
    loadAnnunci();
});
