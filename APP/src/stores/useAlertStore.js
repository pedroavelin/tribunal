import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [],
    nextId: 1
  }),

  actions: {
    addAlert({ type, message, icon = null, timeout = 5000 }) {
      const alertTypes = {
        success: {
          class: 'alert-solid-success',
          defaultIcon: 'ti tabler-check'
        },
        error: {
          class: 'alert-solid-danger',
          defaultIcon: 'ti tabler-alert-circle'
        },
        warning: {
          class: 'alert-solid-warning',
          defaultIcon: 'ti tabler-alert-triangle'
        },
        info: {
          class: 'alert-solid-info',
          defaultIcon: 'ti tabler-info-circle'
        }
      };

      const alertType = alertTypes[type] || alertTypes.info;
      const alertIcon = icon || alertType.defaultIcon;

      const alert = {
        id: this.nextId++,
        type,
        message,
        icon: alertIcon,
        alertClass: alertType.class,
        timeout
      };

      this.alerts.push(alert);

      // Remove o alerta automaticamente após o timeout
      if (timeout > 0) {
        setTimeout(() => {
          this.removeAlert(alert.id);
        }, timeout);
      }

      return alert.id;
    },

    removeAlert(id) {
      this.alerts = this.alerts.filter(alert => alert.id !== id);
    },

    // Métodos auxiliares para cada tipo de alerta
    success(message, options = {}) {
      return this.addAlert({ type: 'success', message, ...options });
    },

    error(message, options = {}) {
      return this.addAlert({ type: 'error', message, ...options });
    },

    warning(message, options = {}) {
      return this.addAlert({ type: 'warning', message, ...options });
    },

    info(message, options = {}) {
      return this.addAlert({ type: 'info', message, ...options });
    },

    clearAll() {
      this.alerts = [];
    }
  }
});