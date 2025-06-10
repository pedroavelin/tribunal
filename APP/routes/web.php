<?php
use Illuminate\Support\Facades\Route;

Route::get('/', function(){
    return view('login');
})->name('login');

Route::get('/resetPassWord', function(){
    return view('resetPassWord');
})->name('resetPassWord');

Route::get('/recuperarSenha', function(){
    return view('recuperarSenha');
})->name('recuperarSenha');

Route::get('/home', function(){
    return view('home');
})->name('home');

Route::get('/cliente', function(){
    return view('cliente/listaCliente');
})->name('cliente');

Route::get('/registar-cliente', function(){
    return view('cliente/registarCliente');
})->name('registarCliente');

Route::get('/contrato', function(){
    return view('contrato/listaDeContrato');
})->name('listarContrato');

Route::get('/addcontrato', function(){
    return view('contrato/registarContrato');
})->name('lista-de-contrato');

Route::get('/solucoes', function(){
    return view('solucoes');
})->name('solucoes');

Route::fallback(function(){
    return response()->view('error404');
});