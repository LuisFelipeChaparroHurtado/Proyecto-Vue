<template>
  <div class="card content" v-if="selectedLanguage === 'es'" :class="textSizeClass">
    <div class="container mx-auto p-5">
      <h2 class="text-2xl font-bold mb-4">Gestión de Avances del Proyecto</h2>

      <!-- Input para nombre del proyecto -->
      <div v-if="!isProjectConfirmed" class="mb-4">
        <label class="block font-semibold mb-2">Nombre del Proyecto:</label>
        <input type="text" v-model="projectName" class="border p-2 w-full" placeholder="Ingrese el nombre del proyecto"
          :disabled="isProjectConfirmed" />
      </div>

      <!-- Checkbox de confirmación -->
      <div v-if="!isProjectConfirmed" class="mb-4">
        <label class="flex items-center">
          <input type="checkbox" v-model="termsAccepted" class="mr-2" :disabled="isProjectConfirmed" />
          Confirmo que el proyecto está definido y aprobado.
        </label>
      </div>

      <!-- Botón de confirmación -->
      <button v-if="!isProjectConfirmed" @click="confirmProject" class="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        :disabled="!projectName || !termsAccepted">
        Confirmar Proyecto
      </button>

      <!-- Mostrar pestañas solo si el proyecto está confirmado -->
      <div v-if="isProjectConfirmed">
        <div class="flex border-b mt-5">
          <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = index" :class="[
            'px-4 py-2',
            activeTab === index ? 'border-b-2 border-blue-500 font-bold' : '',
          ]">
            {{ tab.name }}
          </button>
        </div>

        <!-- Contenido de cada pestaña -->
        <div class="p-4">
          <div v-if="activeTab === 0">
            <h3 class="text-xl font-semibold">{{ projectName }}</h3>
            <p>El proyecto ha sido confirmado y no puede modificarse.</p>
          </div>

          <div v-if="activeTab === 1">
            <h3 class="text-xl font-semibold">Subir Avances</h3>

            <div v-if="!user" class="text-red-500 font-bold">
              Debes iniciar sesión para subir archivos.
            </div>

            <div v-for="(doc, index) in documentTypes" :key="index" class="mb-4" v-if="user">
              <h4 class="font-semibold">{{ doc.name }}</h4>
              <input type="file" @change="(e) => handleFileUpload(e, doc.id)" accept=".pdf,.doc,.docx" />

              <button @click="uploadFile(doc.id, doc.name)" class="upload-button" :class="{
                enabled: selectedFiles[doc.id],
                disabled: !selectedFiles[doc.id],
              }" :disabled="!selectedFiles[doc.id] || isUploading">
                Subir Archivo
              </button>
            </div>
          </div>

          <div v-if="activeTab === 2">
            <h3 class="text-xl font-semibold">Avances Subidos</h3>
            <ul class="uploaded-list">
              <li v-for="(file, index) in uploadedFiles" :key="index" class="uploaded-item">
                <div class="file-info">
                  <span class="font-semibold">{{ file.name }}</span><br />
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
    </div>

    <!-- Pantalla de carga -->
    <div v-if="isUploading" class="loading-overlay">
      <div class="loader"></div>
      <p class="loading-text">Subiendo archivo, por favor espera...</p>
    </div>
  </div>
  <div class="card content" v-if="selectedLanguage === 'en'" :class="textSizeClass">
    <div class="container mx-auto p-5">
      <h2 class="text-2xl font-bold mb-4">Project Progress Management</h2>

      <!-- Input para nombre del proyecto -->
      <div v-if="!isProjectConfirmed" class="mb-4">
        <label class="block font-semibold mb-2">Project Name:</label>
        <input type="text" v-model="projectName" class="border p-2 w-full" placeholder="Ingrese el nombre del proyecto"
          :disabled="isProjectConfirmed" />
      </div>

      <!-- Checkbox de confirmación -->
      <div v-if="!isProjectConfirmed" class="mb-4">
        <label class="flex items-center">
          <input type="checkbox" v-model="termsAccepted" class="mr-2" :disabled="isProjectConfirmed" />
          confirm that the project is defined and approved.
        </label>
      </div>

      <!-- Botón de confirmación -->
      <button v-if="!isProjectConfirmed" @click="confirmProject" class="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        :disabled="!projectName || !termsAccepted">
        Confirm Project
      </button>

      <!-- Mostrar pestañas solo si el proyecto está confirmado -->
      <div v-if="isProjectConfirmed">
        <div class="flex border-b mt-5">
          <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = index" :class="[
            'px-4 py-2',
            activeTab === index ? 'border-b-2 border-blue-500 font-bold' : '',
          ]">
            {{ tab.name }}
          </button>
        </div>

        <!-- Contenido de cada pestaña -->
        <div class="p-4">
          <div v-if="activeTab === 0">
            <h3 class="text-xl font-semibold">{{ projectName }}</h3>
            <p>The project has been confirmed and cannot be modified.</p>
          </div>

          <div v-if="activeTab === 1">
            <h3 class="text-xl font-semibold">Upload Progress</h3>

            <div v-if="!user" class="text-red-500 font-bold">
              You must be logged in to upload files.
            </div>

            <div v-for="(doc, index) in documentTypes" :key="index" class="mb-4" v-if="user">
              <h4 class="font-semibold">{{ doc.name }}</h4>
              <input type="file" @change="(e) => handleFileUpload(e, doc.id)" accept=".pdf,.doc,.docx" />

              <button @click="uploadFile(doc.id, doc.name)" class="upload-button" :class="{
                enabled: selectedFiles[doc.id],
                disabled: !selectedFiles[doc.id],
              }" :disabled="!selectedFiles[doc.id] || isUploading">
                Upload File
              </button>
            </div>
          </div>

          <div v-if="activeTab === 2">
            <h3 class="text-xl font-semibold">Uploaded Progress</h3>
            <ul class="uploaded-list">
              <li v-for="(file, index) in uploadedFiles" :key="index" class="uploaded-item">
                <div class="file-info">
                  <span class="font-semibold">{{ file.name }}</span><br />
                  <small class="text-gray-500">{{
                    formatDate(file.timestamp)
                  }}</small>
                </div>
                <a :href="file.url" target="_blank" class="view-button">
                  🔍 see
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Pantalla de carga -->
    <div v-if="isUploading" class="loading-overlay">
      <div class="loader"></div>
      <p class="loading-text">Uploading file, please wait...</p>
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
  data() {
    return {
      activeTab: 0,
      projectName: "",
      termsAccepted: false,
      isProjectConfirmed: false,
      user: null,
      isUploading: false,
      tabs: [
        { name: "Start" },
        { name: "Upload Progress" },
        { name: "Loaded Advances" },
      ],
      documentTypes: [
        { id: "manual_usuario", name: "User Manual" },
        { id: "manual_funciones", name: "Function Manual" },
        { id: "avance_proyecto", name: "Project Progress" },
        { id: "proyecto_final", name: "Final Project" },
        { id: "documentos_universidad", name: "University Documents" },
      ],
      selectedFiles: {},
      uploadedFiles: [],
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        await this.fetchProjectData(); // Obtiene el proyecto al cargar la página
        await this.fetchUploadedFiles();
      }
    });
  },
  methods: {
    async confirmProject() {
      if (!this.user || !this.projectName || !this.termsAccepted) {
        toast.error(
          "You must accept the terms and enter a project name.",
          {
            autoClose: 2000,
          }
        );
        return;
      }

      const db = getFirestore();
      const projectRef = doc(db, "projects", this.user.uid);

      try {
        await setDoc(projectRef, {
          projectName: this.projectName,
          isConfirmed: true,
        });

        this.isProjectConfirmed = true;

        // Actualizar en la interfaz el nombre del proyecto guardado
        await this.fetchProjectData();

        toast.success("Project successfully confirmed.", {
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error confirming project:", error);
      }
    },

    async fetchProjectData() {
      if (!this.user) return;

      const db = getFirestore();
      const projectRef = doc(db, "projects", this.user.uid);

      try {
        const projectSnap = await getDoc(projectRef);
        if (projectSnap.exists()) {
          const data = projectSnap.data();
          this.projectName = data.projectName || "";
          this.isProjectConfirmed = data.isConfirmed || false;
        }
      } catch (error) {
        console.error("Error getting project data:", error);
      }
    },

    handleFileUpload(event, docId) {
      this.selectedFiles[docId] = event.target.files[0];
    },

    async uploadFile(docId, docName) {
      if (
        !this.selectedFiles[docId] ||
        !this.user ||
        !this.isProjectConfirmed
      ) {
        toast.error("You must confirm a project before uploading files.", {
          autoClose: 2000,
        });
        return;
      }

      this.isUploading = true;

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
          projectName: this.projectName, // Asociar con el proyecto
          url: fileURL,
          timestamp: new Date().toISOString(),
          userId: this.user.uid,
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

        toast.success(`The document was uploaded "${docName}" correctly.`, {
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        this.isUploading = false;
      }
    },

    async fetchUploadedFiles() {
      if (!this.user) return;

      const db = getFirestore();
      const userDocRef = doc(db, "projectFiles", this.user.uid);

      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const allFiles = docSnap.data().avances || [];

          // Inicializamos un objeto con los tipos de documentos esperados
          const latestFiles = {
            manual_usuario: null,
            manual_funciones: null,
            avance_proyecto: null,
            proyecto_final: null,
            documentos_universidad: null,
          };

          allFiles.forEach((file) => {
            // Extraer el identificador del documento del ID del archivo
            const docId = file.id.match(/^(.*?)_\d+/)?.[1];

            // Verificar que sea uno de los tipos esperados
            if (latestFiles.hasOwnProperty(docId)) {
              // Si no hay archivo registrado o el nuevo archivo es más reciente, actualizarlo
              if (
                !latestFiles[docId] ||
                new Date(file.timestamp).getTime() >
                new Date(latestFiles[docId].timestamp).getTime()
              ) {
                latestFiles[docId] = file;
              }
            }
          });

          // Convertir el objeto en un array, eliminando los valores nulos
          this.uploadedFiles = Object.values(latestFiles).filter(Boolean);
        } else {
          this.uploadedFiles = [];
        }
      } catch (error) {
        console.error("Error getting files:", error);
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
  justify-content: space-between;
  /* Distribuye el contenido horizontalmente */
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.file-info {
  flex-grow: 1;
  /* Ocupa el espacio disponible */
}

.view-button {
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  /* Evita que el texto se divida en varias líneas */
}

.view-button:hover {
  background-color: #388e3c;
}
</style>
