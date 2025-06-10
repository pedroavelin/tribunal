@extends('layouts.main_layout')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-custom-icon">
            <li class="breadcrumb-item">
                <a href="{{ route('listarContrato')}}">Lista de contratos</a>
                <i class="breadcrumb-icon icon-base ti tabler-chevron-right align-middle icon-xs"></i>
            </li>
            <li class="breadcrumb-item active">Novo contrato</li>
        </ol>
    </nav>
    <!-- Multi Column with Form Separator -->
    <div class="card mb-6">
        <!-- <h5 class="card-header">Novo contrato</h5> -->
        <form class="card-body">
            <h6>1. Preencha o formulário abaixo para adicionar um novo contrato.</h6>
            <div class="row g-2">
                <div class="col-md-4">
                    <label class="form-label" for="multicol-username">Tipologia</label>
                    <select id="multicol-country"
                        class="select2 form-select form-select-sm https://www.youtube.com/watch?v=VlTJ4a_TfMA-sm"
                        data-allow-clear="true">
                        <option>Cliente</option>
                        <!-- <option>Empresa</option> -->
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label" for="multicol-email">Entidade</label>
                    <select id="multicol-country"
                        class="select2 form-select form-select-sm https://www.youtube.com/watch?v=VlTJ4a_TfMA-sm"
                        data-allow-clear="true">
                        <option>Colectivo</option>
                        <option>Singular</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label" for="multicol-email">Nome completo/empresa</label>
                    <input type="text" id="" class="form-control form-control-sm" placeholder="Descrição" aria-label=""
                        aria-describedby="multicol-email2">
                </div>
                <div class="col-md-4">
                    <div class="form-password-toggle">
                        <label class="form-label" for="multicol-password">Nº de identificação</label>
                        <input type="number" id="" class="form-control form-control-sm"
                            placeholder="Nº de identificação" aria-describedby="multicol-password2">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-password-toggle">
                        <label class="form-label" for="multicol-confirm-password">Província</label>
                        <select id="multicol-country"
                            class="select2 form-select form-select-sm https://www.youtube.com/watch?v=VlTJ4a_TfMA-sm"
                            data-allow-clear="true">
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
                        <select id="multicol-country"
                            class="select2 form-select form-select-sm https://www.youtube.com/watch?v=VlTJ4a_TfMA-sm"
                            data-allow-clear="true">
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
            <div class="row mt-2">
                <div class="col-md-3">
                    <label class="form-label" for="multicol-email">NIF(Número de identificação fiscal)</label>
                    <input type="text" id="" class="form-control form-control-sm"
                        placeholder="Número de identificação fiscal" aria-label="" aria-describedby="multicol-email2">
                </div>
                <div class="col-md-3">
                    <label class="form-label" for="multicol-email">Email</label>
                    <input type="text" id="" class="form-control form-control-sm" placeholder="Email" aria-label=""
                        aria-describedby="multicol-email2">
                </div>
                <div class="col-md-3">
                    <label class="form-label" for="multicol-email">Telefone 1</label>
                    <input type="text" id="" class="form-control form-control-sm" placeholder="Telefone 1" aria-label=""
                        aria-describedby="multicol-email2">
                </div>
                <div class="col-md-3">
                    <label class="form-label" for="multicol-email">Telefone 2</label>
                    <input type="text" id="" class="form-control form-control-sm" placeholder="Telefone 2" aria-label=""
                        aria-describedby="multicol-email2">
                </div>
            </div>
            <div class="divider my-1">
                <div class="divider-text">Assinatura assinada</div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="col-md-4 col-lg-4">
                        <div class="mb-2">
                            <div class="form-check mb-0 ms-2 mt-5">
                                <input class="form-check-input" type="checkbox" id="remember-me">
                                <label class="form-check-label" for="remember-me"> Presencialmente </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="col-md-4 col-lg-4">
                        <div class="mb-2">
                            <div class="form-check mb-0 ms-2 mt-5">
                                <input class="form-check-input" type="checkbox" id="remember">
                                <label class="form-check-label" for="remember"> Virtualmente </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-2">
                        <label for="email" class="form-label">Data</label>
                        <input type="date" class="form-control form-control-sm" placeholder="Empresa" autofocus="">
                    </div>
                </div>
            </div>
            <div class="divider my-1">
                <div class="divider-text">Procuração assinada</div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="col-md-4 col-lg-4">
                        <div class="mb-2">
                            <div class="form-check mb-0 ms-2 mt-5">
                                <input class="form-check-input" type="checkbox" id="remember-me">
                                <label class="form-check-label" for="remember-me"> Presencialmente </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="col-md-4 col-lg-4">
                        <div class="mb-2">
                            <div class="form-check mb-0 ms-2 mt-5">
                                <input class="form-check-input" type="checkbox" id="remember-me">
                                <label class="form-check-label" for="remember-me"> Virtualmente </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-2">
                        <label for="email" class="form-label">Data</label>
                        <input type="date" class="form-control form-control-sm" placeholder="Empresa" autofocus="">
                    </div>
                </div>
            </div>
            <div class="pt-0">
                <button type="submit" class="btn btn-primary btn-sm me-4">Cadastrar</button>
            </div>
        </form>
    </div>
</div>
@endsection