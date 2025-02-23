<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="text-center pa-4">
    <v-dialog max-width="400" persistent>
      <v-card prepend-icon="mdi-update" text="Actualizar Processo." title="Actualizar">

        <v-divider></v-divider>
        <v-card-text>
          <v-text-field label="Title" />
          <v-text-field label="Desciption" />
          <v-text-field label="Data finished" />
        </v-card-text>
        <v-divider></v-divider>
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn color="warning" density="comfortable"> Cancelar </v-btn>
          <v-btn color="success" variant="elevated"> Actualizar </v-btn>

        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
</script>