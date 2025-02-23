<template>
  <div class="register">
    <h2>Crear Cuenta</h2>
    <form @submit.prevent="registerUser">
      <input v-model="firstName" type="text" placeholder="Nombres" required />
      <input v-model="lastName" type="text" placeholder="Apellidos" required />
      <input
        v-model="email"
        type="email"
        placeholder="Correo electrónico"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        required
      />
      <input
        v-model="confirm_password"
        type="password"
        placeholder="Confirmar contraseña"
        required
      />

      <button type="submit">Registrarse</button>
      &nbsp;
      <button type="button" @click="goToLogin">Iniciar sesión</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Importar el router
import { auth, createUserWithEmailAndPassword, updateProfile  } from "../firebase";

export default {
  setup() {
    const router = useRouter(); // Instancia del router

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const confirm_password = ref("");
    const errorMessage = ref("");

    const registerUser = async () => {
      if (password.value !== confirm_password.value) {
        errorMessage.value = "Las contraseñas no coinciden";
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;

        // Actualizar el perfil del usuario con el nombre
        await updateProfile(user, {
          displayName: `${firstName.value} ${lastName.value}`,
        });

        alert("Usuario creado correctamente");
        router.push("/"); // Redirige al login después de registrar
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    const goToLogin = () => {
      router.push("/"); // Redirige al login
    };

    return {
      firstName,
      lastName,
      email,
      password,
      confirm_password,
      registerUser,
      errorMessage,
      goToLogin,
    };
  },
};
</script>

<style scoped>
.register {
  width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 10px;
}
button {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
