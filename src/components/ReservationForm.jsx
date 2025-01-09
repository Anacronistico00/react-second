// Creiamo ora un componente per prenotare un tavolo al ristorante
// Questo componente sarà dotato di un form nel quale l'utente compilerà le informazioni richieste
// Una volta completato, il form verrà inviato a una API tramite una chiamata POST

import { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// I form React sono sempre CONTROLLATI
// Cioè i valori dei songoli input field sono SEMPRE salvati in ogni momento nello STATO DEL COMPONENTE

// Creazione del form:
// Name -> string
// phone -> string/number
// numberOfPeople -> string/number
// dateTime -> string
// smoking -> boolean
// specialRequest -> string

class ReservationForm extends Component {
  render() {
    return (
      <Container>
        <Row className='justify-content-center my-3'>
          <Col xs={12} md={6}>
            <div>
              <h2 className='text-center'>Prenota un tavolo ORA!</h2>
            </div>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>Il tuo nome</Form.Label>
                <Form.Control type='text' placeholder='Mario Rossi' />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Numero di Cellulare</Form.Label>
                <Form.Control type='tel' />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Quante persone?</Form.Label>
                <Form.Select aria-label='Table size'>
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
                <Form.Control type='datetime-local' />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Check type='checkbox' label='Tavolo Fumatori?' />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Allergie/animali/bambini?</Form.Label>
                <Form.Control as='textarea' rows={5} />
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
