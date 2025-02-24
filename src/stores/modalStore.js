import {defineStore} from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () =>({
    isOpen: false, // estado da modal
  }),
  actions: {
    openModal(){
      this.isOpen = true;
    },
    closseModal(){
      this.isOpen = false;
    },
    toggleModal(){
      this.isOpen = !this.isOpen;
    }
  }
});
