<<<<<<< HEAD
<template>
  <div v-if="selectedLanguage === 'es'":class="textSizeClass" >
    <!-- Modal de bienvenida -->
    <div v-if="showWelcomeModal" class="modal-overlay">
      <div class="modal-content">
        <h2>¡Bienvenido, {{ user?.displayName || "Usuario" }}!</h2>
        <p>Nos alegra verte aquí.</p>
        <div class="centrado-boton">
          <button @click="closeModal">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="card content">
      <div class="container">
        <div v-if="user" class="profile-menu-container">
          <div class="profile-section">
            <h2 class="title" :class="textSizeClass">Perfil de Usuario</h2>
            <div class="profile-pic-container">
              <img
                :src="user.photoURL || defaultProfilePic"
                alt="Foto de perfil"
                class="profile-pic"
              />
            </div>
            <p>
              <strong>Usuario:</strong>
              {{ user.firstName + " " + user.lastName || "Sin nombre" }}
            </p>
            <p><strong>Email:</strong> {{ user.email }}</p>
          </div>

          <div class="menu">
            <button
              @click="!form1Completed ? goTo('/confidencialidad') : null"
              :class="textSizeClass"
              class="form-button"
              :disabled="form1Completed"
            >
              <span class="button-text">
                Formulario de Confidencialidad
                <span v-if="form1Completed" class="checkmark">✔️</span>
              </span>
              <div v-if="form1Completed" class="action-buttons">
                <button @click.stop="goTo('/confidencialidad')">✏️</button>
              </div>
            </button>

            <button
              @click="!form2Completed ? goTo('/consentimiento') : null"
              :class="textSizeClass"
              class="form-button"
              :disabled="form2Completed"
            >
              <span class="button-text">
                Formulario de Consentimiento
                <span v-if="form2Completed" class="checkmark">✔️</span>
              </span>
              <div v-if="form2Completed" class="action-buttons">
                <button @click.stop="goTo('/consentimiento')">✏️</button>
              </div>
            </button>

            <!-- Botón para subir/editar hoja de vida -->
            <button
              class="form-button"
              @click="!hasResume ? uploadResume() : null"
            >
              <span class="button-text">
                Hoja de Vida
                <span v-if="hasResume" class="checkmark">✔️</span>
              </span>

              <!-- Contenedor de los botones de acción (Solo si ya hay un archivo) -->
              <div v-if="hasResume" class="action-buttons">
                <button @click.stop="uploadResume">✏️</button>
                <button @click.stop="viewResume">📂</button>
              </div>
            </button>
            <!-- Input oculto para subir archivos -->
            <input
              type="file"
              ref="resumeInput"
              @change="handleResumeUpload"
              accept=".pdf,.doc,.docx"
              hidden
            />

            <button @click="goTo('/subirArchivos')" :class="textSizeClass">
              Avances de proyecto
            </button>

            

            <button @click="goTo('/editarPerfil')" :class="textSizeClass">
              Editar Perfil
            </button>
            <button @click="logout" :class="textSizeClass">
              Cerrar Sesión
            </button>
          </div>
        </div>
        <div v-else>
          <p>No hay usuario autenticado</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="selectedLanguage === 'en'" :class="textSizeClass">
    <!-- Modal de bienvenida -->
    <div v-if="showWelcomeModal" class="modal-overlay">
      <div class="modal-content">
        <h2>¡Welcome, {{ user?.displayName || "user" }}!</h2>
        <p>We are glad to see you here</p>
        <div class="centrado-boton">
          <button @click="closeModal">close</button>
        </div>
      </div>
    </div>

    <div class="card content">
      <div class="container">
        <div v-if="user" class="profile-menu-container">
          <div class="profile-section">
            <h2 class="title" :class="textSizeClass">User Profile</h2>
            <div class="profile-pic-container">
              <img
                :src="user.photoURL || defaultProfilePic"
                alt="Foto de perfil"
                class="profile-pic"
              />
            </div>
            <p>
              <strong>User:</strong>
              {{ user.firstName + " " + user.lastName || "nameless" }}
            </p>
            <p><strong>Email:</strong> {{ user.email }}</p>
          </div>

          <div class="menu">
            <button
              @click="!form1Completed ? goTo('/confidencialidad') : null"
              :class="textSizeClass"
              class="form-button"
              :disabled="form1Completed"
            >
              <span class="button-text">
                Confidentiality Form
                <span v-if="form1Completed" class="checkmark">✔️</span>
              </span>
              <div v-if="form1Completed" class="action-buttons">
                <button @click.stop="goTo('/confidencialidad')">✏️</button>
              </div>
            </button>

            <button
              @click="!form2Completed ? goTo('/consentimiento') : null"
              :class="textSizeClass"
              class="form-button"
              :disabled="form2Completed"
            >
              <span class="button-text">
                Consent Form
                <span v-if="form2Completed" class="checkmark">✔️</span>
              </span>
              <div v-if="form2Completed" class="action-buttons">
                <button @click.stop="goTo('/consentimiento')">✏️</button>
              </div>
            </button>

            <!-- Botón para subir/editar hoja de vida -->
            <button
              class="form-button"
              @click="!hasResume ? uploadResume() : null"
            >
              <span class="button-text">
                curriculum vitae
                <span v-if="hasResume" class="checkmark">✔️</span>
              </span>

              <!-- Contenedor de los botones de acción (Solo si ya hay un archivo) -->
              <div v-if="hasResume" class="action-buttons">
                <button @click.stop="uploadResume">✏️</button>
                <button @click.stop="viewResume">📂</button>
              </div>
            </button>
            <!-- Input oculto para subir archivos -->
            <input
              type="file"
              ref="resumeInput"
              @change="handleResumeUpload"
              accept=".pdf,.doc,.docx"
              hidden
            />

            <button @click="goTo('/subirArchivos')" :class="textSizeClass">
              Project progress
            </button>

            

            <button @click="goTo('/editarPerfil')" :class="textSizeClass">
              Edit Profile
            </button>
            <button @click="logout" :class="textSizeClass">
              Log Out
            </button>
          </div>
        </div>
        <div v-else>
          <p>There is no authenticated user</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

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
  setup() {
    const user = ref(null);
    const auth = getAuth();
    const router = useRouter();
    const defaultProfilePic =
      "https://registration-c5bcd.web.app/profile_default.png";
    const form1Completed = ref(false);
    const form2Completed = ref(false);
    const showWelcomeModal = ref(false);
    const storage = getStorage();
    const db = getFirestore();
    const resumeInput = ref(null);
    const hasResume = ref(false);
    const resumeMessage = ref("");
    const resumeURL = ref("");

    onMounted(() => {
      onAuthStateChanged(auth, async (loggedUser) => {
        if (loggedUser) {
          let photoURL = defaultProfilePic; // Imagen por defecto

          try {
            const profilePicRef = storageRef(
              storage,
              `profilePictures/${loggedUser.uid}`
            );
            photoURL = await getDownloadURL(profilePicRef);
          } catch (error) {
            console.warn(
              "No se encontró la imagen en Storage, usando la predeterminada."
            );
          }

          const userRef = doc(db, "users", loggedUser.uid);
          const userSnap = await getDoc(userRef);
          let firstName = "";
          let lastName = "";

          if (userSnap.exists()) {
            const userData = userSnap.data();
            firstName = userData.firstName || "";
            lastName = userData.lastName || "";
          }

          user.value = {
            firstName,
            lastName,
            displayName: loggedUser.displayName,
            email: loggedUser.email,
            photoURL: photoURL,
          };

          // Mostrar modal solo si es la primera vez
          if (!sessionStorage.getItem("welcomeShown")) {
            showWelcomeModal.value = true;
            sessionStorage.setItem("welcomeShown", "true");
          }

          // Consultar Firestore para verificar formularios completados
          const confidencialidadRef = doc(
            db,
            "Confidencialidad",
            loggedUser.uid
          );
          const consentimientoRef = doc(db, "Consentimiento", loggedUser.uid);

          try {
            const [confidencialidadSnap, consentimientoSnap] =
              await Promise.all([
                getDoc(confidencialidadRef),
                getDoc(consentimientoRef),
              ]);

            form1Completed.value = confidencialidadSnap.exists();
            form2Completed.value = consentimientoSnap.exists();
          } catch (error) {
            console.error("Error al obtener datos de Firestore:", error);
          }

          checkResume();
        } else {
          user.value = null;
        }
      });
    });

    watch(
      () => auth.currentUser?.photoURL,
      (newPhotoURL) => {
        if (newPhotoURL) {
          console.log("Nueva foto detectada:", newPhotoURL);
          user.value.photoURL = newPhotoURL;
        }
      }
    );

    const goTo = (route) => {
      router.push(route);
    };

    const logout = async () => {
      try {
        await signOut(auth);
        sessionStorage.removeItem("welcomeShown");
        router.push("/");

        setTimeout(() => {
          window.location.reload();
        }, 200);
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    const closeModal = () => {
      showWelcomeModal.value = false;
    };

    const uploadResume = () => {
      resumeInput.value.click();
    };

    const handleResumeUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        resumeMessage.value = "Formato inválido. Sube un PDF o Word.";
        return;
      }

      const fileRef = storageRef(storage, `resumes/${auth.currentUser.uid}`);
      try {
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        const userRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userRef, { resumeURL: downloadURL }, { merge: true });

        hasResume.value = true;
        resumeURL.value = downloadURL;
        resumeMessage.value = "Hoja de vida subida exitosamente.";
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        resumeMessage.value = "Error al subir el archivo.";
      }
    };

    // 📌 Verifica si ya existe una hoja de vida en Firestore
    const checkResume = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().resumeURL) {
          resumeURL.value = userSnap.data().resumeURL;
          hasResume.value = true;
          //console.log("✅ Hoja de vida encontrada:", resumeURL.value);
        } else {
          hasResume.value = false;
          resumeURL.value = "";
          //console.log("⚠️ No se encontró hoja de vida.");
        }
      } catch (error) {
        console.error("Error al obtener la hoja de vida:", error);
      }
    };

    // ✅ Llamar a `checkResume()` dentro de `onAuthStateChanged`
    onMounted(() => {
      onAuthStateChanged(auth, async (loggedUser) => {
        if (loggedUser) {
          checkResume();
        }
      });
    });

    // 📌 Abre la hoja de vida en una nueva pestaña
    const viewResume = () => {
      if (resumeURL.value) {
        window.open(resumeURL.value, "_blank");
      }
    };

    return {
      user,
      goTo,
      form1Completed,
      form2Completed,
      defaultProfilePic,
      logout,
      showWelcomeModal,
      closeModal,
      resumeInput,
      hasResume,
      resumeMessage,
      uploadResume,
      handleResumeUpload,
      viewResume,
    };
  },
};
</script>

<style scoped>
.form-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 90%;
  padding: 12px;
  background: #1f3983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.action-buttons-container {
  display: flex;
  gap: 4px; /* Espacio entre botones */
}

.action-buttons {
  display: flex;
  gap: 8px;
  position: absolute;
  right: 10px;
}

.action-buttons button {
  background: white;
  color: #1f3983;
  border: 1px solid #1f3983;
  padding: 5px;
  border-radius: 3px;
  font-size: 0.9rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-buttons button:active {
  background: #1f3983;
  color: white;
}

.container {
  text-align: center;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card {
  width: 100%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* Diseño de dos columnas (40% - 60%) */
.profile-menu-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

/* Columna de perfil (40%) */
.profile-section {
  flex: 0 0 40%;
  text-align: center;
}

/* Foto de perfil */
.profile-pic-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #1f3983;
}

/* Columna de menú (60%) */
.menu {
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Botones del menú */
button {
  width: 90%;
  background: #1f3983;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px 0;
  font-size: 1rem;
  text-align: left;
}

button:hover {
  background: white;
  color: #1f3983;
  border: 1px solid #1f3983;
}

.checkmark {
  margin-left: 8px;
  font-size: 1.2rem;
  color: #28a745;
}

/* Modal de bienvenida */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  color: black;
  font-weight: bold;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 700px;
}

.modal-content h2 {
  margin-bottom: 10px;
}

.modal-content button {
  background: #1f3983;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  text-align: center;
}

.modal-content button:hover {
  background: #14245c;
}

.checkmark {
  margin-left: 8px;
  font-size: 1.2rem;
  color: #28a745;
}

.centrado-boton {
  text-align: center;
}

@media (max-width: 768px) {
  .profile-menu-container {
    flex-direction: column;
    align-items: center;
  }

  .profile-section,
  .menu {
    flex: 1;
    width: 100%;
  }
}
</style>
=======
<template>
  <div :class="textSizeClass">
    <!-- Modal de bienvenida -->
    <div v-if="showWelcomeModal" class="modal-overlay">
      <div class="modal-content">
        <h2>¡Bienvenido, {{ user?.displayName || "Usuario" }}!</h2>
        <p>Nos alegra verte aquí.</p>
        <div class="centrado-boton">
          <button @click="closeModal">Cerrar</button>
        </div>
      </div>
    </div>

    <div class="card content">
      <div class="container">
        <div v-if="user" class="profile-menu-container">
          <div class="profile-section">
            <h2 class="title" :class="textSizeClass">Perfil de Usuario</h2>
            <div class="profile-pic-container">
              <img
                :src="user.photoURL || defaultProfilePic"
                alt="Foto de perfil"
                class="profile-pic"
              />
            </div>
            <p>
              <strong>Usuario:</strong>
              {{ user.firstName + " " + user.lastName || "Sin nombre" }}
            </p>
            <p><strong>Email:</strong> {{ user.email }}</p>
          </div>

          <div class="menu">
            <button
              @click="!form1Completed ? goTo('/confidencialidad') : null"
              :class="textSizeClass"
              class="form-button"
              :disabled="form1Completed"
            >
              <span class="button-text">
                Formulario de Confidencialidad
                <span v-if="form1Completed" class="checkmark">✔️</span>
              </span>
              <div v-if="form1Completed" class="action-buttons">
                <button @click.stop="goTo('/confidencialidad')">✏️</button>
              </div>
            </button>

            <button
              @click="!form2Completed ? goTo('/consentimiento') : null"
              :class="textSizeClass"
              class="form-button"
              :disabled="form2Completed"
            >
              <span class="button-text">
                Formulario de Consentimiento
                <span v-if="form2Completed" class="checkmark">✔️</span>
              </span>
              <div v-if="form2Completed" class="action-buttons">
                <button @click.stop="goTo('/consentimiento')">✏️</button>
              </div>
            </button>

            <!-- Botón para subir/editar hoja de vida -->
            <button
              class="form-button"
              @click="!hasResume ? uploadResume() : null"
            >
              <span class="button-text">
                Hoja de Vida
                <span v-if="hasResume" class="checkmark">✔️</span>
              </span>

              <!-- Contenedor de los botones de acción (Solo si ya hay un archivo) -->
              <div v-if="hasResume" class="action-buttons">
                <button @click.stop="uploadResume">✏️</button>
                <button @click.stop="viewResume">📂</button>
              </div>
            </button>
            <!-- Input oculto para subir archivos -->
            <input
              type="file"
              ref="resumeInput"
              @change="handleResumeUpload"
              accept=".pdf,.doc,.docx"
              hidden
            />

            <button @click="goTo('/subirArchivos')" :class="textSizeClass">
              Avances de proyecto
            </button>

            

            <button @click="goTo('/editarPerfil')" :class="textSizeClass">
              Editar Perfil
            </button>
            <button @click="logout" :class="textSizeClass">
              Cerrar Sesión
            </button>
          </div>
        </div>
        <div v-else>
          <p>No hay usuario autenticado</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

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
  setup() {
    const user = ref(null);
    const auth = getAuth();
    const router = useRouter();
    const defaultProfilePic =
      "https://registration-c5bcd.web.app/profile_default.png";
    const form1Completed = ref(false);
    const form2Completed = ref(false);
    const showWelcomeModal = ref(false);
    const storage = getStorage();
    const db = getFirestore();
    const resumeInput = ref(null);
    const hasResume = ref(false);
    const resumeMessage = ref("");
    const resumeURL = ref("");

    onMounted(() => {
      onAuthStateChanged(auth, async (loggedUser) => {
        if (loggedUser) {
          let photoURL = defaultProfilePic; // Imagen por defecto

          try {
            const profilePicRef = storageRef(
              storage,
              `profilePictures/${loggedUser.uid}`
            );
            photoURL = await getDownloadURL(profilePicRef);
          } catch (error) {
            console.warn(
              "No se encontró la imagen en Storage, usando la predeterminada."
            );
          }

          const userRef = doc(db, "users", loggedUser.uid);
          const userSnap = await getDoc(userRef);
          let firstName = "";
          let lastName = "";

          if (userSnap.exists()) {
            const userData = userSnap.data();
            firstName = userData.firstName || "";
            lastName = userData.lastName || "";
          }

          user.value = {
            firstName,
            lastName,
            displayName: loggedUser.displayName,
            email: loggedUser.email,
            photoURL: photoURL,
          };

          // Mostrar modal solo si es la primera vez
          if (!sessionStorage.getItem("welcomeShown")) {
            showWelcomeModal.value = true;
            sessionStorage.setItem("welcomeShown", "true");
          }

          // Consultar Firestore para verificar formularios completados
          const confidencialidadRef = doc(
            db,
            "Confidencialidad",
            loggedUser.uid
          );
          const consentimientoRef = doc(db, "Consentimiento", loggedUser.uid);

          try {
            const [confidencialidadSnap, consentimientoSnap] =
              await Promise.all([
                getDoc(confidencialidadRef),
                getDoc(consentimientoRef),
              ]);

            form1Completed.value = confidencialidadSnap.exists();
            form2Completed.value = consentimientoSnap.exists();
          } catch (error) {
            console.error("Error al obtener datos de Firestore:", error);
          }

          checkResume();
        } else {
          user.value = null;
        }
      });
    });

    watch(
      () => auth.currentUser?.photoURL,
      (newPhotoURL) => {
        if (newPhotoURL) {
          console.log("Nueva foto detectada:", newPhotoURL);
          user.value.photoURL = newPhotoURL;
        }
      }
    );

    const goTo = (route) => {
      router.push(route);
    };

    const logout = async () => {
      try {
        await signOut(auth);
        sessionStorage.removeItem("welcomeShown");
        router.push("/");

        setTimeout(() => {
          window.location.reload();
        }, 200);
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    const closeModal = () => {
      showWelcomeModal.value = false;
    };

    const uploadResume = () => {
      resumeInput.value.click();
    };

    const handleResumeUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        resumeMessage.value = "Formato inválido. Sube un PDF o Word.";
        return;
      }

      const fileRef = storageRef(storage, `resumes/${auth.currentUser.uid}`);
      try {
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        const userRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userRef, { resumeURL: downloadURL }, { merge: true });

        hasResume.value = true;
        resumeURL.value = downloadURL;
        resumeMessage.value = "Hoja de vida subida exitosamente.";
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        resumeMessage.value = "Error al subir el archivo.";
      }
    };

    // 📌 Verifica si ya existe una hoja de vida en Firestore
    const checkResume = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().resumeURL) {
          resumeURL.value = userSnap.data().resumeURL;
          hasResume.value = true;
          //console.log("✅ Hoja de vida encontrada:", resumeURL.value);
        } else {
          hasResume.value = false;
          resumeURL.value = "";
          //console.log("⚠️ No se encontró hoja de vida.");
        }
      } catch (error) {
        console.error("Error al obtener la hoja de vida:", error);
      }
    };

    // ✅ Llamar a `checkResume()` dentro de `onAuthStateChanged`
    onMounted(() => {
      onAuthStateChanged(auth, async (loggedUser) => {
        if (loggedUser) {
          checkResume();
        }
      });
    });

    // 📌 Abre la hoja de vida en una nueva pestaña
    const viewResume = () => {
      if (resumeURL.value) {
        window.open(resumeURL.value, "_blank");
      }
    };

    return {
      user,
      goTo,
      form1Completed,
      form2Completed,
      defaultProfilePic,
      logout,
      showWelcomeModal,
      closeModal,
      resumeInput,
      hasResume,
      resumeMessage,
      uploadResume,
      handleResumeUpload,
      viewResume,
    };
  },
};
</script>

<style scoped>
.form-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 90%;
  padding: 12px;
  background: #1f3983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.action-buttons-container {
  display: flex;
  gap: 4px; /* Espacio entre botones */
}

.action-buttons {
  display: flex;
  gap: 8px;
  position: absolute;
  right: 10px;
}

.action-buttons button {
  background: white;
  color: #1f3983;
  border: 1px solid #1f3983;
  padding: 5px;
  border-radius: 3px;
  font-size: 0.9rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-buttons button:active {
  background: #1f3983;
  color: white;
}

.container {
  text-align: center;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card {
  width: 100%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* Diseño de dos columnas (40% - 60%) */
.profile-menu-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

/* Columna de perfil (40%) */
.profile-section {
  flex: 0 0 40%;
  text-align: center;
}

/* Foto de perfil */
.profile-pic-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #1f3983;
}

/* Columna de menú (60%) */
.menu {
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Botones del menú */
button {
  width: 90%;
  background: #1f3983;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px 0;
  font-size: 1rem;
  text-align: left;
}

button:hover {
  background: white;
  color: #1f3983;
  border: 1px solid #1f3983;
}

.checkmark {
  margin-left: 8px;
  font-size: 1.2rem;
  color: #28a745;
}

/* Modal de bienvenida */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  color: black;
  font-weight: bold;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 700px;
}

.modal-content h2 {
  margin-bottom: 10px;
}

.modal-content button {
  background: #1f3983;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  text-align: center;
}

.modal-content button:hover {
  background: #14245c;
}

.checkmark {
  margin-left: 8px;
  font-size: 1.2rem;
  color: #28a745;
}

.centrado-boton {
  text-align: center;
}

@media (max-width: 768px) {
  .profile-menu-container {
    flex-direction: column;
    align-items: center;
  }

  .profile-section,
  .menu {
    flex: 1;
    width: 100%;
  }
}
</style>
>>>>>>> 3565194fd85025d6d724aab66edb08882f101a7a
