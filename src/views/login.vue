<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Correo electrónico"
          required
        />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Contraseña"
          required
        />
      </div>

      <!-- Contenedor para los botones con separación -->
      <div class="button-container">
        <button type="submit">Iniciar sesión</button>
      </div>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const login = async () => {
      const auth = getAuth();
      const db = getFirestore(); // Conectar Firestore

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;

        // Obtener el rol del usuario desde Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        let role = "usuario"; // Valor por defecto
        if (userSnap.exists()) {
          role = userSnap.data().role || "usuario";
        }

        // Redirigir según el rol
        if (role === "admin") {
          router.push("/dashboard"); // Vista de administrador
        } else {
          router.push("/principal"); // Vista de usuario normal
        }
      } catch (error) {
        errorMessage.value = "Error al iniciar sesión: " + error.message;
      }
    };

    return {
      email,
      password,
      errorMessage,
      login,
    };
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
  text-align: center;
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
