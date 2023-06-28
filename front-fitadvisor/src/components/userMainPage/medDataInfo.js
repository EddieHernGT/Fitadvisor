import Card from 'react-bootstrap/Card';

function medData(props) {
    let {weight, height, allergies, chronic_conditions, medications} = props;
    let IMC = Math.round(weight / height * height);
    return (
        <ul className='med-data'>
            <li>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Peso
                        </Card.Title>
                        <Card.Text>
                            {weight}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </li>
            <li>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Estatura
                        </Card.Title>
                        <Card.Text>
                            {height}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </li>
            <li>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            IMC
                        </Card.Title>
                        <Card.Text>
                            {IMC}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </li>
            <li>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Alergias
                        </Card.Title>
                        <Card.Text>
                            {(allergies==='')?'N/A':allergies}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </li>
            <li>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Enfermedades cronicas
                        </Card.Title>
                        <Card.Text>
                            {chronic_conditions}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </li>
            <li>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Medicamentos
                        </Card.Title>
                        <Card.Text>
                            {medications}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </li>
        </ul>
    );
}

export default medData;