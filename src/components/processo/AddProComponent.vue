<template>
    <!-- Modal -->
<div class="modal bounceIn animated" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Adicionar Processo</h4>
      </div>
      <div class="modal-body">
        <form-wizard @on-complete="onComplete" :start-index="0" step-size="xs" color="#3498db">
            <tab-content title="Dados do processo">
              <div class="row mb10">
                <div class="col-sm-4">
                  <input type="text" placeholder="Número" class="form-control input-sm">
                </div>
                <div class="col-sm-4">
                  <input type="text" placeholder="Ano" class="form-control input-sm">
                </div>
                <div class="col-sm-4">
                  <input type="text" placeholder="Estado" class="form-control input-sm">
                </div>
              </div>
              <div class="col">
                <input type="text" placeholder="Crime (Ex. Roubo qualificado)" class="form-control input-sm">
              </div>
            </tab-content>
            <tab-content title="Arguido(s)">
              <div class="lista-de-arguidos">
              <div class="item" v-for="x in 3" :key="x">

              <div class="row mb10">
                <div class="col-sm-9">
                  <input type="text" placeholder="Nome do arguido" class="form-control input-sm">
                </div>
                <div class="col-sm-3">
                  <input type="text" placeholder="Estado" class="form-control input-sm">
                </div>
              </div>

              <div class="row mb10">
                <div class="col-sm-3">
                  <input type="text" placeholder="Nº do Bilhete" class="form-control input-sm">
                </div>
                <div class="col-sm-3">
                  <input type="text" placeholder="Nº de Telefone" class="form-control input-sm">
                </div>
                <div class="col-sm-6">
                  <input type="text" placeholder="Crime (Ex. Receptação)" class="form-control input-sm">
                </div>
              </div>
              
              <div class="row">
                <div class="col-sm-3">
                  <input type="text" placeholder="Data de Julgamento" class="form-control input-sm">
                </div>
                <div class="col-sm-3">
                  <input type="text" placeholder="Data da Soltura" class="form-control input-sm">
                </div>
                <div class="col-sm-3">
                  <input type="text" placeholder="Pena" class="form-control input-sm">
                </div>
                <div class="col-sm-3">
                  <input type="text" placeholder="Descrição" class="form-control input-sm">
                </div>
              </div>

              </div>
            </div>
            </tab-content>
            <tab-content title="Declarante(s)">
              <div class="lista-de-arguidos">
              <div class="item" v-for="x in 4" :key="x">

              <div class="row mb10">
                <div class="col-sm-8">
                  <input type="text" placeholder="Nome do declarante" class="form-control input-sm">
                </div>
                <div class="col-sm-2">
                  <input type="text" placeholder="Telefone 1" class="form-control input-sm">
                </div>
                <div class="col-sm-2">
                  <input type="text" placeholder="telefone 2" class="form-control input-sm">
                </div>
              </div>
              <div class="row mb10">
                <div class="col-sm-4">
                  <input type="text" placeholder="Província" class="form-control input-sm">
                </div>
                <div class="col-sm-4">
                  <input type="text" placeholder="Município" class="form-control input-sm">
                </div>
                <div class="col-sm-4">
                  <input type="text" placeholder="Bairro/rua" class="form-control input-sm">
                </div>
              </div>
              
              </div>
            </div>
            </tab-content>
        </form-wizard>
      </div>
    </div><!-- modal-content -->
  </div><!-- modal-dialog -->
</div><!-- modal -->
</template>
<script>
import {FormWizard,TabContent} from "vue3-form-wizard";
import 'vue3-form-wizard/dist/style.css'
export default {
  components: {
    FormWizard,
    TabContent,
  },
  methods: {
     onComplete() {
      alert("Processo criado.");
    },
  },
};
</script>
<style>
  .lista-de-arguidos{
    max-height: 200px; 
    overflow-y: scroll; 
  }
  .lista-de-arguidos .item {
  margin-bottom: 4px;
  border: 1px solid #ccc;
  padding: 10px; 
  background: #f9f9f9; 
}
</style>