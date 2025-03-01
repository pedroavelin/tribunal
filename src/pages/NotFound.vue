<template>
  <v-empty-state image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png">
    <template v-slot:title>
      <div class="text-subtitle-2 mt-8">
        Manage your inventory transfers
      </div>
    </template>

    <template v-slot:text>
      <div class="text-caption">
        Track and receive your incoming inventory from suppliers
      </div>
    </template>

    <template v-slot:actions>
      <Routerlink>
        <v-btn color="primary" variant="tonal" to="/processo" class="text-none" elevation="1" rounded="0" size="small" text="Ir para processso"></v-btn>
      </Routerlink>
    </template>
  </v-empty-state>
</template>
