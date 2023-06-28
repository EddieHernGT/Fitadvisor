import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image";
import image from "../../img/medInfo.webp";
import Alert from "react-bootstrap/Alert";
import {useState} from "react";
import gif from "../../img/loading.gif";

function medDataForm(props) {
    let {userID} = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [message, setMessage] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [alert, setAlert] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false);
    if (loading) {
        return (
            <div>
                <div className='formContainer'>
                    <Alert id='alert' key={alert} variant={alert} style={{display: 'none'}}>
                        {message}
                    </Alert>
                    <h1>Informacion medica</h1>
                    <Image
                        src={image}
                        alt='Personas registrandose'
                        className='formImage'
                    />
                    <div className='container-loader'>
                        <Image
                            src={gif}
                            alt={'Loading'}
                            className='loading-screan'
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className='formContainer'>
                    <Alert id='alert' key='warning' variant='warning' style={{display: 'none'}}>
                        {message}
                    </Alert>
                    <h1>Informacion medica</h1>
                    <Image
                        src={image}
                        alt='Personas registrandose'
                        className='formImage'
                    />
                    <Form className='container' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="height">Altura (m):</Form.Label>
                            <Form.Control id="height" name='height' type='number' step="0.01" min="0.30"
                                          placeholder="1.7"
                                          required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="weight">Peso (kg):</Form.Label>
                            <Form.Control id="weight" name='weight' type='number' step="0.01" min="30.00"
                                          placeholder="73.30" required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="allergies">Alergias:</Form.Label>
                            <Form.Control id="allergies" name='allergies' type='text'
                                          placeholder="Ej. Fresas,Arroz,Aire..."/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="chronic_conditions">Enfermedades cronicas:</Form.Label>
                            <Form.Control id="chronic_conditions" name='chronic_conditions' type='text'
                                          placeholder='Ej. Diabetes,Asma,Artritis...'/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="medications">Medicamentos:</Form.Label>
                            <Form.Control id="medications" name='medications' type='text'
                                          placeholder="Ej. Insulina,Antidepresivos,Inmunomoduladores..."/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='submit' value='Guardar'/>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }

    function handleSubmit(event) {
        document.getElementById('alert').style.display = 'none';
        event.preventDefault();
        let height = document.getElementById('height').value;
        let weight = document.getElementById('weight').value;
        let allergies = document.getElementById('allergies').value;
        let chronic_conditions = document.getElementById('chronic_conditions').value;
        let medications = document.getElementById('medications').value;
        setLoading(true);
        let formData = new URLSearchParams();
        formData.append('height', height);
        formData.append('weight', weight);
        if (allergies !== '')
            formData.append('allergies', JSON.stringify(allergies));
        if (chronic_conditions !== '')
            formData.append('chronic_conditions', JSON.stringify(chronic_conditions));
        if (medications !== '')
            formData.append('medications', JSON.stringify(medications));
        formData.append('person_id', userID);
        try {
            fetch('http://localhost:8200/info', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: formData,
            })
                .then((response => {
                    if (!response.ok) {
                        setLoading(false);
                        setAlert('danger');
                        setMessage(`Error singin:${response.statusMessage}`);
                        document.getElementById('alert').style.display = 'block';

                    }
                    return response.json();
                }).then(res => {
                    if (res.success) {
                        window.location.reload();
                    }
                }).catch(error => {
                    console.log('Error fetching');
                }));
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }
}

export default medDataForm;