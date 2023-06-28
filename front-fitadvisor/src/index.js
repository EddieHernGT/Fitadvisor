import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import './CSS/global.css';


import Nav from './components/nav';
import Footer from './components/footer';

import LandPage from './routes/landing';
import LogInForm from "./components/logSignPage/loginForm";
import SignInForm from "./components/logSignPage/signinForm";
import YouPage from './routes/userIndex';

let router=createBrowserRouter([{
    path:'/',
    element: <LandPage/>
},{
    path:'/Login',
    element: <LogInForm/>
},{
    path:'/Signin',
    element: <SignInForm/>
},{
    path:'/YouPage/:res',
    element: <YouPage/>
}]);


const nav=ReactDOM.createRoot(document.getElementById('mainNav'));
const contentLoader=ReactDOM.createRoot(document.getElementById('root'));
const foot=ReactDOM.createRoot(document.getElementById('footer'));


nav.render(
    <React.StrictMode>
        <Nav />
   </React.StrictMode>
);
contentLoader.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
foot.render(
    <React.StrictMode>
        <Footer/>
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
