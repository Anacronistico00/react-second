// Creiamo ora un componente per prenotare un tavolo al ristorante
// Questo componente sarà dotato di un form nel quale l'utente compilerà le informazioni richieste
// Una volta completato, il form verrà inviato a una API tramite una chiamata POST

import { Component } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

// I form React sono sempre CONTROLLATI
// Cioè i valori dei songoli input field sono SEMPRE salvati in ogni momento nello STATO DEL COMPONENTE

// Creazione del form:
// Name -> string
// phone -> string/number
// numberOfPeople -> string/number
// dateTime -> string
// smoking -> boolean
// specialRequests -> string

// I form React sono sempre CONTROLLATI
// Un input si dice CONTROLLATO quando è legato allo stato del componente con un "Two-way data binding"

// Inviamo ora il contenuto del form all'APi in modo da salvare in modo perenne le prenotazioni che inviamo dal sito

const URL = 'https://striveschool-api.herokuapp.com/api/reservation';

const initialState = {
  name: '',
  phone: '',
  numberOfPeople: '1',
  dateTime: '',
  smoking: false,
  specialRequests: '',
};
class ReservationForm extends Component {
  state = {
    reservation: {
      ...initialState,
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(this.state.reservation), // Leggiamo i dati già raccolti
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // La chiamata è andata a buon fine
          alert('PRENOTAZIONE SALVATA');
          // Svuotiamo il form una volta inviata la richiesta
          // Per svuotare il form riporto lo state del componente al valore iniziale

          this.setState({
            reservation: {
              initialState,
            },
          });
        } else {
          // Errori vari. La chiamata NON è andata a buon fine
          // Mi sposto quindi nel blocco catch
          throw new Error('La chiamata NON è andata a buon fine');
        }
      })
      .catch((error) => {
        // Errori vari
        console.log('error', error);
        // TODO: Gestire l'errore in modo migliore
      });
  };

  render() {
    return (
      <Container>
        <Row className='justify-content-center my-3'>
          <Col xs={12} md={6}>
            <div>
              <h2 className='text-center'>Prenota un tavolo ORA!</h2>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Il tuo nome</Form.Label>
                <Form.Control
                  // Collego il valore dell'input allo stato
                  value={this.state.reservation.name}
                  onChange={(e) => {
                    // ora devo SETTARE lo stato con il valore inserito nel campo input
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        name: e.target.value,
                      },
                    });
                  }}
                  type='text'
                  placeholder='Mario Rossi'
                  required
                />
              </Form.Group>

              {/* Facciamo comparire questo messaggio solo se l'utente inserisce il nome GENOVEFFO */}

              {this.state.reservation.name.toLowerCase() === 'genoveffo' && (
                <Alert variant='success'>Che bel nome!!</Alert>
              )}

              <Form.Group className='mb-3'>
                <Form.Label>Numero di Cellulare</Form.Label>
                <Form.Control
                  type='tel'
                  value={this.state.reservation.phone}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        // Utilizzo lo spread operator per riportarmi il valore all'interno del nuovo state
                        // se non lo facessimo, ogni nuovo
                        phone: e.target.value,
                      },
                    });
                  }}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Quante persone?</Form.Label>
                <Form.Select
                  aria-label='Table size'
                  value={this.state.reservation.numberOfPeople}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        numberOfPeople: e.target.value,
                      },
                    });
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Data e Ora di prenotazione</Form.Label>
                <Form.Control
                  type='datetime-local'
                  value={this.state.reservation.dateTime}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        dateTime: e.target.value,
                      },
                    });
                  }}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Check
                  type='checkbox'
                  label='Tavolo Fumatori?'
                  checked={this.state.reservation.smoking}
                  // Nelle checkbox va utilizzato checked perchè restituiscono un valore booleano
                  // il value invece restituisce On oppure OFF
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        // Sostituiamo VALUE con CHECKED
                        smoking: e.target.checked,
                      },
                    });
                  }}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Allergie/animali/bambini?</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={5}
                  value={this.state.reservation.specialRequests}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        specialRequests: e.target.value,
                      },
                    });
                  }}
                />
              </Form.Group>

              <Button variant='success' type='submit'>
                Invia prenotazione
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReservationForm;
