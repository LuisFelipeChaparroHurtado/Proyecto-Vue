<template>
  <div class="card content">
    <div class="edit-profile-container">
      <h2>Editar Perfil</h2>

      <div class="profile-grid">
        <div class="centradoVertical">
          <div class="profile-pic-section">
            <img
              :src="photoPreview || photoURL"
              alt="Foto de perfil"
              class="profile-pic"
            />
            <input type="file" @change="handleFileUpload" accept="image/*" />
          </div>
        </div>

        <div class="profile-form">
          <div class="form-group">
            <label for="displayName">Nombre</label>
            <input v-model="newDisplayName" type="text" id="displayName" />
          </div>

          <div class="form-group">
            <label for="currentPassword">Contraseña Actual</label>
            <input
              v-model="currentPassword"
              type="password"
              id="currentPassword"
            />
          </div>

          <div class="form-group">
            <label for="newPassword">Nueva Contraseña</label>
            <input
              v-model="newPassword"
              type="password"
              id="newPassword"
              placeholder="Dejar en blanco para no cambiar"
            />
          </div>

          <button @click="updateProfile" :disabled="isUpdating">
            {{ isUpdating ? "Guardando..." : "Guardar Cambios" }}
          </button>
          <button @click="goBack">Cancelar</button>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success-message">
            {{ successMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const auth = getAuth();
    const storage = getStorage();
    const router = useRouter();

    // Datos del usuario
    const newDisplayName = ref(auth.currentUser?.displayName || "");
    const photoURL = ref(
      auth.currentUser?.photoURL ||
        "https://registration-c5bcd.web.app/profile_default.png"
    );
    const photoPreview = ref(null);
    const selectedFile = ref(null);
    const currentPassword = ref("");
    const newPassword = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");
    const isUpdating = ref(false);

    // Manejador de subida de archivos
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          photoPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    // Reautenticar usuario
    const reauthenticateUser = async () => {
      const user = auth.currentUser;
      if (!user || !currentPassword.value) {
        throw new Error("Debes ingresar tu contraseña actual.");
      }
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword.value
      );
      await reauthenticateWithCredential(user, credential);
    };

    // Función para actualizar perfil
    const updateProfileHandler = async () => {
      if (!auth.currentUser) {
        errorMessage.value = "No hay usuario autenticado.";
        return;
      }

      isUpdating.value = true;
      errorMessage.value = "";
      successMessage.value = "";
      let newPhotoURL = auth.currentUser.photoURL;

      try {
        // Reautenticación antes de cambios sensibles
        if (newPassword.value) {
          await reauthenticateUser();
        }

        // Si hay una nueva foto, subirla a Firebase Storage
        if (selectedFile.value) {
          const fileRef = storageRef(
            storage,
            `profilePictures/${auth.currentUser.uid}`
          );
          await uploadBytes(fileRef, selectedFile.value);
          newPhotoURL = await getDownloadURL(fileRef);
        }

        // Actualizar nombre y foto
        await updateProfile(auth.currentUser, {
          displayName: newDisplayName.value,
          photoURL: newPhotoURL,
        });

        // Actualizar contraseña si el usuario ingresó una nueva
        if (newPassword.value) {
          await updatePassword(auth.currentUser, newPassword.value);
        }

        // Limpiar campos y actualizar interfaz
        photoURL.value = newPhotoURL;
        photoPreview.value = null;
        newPassword.value = "";
        currentPassword.value = "";

        router.push("/principal");
      } catch (error) {
        errorMessage.value = "Error al actualizar el perfil: " + error.message;
      } finally {
        isUpdating.value = false;
      }
    };

    const goBack = () => {
      router.push("/principal");
    };

    return {
      newDisplayName,
      photoURL,
      photoPreview,
      currentPassword,
      newPassword,
      errorMessage,
      successMessage,
      handleFileUpload,
      updateProfile: updateProfileHandler,
      goBack,
      isUpdating,
    };
  },
};
</script>
<style scoped>
.card {
  width: 100%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.edit-profile-container {
  width: 50%;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.profile-grid {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Ajusta la altura de ambas columnas */
  gap: 20px;
  min-height: 300px; /* Ajusta según sea necesario */
}


.profile-pic-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra horizontalmente */
  justify-content: center;
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #1f3983;
}

input[type="file"] {
  margin-top: 10px;
}

.profile-form {
  flex: 2;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  background: #1f3983;
  color: white;
  border-radius: 5px;
}

button:hover {
  background: #14245c;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.centradoVertical {
  display: flex;
  margin-top: -50px;
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Opcional: Centra horizontalmente */
  height: 100%; /* Asegura que tome toda la altura disponible */
}


@media (max-width: 600px) {
  .profile-grid {
    flex-direction: column;
    align-items: center;
  }

  .profile-form {
    width: 100%;
  }
}
</style>
