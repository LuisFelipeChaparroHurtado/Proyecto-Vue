<template class="register_res">
  <div v-if="selectedLanguage === 'es'" :class="textSizeClass">
    <div class="register">
    <h2>Crear Cuenta</h2>
    <form @submit.prevent="registerUser">
      <input v-model="firstName" type="text" placeholder="Nombres" required />
      <input v-model="lastName" type="text" placeholder="Apellidos" required />
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <input v-model="confirm_password" type="password" placeholder="Confirmar contraseña" required />

      <!-- Select para elegir el rol del usuario -->
      <select v-model="role" required>
        <option value="" disabled>Seleccionar rol</option>
        <option value="usuario">Usuario</option>
        <option value="admin">Administrador</option>
      </select>

      <div class="button-group">
        <button type="submit">Registrarse</button>
        <button type="button" class="back-btn" @click="goToBack">Atrás</button>
      </div>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
  </div>
  <div v-if="selectedLanguage === 'en'" :class="textSizeClass">
    <div class="register">
    <h2>Create Account</h2>
    <form @submit.prevent="registerUser">
      <input v-model="firstName" type="text" placeholder="Names" required />
      <input v-model="lastName" type="text" placeholder="Surnames" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="confirm_password" type="password" placeholder="Confirm Password" required />

      <!-- Select para elegir el rol del usuario -->
      <select v-model="role" required>
        <option value="" disabled>Select role</option>
        <option value="usuario">User</option>
        <option value="admin">Administrator</option>
      </select>

      <div class="button-group">
        <button type="submit">Register</button>
        <button type="button" class="back-btn" @click="goToBack">Back</button>
      </div>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
  </div>
  
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
    const router = useRouter();
    const auth = getAuth();
    const db = getFirestore();

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const confirm_password = ref("");
    const role = ref("");
    const errorMessage = ref("");

<<<<<<< HEAD
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

=======
    // Diccionario de traducciones
    const translations = {
      en: {
        passwordsDoNotMatch: "Passwords do not match",
        selectRole: "You must select a role",
        userCreated: "User created successfully",
        weakPassword:
          "Password must be at least 8 characters, with uppercase, lowercase, number and special character",
      },
      es: {
        passwordsDoNotMatch: "Las contraseñas no coinciden",
        selectRole: "Debes seleccionar un rol",
        userCreated: "Usuario creado correctamente",
        weakPassword:
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
      },
    };

    // Función para obtener texto según idioma
    const t = (key) => {
      const lang = props.selectedLanguage;
      return translations[lang][key] || key;
    };

    // Validar seguridad de contraseña
    const isPasswordStrong = (passwordValue) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/;
      return regex.test(passwordValue);
    };

    // Registro de usuario
>>>>>>> origin
    const registerUser = async () => {
      if (password.value !== confirm_password.value) {
        errorMessage.value = t("passwordsDoNotMatch");
        return;
      }

      if (!isPasswordStrong(password.value)) {
        errorMessage.value = t("weakPassword");
        return;
      }
      if (!passwordRegex.test(password.value)) {
        errorMessage.value =
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
        return;
      }

      if (!role.value) {
        errorMessage.value = t("selectRole");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: `${firstName.value} ${lastName.value}`,
        });

        await setDoc(doc(db, "users", user.uid), {
          firstName: firstName.value,
          lastName: lastName.value,
          email: user.email,
          role: role.value,
          createdAt: new Date(),
        });

        alert(t("userCreated"));
        router.push("/dashboard");
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    // Volver al dashboard
    const goToBack = () => {
      router.push("/dashboard");
    };

    return {
      firstName,
      lastName,
      email,
      password,
      confirm_password,
      role,
      registerUser,
      errorMessage,
      goToBack,
    };
  },
};
</script>



<style scoped>
.register {
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

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  flex: 1; /* Ambos botones ocupan el mismo espacio */
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button:not(:last-child) {
  margin-right: 10px; /* Espacio entre los botones */
}

button {
  background: #007bff;
  color: white;
}

.back-btn {
  background: #6c757d; /* Color gris para el botón atrás */
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
  html, body, .register_res {
    height: 100%;
  }

  .register_res {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .register {
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
