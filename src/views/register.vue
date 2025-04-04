<template>
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
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default {
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const db = getFirestore();

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const confirm_password = ref("");
    const role = ref(""); // Nuevo campo para el rol
    const errorMessage = ref("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const registerUser = async () => {
      if (password.value !== confirm_password.value) {
        errorMessage.value = "Las contraseñas no coinciden";
        return;
      }
      if (!passwordRegex.test(password.value)) {
        errorMessage.value =
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
        return;
      }

      if (!role.value) {
        errorMessage.value = "Debes seleccionar un rol";
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: `${firstName.value} ${lastName.value}`,
        });

        // Guardar usuario en Firestore con el rol seleccionado
        await setDoc(doc(db, "users", user.uid), {
          firstName: firstName.value,
          lastName: lastName.value,
          email: user.email,
          role: role.value, // Se guarda el rol elegido por el admin
          createdAt: new Date(),
        });

        alert("Usuario creado correctamente");
        router.push("/dashboard"); // Redirige al panel principal
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    const goToBack = () => {
      router.push("/dashboard"); // Redirige al login
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
  width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
}
input, select {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 10px;
}

/* Estilos para alinear los botones en una fila */
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

.error {
  color: red;
}
</style>
