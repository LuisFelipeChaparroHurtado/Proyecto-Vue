<template>
  <div>
      <!-- Etiqueta y selector de tamaño de texto -->
      <label for="textSize">Tamaño del texto:</label>
      <select id="textSize" v-model="selectedSize" @change="updateSize">
          <!-- Opciones del selector -->
          <option value="Pequeña">Pequeña</option>
          <option value="Mediana">Mediana</option>
          <option value="Grande">Grande</option>
          <option value="Gigante">Gigante</option>
      </select>
  </div>
</template>

<script>
export default {
  data() {
      return {
          selectedSize: 'Mediana' // Tamaño seleccionado por defecto
      };
  },
  methods: {
      // Método para manejar el cambio de tamaño
      updateSize() {
          this.$emit('size-changed', this.selectedSize); // Emitir evento con el tamaño seleccionado
      }
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
/* Puedes agregar estilos aquí */
</style>
