@extends('layouts.main_layout')
@section('content')

<script>
document.addEventListener("DOMContentLoaded", function () {
        const popoverTrigger = document.querySelector(".popover-trigger");

        if (popoverTrigger) {
            const popover = new bootstrap.Popover(popoverTrigger, {
                trigger: "manual"
            });

            popoverTrigger.addEventListener("mouseenter", function () {
                popover.show();
            });

            popoverTrigger.addEventListener("mouseleave", function () {
                popover.hide();
            });
        }
    });
</script>

<div class="container-xxl flex-grow-1 container-p-y">
    <nav class="layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center"
        id="layout-navbar" style="margin-top:71px">
        <div class="navbar-nav-left d-flex align-items-center justify-content-start" id="navbar-collapse">
            <div class="row">
                <div class="col-md-2">
                    <input type="Nº" class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Nº">
                </div>
                <div class="col-md-3">
                    <input type="date" class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Pesquisar...">
                </div>

                <div class="col-md-3">
                    <input type="date" class="form-control form-control-sm" list="datalistOptions" id="exampleDataList" placeholder="Pesquisar...">
                </div>
                <div class="col-md-4">
                    <div class="row">
                      <div class="d-flex">
                        <div class="col-md-6">
                            <button class="btn buttons-collection btn-sm btn-label-primary dropdown-toggle me-4"
                                tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog"
                                aria-expanded="false"><span><span class="d-flex align-items-center gap-2"><i
                                            class="icon-base ti tabler-upload icon-xs me-sm-1"></i> <span
                                            class="d-none d-sm-inline-block">Exportar</span></span></span>
                            </button>
                        </div>
                        <div class="col-md-6">
                            <button onclick="window.location.href='{{ url('contrato') }}'"
                                class="btn create-new btn-primary btn-sm" tabindex="0"
                                aria-controls="DataTables_Table_0" type="button"><span><span
                                        class="d-flex align-items-center"><i
                                            class="icon-base ti tabler-plus icon-sm"></i> <span
                                            class="d-none d-sm-inline-block">Contrato</span></span></span>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <br>
    <div class="row mb-12 g-2 mt-5">
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Inactivo</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2">Contrato</h6>
                    <h6 class="card-subtitle mx-2">Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-danger" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Activo</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2">Contrato</h6>
                    <h6 class="card-subtitle mx-2">Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-success" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Pendente</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2"> Contrato</h6>
                    <h6 class="card-subtitle mx-2"> Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Pendente</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2"> Contrato</h6>
                    <h6 class="card-subtitle mx-2"> Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Pendente</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2"> Contrato</h6>
                    <h6 class="card-subtitle mx-2"> Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Pendente</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2"> Contrato</h6>
                    <h6 class="card-subtitle mx-2"> Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Pendente</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2"> Contrato</h6>
                    <h6 class="card-subtitle mx-2"> Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Pendente</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2"> Contrato</h6>
                    <h6 class="card-subtitle mx-2"> Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Pendente</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2"> Contrato</h6>
                    <h6 class="card-subtitle mx-2"> Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Pendente</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2"> Contrato</h6>
                    <h6 class="card-subtitle mx-2"> Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Pendente</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2"> Contrato</h6>
                    <h6 class="card-subtitle mx-2"> Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-6">
            <div class="card h-100 position-relative popover-trigger waves-effect waves-light" data-bs-toggle="popover"
                data-bs-custom-class="tooltip-primary" data-bs-placement="right" data-bs-html="true" data-bs-content="
                  <span><strong>Estado:</strong> Pendente</span>
                  <span><strong>Tipo:</strong> Indeterminado</span>
                  <span><strong>Assinatura:</strong> 12/12/2010</span>
                  <span><strong>Procuração:</strong> 12/12/2010</span>" title="📜 Detalhes do Contrato">

                <div class="card-body p-2">
                    <h6 class="card-title mx-2"> Contrato</h6>
                    <h6 class="card-subtitle mx-2"> Nº 123</h6>
                    <div class="position-relative">
                        <img class="img-fluid d-flex mx-auto my-2 rounded"
                            src="../../assets/img/elements/contrato.png" alt="Card contrato">
                        <div class="position-absolute top-50 start-50 translate-middle mt-3">
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Paginação -->
        <div class="demo-inline-spacing">
            <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm justify-content-center">
                    <li class="page-item prev">
                        <a class="page-link waves-effect" href="javascript:void(0);"><i
                                class="icon-base ti tabler-chevrons-left icon-xs"></i></a>
                    </li>
                    <li class="page-item">
                        <a class="page-link waves-effect" href="javascript:void(0);">1</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link waves-effect" href="javascript:void(0);">2</a>
                    </li>
                    <li class="page-item active">
                        <a class="page-link waves-effect waves-light" href="javascript:void(0);">3</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link waves-effect" href="javascript:void(0);">4</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link waves-effect" href="javascript:void(0);">5</a>
                    </li>
                    <li class="page-item next">
                        <a class="page-link waves-effect" href="javascript:void(0);"><i
                                class="icon-base ti tabler-chevrons-right icon-xs"></i></a>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- Paginação -->
    </div>
</div>
@endsection