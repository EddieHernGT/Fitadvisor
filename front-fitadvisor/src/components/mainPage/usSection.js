import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function usSection() {

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Card border="secondary"  className="m-2"  style={{width:'auto'}}>
                            <Card.Title className="pt-4 text-center">
                                Visión
                            </Card.Title>
                            <Card.Body>
                                Ser la plataforma líder en la generación de recomendaciones personalizadas de nutrición
                                y
                                ejercicio para usuarios de todo nivel de experiencia, a través de un sitio web
                                innovador,
                                confiable y fácil de usar.
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xm lg="6" md='auto'>
                        <Card  border="secondary" className="m-2"  style={{width:'auto'}}>
                            <Card.Title className="pt-4 text-center">
                                Misión
                            </Card.Title>
                            <Card.Body>
                                Ayudar a los usuarios a alcanzar sus metas de salud y bienestar a través de
                                recomendaciones
                                personalizadas de nutrición y ejercicio, basadas en información precisa y actualizada, y
                                presentada en una interfaz amigable y accesible.
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default usSection;