// in questa pagina io devo RECUPERARE con una fetch() i miei eventi a DB
// e li devo mostrare nella pagina
// per farlo, creerò per ogni evento esistente una colonna che appenderò
// allo "scheletro" imbastito nel file html

const getEvents = function () {
  // fetch!
  const URL = 'https://striveschool-api.herokuapp.com/api/agenda'
  fetch(URL)
    .then((response) => {
      console.log(response)
      if (response.ok) {
        // OK!
        // proseguiamo, e cerchiamo di estrarre il JSON da questa response!
        return response.json()
      } else {
        // qua il server ci risponde! però non abbiamo quello che cercavamo,
        // perchè l'indirizzo era sbagliato, non siamo autorizzati a vedere i concerti etc.
        throw new Error('Errore nella chiamata, response non OK')
      }
    })
    .then((arrayOfEvents) => {
      console.log('EVENTI A DB', arrayOfEvents)
      // mi lascio come riferimento il risultato della card
      //     <div class="col">
      //     <div class="card">
      //       <img
      //         src="https://uninuoro.it/wp-content/uploads/2018/08/aditya-chinchure-494048-unsplash.jpg"
      //         class="card-img-top"
      //         alt="event pic"
      //       />
      //       <div class="card-body text-center">
      //         <h5 class="card-title">Titolo dell'evento</h5>
      //         <p class="card-text">Descrizione</p>
      //         <p class="card-text">Prezzo</p>
      //         <a href="#" class="btn btn-primary w-100">COMPRA!</a>
      //       </div>
      //     </div>
      //   </div>
    })
    .catch((error) => {
      // non c'è internet, oppure il server proprio non esiste!
      console.log('ERRORE!', error)
    })
}

getEvents()
