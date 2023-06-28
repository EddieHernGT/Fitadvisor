<?php

/** @var \Laravel\Lumen\Routing\Router $router */
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->post('/login','UserController@login');
$router->get('/users/{email}', 'UserController@show');
$router->get('/users', 'UserController@index');
$router->post('/users', 'UserController@store');
$router->put('/users/{email}', 'UserController@update');
$router->patch('/users/{email}', 'UserController@update');
$router->delete('/users/{email}', 'UserController@destroy');

$router->get('/people/{user_id}', 'PersonController@show');
$router->get('/people', 'PersonController@index');
$router->post('/people', 'PersonController@store');
$router->put('/people/{user_id}', 'PersonController@update');
$router->patch('/people/{user_id}', 'PersonController@update');
$router->delete('/people/{user_id}', 'PersonController@destroy');

$router->get('/info/{person_id}', 'MedInformationController@show');
$router->get('/info', 'MedInformationController@index');
$router->post('/info', 'MedInformationController@store');
$router->put('/info/{person_id}', 'MedInformationController@update');
$router->patch('/info/{person_id}', 'MedInformationController@update');
$router->delete('/info/{person_id}', 'MedInformationController@destroy');


