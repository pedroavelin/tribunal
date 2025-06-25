<template>
  <div class="alerts-container">
    <transition-group name="alert">
      <div 
        v-for="alert in alerts" 
        :key="alert.id"
        class="alert d-flex align-items-center"
        :class="alert.alertClass"
        role="alert"
      >
        <span class="alert-icon rounded">
          <i :class="`icon-base ${alert.icon} icon-md`"></i>
        </span>
        {{ alert.message }}
        <button 
          type="button" 
          class="btn-close ms-auto" 
          @click="removeAlert(alert.id)"
          aria-label="Fechar"
        ></button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { useAlertStore } from '@/stores/useAlertStore';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(useAlertStore, ['alerts'])
  },

  methods: {
    ...mapActions(useAlertStore, ['removeAlert'])
  }
}
</script>

<style scoped>
.alerts-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  width: 350px;
}

.alert {
  margin-bottom: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.5s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>