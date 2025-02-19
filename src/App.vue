<template>
  <div v-if="$route.path !== '/register' && $route.path !== '/'" class="header">
    <TextSizeSelector @size-changed="changeTextSize" />
    <ToggleLanguage v-model:selectedLanguage="selectedLanguage" @change="handleInput" />
  </div>

  <div v-if="$route.path !== '/register' && $route.path !== '/'" class="card image">
    <img src=".\assets\Fondo.jpg" alt="">
  </div>

  <RouterView :text-size-class="textSize" :selectedLanguage="selectedLanguage"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TextSizeSelector from '@/components/textSizeSelector.vue';
import ToggleLanguage from '@/components/toggleLanguage.vue';

export default defineComponent({
  name: 'App',
  components: {
    TextSizeSelector,
    ToggleLanguage
  },
  data() {
    return {
      textSize: 'medium-text'
    };
  },
  setup() {
    const selectedLanguage = ref('es');

    const changeLanguage = (event: any) => {
      selectedLanguage.value = event.target.value;
    };

    return {
      selectedLanguage,
      handleInput: changeLanguage
    };
  },
  methods: {
    changeTextSize(newSize: any) {
      switch (newSize) {
        case 'Pequeña':
          this.textSize = 'small-text';
          break;
        case 'Mediana':
          this.textSize = 'medium-text';
          break;
        case 'Grande':
          this.textSize = 'large-text';
          break;
        case 'Gigante':
          this.textSize = 'giant-text';
          break;
      }
    }
  }
});
</script>

<style scoped>
@import './assets/base.css';

.header {
  display: flex;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
