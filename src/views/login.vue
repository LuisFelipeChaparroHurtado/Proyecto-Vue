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

      <div class="button-container">
        <button type="submit">Iniciar sesión</button>
      </div>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Modal de error -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Usuario no encontrado</h3>
        <p>El usuario no existe en la base de datos.</p>
        <div class="centrado-boton">
          <button @click="closeModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const showModal = ref(false);
    const router = useRouter();

    const login = async () => {
      const db = getFirestore();
      const auth = getAuth();

      try {
        // 🔹 1. Buscar el usuario en Firestore por email
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email.value));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          showModal.value = true; // Si no existe, mostrar modal
          return;
        }

        // 🔹 2. Si el usuario existe en Firestore, continuar con Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // 🔹 3. Verificar rol del usuario en Firestore
        const userData = querySnapshot.docs[0].data();
        const role = userData.role || "usuario";

        // 🔹 4. Redirigir según el rol
        if (role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/principal");
        }
      } catch (error) {
        errorMessage.value = "Error al iniciar sesión: " + error.message;
      }
    };


    const closeModal = () => {
      showModal.value = false;
    };

    return {
      email,
      password,
      errorMessage,
      showModal,
      login,
      closeModal
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
  width: 48%;
}

.error {
  color: red;
}

/* MODAL */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  color: black;
  border-radius: 10px;
  text-align: center;
  text-align: center;
  width: 700px;
  
}

.modal-content button {
  background: #dc3545;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.centrado-boton {
  text-align: center;
}
</style>
