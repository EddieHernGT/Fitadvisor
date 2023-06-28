import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image";
import image from '../../img/registroImg.webp';
import '../../CSS/login.css';
import Alert from "react-bootstrap/Alert";
import {useState} from "react";
import gif from "../../img/loading.gif";


function signinForm() {
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
                    <h1>Registrate</h1>
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
                    <Alert id='alert' key={alert} variant={alert} style={{display: 'none'}}>
                        {message}
                    </Alert>
                    <h1>Registrate</h1>
                    <Image
                        src={image}
                        alt='Personas registrandose'
                        className='formImage'
                    />
                    <Form className='container' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="nombre">Nombre:</Form.Label>
                            <Form.Control id="nombre" name='nombre' type='Text' placeholder="Nombre..." required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="apellidoP">Apellido Paterno:</Form.Label>
                            <Form.Control id="apellidoP" name='apellidoP' type='Text' placeholder="Apellido..."
                                          required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="apellidoM">Apellido Materno:</Form.Label>
                            <Form.Control id="apellidoM" name='apellidoM' type='Text' placeholder="Apellido..."/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="fNacimiento">Fecha de nacimiento:</Form.Label>
                            <Form.Control id="fNacimiento" name='fNacimiento' type='date' pattern="\d{4}-\d{2}-\d{2}"
                                          placeholder='Fecha de nacimiento'
                                          required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Correo:</Form.Label>
                            <Form.Control id="email" name='email' type='email' placeholder="ejemplo@ejemplo.com"
                                          required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pass">Contraseña:</Form.Label>
                            <Form.Control id="pass" name='pass' type='password' placeholder="Password" required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="passCon">Confirmar Contraseña:</Form.Label>
                            <Form.Control id="passCon" type='password' placeholder="Password"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type='checkbox' id='politicas' name='politicas'
                                        label='Acepto las politicas de uso'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control id='signing' type='submit' value='Registrate'/>
                        </Form.Group>
                    </Form>
                    <div className='switch-form'>
                        <a href='/Login'>Ya soy usuario</a>
                    </div>
                </div>
            </div>
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        document.getElementById('alert').style.display = 'none';
        document.getElementById('signing').value='cargando...';
        let terms = document.getElementById('politicas').checked;
        let password = document.getElementById('pass').value;
        let confirmation_password = document.getElementById('passCon').value;
        if (password === confirmation_password && terms) {
            let userFormData = new URLSearchParams();
            let email = document.getElementById('email').value;
            userFormData.append('email', email);
            userFormData.append('password', password);
            try {
                fetch('http://localhost:8200/users', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: userFormData,
                }).then(response => {
                    document.getElementById('signing').value='Registrate';
                    if (!response.ok) {
                        setLoading(false);
                        setAlert('danger');
                        setMessage(`Error singin:${response.statusMessage}`);
                        document.getElementById('alert').style.display = 'block';
                    }
                    return response.json();
                })
                    .then(res => {
                        document.getElementById('signing').value='Registrate';
                        if (res.success) {
                            savePerson(res.data['id']);
                        }
                    });
            } catch (error) {
                console.log('Error fetching data:', error);
            }

        }else{
            document.getElementById('signing').value='Registrate';
            if(password !== confirmation_password){
                setAlert('warning');
                setMessage('Las contrasenas no coinciden');

            }
            if(!terms){
                setAlert('warning');
                setMessage('Debe aceptar terminos y condiciones');
            }
            document.getElementById('alert').style.display = 'block';

        }
    }

    function savePerson(userID) {
        let name = document.getElementById('nombre').value;
        let surname = document.getElementById('apellidoP').value;
        let second_surname = document.getElementById('apellidoM').value;
        let birth_date = document.getElementById('fNacimiento').value;
        setLoading(true);
        let personFormData = new URLSearchParams();
        personFormData.append('user_id', userID);
        personFormData.append('name', name);
        personFormData.append('surname', surname);
        personFormData.append('second_surname', second_surname);
        personFormData.append('birth_date', birth_date);
        try {
            fetch('http://localhost:8200/people', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: personFormData,
            }).then(response => {
                setLoading(false);
                if (!response.ok) {
                    setAlert('danger');
                    setMessage(`Error singin:${response.statusMessage}`);
                    document.getElementById('alert').style.display = 'block';
                }
                return response.json();
            }).then(res => {
                if (res.success) {
                    window.location.href = `http://localhost:3000/Login`;
                } else {
                    setAlert('warning');
                    setMessage(`${res.data}`);
                }
                document.getElementById('alert').style.display = 'block';
            }).catch(error => {
                console.log("Error:", error.message);
            });
        } catch (e) {
            console.log('Error fetching data:', e);

        }
    }
}

export default signinForm;