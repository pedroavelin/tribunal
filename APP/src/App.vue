<script setup>
import AlertContainer from '@/components/alerts/AlertContainer.vue';

</script>

<template>
  <main>
    <router-view />
    <AlertContainer />
  </main>
</template>

<style>
.my-scroll {
  max-height: 300px;
  /* ou qualquer altura desejada */
  overflow-y: auto;
  /* habilita o scroll vertical */
  overflow-x: hidden;
  /* esconde o scroll horizontal se necessário */
}

/* Estilo opcional para a barra de scroll */
.my-scroll::-webkit-scrollbar {
  width: 8px;
}

.my-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.my-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.my-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* estilo das alertas */
/* Classes base para os alertas */
.alert {
  border: 0;
  border-left: 4px solid transparent;
  padding: 1rem 1.25rem;
}

.alert-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

/* Cores para cada tipo de alerta */
.alert-solid-success {
  background-color: #d1fae5;
  color: #065f46;
}

.alert-solid-danger {
  background-color: #fee2e2;
  color: #b91c1c;
}

.alert-solid-warning {
  background-color: #fef3c7;
  color: #92400e;
}

.alert-solid-info {
  background-color: #dbeafe;
  color: #1e40af;
}

/* Ícones com cor correspondente */
.alert-solid-success .alert-icon {
  background-color: #34d399;
}

.alert-solid-danger .alert-icon {
  background-color: #f87171;
}

.alert-solid-warning .alert-icon {
  background-color: #fbbf24;
}

.alert-solid-info .alert-icon {
  background-color: #60a5fa;
}

.alert-icon i {
  color: white;
}
</style>
