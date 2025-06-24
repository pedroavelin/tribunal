<script setup>
import Menu from '@/components/layout/Menu.vue'
import Navbar from '@/components/layout/Navbar.vue'
import { ref, onMounted, watch } from 'vue'
import { useProvinciasStore } from '@/stores/useProvinciasStore'
import { useMunicipiosStore } from '@/stores/useMunicipiosStore'
import { useTribunaisStore } from '@/stores/useTribunaisStore'

const nome = ref('')
const provinciaId = ref('')
const municipioId = ref('')

const provinciasStore = useProvinciasStore()
const municipiosStore = useMunicipiosStore()
const tribunaisStore = useTribunaisStore()

onMounted(() => {
  provinciasStore.fetchProvincias()
  tribunaisStore.fetchTribunais()
})

watch(provinciaId, (id) => {
  if (id) {
    municipiosStore.fetchMunicipiosByProvincia(id)
    municipioId.value = ''
  }
})

async function submit() {
  if (!nome.value || !provinciaId.value || !municipioId.value) {
    alert('Preencha todos os campos')
    return
  }

  try {
    await tribunaisStore.adicionarTribunal({
      nome: nome.value,
      idMunicipio: municipioId.value
    })
    alert('Tribunal criado com sucesso!')
    nome.value = ''
    provinciaId.value = ''
    municipioId.value = ''
  } catch (err) {
    alert(tribunaisStore.error || 'Erro ao adicionar tribunal.')
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
                <h5 class="card-header">Registar tribunal</h5>
                <div class="card-body">
                  <form @submit.prevent="submit">
                    <div class="row">
                      <div class="mb-6 col-lg-6 col-xl-3 col-12 mb-0">
                        <label class="form-label">Nome</label>
                        <input type="text" v-model="nome" class="form-control" placeholder="Nome do tribunal" />
                      </div>

                      <div class="mb-6 col-lg-6 col-xl-3 col-12 mb-0">
                        <label class="form-label">Província</label>
                        <select v-model="provinciaId" class="form-select">
                          <option value="">Selecione a província</option>
                          <option v-for="p in provinciasStore.provincias" :key="p.id" :value="p.id">
                            {{ p.nome }}
                          </option>
                        </select>
                      </div>

                      <div class="mb-6 col-lg-6 col-xl-3 col-12 mb-0">
                        <label class="form-label">Município</label>
                        <select v-model="municipioId" class="form-select" :disabled="!provinciaId">
                          <option value="">Selecione o município</option>
                          <option v-for="m in municipiosStore.municipios" :key="m.id" :value="m.id">
                            {{ m.nome }}
                          </option>
                        </select>
                      </div>

                      <div class="mb-6 col-lg-12 col-xl-2 col-12 d-flex align-items-center mb-0 mt-5">
                        <button type="submit" class="btn btn-primary">
                          <i class="icon-base ti tabler-plus me-1"></i>
                          <span class="align-middle">Adicionar</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <!-- Form-add-tribunal -->
            <div class="card">
              <div class="table-responsive text-nowrap my-scroll">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Tribunal</th>
                      <th>Província</th>
                      <th>Município</th>
                      <th>Estado</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr v-for="tribunal in tribunaisStore.tribunaisCompletos" :key="tribunal.id">
                      <td>
                        <span class="fw-medium">{{ tribunal.nome }}</span>
                      </td>
                      <td>{{ tribunal.provincia }}</td>
                      <td>{{ tribunal.municipio }}</td>
                      <td><span class="badge bg-label-primary me-1">Activo</span></td>
                      <td>
                        <button class="btn btn-icon waves-effect mx-1">
                          <i class="icon-base icon-22px ti tabler-edit"></i>
                        </button>
                        <button class="btn btn-icon waves-effect mx-1">
                          <i class="icon-base icon-22px ti tabler-trash"></i>
                        </button>
                      </td>
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