// Questo componente si occuperà di recuperare la lista delle prenotazioni del nostro ristoraNTE
// e di compilare una <ul> in Bootstrap

import { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Alert,
} from 'react-bootstrap';

// Ogni volta che un componente deve recuperare dati da una API, ha bisogno di uno stato
// Quindi creeremo AdminSection come un componente a CLASSE

// Quando intendiamo recuperare dati da una API in un componente,
// bisogna predisporre nello stato un posto per ospitarli

const URL = 'https://striveschool-api.herokuapp.com/api/reservation';

class AdminSection extends Component {
  state = {
    reservations: [],
    isLoading: true,
    isError: false,
  };

  getReservationsThenCatch = () => {
    // Recuperiamo le prenotazioni con una GET e salviamole nello stato del componente
    // Una volta fatto ciò, l'interfaccia riempirà la lista delle prenotazioni automaticamente perchè abbiamo già creato l'elemento di lista
    // mappando lo state reservations

    fetch(URL, {
      // method: 'GET' Possiamo ometterlo perchè in automatico la fetch utilizza il metodo get di default
      // non abbiamo bisogno di nessun altro parametro, nè body(inutile), nè headers perchè non ci servono auth
    })
      .then((response) => {
        if (response.ok) {
          //Otteniamo il JSON della response: invochiamo il metodo .json di js che restituirà il contenuto della response
          return response.json();
        } else {
          throw new Error('La chiamata NON è andata a buon fine');
        }
      })
      .then((data) => {
        console.log('DATA: ', data);
        this.setState({
          reservations: data,
        });
      })
      .catch((error) => {
        console.log('ERRORE', error);
      });
  };

  getReservationsAsyncAwait = async () => {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        console.log('DATA: ', data);
        // Una volta ottenuto l'array delle prenotazioni, utilizzo setState in modo da riempire reservations all'interno dello stato

        this.setState({
          reservations: data,
          isLoading: false,
          isError: false,
        });
      } else {
        throw new Error('Errore nel recupero dei dati API');
      }
    } catch (error) {
      console.log('ERROR: ', error);
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  };

  componentDidMount() {
    // Questo metodo riservato nei componenti a classe viene eseguito immediatamente dopo la prima invocazione di render
    this.getReservationsAsyncAwait();
    // ComponentDidMount NON VERRÀ MAI PIÙ RICHIAMATO UNA VOLTA ESEGUITO LA PRIMA VOLTA
    // Di conseguenza è il componente perfetto per le chiamate API
  }

  render() {
    // render NON DEVE MAI RICEVERE METODI CHE CAMBINO LO STATO altrimenti ogni cambio di stato rilancia il metodo render()
    // Render viene RI-ESEGUITO OGNI VOLTA CHE CAMBIA LO STATO O LE PROPS
    return (
      <Container>
        <Row className='justify-content-center my-3 text-center'>
          <Col xs={12} md={6}>
            <h2>Prenotazioni esistenti</h2>
            {this.state.isLoading && (
              <div className='text-center'>
                <div>
                  <p>Caricamento in corso...</p>

                  <Spinner
                    animation='grow'
                    size='sm'
                    variant='info'
                    className='ms-2'
                  />
                  <Spinner
                    animation='grow'
                    size='sm'
                    variant='info'
                    className='ms-2'
                  />
                  <Spinner
                    animation='grow'
                    size='sm'
                    variant='info'
                    className='ms-2'
                  />
                </div>
              </div>
            )}

            {this.state.isError && (
              <div className='text-center'>
                <Alert variant='danger'>Si è verificato un errore</Alert>
              </div>
            )}

            <ListGroup>
              {this.state.reservations.map((res) => {
                return (
                  <ListGroup.Item key={res._id}>
                    {res.name} per {res.numberOfPeople}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminSection;
