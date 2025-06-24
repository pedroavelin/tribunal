<script setup>
import Menu from '@/components/layout/Menu.vue'
import Navbar from '@/components/layout/Navbar.vue'
import { ref, onMounted, watch } from 'vue'
import { useProvinciasStore } from '@/stores/useProvinciasStore'
import { useMunicipiosStore } from '@/stores/useMunicipiosStore'
import { useTribunaisStore } from '@/stores/useTribunaisStore'
import { useSeccoesStore } from '@/stores/useSeccaoStore'

const numero = ref('')
const provinciaId = ref('')
const municipioId = ref('')
const tribunalId = ref('')

const provinciasStore = useProvinciasStore()
const municipiosStore = useMunicipiosStore()
const tribunalStore = useTribunaisStore()
const seccoesStore = useSeccoesStore()

onMounted(() => {
  seccoesStore.listarSeccoes()
  provinciasStore.fetchProvincias()
  tribunalStore.getAllTribunais()
})


watch(provinciaId, (id) => {
  if (id) {
    municipiosStore.fetchMunicipiosByProvincia(id)
    municipioId.value = ''
  }
})

async function submit() {
  if (!numero.value || !tribunalId.value || !provinciaId.value || !municipioId.value) {
    alert('Preencha todos os campos')
    return
  }
   // Objeto com os dados que serão enviados
  const payload = {
    numero: numero.value,
    idTribunal: tribunalId.value,
    idMunicipio: municipioId.value
  }
  console.log('Dados do formulário a serem enviados:', payload)
  try {
    await seccoesStore.adicionarSeccao(payload)
    alert('Secção criada com sucesso!')
    numero.value = ''
    tribunalId.value = ''
    provinciaId.value = ''
    municipioId.value = ''
  } catch (err) {
    console.error('Erro ao enviar formulário:', err)
    alert(seccoesStore.error || 'Erro ao adicionar secção.')
  }
}
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
            <!-- Form-add-tribunal -->
            <div class="col-12">
              <div class="car">
                <h5 class="card-header">Registar secção</h5>
                <div class="card-body">
                  <form @submit.prevent="submit" class="form-repeater">
                    <div data-repeater-list="group-a">
                      <div data-repeater-item="">
                        <div class="row">
                          <div class="mb-6 col-lg-6 col-xl-3 col-12 mb-0">
                            <label class="form-label" for="form-repeater-1-1">Descrição</label>
                            <input v-model="numero" type="text" id="form-repeater-1-1" class="form-control" placeholder="Descrição da secção">
                          </div>
                          <div class="mb-6 col-lg-6 col-xl-3 col-12 mb-0">
                            <label class="form-label" for="form-repeater-1-4">Tribunal</label>
                            <select v-model="tribunalId" class="form-select">
                              <option value="">Selecione o tribunal</option>
                              <option v-for="t in tribunalStore.tribunais" :key="t.id" :value="t.id">
                                {{ t.nome }}
                              </option>
                            </select>
                          </div>
                          <div class="mb-6 col-lg-4 col-xl-2 col-12 mb-0">
                            <label class="form-label" for="form-repeater-1-3">Província</label>
                            <select v-model="provinciaId" class="form-select">
                              <option value="">Selecione a província</option>
                              <option v-for="p in provinciasStore.provincias" :key="p.id" :value="p.id">
                                {{ p.nome }}
                              </option>
                            </select>
                          </div>
                          <div class="mb-6 col-lg-4 col-xl-2 col-12 mb-0">
                            <label class="form-label" for="form-repeater-1-4">Município</label>
                            <select v-model="municipioId" class="form-select" :disabled="!provinciaId">
                              <option value="">Selecione o município</option>
                              <option v-for="m in municipiosStore.municipios" :key="m.id" :value="m.id">
                                {{ m.nome }}
                              </option>
                            </select>
                          </div>
                          <div class="mb-6 col-lg-12 col-xl-2 col-12 d-flex align-items-center mb-0 mt-5">
                            <button type="submit" class="btn btn-primary waves-effect waves-light align-items-center mb-0"
                              data-repeater-create="">
                              <i class="icon-base ti tabler-plus me-1"></i>
                              <span class="align-middle">Adicionar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <!-- Form-add-tribunal -->
            <div class="card">
              <div class="table-responsive text-nowrap">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Secção</th>
                      <th>Tribunal</th>
                      <th>Província</th>
                      <th>Município</th>
                      <th>Estado</th>
                      <th>Opções</th>
                    </tr>
                  </thead>

                  <tbody class="table-border-bottom-0">
                    <tr v-for="sec in seccoesStore.seccoes" :key="sec.id">
                      <td>
                        <span class="fw-medium">{{ sec.numero }}</span>
                      </td>
                      <td>{{ sec.tribunal?.nome || '—' }}</td>
                      <td>
                        <span class="fw-medium">{{ sec.municipio?.provincia?.nome || '—' }}</span>
                      </td>
                      <td>
                        <span class="fw-medium">{{ sec.municipio?.nome || '—' }}</span>
                      </td>
                      <td><span class="badge bg-label-primary me-1">Active</span></td>
                      <td>
                        <button class="btn btn-icon waves-effect mx-1"><i
                            class="icon-base icon-22px ti tabler-edit"></i></button>
                        <button class="btn btn-icon waves-effect mx-1"><i
                            class="icon-base icon-22px ti tabler-trash"></i></button>
                      </td>
                    </tr>
                    <tr v-if="!seccoesStore.loading && seccoesStore.seccoes.length === 0">
                      <td colspan="6" class="text-center">Nenhuma secção cadastrada.</td>
                    </tr>
                    <tr v-if="seccoesStore.loading">
                      <td colspan="6" class="text-center">Carregando...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- / Content -->
        </div>
        <!-- Content wrapper -->
      </div>
      <!-- / Layout page -->
    </div>
  </div>
  <!-- / Layout wrapper -->
</template>