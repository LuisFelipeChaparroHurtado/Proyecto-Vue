<template class="login_res">
  <div v-if="selectedLanguage === 'es'" :class="textSizeClass">
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
        <div style="text-align: right">
          <a
            class="reset-btn"
            style="color: white; cursor: pointer"
            @click.prevent="resetPassword"
            >¿Olvidaste tu contraseña?</a
          >
        </div>

        <div class="button-container">
          <button type="submit">Iniciar sesión</button>
        </div>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <!-- Modal de usuario no encontrado -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>{{ modalTitle }}</h3>
          <p>{{ modalMessage }}</p>
          <div class="centrado-boton">
            <button @click="closeModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="selectedLanguage === 'en'" :class="textSizeClass">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <div style="text-align: right">
          <a
            class="reset-btn"
            style="color: white; cursor: pointer"
            @click.prevent="resetPassword"
            >Forgot your password?</a
          >
        </div>

        <div class="button-container">
          <button type="submit">Login</button>
        </div>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <!-- Modal de usuario no encontrado -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>{{ modalTitle }}</h3>
          <p>{{ modalMessage }}</p>
          <div class="centrado-boton">
            <button @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { sendPasswordResetEmail } from "firebase/auth";


export default {
  props: {
    textSizeClass: {
      type: String,
      default: "medium-text",
    },
    selectedLanguage: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // 👈 acá agregamos props al setup
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const showModal = ref(false);
    const modalTitle = ref("");
    const modalMessage = ref("");
    const router = useRouter();

    const login = async () => {
      const db = getFirestore();
      const auth = getAuth();

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email.value));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          modalTitle.value =
            props.selectedLanguage === "es"
              ? "Usuario no encontrado"
              : "User not found";
          modalMessage.value =
            props.selectedLanguage === "es"
              ? "El usuario no existe en la base de datos."
              : "The user does not exist in the database.";
          showModal.value = true;
          return;
        }

        const userData = querySnapshot.docs[0].data();

        if (userData.isBlocked) {
          modalTitle.value =
            props.selectedLanguage === "es"
              ? "Acceso denegado"
              : "Access denied";
          modalMessage.value =
            props.selectedLanguage === "es"
              ? "Tu cuenta ha sido bloqueada por un administrador."
              : "Your account has been blocked by an administrator.";
          showModal.value = true;
          return;
        }

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;

        const role = userData.role || "usuario";
        if (role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/principal");
        }
      } catch (error) {
        errorMessage.value =
          (props.selectedLanguage === "es"
            ? "Error al iniciar sesión: "
            : "Login error: ") + error.message;
      }
    };

    const resetPassword = async () => {
      const auth = getAuth();
      const db = getFirestore(); // Te faltaba declarar esto
      const usersRef = collection(db, "users");

      if (!email.value) {
        modalTitle.value =
          props.selectedLanguage === "es"
            ? "Correo requerido"
            : "Email required";
        modalMessage.value =
          props.selectedLanguage === "es"
            ? "Por favor, ingresa tu correo electrónico para restablecer tu contraseña."
            : "Please enter your email address to reset your password.";
        showModal.value = true;
        return;
      }

      try {
        const q = query(usersRef, where("email", "==", email.value));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          modalTitle.value =
            props.selectedLanguage === "es"
              ? "Cuenta no encontrada"
              : "Account not found";
          modalMessage.value =
            props.selectedLanguage === "es"
              ? "No se encontró ninguna cuenta con ese correo."
              : "No account found with that email address.";
          showModal.value = true;
          return;
        }
        await sendPasswordResetEmail(auth, email.value);
        modalTitle.value =
          props.selectedLanguage === "es" ? "Correo enviado" : "Email sent";
        modalMessage.value =
          props.selectedLanguage === "es"
            ? "Te hemos enviado un correo con instrucciones para restablecer tu contraseña."
            : "We've sent you an email with instructions to reset your password.";
        showModal.value = true;
      } catch (error) {
        modalTitle.value = props.selectedLanguage === "es" ? "Error" : "Error";
        modalMessage.value =
          (props.selectedLanguage === "es"
            ? "No se pudo enviar el correo de restablecimiento. "
            : "Failed to send reset email. ") + error.message;
        showModal.value = true;
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };
    const resetPassword = async () => {
      const auth = getAuth();

      if (!email.value) {
        modalTitle.value = "Correo requerido";
        modalMessage.value = "Por favor, ingresa tu correo electrónico para restablecer tu contraseña.";
        showModal.value = true;
        return;
      }

      try {
        await sendPasswordResetEmail(auth, email.value);
        modalTitle.value = "Correo enviado";
        modalMessage.value = "Te hemos enviado un correo con instrucciones para restablecer tu contraseña.";
        showModal.value = true;
      } catch (error) {
        modalTitle.value = "Error";
        modalMessage.value = "No se pudo enviar el correo de restablecimiento. " + error.message;
        showModal.value = true;
      }
    };


    return {
      email,
      password,
      errorMessage,
      showModal,
      modalTitle,
      modalMessage,
      login,
      resetPassword,
      closeModal,
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

.modal-content button {
  background: #dc3545;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.button-container {
  text-align: center;
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

@media (max-width: 480px) {
  html, body, .login_res {
    height: 100%;
  }

  .login_res {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-container {
    margin: 0;
    width: 385px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  button {
    width: 100%;
    margin-top: 10px;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input {
    padding: 8px;
  }
}

</style>
