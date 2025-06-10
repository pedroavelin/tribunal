@extends('layouts.main_layout')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <div class="row g-6 mb-6">
        <div class="col-sm-6 col-xl-3">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                        <div class="content-left">
                            <span class="text-heading">Todos</span>
                            <div class="d-flex align-items-center my-1">
                                <h4 class="mb-0 me-2">4</h4>
                                <p class="text-success mb-0"></p>
                            </div>
                            <!-- <small class="mb-0">Total clientes</small> -->
                        </div>
                        <div class="avatar">
                            <span class="avatar-initial rounded bg-label-primary">
                                <i class="icon-base ti tabler-users icon-26px"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                        <div class="content-left">
                            <span class="text-heading">Pendentes</span>
                            <div class="d-flex align-items-center my-1">
                                <h4 class="mb-0 me-2">2</h4>
                                <p class="text-success mb-0"></p>
                            </div>
                            <!-- <small class="mb-0">Last week analytics </small> -->
                        </div>
                        <div class="avatar">
                            <span class="avatar-initial rounded bg-label-danger">
                                <i class="icon-base ti tabler-user-plus icon-26px"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                        <div class="content-left">
                            <span class="text-heading">Activos</span>
                            <div class="d-flex align-items-center my-1">
                                <h4 class="mb-0 me-2">1</h4>
                                <p class="text-danger mb-0"></p>
                            </div>
                            <!-- <small class="mb-0">Last week analytics</small> -->
                        </div>
                        <div class="avatar">
                            <span class="avatar-initial rounded bg-label-success">
                                <i class="icon-base ti tabler-user-check icon-26px"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                        <div class="content-left">
                            <span class="text-heading">Inactivos</span>
                            <div class="d-flex align-items-center my-1">
                                <h4 class="mb-0 me-2">1</h4>
                                <p class="text-success mb-0"></p>
                            </div>
                            <!-- <small class="mb-0">Last week analytics</small> -->
                        </div>
                        <div class="avatar">
                            <span class="avatar-initial rounded bg-label-warning">
                                <i class="icon-base ti tabler-user-search icon-26px"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Users List Table -->
    <!-- Small table -->

    <div class="card">
        <!-- <h6 class="card-header p-0 m-1">Lista de clientes</h6> -->
        <div class="row p-1 m-1 card-header flex-column flex-md-row">
            <div class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
                <h5 class="card-title mb-0 text-md-start text-center pb-md-0 pb-6">Lista de clientes</h5>
            </div>
            <div class="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto mt-0">
                <div class="dt-buttons btn-group flex-wrap mb-0">
                    <div class="btn-group">
                        <button class="btn buttons-collection btn-sm btn-label-primary dropdown-toggle me-4"
                            tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog"
                            aria-expanded="false"><span><span class="d-flex align-items-center gap-2"><i
                                        class="icon-base ti tabler-upload icon-xs me-sm-1"></i> <span
                                        class="d-none d-sm-inline-block">Exportar</span></span></span>
                        </button>
                    </div>
                    <button onclick="window.location.href='{{ url('registar-cliente') }}'"
                        class="btn create-new btn-primary btn-sm" tabindex="0" aria-controls="DataTables_Table_0"
                        type="button"><span><span class="d-flex align-items-center gap-2"><i
                                    class="icon-base ti tabler-plus icon-sm"></i> <span
                                    class="d-none d-sm-inline-block">Novo cliente</span></span></span>
                    </button>
                </div>
            </div>
        </div>
        <div class="table-responsive text-nowrap">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nomde do cliente</th>
                        <th>Identificação</th>
                        <th>Estado</th>
                        <th>Acções</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    <tr>
                        <td>
                            <ul class="list-unstyled m-0 avatar-group d-flex align-items-center">
                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                    class="avatar avatar-xs pull-up" title="Vanilson Domingos">
                                    <img src="../../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle">
                                </li>
                            </ul>
                        </td>
                        <td>Vanilson Domingos</td>
                        <td>
                            <span>5003230010101</span>
                            </ul>
                        </td>
                        <td><span class="badge bg-label-success me-1">Activo</span></td>
                        <td>
                            <div class="dropdown">
                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown">
                                    <i class="icon-base ti tabler-dots-vertical"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal"
                                        data-bs-target="#modalCenter"><i class="icon-base ti tabler-pencil me-1"></i>
                                        Editar</a>
                                    <a class="dropdown-item" href="javascript:void(0);"><i
                                            class="icon-base ti tabler-trash me-1"></i> Eliminar</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ul class="list-unstyled m-0 avatar-group d-flex align-items-center">
                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                    class="avatar avatar-xs pull-up" title="Pedro Epalanga">
                                    <img src="../../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle">
                                </li>
                            </ul>
                        </td>
                        <td>Pedro Epalanga</td>
                        <td>
                            <span>334344334343333333333</span>
                        </td>
                        <td><span class="badge bg-label-danger me-1">Pendente</span></td>
                        <td>
                            <div class="dropdown">
                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown">
                                    <i class="icon-base ti tabler-dots-vertical"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal"
                                        data-bs-target="#modalCenter"><i class="icon-base ti tabler-pencil me-1"></i>
                                        Editar</a>
                                    <a class="dropdown-item" href="javascript:void(0);"><i
                                            class="icon-base ti tabler-trash me-1"></i> Eliminar</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ul class="list-unstyled m-0 avatar-group d-flex align-items-center">
                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                    class="avatar avatar-xs pull-up" title="Ismael Gunza">
                                    <img src="../../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle">
                                </li>
                            </ul>
                        </td>
                        <td>Ismael Gunza</td>
                        <td>
                            <span>132123123213</span>
                        </td>
                        <td><span class="badge bg-label-warning me-1">Inactivo</span></td>
                        <td>
                            <div class="dropdown">
                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown">
                                    <i class="icon-base ti tabler-dots-vertical"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal"
                                        data-bs-target="#modalCenter"><i class="icon-base ti tabler-pencil me-1"></i>
                                        Editar</a>
                                    <a class="dropdown-item" href="javascript:void(0);"><i
                                            class="icon-base ti tabler-trash me-1"></i> Eliminar</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ul class="list-unstyled m-0 avatar-group d-flex align-items-center">
                                <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                                    class="avatar avatar-xs pull-up" title="Osório Palhais">
                                    <img src="../../assets/img/avatars/5.png" alt="Avatar" class="rounded-circle">
                                </li>
                            </ul>
                        </td>
                        <td>Osório Palhais</td>
                        <td>
                            <span>31242432423234</span>
                        </td>
                        <td><span class="badge bg-label-danger me-1">Pendente</span></td>
                        <td>
                            <div class="dropdown">
                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown">
                                    <i class="icon-base ti tabler-dots-vertical"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal"
                                        data-bs-target="#modalCenter"><i class="icon-base ti tabler-pencil me-1"></i>
                                        Editar</a>
                                    <a class="dropdown-item" href="javascript:void(0);"><i
                                            class="icon-base ti tabler-trash me-1"></i> Eliminar</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!--/ Small table -->

</div>

<!-- Vertically Centered Modal -->
<div class="col-lg-4 col-md-6">
    <div class="mt-4">
        <!-- Modal -->
        <div class="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCenterTitle">Editar dados do cliente</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="card-body">
                            <div class="row g-2">
                                <div class="col-md-6">
                                    <label class="form-label" for="multicol-username">Nome do cliente</label>
                                    <input type="text" id="" class="form-control" placeholder="Nome do cliente">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label" for="multicol-email">Email</label>
                                    <input type="text" id="" class="form-control" placeholder="Email do cliente"
                                        aria-label="john.doe" aria-describedby="multicol-email2">
                                </div>
                                <div class="col-md-6">
                                    <div class="form-password-toggle">
                                        <label class="form-label" for="multicol-password">Nº de identificação</label>
                                        <div class="input-group input-group-merge">
                                            <input type="number" id="" class="form-control" placeholder=""
                                                aria-describedby="multicol-password2">
                                            <span class="input-group-text cursor-pointer" id=""></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-password-toggle">
                                        <label class="form-label" for="multicol-confirm-password">Província</label>
                                        <select id="multicol-country" class="select2 form-select"
                                            data-allow-clear="true">
                                            <option value="">Província</option>
                                            <option>Luanda</option>
                                            <option>Kwanza Sul</option>
                                            <option>Kwanza Norte</option>
                                            <option>Malange</option>
                                            <option>Huambo</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-password-toggle">
                                        <label class="form-label" for="multicol-confirm-password">Município</label>
                                        <select id="multicol-country" class="select2 form-select"
                                            data-allow-clear="true">
                                            <option value="">Município</option>
                                            <option>Samba</option>
                                            <option>Cacuaco</option>
                                            <option>Maianga</option>
                                            <option>Sambizanga</option>
                                            <option>Rangel</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-password-toggle">
                                        <label class="form-label" for="multicol-confirm-password">Estado</label>
                                        <select id="multicol-country" class="select2 form-select"
                                            data-allow-clear="true">
                                            <option value="">Estado</option>
                                            <option>Activo</option>
                                            <option>Pendente</option>
                                            <option>Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-label-secondary"
                            data-bs-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-sm btn-primary">Salvar alterações</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection