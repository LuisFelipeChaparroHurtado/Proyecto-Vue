<template>
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email" >Correo electrónico:</label>
          <input type="email" id="email" v-model="email" placeholder="Correo electrónico" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password"  placeholder="Contraseña" required />
        </div>

        <!-- Contenedor para los botones con separación -->
        <div class="button-container">
          <button type="submit">Iniciar sesión</button>
          <button type="button" @click="goToRegister">Crear usuario</button>
        </div>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>


  
  <script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      async login() {
        const auth = getAuth();
        try {
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          console.log("Usuario autenticado:", userCredential.user);
          this.$router.push("/confidencialidad"); // Redirige a otra vista después de iniciar sesión
        } catch (error) {
          this.errorMessage = "Error al iniciar sesión: " + error.message;
        }
      },
      goToRegister() {
        this.$router.push("/register"); // Redirige a la vista de registro
    },

    },
  };
  </script>
  
 
<style scoped>
.login-container {
  width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

input {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 10px;
}

.button-container {
  display: flex;
  justify-content: space-between; /* Espacio entre botones */
  margin-top: 10px;
}

button {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 48%; /* Hace que los botones sean iguales y mantengan espacio */
}

.error {
  color: red;
}
</style>