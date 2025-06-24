<script setup>
</script>

<template>
  <main>
    <router-view />
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
</style>
