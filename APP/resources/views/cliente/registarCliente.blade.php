@extends('layouts.main_layout')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-custom-icon">
            <li class="breadcrumb-item">
            <a href="{{ route('cliente')}}">Lista de clientes</a>
            <i class="breadcrumb-icon icon-base ti tabler-chevron-right align-middle icon-xs"></i>
            </li>
            <li class="breadcrumb-item active">Registar cliente</li>
        </ol>
    </nav>
      <!-- Multi Column with Form Separator -->
  <div class="card mb-6">
    <h5 class="card-header">Registar cliente</h5>
    <form class="card-body">
      <h6>1. Preencha o formulário abaixo para registar um novo cliente.</h6>
      <div class="row g-2">
        <div class="col-md-6">
          <label class="form-label" for="multicol-username">Nome do cliente</label>
          <input type="text" id="" class="form-control" placeholder="Nome do cliente">
        </div>
        <div class="col-md-6">
          <label class="form-label" for="multicol-email">Email</label>
          <div class="input-group input-group-merge">
            <input type="text" id="" class="form-control" placeholder="Email do cliente" aria-label="john.doe" aria-describedby="multicol-email2">
            <span class="input-group-text" id="multicol-email2">exemplo@gmail.com</span>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-password-toggle">
            <label class="form-label" for="multicol-password">Nº de identificação</label>
            <div class="input-group input-group-merge">
              <input type="number" id="" class="form-control" placeholder="" aria-describedby="multicol-password2">
              <span class="input-group-text cursor-pointer" id=""></span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-password-toggle">
            <label class="form-label" for="multicol-confirm-password">Província</label>
            <select id="multicol-country" class="select2 form-select" data-allow-clear="true">
            <option value="">Escolher província</option>
            <option>Luanda</option>
            <option>Kwanza Sul</option>
            <option>Kwanza Norte</option>
            <option>Malange</option>
            <option>Huambo</option>
          </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-password-toggle">
            <label class="form-label" for="multicol-confirm-password">Município</label>
            <select id="multicol-country" class="select2 form-select" data-allow-clear="true">
            <option value="">Escolher município</option>
            <option>Samba</option>
            <option>Cacuaco</option>
            <option>Maianga</option>
            <option>Sambizanga</option>
            <option>Rangel</option>
          </select>
          </div>
        </div>
      </div>
      <hr class="my-6 mx-n6">
      <div class="pt-6">
        <button type="submit" class="btn btn-primary me-4">Cadastrar</button>
      </div>
    </form>
  </div>
</div>
@endsection