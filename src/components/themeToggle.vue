<!-- src/components/ThemeToggle.vue -->
<template>
    <!-- Botón para alternar el tema -->
    <button @click="toggleTheme">
        <span v-if="isDark">
            <!-- Icono para tema oscuro -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 4V2M12 22V20M20.364 19.364L21.778 20.778M2.222 1.222L3.636 2.636M22 12H20M4 12H2M19.364 4.636L20.778 3.222M1.222 21.778L2.636 20.364M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </span>
        <span v-else>
            <!-- Icono para tema claro -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M21 12.79C20.6785 12.8327 20.3471 12.8545 20.0109 12.8545C15.5817 12.8545 11.9484 9.22117 11.9484 4.79194C11.9484 4.45579 11.9702 4.12443 12.0129 3.80292C10.2936 4.99133 9.14553 6.93289 9.14553 9.14545C9.14553 13.3508 12.6455 16.8545 16.8545 16.8545C19.0671 16.8545 21.0087 15.7065 22.1971 13.9872C21.8756 14.0299 21.5442 14.0517 21.2071 14.0517C19.6471 14.0517 18.2926 13.5311 17.2926 12.7919C18.2926 12.2926 19.6471 11.7709 21 12.79Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </span>
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define el estado reactivo para el tema oscuro
const isDark = ref(false);

// Método para alternar entre tema oscuro y claro
const toggleTheme = () => {
    isDark.value = !isDark.value;
    // Agrega o elimina la clase 'dark-theme' al elemento root del documento
    if (isDark.value) {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
};
</script>

<style scoped>
/* Estilos específicos para el componente ThemeToggle */
button {
    padding: 10px 20px;
    cursor: pointer;
    background-color: var(--background-color);
    color: var(--text-color);
    border: 2px solid var(--text-color);
    border-radius: 5px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

button:hover {
    opacity: 0.8;
}

svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}
</style>

