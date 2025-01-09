import { Carousel, Container, Row, Col } from 'react-bootstrap';
import pastasciutte from '../data/menu.json';
import { Component } from 'react';
import PastaComments from './PastaComments';

class HomeContent extends Component {
  state = {
    activePasta: pastasciutte[0], //L'oggetto caricato di base
  };
  //Non c'è bisogno di inizializzare state perchè è sempre un oggetto!
  // Si utilizza SOLO NEI COMPONENTI A CLASSI
  // Ho bisogno di uno stato perchè deve memoorizzarmi quale oggetto è attivo al momento
  // Lo state è un componente READONLY
  render() {
    return (
      <Container>
        <Row className='justify-content-center'>
          <Col xs={12} md={6}>
            <Carousel
              onSlide={(i) => {
                console.log('Slide Cambiata!');
                // pastasciutte[i] prende il posto dell'oggetto corrente
                this.setState({
                  activePasta: pastasciutte[i],
                });
              }}
            >
              {/*In react, MAP() si utilizza per generare del contenuto in modo dinamico */}
              {pastasciutte.map((pasta) => {
                return (
                  // La key va inserita obbligatoriamente nell'elemento di ritorno del map
                  // e deve essere sempre un valore univoco per ogni elemento generato
                  <Carousel.Item key={pasta.id}>
                    <img src={pasta.image} className='w-100' />
                    <Carousel.Caption>
                      <h3>{pasta.name}</h3>
                      <p>{pasta.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
        </Row>
        {/* Forniamo a pastaComments la prop con la pasta attiva, così riceverà le recensioni */}
        <PastaComments currentPasta={this.state.activePasta} />
        {/* PastaComments è un componente che richiede una pastasciutta e ne mostra i commenti
            Ma senza un valore di state, non sa cosa leggere */}
      </Container>
    );
  }
}

export default HomeContent;
