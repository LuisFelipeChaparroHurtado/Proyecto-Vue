<!-- src/components/LanguageSelect.vue -->
<template>
    <div>
      <select v-model="selectedLanguage" @change="changeLanguage">
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    props: {
      selectedLanguage: {
        type: String,
        required: true
      }
    },
    setup(props, { emit }) {
      const selectedLanguage = ref(props.selectedLanguage);
  
      const changeLanguage = (event) => {
        selectedLanguage.value = event.target.value;
        emit('languageChanged', selectedLanguage.value);
      };
  
      watch(() => props.selectedLanguage, (newLanguage) => {
        selectedLanguage.value = newLanguage;
      });
  
      return {
        selectedLanguage,
        changeLanguage
      };
    }
  };
  </script>
  