import { defineStore } from "pinia";

export const useAlertSore = defineStore('alert', {
  state: () => ({
    showAlert: false,
    type: "error",
    text: "Great to ...!!!"
  }),
  actions: {
    notifyAlert() {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    notifyAlertCreated(){
      this.type = "Success",
      this.text = "Processo criado com sucesso";
      this.notifyAlert();
    },

    notifyAlertDeleted(){
      this.type = "warning",
      this.text = "Processo Eliminado",
      this.notifyAlert();
    },
    
    notifyAlertUpdate(){
      this.type = "info",
      this.text = "Processo actualizado",
      this.notifyAlert();
    }

  }
})