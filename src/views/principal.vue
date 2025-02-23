<template>
  <div :class="textSizeClass">
    <div class="card content">
      <div class="container">
        <div v-if="user" class="profile-menu-container">
          <!-- Columna de la foto de perfil (40%) -->
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
              <strong>Usuario:</strong> {{ user.displayName || "Sin nombre" }}
            </p>
            <p><strong>Email:</strong> {{ user.email }}</p>
          </div>

          <!-- Columna de los botones (60%) -->
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
                <button @click.stop="downloadPDF">📄</button>
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
                <button @click.stop="downloadPDF">📄</button>
                <button @click.stop="goTo('/consentimiento')">✏️</button>
              </div>
            </button>

            <button @click="goTo('/perfil')" :class="textSizeClass">
              Avances de proyecto
            </button>

            <button @click="goTo('/ajustes')" :class="textSizeClass">
              Editar Perfil
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
import { getDatabase, ref as dbRef, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onMounted } from "vue";
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
    const defaultProfilePic = "src/assets/profile_default.png";
    const form1Completed = ref(false);
    const form2Completed = ref(false);

    onMounted(async () => {
      onAuthStateChanged(auth, async (loggedUser) => {
        if (loggedUser) {
          user.value = {
            displayName: loggedUser.displayName,
            email: loggedUser.email,
            photoURL: loggedUser.photoURL || defaultProfilePic,
          };

          // Obtener referencia a la base de datos
          const database = getDatabase();
          const consentRef = dbRef(
            database,
            `Confidencialidad/${loggedUser.uid}`
          );

          try {
            const snapshot = await get(consentRef);
            // Si existen datos en la base de datos, marcamos el formulario como completado
            form1Completed.value = snapshot.exists();
          } catch (error) {
            console.error("Error al obtener datos de confidencialidad:", error);
          }
        } else {
          user.value = null;
        }
      });
    });

    const goTo = (route) => {
      router.push(route);
    };

    return { user, goTo, form1Completed, form2Completed, defaultProfilePic };
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

/* Diseño responsive para pantallas pequeñas */
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
