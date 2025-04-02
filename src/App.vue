<template>
  <div
    v-if="$route.path !== '/register' && $route.path !== '/'"
    class="card image"
  >
    <img src="./assets/Fondo.jpg" alt="" />
  </div>

  <div v-if="$route.path !== '/register' && $route.path !== '/'" class="header">
    <!-- Botón de atrás (solo aparece en rutas de formularios) -->
    <button v-if="isFormRoute" @click="$router.go(-1)" class="back-button">
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon" />
      Atrás
    </button>

    <div class="settings">
      <TextSizeSelector @size-changed="changeTextSize" />
      <ToggleLanguage
        v-model:selectedLanguage="selectedLanguage"
        @change="handleInput"
      />
    </div>
  </div>

  <RouterView
    :text-size-class="textSize"
    :selectedLanguage="selectedLanguage"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import TextSizeSelector from "@/components/textSizeSelector.vue";
import ToggleLanguage from "@/components/toggleLanguage.vue";

export default defineComponent({
  name: "App",
  components: {
    TextSizeSelector,
    ToggleLanguage,
  },
  data() {
    return {
      textSize: "medium-text",
    };
  },
  setup() {
    const selectedLanguage = ref("es");
    const route = useRoute();

    // Detectar si estamos en una ruta de formulario
    const isFormRoute = computed(() => {
      return (
        route.path.includes("/confidencialidad") ||
        route.path.includes("/consentimiento") ||
        route.path.includes("/editarPerfil") ||
        route.path.includes("/subirArchivos")
      );
    });

    const changeLanguage = (event: any) => {
      selectedLanguage.value = event.target.value;
    };

    return {
      selectedLanguage,
      handleInput: changeLanguage,
      isFormRoute,
    };
  },
  methods: {
    changeTextSize(newSize: any) {
      switch (newSize) {
        case "Pequeña":
          this.textSize = "small-text";
          break;
        case "Mediana":
          this.textSize = "medium-text";
          break;
        case "Grande":
          this.textSize = "large-text";
          break;
        case "Gigante":
          this.textSize = "giant-text";
          break;
      }
    },
  },
});
</script>

<style scoped>
@import "./assets/base.css";

.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem;
}

.back-button {
  background: white;
  color: 007bff80;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  margin-right: auto; /* Alinea el botón a la izquierda */
}

.settings {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
