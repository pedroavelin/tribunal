<template>
  <v-app id="inspire"><router-view /></v-app>
</template>
<style>
/* ===== Scrollbar CSS ===== */

  /* Firefox */
  * {
    scrollbar-width: none;
    scrollbar-color: #011d60 #057eff;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: #057eff;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #011d60;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
  .bg-gradient{
    background-color: #1746a2!important;
    background-image: linear-gradient(72deg, rgb(11 33 66 / 0%) 22%, #6085be 56%, #00bdb600 86%, #fff) !important;
    color: #fff!important;
  }
</style>
