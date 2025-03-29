<template>
  <div
    class="admin-dashboard"
    v-if="selectedLanguage === 'es'"
    :class="textSizeClass"
  >
    <h2>Panel de Administración</h2>

    <div class="profile-section">
      <div class="profile-pic-wrapper">
        <img
          :src="
            photoURL || 'https://registration-c5bcd.web.app/profile_default.png'
          "
          alt="Foto de perfil"
          class="profile-pic"
        />
      </div>
    </div>

    <div class="centradoBoton" :class="textSizeClass">
      <button class="view-btn" @click="goToRegister" :class="textSizeClass">
        Agregar Usuario
      </button>
      <button class="view-btn" @click="goToEditProfile" :class="textSizeClass">
        Editar Perfil
      </button>
      <button class="delete-btn" @click="goLogout" :class="textSizeClass">
        Cerrar Sesión
      </button>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Correo</th>
            <th>Fecha de Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td v-if="user.editing">
              <input v-model="user.tempData.firstName" />
            </td>
            <td v-else>{{ user.firstName }}</td>
            <td v-if="user.editing">
              <input v-model="user.tempData.lastName" />
            </td>
            <td v-else>{{ user.lastName }}</td>
            <td>
              <select v-model="user.tempData.role" :disabled="!user.editing">
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </td>
            <td>{{ user.email }}</td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td v-if="user.email !== loggedInUserEmail">
              <button
                class="view-btn"
                @click="fetchUserAdvances(user.id, user.firstName)"
                :class="textSizeClass"
              >
                Ver Avances
              </button>
              <button
                class="view-btn"
                v-if="user.editing"
                @click="saveUser(user)"
                :class="textSizeClass"
              >
                Guardar
              </button>
              <button
                class="delete-btn"
                v-if="user.editing"
                @click="cancelEdit(user)"
                :class="textSizeClass"
              >
                Cancelar
              </button>
              <button
                class="edit-btn"
                v-else
                @click="editUser(user)"
                :class="textSizeClass"
              >
                Editar
              </button>
              <button
                class="delete-btn"
                @click="confirmDelete(user.id)"
                :class="textSizeClass"
              >
                Eliminar
              </button>
              <button
                class="view-btn"
                @click="toggleBlockUser(user)"
                :class="textSizeClass"
              >
                {{ user.isBlocked ? "Desbloquear" : "Bloquear" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Avances de {{ selectedUserName }}</h3>

        <!-- Contenedor con scroll solo vertical -->
        <div class="scroll-container">
          <div v-if="Object.keys(userAdvances).length">
            <div v-for="(advances, category) in userAdvances" :key="category">
              <h5 class="mt-3 mb-3">📂 {{ traducirCategoria(category) }}</h5>
              <ul>
                <li v-for="advance in advances" :key="advance.id">
                  📄 <strong>{{ advance.name }}</strong>
                  <br />
                  📅 <small>{{ formatDateModal(advance.timestamp) }}</small>
                  <br />
                  🔗 <a :href="advance.url" target="_blank">Ver archivo</a>
                </li>
              </ul>
            </div>
          </div>
          <p v-else>No hay avances disponibles</p>
        </div>

        <button class="close-btn" @click="showModal = false">Cerrar</button>
      </div>
    </div>
  </div>
  <div
    class="admin-dashboard"
    v-if="selectedLanguage === 'en'"
    :class="textSizeClass"
  >
    <h2>Administration Panel</h2>

    <div class="centradoBoton">
      <button class="view-btn" @click="goToRegister" :class="textSizeClass">
        Add User
      </button>
      <button class="delete-btn" @click="goLogout" :class="textSizeClass">
        Logout
      </button>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td v-if="user.editing">
              <input v-model="user.tempData.firstName" />
            </td>
            <td v-else>{{ user.firstName }}</td>
            <td v-if="user.editing">
              <input v-model="user.tempData.lastName" />
            </td>
            <td v-else>{{ user.lastName }}</td>
            <td>
              <select v-model="user.tempData.role" :disabled="!user.editing">
                <option value="usuario">User</option>
                <option value="admin">Administrator</option>
              </select>
            </td>
            <td>{{ user.email }}</td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td v-if="user.email !== loggedInUserEmail">
              <button
                class="view-btn"
                @click="fetchUserAdvances(user.id, user.firstName)"
                :class="textSizeClass"
              >
                View Previews
              </button>
              <button
                class="view-btn"
                v-if="user.editing"
                @click="saveUser(user)"
                :class="textSizeClass"
              >
                Save
              </button>
              <button
                class="delete-btn"
                v-if="user.editing"
                @click="cancelEdit(user)"
                :class="textSizeClass"
              >
                Cancel
              </button>
              <button
                class="edit-btn"
                v-else
                @click="editUser(user)"
                :class="textSizeClass"
              >
                Edit
              </button>
              <button
                class="delete-btn"
                @click="confirmDelete(user.id)"
                :class="textSizeClass"
              >
                Delete
              </button>
              <button
                class="view-btn"
                @click="toggleBlockUser(user)"
                :class="textSizeClass"
              >
                {{ user.isBlocked ? "Unlock" : "Block" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>{{ selectedUserName }}' progress</h3>

        <!-- Contenedor con scroll solo vertical -->
        <div class="scroll-container">
          <div v-if="Object.keys(userAdvances).length">
            <div v-for="(advances, category) in userAdvances" :key="category">
              <h5 class="mt-3 mb-3">📂 {{ traducirCategoria(category) }}</h5>
              <ul>
                <li v-for="(advance, index) in advances" :key="advance.id">
                  📄 <strong> Advance No {{ index + 1 }}</strong>
                  <br />
                  📅 <small>{{ formatDateModal(advance.timestamp) }}</small>
                  <br />
                  🔗 <a :href="advance.url" target="_blank">View file</a>
                </li>
              </ul>
            </div>
          </div>
          <p v-else>No previews available</p>
        </div>

        <button class="close-btn" @click="showModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

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
  computed: {
    traduccionesCategorias() {
      return {
        es: {
          category1: "Manual de Usuario",
          category2: "Manual de Funciones",
          category3: "Proyecto Final",
          category4: "Avance del Proyecto",
          category5: "Documentos Universidad",
        },
        en: {
          category1: "User Manual",
          category2: "Function Manual",
          category3: "Final Project",
          category4: "Project Progress",
          category5: "University Documents",
        },
      };
    },
  },
  methods: {
    traducirCategoria(category) {
      // console.log("Idioma seleccionado:", this.selectedLanguage);
      // console.log("Categoría recibida:", category);
      // console.log(
      //   "Traducciones disponibles:",
      //   this.traduccionesCategorias[this.selectedLanguage]
      // );

      return (
        this.traduccionesCategorias[this.selectedLanguage][category] || category
      );
    },
  },

  setup() {
    const db = getFirestore();
    const auth = getAuth();
    const storage = getStorage();
    const router = useRouter();
    const users = ref([]);
    const userAdvances = ref([]);
    const showModal = ref(false);
    const selectedUserName = ref("");
    const loggedInUserEmail = ref("");
    const photoURL = ref(
      "https://registration-c5bcd.web.app/profile_default.png"
    ); // Imagen predeterminada

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      users.value = querySnapshot.docs.map((doc) => {
        const userData = doc.data();
        //console.log("Correo usuario cargado:", userData.email);
        return {
          id: doc.id,
          ...userData,
          role: userData.role || "usuario", // Valor por defecto
          editing: false,
          tempData: { role: userData.role || "usuario" }, // Asegurar que tempData tenga el rol desde el inicio
        };
      });
    };

    const fetchLoggedInUser = () => {
      const user = auth.currentUser;
      if (user) {
        loggedInUserEmail.value = user.email;
        //console.log("Usuario logueado:", loggedInUserEmail.value);
      }
    };

    const fetchUserAdvances = async (userId, userName) => {
      try {
        const userDocRef = doc(db, "projectFiles", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const advances = userDocSnap.data().avances || [];

          // 🔹 Agrupar avances usando las claves definidas
          const groupedAdvances = {};
          advances.forEach((advance) => {
            // Convertir el nombre a la clave correspondiente
            let categoryKey;

            switch (advance.name) {
              case "Manual de Usuario":
                categoryKey = "category1";
                break;
              case "Manual de Funciones":
                categoryKey = "category2";
                break;
              case "Proyecto Final":
                categoryKey = "category3";
                break;
              case "Avance del Proyecto":
                categoryKey = "category4";
                break;
              case "Documentos Universidad":
                categoryKey = "category5";
                break;
              default:
                categoryKey = "Otros"; // Valor por defecto
            }

            // Inicializar el grupo si no existe
            if (!groupedAdvances[categoryKey]) {
              groupedAdvances[categoryKey] = [];
            }

            // Agregar avance a la categoría correspondiente
            groupedAdvances[categoryKey].push(advance);
          });

          userAdvances.value = groupedAdvances;
        } else {
          userAdvances.value = {};
        }

        selectedUserName.value = userName;
        showModal.value = true;
      } catch (error) {
        console.error("Error obteniendo avances:", error);
      }
    };

    const confirmDelete = (userId) => {
      if (
        confirm(
          "¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer."
        )
      ) {
        deleteUser(userId);
      }
    };

    const deleteUser = async (userId) => {
      try {
        await deleteDoc(doc(db, "users", userId));
        users.value = users.value.filter((user) => user.id !== userId);
        alert("Usuario eliminado correctamente");
      } catch (error) {
        console.error("Error eliminando usuario:", error);
      }
    };

    const editUser = (user) => {
      user.editing = true;
      user.tempData = { ...user }; // Copia los datos actuales
      if (!user.tempData.role) {
        user.tempData.role = user.role; // Asegurar que el rol se inicialice correctamente
      }
    };

    const cancelEdit = (user) => {
      user.editing = false;
    };

    const saveUser = async (user) => {
      try {
        await updateDoc(doc(db, "users", user.id), user.tempData);
        Object.assign(user, user.tempData);
        user.editing = false;
        alert("Usuario actualizado correctamente");
      } catch (error) {
        console.error("Error actualizando usuario:", error);
      }
    };

    const goToRegister = () => router.push("/register");
    const goToEditProfile = () => router.push("/editarPerfil");

    const goLogout = async () => {
      try {
        await signOut(auth);
        sessionStorage.removeItem("welcomeShown");
        router.push("/");
        setTimeout(() => window.location.reload(), 200);
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    const formatDate = (timestamp) =>
      timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() : "N/A";

    const formatDateModal = (timestamp) => {
      if (!timestamp) return "N/A";

      let date;

      // Verifica si es un objeto con "seconds" (timestamp de Firestore)
      if (timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      }
      // Verifica si es un string en formato ISO
      else if (typeof timestamp === "string") {
        date = new Date(timestamp);
      }
      // Si no es ninguno de los anteriores, devuelve "Fecha no válida"
      else {
        return "Fecha no válida";
      }

      return date.toLocaleString();
    };

    onMounted(async () => {
      fetchLoggedInUser();
      fetchUsers();
      await cargarImagenPerfil(); // Llama a la función de imagen de perfil
    });

    const cargarImagenPerfil = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const profilePicRef = storageRef(
            storage,
            `profilePictures/${user.uid}`
          );
          photoURL.value = await getDownloadURL(profilePicRef);
        }
      } catch (error) {
        console.warn(
          "No se encontró la imagen en Storage, usando la predeterminada."
        );
        photoURL.value =
          "https://registration-c5bcd.web.app/profile_default.png";
      }
    };

    const toggleBlockUser = async (user) => {
      try {
        const newStatus = !user.isBlocked;
        await updateDoc(doc(db, "users", user.id), { isBlocked: newStatus });
        user.isBlocked = newStatus;
        alert(
          newStatus
            ? "User successfully blocked \n(Usuario bloqueado correctamente)"
            : "Unlocked user \n(Usuario desbloqueado)"
        );
      } catch (error) {
        console.error("Error al cambiar estado de usuario:", error);
      }
    };

    return {
      users,
      fetchLoggedInUser,
      userAdvances,
      showModal,
      selectedUserName,
      fetchUserAdvances,
      confirmDelete,
      editUser,
      cancelEdit,
      saveUser,
      goToRegister,
      goToEditProfile,
      goLogout,
      formatDate,
      formatDateModal,
      toggleBlockUser,
      photoURL,
    };
  },
};
</script>

<style scoped>
/* ======= ESTILOS GENERALES ======= */
.admin-dashboard {
  width: 100%;
  margin: auto;
  text-align: center;
  padding: 20px;
}

/* ======= BOTONES ======= */
.centradoBoton {
  display: flex;
  flex-wrap: wrap; /* Evita que los botones se desborden */
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 15px;
}

/* ======= BOTONES ======= */
button {
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
  min-width: 100px; /* Tamaño uniforme */
  margin: 5px;
  text-align: center;
}

/* Botones con colores específicos */
.add-user-btn {
  background: #28a745;
  color: white;
}

.logout-btn {
  background: #dc3545;
  color: white;
}

.view-btn {
  background: #1f3983;
  color: white;
}

.edit-btn {
  background: #70c9e5;
  color: white;
}

.delete-btn {
  background: #70c9e5;
  color: white;
}

button:hover {
  opacity: 0.5;
}

/* ======= TABLA RESPONSIVA ======= */
.table-container {
  width: 100%;
  overflow-x: auto; /* Permite scroll horizontal si la tabla es muy ancha */
}

table {
  width: 100%;
  min-width: 600px; /* Asegura que no se reduzca demasiado */
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  word-wrap: break-word;
}

th {
  background: #007bff;
  color: white;
}

/* ======= MODAL ======= */
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
  max-width: 30%;
  max-height: 80vh;
  background: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-content h3 {
  margin-bottom: 10px;
  font-size: 1.5em;
}

.modal-content ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.modal-content ul li {
  margin-bottom: 10px;
  font-size: 1em;
}

.close-btn {
  background: #dc3545;
  color: white;
  padding: 10px;
  width: 100%;
}

/* Scroll solo en el modal si es necesario */
.scroll-container {
  max-height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;
}

/* Evitar que los enlaces rompan el diseño */
a {
  display: inline-block;
  max-width: 100%;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.profile-pic-wrapper {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.admin-dashboard h2 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}


/* ======= MEDIA QUERIES PARA RESPONSIVIDAD ======= */
@media (max-width: 768px) {
  .admin-dashboard {
    width: 100%;
    padding: 10px;
  }
  button {
    font-size: 12px; /* Letra más pequeña */
    padding: 6px 10px; /* Botón más compacto */
    min-width: 80px; /* Reducir ancho */
  }

  .modal-content {
    max-width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .centradoBoton {
    justify-content: center; /* Centrar botones en móviles */
  }

  table {
    font-size: 12px;
  }

  th,
  td {
    padding: 6px;
  }

  /* Ajuste del modal en pantallas pequeñas */
  .modal-content {
    width: 95%;
    max-height: 75vh;
  }
}
</style>
