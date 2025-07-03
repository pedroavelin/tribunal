<script setup>
import { ref, watch, onMounted } from 'vue'
const isOpenModalAssignPermissionToRole = ref(false)


const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits([
  'update:modelValue',
  'save',
  'close'
])
// Observadores para controle do modal
watch(() => props.modelValue, (val) => {
  isOpenModalAssignPermissionToRole.value = val
})

watch(isOpenModalAssignPermissionToRole, (val) => {
  emit('update:modelValue', val)
})

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
})
// Fechar ao pressionar ESC
const handleKeydown = (e) => {
  if (e.key === 'Escape' && isOpenModalAssignPermissionToRole.value) {
    closeModal()
  }
}

function closeModal() {
  isOpenModalAssignPermissionToRole.value = false
  emit('close')
}

</script>
<template>
  
  <div v-if="isOpenModalAssignPermissionToRole" class="modal fade show" style="display: block;" id="addRoleModal" tabindex="-1" aria-modal="true" role="dialog">
    <div :class="{ show: isOpenModalAssignPermissionToRole }"  class="modal-dialog modal-lg modal-simple modal-dialog-centered modal-add-new-role">
      <div class="modal-content">
        <div class="modal-body_1">
          <button type="button" class="btn-close" data-bs-dismiss="modal"  @click="closeModal" aria-label="Close"></button>
          <div class="text-center mb-1">
            <h4 class="role-title">Editar função</h4>
            <p class="text-body-secondary">Definir permissões de função</p>
          </div>
          <!-- Add role form -->
          <form id="addRoleForm" class="row g-0 fv-plugins-bootstrap5 fv-plugins-framework" onsubmit="return false"
            novalidate="novalidate">
            <div class="col-12">
              <h5 class="mb-1">Permissões de função</h5>
              <!-- Permission table -->
              <div class="table-responsive">
                <table class="table table-flush-spacing">
                  <tbody>
                    <tr>
                      <td class="text-nowrap fw-medium">
                        Acesso de administrador
                        <i class="icon-base ti tabler-info-circle icon-xs" data-bs-toggle="tooltip"
                          data-bs-placement="top" aria-label="Allows a full access to the system"
                          data-bs-original-title="Allows a full access to the system"></i>
                      </td>
                      <td>
                        <div class="d-flex justify-content-end">
                          <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" id="selectAll">
                            <label class="form-check-label" for="selectAll">Seleccionar todas</label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-medium text-heading">Gerenciamento de usuários</td>
                      <td>
                        <div class="d-flex justify-content-end">
                          <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" id="userManagementRead">
                            <label class="form-check-label" for="userManagementRead"> Read
                            </label>
                          </div>
                          <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" id="userManagementWrite">
                            <label class="form-check-label" for="userManagementWrite"> Write
                            </label>
                          </div>
                          <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" id="userManagementCreate">
                            <label class="form-check-label" for="userManagementCreate">
                              Create </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-medium text-heading">Content Management</td>
                      <td>
                        <div class="d-flex justify-content-end">
                          <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" id="contentManagementRead">
                            <label class="form-check-label" for="contentManagementRead">
                              Read </label>
                          </div>
                          <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" id="contentManagementWrite">
                            <label class="form-check-label" for="contentManagementWrite">
                              Write </label>
                          </div>
                          <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" id="contentManagementCreate">
                            <label class="form-check-label" for="contentManagementCreate">
                              Create </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-medium text-heading">Disputes Management</td>
                      <td>
                        <div class="d-flex justify-content-end">
                          <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" id="dispManagementRead">
                            <label class="form-check-label" for="dispManagementRead"> Read
                            </label>
                          </div>
                          <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" id="dispManagementWrite">
                            <label class="form-check-label" for="dispManagementWrite"> Write
                            </label>
                          </div>
                          <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" id="dispManagementCreate">
                            <label class="form-check-label" for="dispManagementCreate">
                              Create </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-medium text-heading">Database Management</td>
                      <td>
                        <div class="d-flex justify-content-end">
                          <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" id="dbManagementRead">
                            <label class="form-check-label" for="dbManagementRead"> Read
                            </label>
                          </div>
                          <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" id="dbManagementWrite">
                            <label class="form-check-label" for="dbManagementWrite"> Write
                            </label>
                          </div>
                          <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" id="dbManagementCreate">
                            <label class="form-check-label" for="dbManagementCreate"> Create
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-nowrap fw-medium text-heading">Financial Management</td>
                      <td>
                        <div class="d-flex justify-content-end">
                          <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" id="finManagementRead">
                            <label class="form-check-label" for="finManagementRead"> Read
                            </label>
                          </div>
                          <div class="form-check mb-0 me-4 me-lg-12">
                            <input class="form-check-input" type="checkbox" id="finManagementWrite">
                            <label class="form-check-label" for="finManagementWrite"> Write
                            </label>
                          </div>
                          <div class="form-check mb-0">
                            <input class="form-check-input" type="checkbox" id="finManagementCreate">
                            <label class="form-check-label" for="finManagementCreate">
                              Create </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                   
                  </tbody>
                </table>
              </div>
              <!-- Permission table -->
            </div>
            <div class="col-12 text-center">
              <button type="submit" class="btn btn-sm btn-primary me-sm-4 me-1 waves-effect waves-light">Salvar</button>
              <button type="reset" class="btn btn-sm btn-label-secondary waves-effect" data-bs-dismiss="modal"
                aria-label="Close">Cancel</button>
            </div>
            <input type="hidden">
          </form>
          <!--/ Add role form -->
        </div>
      </div>
    </div>
  </div>
</template>