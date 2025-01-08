import { Carousel, Container, Row, Col } from 'react-bootstrap';
import pastasciutte from '../data/menu.json';

const HomeContent = function () {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={12} md={6} lg={4}>
          <Carousel>
            {/*In react, MAP() si utilizza per generare del contenuto in modo dinamico */}
            {pastasciutte.map((pasta, i) => {
              return (
                // La key va inserita obbligatoriamente nell'elemento di ritorno del map
                // e deve essere sempre un valore univoco per ogni elemento generato
                <Carousel.Item key={i}>
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
    </Container>
  );
};

export default HomeContent;
