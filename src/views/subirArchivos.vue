<template>
  <div class="card content">
    <div class="container mx-auto p-5">
      <h2 class="text-2xl font-bold mb-4">Gestión de Avances del Proyecto</h2>

      <!-- Pestañas -->
      <div class="flex border-b">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          :class="[
            'px-4 py-2',
            activeTab === index ? 'border-b-2 border-blue-500 font-bold' : '',
          ]"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Contenido de cada pestaña -->
      <div class="p-4">
        <div v-if="activeTab === 0">
          <h3 class="text-xl font-semibold">Términos y Condiciones</h3>
          <p>Por favor, acepta los términos antes de continuar.</p>
          <label class="flex items-center mt-2">
            <input
              type="checkbox"
              v-model="termsAccepted"
              class="mr-2"
              @change="saveTermsAcceptance"
            />
            Confirmo que he cumplido con los requisitos y que han sido aprobados
            previamente.
          </label>
        </div>

        <div v-if="activeTab === 1">
          <h3 class="text-xl font-semibold">Subir Avances</h3>

          <div v-if="!user" class="text-red-500 font-bold">
            Debes iniciar sesión para subir archivos.
          </div>

          <div
            v-for="(doc, index) in documentTypes"
            :key="index"
            class="mb-4"
            v-if="user"
          >
            <h4 class="font-semibold">{{ doc.name }}</h4>
            <input
              type="file"
              @change="(e) => handleFileUpload(e, doc.id)"
              accept=".pdf,.doc,.docx"
            />

            <button
              @click="uploadFile(doc.id, doc.name)"
              class="upload-button"
              :class="{
                enabled: selectedFiles[doc.id],
                disabled: !selectedFiles[doc.id],
              }"
              :disabled="!selectedFiles[doc.id] || isUploading"
            >
              Subir Archivo
            </button>
          </div>
        </div>

        <div v-if="activeTab === 2">
          <h3 class="text-xl font-semibold">Avances Subidos</h3>
          <ul class="uploaded-list">
            <li
              v-for="(file, index) in uploadedFiles"
              :key="index"
              class="uploaded-item"
            >
              <div class="file-info">
                <span class="font-semibold">{{ file.name }}</span
                ><br />
                <small class="text-gray-500">{{
                  formatDate(file.timestamp)
                }}</small>
              </div>

              <a :href="file.url" target="_blank" class="view-button">
                🔍 Ver
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Pantalla de carga -->
    <div v-if="isUploading" class="loading-overlay">
      <div class="loader"></div>
      <p class="loading-text">Subiendo archivo, por favor espera...</p>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

// Importar toast notifications
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      activeTab: 0,
      termsAccepted: localStorage.getItem("termsAccepted") === "true",
      user: null,
      isUploading: false, // Estado para mostrar el spinner
      tabs: [
        { name: "Inicio" },
        { name: "Subir Avances" },
        { name: "Avances Cargados" },
      ],
      documentTypes: [
        { id: "manual_usuario", name: "Manual de Usuario" },
        { id: "manual_funciones", name: "Manual de Funciones" },
        { id: "avance_proyecto", name: "Avance del Proyecto" },
        { id: "proyecto_final", name: "Proyecto Final" },
        { id: "documentos_universidad", name: "Documentos Universidad" },
      ],
      selectedFiles: {},
      uploadedFiles: [],
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.fetchUploadedFiles();
      }
    });
  },
  methods: {
    saveTermsAcceptance() {
      localStorage.setItem("termsAccepted", this.termsAccepted);
    },

    handleFileUpload(event, docId) {
      this.selectedFiles[docId] = event.target.files[0];
    },

    async uploadFile(docId, docName) {
      if (!this.selectedFiles[docId] || !this.user) return;

      this.isUploading = true; // Mostrar pantalla de carga

      const storage = getStorage();
      const file = this.selectedFiles[docId];
      const fileName = `${docId}_${Date.now()}_${file.name}`;
      const fileRef = storageRef(
        storage,
        `projectFiles/${this.user.uid}/${fileName}`
      );

      try {
        await uploadBytes(fileRef, file);
        const fileURL = await getDownloadURL(fileRef);

        const db = getFirestore();
        const userDocRef = doc(db, "projectFiles", this.user.uid);
        const docSnap = await getDoc(userDocRef);

        const fileData = {
          id: fileName,
          name: docName,
          url: fileURL,
          timestamp: new Date().toISOString(),
          userId: this.user.uid, // Se almacena el ID del usuario
        };

        if (docSnap.exists()) {
          await updateDoc(userDocRef, {
            avances: arrayUnion(fileData),
          });
        } else {
          await setDoc(userDocRef, {
            avances: [fileData],
          });
        }

        this.selectedFiles[docId] = null;
        await this.fetchUploadedFiles();

        // Mostrar toast de éxito
        toast.success(`Se subió el documento "${docName}" correctamente.`, {
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error al subir archivo:", error);
      } finally {
        this.isUploading = false; // Ocultar pantalla de carga
      }
    },

    async fetchUploadedFiles() {
      if (!this.user) return;
      const db = getFirestore();
      const userDocRef = doc(db, "projectFiles", this.user.uid);

      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          this.uploadedFiles = docSnap.data().avances || [];
        } else {
          this.uploadedFiles = [];
        }
      } catch (error) {
        console.error("Error al obtener archivos:", error);
      }
    },

    formatDate(isoString) {
      const date = new Date(isoString);
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.upload-button {
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.upload-button.disabled {
  background-color: gray;
  color: white;
  cursor: not-allowed;
}

.upload-button.enabled {
  background-color: #007bff;
  color: white;
}

.upload-button.enabled:hover {
  background-color: #0056b3;
}

.uploaded-list {
  list-style-type: none;
  padding: 0;
}

.uploaded-item {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distribuye el contenido horizontalmente */
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.file-info {
  flex-grow: 1; /* Ocupa el espacio disponible */
}

.view-button {
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
}

.view-button:hover {
  background-color: #388e3c;
}
</style>
