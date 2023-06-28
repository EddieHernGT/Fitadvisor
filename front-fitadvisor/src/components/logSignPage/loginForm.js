import Form from 'react-bootstrap/Form';
import Image from "react-bootstrap/Image";
import Alert from 'react-bootstrap/Alert';
import image from "../../img/ingreso.jpg";
import '../../CSS/login.css';
import {useState} from "react";
import gif from "../../img/loading.gif";

function loginForm() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [warning,setWarning]=useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading,setLoading]=useState(false);
    if(loading){
        return(
            <div>
                <div className='formContainer'>
                    <Alert id='warning' key='warning' variant='warning' style={{display: 'none'}}>
                        {warning}
                    </Alert>
                    <h1>Ingresa</h1>
                    <Image
                        src={image}
                        alt='Personas registrandose'
                        className='formImage'
                    />
                    <div className='container-loader' >
                        <Image
                            src={gif}
                            alt={'Loading'}
                            className='loading-screan'
                        />
                    </div>
                </div>
            </div>
        );
    }else {
        return (
            <div>
                <div className='formContainer'>
                    <Alert id='warning' key='warning' variant='warning' style={{display: 'none'}}>
                        {warning}
                    </Alert>
                    <h1>Ingresa</h1>
                    <Image
                        src={image}
                        alt='Personas registrandose'
                        className='formImage'
                    />
                    <Form id='loginForm' className='container' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Correo:</Form.Label>
                            <Form.Control id="email" type='email' placeholder="ejemplo@ejemplo.com" required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pass">Contraseña:</Form.Label>
                            <Form.Control id="pass" type='password' placeholder="Password" required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='submit' value='Ingresa'/>
                        </Form.Group>
                    </Form>
                    <div className='switch-form'>
                    <a  href='/Signin'>Soy nuevo</a>
                    </div>
                </div>
            </div>
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        let email=document.getElementById('email').value;
        let pass=document.getElementById('pass').value;
        let formData =new URLSearchParams();
        formData.append('email',email);
        formData.append('password',pass);
        try {
           fetch('http://localhost:8200/login',{
               method:'POST',
               headers:{'Content-Type': 'application/x-www-form-urlencoded'},
               body:formData,
           }).then(response=>{
               if(!response.ok){
                   setLoading(false);
                   if(response.status===404){
                       setWarning('Usuario no encontrado');
                       document.getElementById('warning').style.display='block';
                       email='';
                       pass='';

                   }else if(response.status===406){
                       setWarning('Usuario o contrasena incorrectas');
                       document.getElementById('warning').style.display='block';
                       document.getElementById('email').value='';
                       document.getElementById('pass').value='';
                       document.getElementById('email').focus();
                       document.getElementById('pass').focus();
                   }
               }
               return response.json();
           }).then(res=>{
               if(res.success){
                   const queryParam = encodeURIComponent(res.data[0]); // Encode the response value

                   window.location.href = `http://localhost:3000/YouPage/${queryParam}`;
               }
           }).catch(error=>{
               console.error("Error:",error.message);
           });
        }catch (error){
            error.preventDefault();
            console.log('Error fetching data:',error);
        }
    }
}


export default loginForm;