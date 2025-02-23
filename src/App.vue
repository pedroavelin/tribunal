<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* Estiliza a barra de rolagem para toda a aplicação */
::-webkit-scrollbar-track {
  background-color: rgba(199, 202, 202, 0.445);	
}

::-webkit-scrollbar {
  width: 9px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
  border-radius: 0px;
  background-image: -webkit-gradient(linear,
									   left bottom,
									   left top,
									   color-stop(0.44, rgb(122,153,217)),
									   color-stop(0.72, rgb(73,125,189)),
									   color-stop(0.86, rgb(28,58,148)));
}

</style>
