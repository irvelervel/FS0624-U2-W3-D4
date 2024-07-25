// com'è fatto l'oggetto di un concerto?
// campi necessari:
// "name" -> string
// "description" -> string
// "price" -> number/string
// "time" -> string (data e ora)

// - PARTE FINALE DELLA LEZIONE -
// nel caso la pagina backoffice si caricasse con un parametro "eventId" nella barra
// degli indirizzi, significa che non sono arrivato qui cliccando il bottone "backoffice"
// nella navbar ma cliccando il tasto MODIFICA da uno degli eventi.
// questo comporta che la mia pagina backoffice deve entrare in "modalità modifica":
// - deve fare una fetch singola per i dettagli dell'evento con quell_id
// - deve ri-popolare i campi del form con i dati risultanti dalla fetch
// - il tasto SALVA non deve fare una POST, ma una PUT (per modificare l'evento con quell'id)

const eventId = new URLSearchParams(location.search).get('eventId')
// eventId può essere O una stringa, O null
console.log('EVENTID', eventId)

if (eventId) {
  // se entro qui, vuol dire che sono in "modalità modifica"
  // 1) fetch individuale per recuperare i dettagli, COME nella pagina DETAILS!
  fetch('https://striveschool-api.herokuapp.com/api/agenda/' + eventId)
    .then((response) => {
      if (response.ok) {
        // la chiamata è andata a buon fine
        return response.json()
      } else {
        throw new Error('errore nel recupero del singolo concerto')
      }
    })
    .then((singleEvent) => {
      console.log('SINGLEEVENT', singleEvent)
      // 2) ri-popolo i campi del form con i dati dell'evento
      document.getElementById('name').value = singleEvent.name
      document.getElementById('description').value = singleEvent.description
      document.getElementById('time').value = singleEvent.time.split('.000Z')[0]
      document.getElementById('price').value = singleEvent.price
    })
    .catch((err) => {
      console.log(err)
    })
}

class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.time = _time
  }
}

// cerchiamo il form del concerto e interveniamo sul suo evento di submit
const eventForm = document.getElementById('event-form')
eventForm.addEventListener('submit', function (e) {
  e.preventDefault() // bloccare il riavvio della pagina
  // recupero i riferimenti degli input
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const priceInput = document.getElementById('price')
  const timeInput = document.getElementById('time')

  console.log('nameInput', nameInput)

  // recuperi i VALORI di questi riferimenti (il contenuto dei campi)

  const nameValue = nameInput.value
  const descriptionValue = descriptionInput.value
  const priceValue = priceInput.value
  const timeValue = timeInput.value

  // costruiremo l'oggetto con le 4 proprietà sopra

  // lo creo a manina
  // const newConcert = {
  //   name: nameValue,
  //   description: descriptionValue,
  //   price: priceValue,
  //   time: timeValue,
  // }

  // lo creo con una classe
  const newConcert = new Concert(
    nameValue,
    descriptionValue,
    priceValue,
    timeValue
  )

  let methodToUse
  if (eventId) {
    // modalità modifica
    methodToUse = 'PUT'
  } else {
    // modalità creazione
    methodToUse = 'POST'
  }

  const URL = 'https://striveschool-api.herokuapp.com/api/agenda/'

  let URLToUse
  if (eventId) {
    // modalità modifica
    URLToUse = URL + eventId
  } else {
    // modalità creazione
    URLToUse = URL
  }

  // chiamata fetch() per fare una POST del concerto appena compilato
  // per fare una chiamata POST, l'URL è lo stesso della chiamata GET
  // ...se l'API è stata costruita secondo i principi REST
  fetch(URLToUse, {
    // definiamo il metodo da utilizzare (altrimenti sarebbe GET di default)
    method: methodToUse,
    // alleghiamo alla chiamata l'oggetto che abbiamo costruito precedentemente
    body: JSON.stringify(newConcert), // le API si aspettano un oggetto stringhifizzato
    headers: {
      // informiamo l'API che la stringa che stiamo mandando in origine era un oggetto
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        // se il concerto è stato salvato correttamente
        // non è indispensabile estrapolare il JSON da una chiamata POST,
        // perchè non otterremmo altro che il concerto che volevamo salvare!
        // ci fermiamo qua!
        alert('CONCERTO SALVATO!')
      } else {
        // se il concerto NON è stato salvato a causa di un problema
        alert('ERRORE NEL SALVATAGGIO!')
        throw new Error('Errore nel salvataggio del concerto')
      }
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
})
