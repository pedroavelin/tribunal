<script setup>
import Menu from '@/components/layout/Menu.vue'
import Navbar from '@/components/layout/Navbar.vue'
</script>

<template>
  <!-- Layout wrapper -->
  <div class="layout-wrapper layout-content-navbar  ">
    <div class="layout-container">
      <!-- Menu -->
      <Menu />
      <!-- / Menu -->

      <!-- Layout container -->
      <div class="layout-page">
        <!-- Navbar -->
        <Navbar />
        <!-- / Navbar -->
        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Content -->
          <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="mb-1">Lista de papeis</h4>

            <p class="mb-6">
              A role provided access to predefined menus and features.
            </p>
            <!-- Role cards -->
            <div class="row g-6">
              <div class="col-xl-4 col-lg-6 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h6 class="fw-normal mb-0 text-body">Total 4 users</h6>
                      <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Vinnie Mostowy" data-bs-original-title="Vinnie Mostowy">
                          <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Allen Rieske" data-bs-original-title="Allen Rieske">
                          <img class="rounded-circle" src="../../assets/img/avatars/12.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Julee Rossignol" data-bs-original-title="Julee Rossignol">
                          <img class="rounded-circle" src="../../assets/img/avatars/6.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Kaith D'souza" data-bs-original-title="Kaith D'souza">
                          <img class="rounded-circle" src="../../assets/img/avatars/3.png" alt="Avatar">
                        </li>
                      </ul>
                    </div>
                    <div class="d-flex justify-content-between align-items-end">
                      <div class="role-heading">
                        <h5 class="mb-1">Administrator</h5>
                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal"
                          class="role-edit-modal"><span>Edit Role</span></a>
                      </div>
                      <a href="javascript:void(0);"><i class="icon-base ti tabler-copy icon-md text-heading"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h6 class="fw-normal mb-0 text-body">Total 7 users</h6>
                      <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Jimmy Ressula" data-bs-original-title="Jimmy Ressula">
                          <img class="rounded-circle" src="../../assets/img/avatars/4.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="John Doe" data-bs-original-title="John Doe">
                          <img class="rounded-circle" src="../../assets/img/avatars/1.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Kristi Lawker" data-bs-original-title="Kristi Lawker">
                          <img class="rounded-circle" src="../../assets/img/avatars/2.png" alt="Avatar">
                        </li>
                        <li class="avatar">
                          <span class="avatar-initial rounded-circle pull-up" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" data-bs-original-title="4 more">+4</span>
                        </li>
                      </ul>
                    </div>
                    <div class="d-flex justify-content-between align-items-end">
                      <div class="role-heading">
                        <h5 class="mb-1">Manager</h5>
                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal"
                          class="role-edit-modal"><span>Edit Role</span></a>
                      </div>
                      <a href="javascript:void(0);"><i class="icon-base ti tabler-copy icon-md text-heading"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h6 class="fw-normal mb-0 text-body">Total 5 users</h6>
                      <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Andrew Tye" data-bs-original-title="Andrew Tye">
                          <img class="rounded-circle" src="../../assets/img/avatars/6.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Rishi Swaat" data-bs-original-title="Rishi Swaat">
                          <img class="rounded-circle" src="../../assets/img/avatars/9.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Rossie Kim" data-bs-original-title="Rossie Kim">
                          <img class="rounded-circle" src="../../assets/img/avatars/12.png" alt="Avatar">
                        </li>
                        <li class="avatar">
                          <span class="avatar-initial rounded-circle pull-up" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" data-bs-original-title="2 more">+2</span>
                        </li>
                      </ul>
                    </div>
                    <div class="d-flex justify-content-between align-items-end">
                      <div class="role-heading">
                        <h5 class="mb-1">Users</h5>
                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal"
                          class="role-edit-modal"><span>Edit Role</span></a>
                      </div>
                      <a href="javascript:void(0);"><i class="icon-base ti tabler-copy icon-md text-heading"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h6 class="fw-normal mb-0 text-body">Total 3 users</h6>
                      <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Kim Karlos" data-bs-original-title="Kim Karlos">
                          <img class="rounded-circle" src="../../assets/img/avatars/3.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Katy Turner" data-bs-original-title="Katy Turner">
                          <img class="rounded-circle" src="../../assets/img/avatars/9.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Peter Adward" data-bs-original-title="Peter Adward">
                          <img class="rounded-circle" src="../../assets/img/avatars/4.png" alt="Avatar">
                        </li>
                        <li class="avatar">
                          <span class="avatar-initial rounded-circle pull-up" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" data-bs-original-title="3 more">+3</span>
                        </li>
                      </ul>
                    </div>
                    <div class="d-flex justify-content-between align-items-end">
                      <div class="role-heading">
                        <h5 class="mb-1">Support</h5>
                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal"
                          class="role-edit-modal"><span>Edit Role</span></a>
                      </div>
                      <a href="javascript:void(0);"><i class="icon-base ti tabler-copy icon-md text-heading"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h6 class="fw-normal mb-0 text-body">Total 2 users</h6>
                      <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Kim Merchent" data-bs-original-title="Kim Merchent">
                          <img class="rounded-circle" src="../../assets/img/avatars/10.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Sam D'souza" data-bs-original-title="Sam D'souza">
                          <img class="rounded-circle" src="../../assets/img/avatars/13.png" alt="Avatar">
                        </li>
                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                          class="avatar pull-up" aria-label="Nurvi Karlos" data-bs-original-title="Nurvi Karlos">
                          <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar">
                        </li>
                        <li class="avatar">
                          <span class="avatar-initial rounded-circle pull-up" data-bs-toggle="tooltip"
                            data-bs-placement="bottom" data-bs-original-title="7 more">+7</span>
                        </li>
                      </ul>
                    </div>
                    <div class="d-flex justify-content-between align-items-end">
                      <div class="role-heading">
                        <h5 class="mb-1">Restricted User</h5>
                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal"
                          class="role-edit-modal"><span>Edit Role</span></a>
                      </div>
                      <a href="javascript:void(0);"><i class="icon-base ti tabler-copy icon-md text-heading"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6">
                <div class="card h-100">
                  <div class="row h-100">
                    <div class="col-sm-5">
                      <div class="d-flex align-items-end h-100 justify-content-center mt-sm-0 mt-4">
                        <img src="../../assets/img/illustrations/add-new-roles.png" class="img-fluid" alt="Image"
                          width="83">
                      </div>
                    </div>
                    <div class="col-sm-7">
                      <div class="card-body text-sm-end text-center ps-sm-0">
                        <button data-bs-target="#addRoleModal" data-bs-toggle="modal"
                          class="btn btn-sm btn-primary mb-4 text-nowrap add-new-role waves-effect waves-light">
                          Adicionar novo papel</button>
                        <p class="mb-0">
                          , <br>
                          if it doesn't exist.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/ Role cards -->
            <!-- Add Role Modal -->
            <!-- Add Role Modal -->
           
            <!--/ Add Role Modal -->

            <!-- / Add Role Modal -->
          </div>
          <!-- / Content -->
          <div class="content-backdrop fade"></div>
        </div>
        <!-- Content wrapper -->
      </div>
      <!-- / Layout page -->
    </div>
    <!-- Offcanvas to add new user -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
      <div class="offcanvas-header border-bottom">
        <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Novo processo</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body mx-0 flex-grow-0 p-6 h-100">
        <form class="add-new-user pt-0" id="addNewUserForm" onsubmit="return false">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-6 form-control-validation">
                <label class="form-label" for="add-user-fullname">Número</label>
                <input type="text" class="form-control" id="add-user-fullname" placeholder="Núm. do processo"
                  name="userFullname" aria-label="John Doe">
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-6 form-control-validation">
                <label class="form-label" for="add-user-email">Ano</label>
                <input type="date" id="add-user-email" class="form-control" placeholder="Ano" name="userEmail">
              </div>
            </div>
          </div>
          <div class="mb-6">
            <label class="form-label" for="add-user-contact">Crime</label>
            <input type="text" class="form-control phone-mask" placeholder="Informe o crime"
              aria-label="john.doe@example.com" name="userContact">
          </div>
          <div class="mb-6">
            <label class="form-label" for="country">Estado do processo</label>
            <select id="country" class="select2 form-select">
              <option value="">Seleccione o estado</option>
              <option value="United Kingdom">Em análise</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary me-3 data-submit">Adionar</button>
          <button type="reset" class="btn btn-label-danger" data-bs-dismiss="offcanvas">Cancelar</button>
        </form>
      </div>
    </div>
    <!-- Offcanvas to add new user -->

  </div>
  <!-- / Layout wrapper -->
</template>