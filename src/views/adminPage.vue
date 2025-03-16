<template>
  <div class="admin-dashboard">
    <h2>Panel de Administración</h2>

    <div class="centradoBoton">
      <button class="add-user-btn" @click="goToRegister">
        Agregar Usuario
      </button>
      <button class="logout-btn" @click="goLogout">Cerrar Sesión</button>
    </div>

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
          <td>
            <button
              class="view-btn"
              @click="fetchUserAdvances(user.id, user.firstName)"
            >
              Ver Avances
            </button>
            <button v-if="user.editing" @click="saveUser(user)">Guardar</button>
            <button v-if="user.editing" @click="cancelEdit(user)">
              Cancelar
            </button>
            <button v-else @click="editUser(user)">Editar</button>
            <button @click="confirmDelete(user.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Avances de {{ selectedUserName }}</h3>

        <!-- Contenedor con scroll solo vertical -->
        <div class="scroll-container">
          <ul v-if="userAdvances.length">
            <li v-for="advance in userAdvances" :key="advance.id">
              📄 <strong>{{ advance.name }}</strong>
              <br />
              📅 <small>{{ formatDateModal(advance.timestamp) }}</small>
              <br />
              🔗 <a :href="advance.url" target="_blank">Ver archivo</a>
            </li>
          </ul>
          <p v-else>No hay avances disponibles</p>
        </div>

        <button class="close-btn" @click="showModal = false">Cerrar</button>
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

export default {
  setup() {
    const db = getFirestore();
    const auth = getAuth();
    const router = useRouter();
    const users = ref([]);
    const userAdvances = ref([]);
    const showModal = ref(false);
    const selectedUserName = ref("");

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      users.value = querySnapshot.docs.map((doc) => {
        const userData = doc.data();
        return {
          id: doc.id,
          ...userData,
          role: userData.role || "usuario", // Valor por defecto
          editing: false,
          tempData: { role: userData.role || "usuario" }, // Asegurar que tempData tenga el rol desde el inicio
        };
      });
    };

    const fetchUserAdvances = async (userId, userName) => {
      try {
        const userDocRef = doc(db, "projectFiles", userId);
        const userDocSnap = await getDoc(userDocRef);
        userAdvances.value = userDocSnap.exists()
          ? userDocSnap.data().avances || []
          : [];

        const user = users.value.find((u) => u.id === userId);
        selectedUserName.value = user
          ? `${user.firstName} ${user.lastName}`
          : "Usuario";
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

    onMounted(fetchUsers);

    return {
      users,
      userAdvances,
      showModal,
      selectedUserName,
      fetchUserAdvances,
      confirmDelete,
      editUser,
      cancelEdit,
      saveUser,
      goToRegister,
      goLogout,
      formatDate,
      formatDateModal,
    };
  },
};
</script>

<style scoped>
.admin-dashboard {
  width: 90%;
  margin: auto;
  text-align: center;
}

.centradoBoton {
  text-align: right;
  margin-bottom: 15px;
}

.add-user-btn,
.logout-btn {
  background: #28a745;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin: 5px;
}

.logout-btn {
  background: #dc3545;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

th {
  background: #007bff;
  color: white;
}

button {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.view-btn {
  background: blue;
  color: white;
}

.edit-btn {
  background: orange;
  color: white;
}

.delete-btn {
  background: red;
  color: white;
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
  color: black;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
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
  border: none;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
}

.modal-content {
  max-width: 500px; /* Ancho máximo del modal */
  max-height: 70vh; /* Altura máxima del modal */
  overflow: hidden; /* Evita cualquier overflow */
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  word-wrap: break-word; /* Evita desbordes de texto largos */
}

/* Contenedor con scroll solo vertical */
.scroll-container {
  max-height: 50vh; /* Ajusta según el diseño */
  overflow-y: auto; /* Solo scroll vertical */
  overflow-x: hidden; /* Evita scroll horizontal */
  padding-right: 5px;
}

/* Asegurar que los elementos dentro no hagan scroll horizontal */
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
  width: 100%; /* Asegura que la lista no sea más ancha que su contenedor */
  word-wrap: break-word; /* Evita desbordes de texto */
}

/* Evitar que los enlaces rompan el diseño */
a {
  display: inline-block;
  max-width: 100%;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Personalizar barra de scroll */
.scroll-container::-webkit-scrollbar {
  width: 8px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #1f3983;
  border-radius: 4px;
}

</style>
