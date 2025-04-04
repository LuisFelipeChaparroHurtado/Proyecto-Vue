<template>
  <div class="card content" :class="textSizeClass">
    <div class="container">
      <div v-if="selectedLanguage === 'es'">
        <h1 class="title">
          FORMATO DE CONSENTIMIENTO CESIÓN DE DERECHOS PARA USO DE LA IMAGEN EN
          ESTUDIOS DE INVESTIGACIÓN Y AUTORIZACIÓN PARA USO Y DIVULGACIÓN DE LA
          INFORMACIÓN
        </h1>
        <br />

        <p class="content">
          I. INTRODUCCIÓN
          <br />
          <br />
          Como miembro de la comunidad Gimnasiana (Gimnasio Bilingüe) y programa
          Español para Extranjeros que se encuentra adscrito a la Fundación
          Internacional FUNIFELT usted ha sido invitado a participar para hacer
          uso de la imagen publicitaria dentro del campo educativo en la
          plataforma provisional https://es.funifelt.com sus redes sociales,
          redes académicas y demás programas de divulgación que utilizamos y
          utilizaremos a futuro. Antes de que usted decida participar lea este
          formulario cuidadosamente y haga todas las preguntas que tenga, para
          asegurarse que entiende los procedimientos.

          <br />
          <br />
          II. PROPÓSITO
          <br /><br />
          Describir las herramientas y estrategias didácticas que desarrollan
          una enseñanza diferenciada y que cubren las necesidades de
          productividad del aprendizaje de una lengua materna, una lengua
          adicional y todos los procedimientos académicos en la institución
          educativa (Gimnasio Bilingüe, Zipaquirá). Identificar y divulgar a
          nivel nacional e internacional aquello que propicia una enseñanza
          aprendizaje efectiva dentro de la comunidad educativa en general.
        </p>
      </div>
      <div v-if="selectedLanguage === 'en'">
        <h1 class="title">
          CONSENT FORM FOR TRANSFER OF RIGHTS FOR THE USE OF IMAGE IN RESEARCH
          STUDIES AND AUTHORIZATION FOR THE USE AND DISCLOSURE OF INFORMATION
        </h1>
        <br />

        <p class="content">
          I. INTRODUCTION
          <br />
          <br />
          As a member of the Gimnasiana community (Bilingual Gym) and the
          Spanish for Foreigners program attached to the International
          Foundation FUNIFELT, you have been invited to participate in the use
          of advertising images within the educational field on the provisional
          platform https://es.funifelt.com, its social networks, academic
          networks, and other dissemination programs that we currently use and
          will use in the future. Before you decide to participate, please read
          this form carefully and ask any questions you may have to ensure that
          you understand the procedures.

          <br />
          <br />
          II. PURPOSE
          <br /><br />
          To describe the tools and didactic strategies that develop
          differentiated teaching and cover the productivity needs of learning a
          native language, an additional language, and all academic procedures
          in the educational institution (Bilingual Gymnasium, Zipaquirá).
          Identify and disseminate nationally and internationally what promotes
          effective teaching and learning within the educational community in
          general.
        </p>
      </div>

      <form @submit.prevent="submit" v-if="selectedLanguage === 'es'">
        <div class="card">
          <div class="row">
            <label>Correo</label>
            <input
              type="text"
              v-model="formConcentimiento.email"
              id="email"
              placeholder="example@mail.com"
              required
              readonly
            />
            <span v-if="!isValidEmail" style="color: red">
              Por favor ingrese un correo electrónico válido.
            </span>
          </div>
          <div class="row">
            <label for="">Nombre completo</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              id="fullname"
              v-model="formConcentimiento.name"
            />
          </div>
          <div class="row">
            <label for="country">Nacionalidad</label>

            <select
              id="country"
              v-model="formConcentimiento.nationatily"
              placeholder="Selecciona"
            >
              <option value="" disabled selected>Selecciona un país</option>
              <option
                v-for="(country, index) in countries"
                :key="index"
                :value="country.countryName"
              >
                {{ country.countryName }}
              </option>
            </select>
          </div>
          <div class="row">
            <label for="identification"
              >Documento de Identidad, DNI, ID o Pasaporte:</label
            >
            <input
              type="text"
              v-model="formConcentimiento.document"
              @input="validateIdentification"
              minlength="6"
              maxlength="20"
              id="document"
              placeholder="Ingresa tu documento"
            />
            <span v-if="!isValidId" style="color: red"
              >Por favor ingrese un documento válido.</span
            >
          </div>
          <div class="row">
            <label for="country">Lugar de expedición</label>

            <select id="country" v-model="formConcentimiento.expedition">
              <option value="" disabled selected>Selecciona un país</option>
              <option
                v-for="(country, index) in countries"
                :key="index"
                :value="country.countryName"
              >
                {{ country.countryName }}
              </option>
            </select>
          </div>
          <div class="row">
            <label for=""
              >Nombre de la Universidad, instituto o empresa a la que hace parte
              y/o representa</label
            >
            <input
              type="text"
              placeholder="Ingresa el nombre de la entidad"
              id="school"
              v-model="formConcentimiento.schoolName"
            />
          </div>
          <div class="row">
            <label
              >Por este medio autorizo al Colegio Gimnasio Bilingüe y a la
              Fundación Internacional FUNIFELT a usar y divulgar el medio físico
              o digital existente y por existir mi imagen y todos los productos
              didácticos que puedan surgir dentro de este proceso en el que me
              encuentro.</label
            >
            <div class="checks">
              <input
                type="checkbox"
                name="si"
                v-model="formConcentimiento.accept1"
              />
              <label for="">Acepto</label>
            </div>
          </div>
          <div class="row">
            <label
              >Doy mi consentimiento para permitir que el medio(s) indicado
              arriba se pueda utilizar. Yo también entiendo y estoy de acuerdo
              que las imágenes y productos generados puedan ser utilizados por
              investigaciones referentes a programas educativos y culturales,
              los medios de noticias, políticas públicas y educativas e incluso
              en la organización de bachillerato internacional para los
              propósitos indicados a continuación: Identificación,
              Entrenamiento, Cobertura de Medios de Comunicación, Investigación
              y demás concernientes al proposito de FUNIFELT</label
            >
            <div class="checks">
              <input
                type="checkbox"
                name="si"
                v-model="formConcentimiento.accept2"
              />
              <label for="">Acepto</label>
            </div>
          </div>
          <div class="row">
            <label
              >Yo entiendo que los medios serán usados / vistos por los
              siguientes como se indica: Personal administrativo, familias y
              estudiantes, voluntarios, practicantes, investigadores, Público
              académico nacional e internacional</label
            >
            <div class="checks">
              <input
                type="checkbox"
                name="si"
                v-model="formConcentimiento.accept3"
              />
              <label for="">Acepto</label>
            </div>
          </div>
          <div class="row">
            <label
              >IV. PROTECCION DE DATOS Entiendo que los medios usados serán
              claramente marcados y protegidos de uso. Yo también entiendo que
              los derechos de propiedad serán retenidos por la institución
              educativa y las imágenes serán almacenadas y destruidas de una
              manera segura que sea consistente con la protección de mi
              privacidad. (Ley 1581 de 2012 y Decreto Reglamentario 1377 de
              2013) Que en cumplimiento de la Ley Estatutaria 1581 del 2012, por
              la cual se estable el ‘Régimen General de Protección de Datos’ y
              el Decreto Reglamentario 1377 del 2013, demanda respetuosamente su
              autorización para que de manera libre, previa, clara, expresa,
              voluntaria y debidamente informada permita a la institución
              recolectar, recaudar, almacenar, usar, procesar, compilar,
              intercambiar, dar tratamiento, actualizar y disponer de los datos
              que han sido suministrados y que se han incorporado. Esta
              información es y será utilizada en el desarrollo de las funciones
              propias de la Entidad.</label
            >
            <div class="checks">
              <input
                type="checkbox"
                name="si"
                v-model="formConcentimiento.accept4"
              />
              <label for="">Acepto</label>
            </div>
          </div>
          <div class="row">
            <label
              >V- CONSENTIMIENTO He leído la información provista en este
              formulario de consentimiento, o se me ha leído de manera adecuada.
              Todas mis preguntas sobre imagen y mi participación en este han
              sido atendidas. Libremente consiento a participar en este estudio
              de investigación y divulgación de la información. Autorizo el uso
              y la divulgación de la información de las imágenes, videos,
              fotografías entre otros a la entidad antes mencionada en este
              consentimiento para los propósitos descritos anteriormente.</label
            >
            <div class="checks">
              <input
                type="checkbox"
                name="si"
                v-model="formConcentimiento.accept5"
              />
              <label for="">Acepto</label>
            </div>
          </div>
          <div class="row">
            <label>Este consentimiento es válido a partir de esta fecha:</label>
            <input
              type="date"
              name="date"
              id="date"
              v-model="formConcentimiento.currentDate"
              disabled
            />
          </div>
          <div class="row">
            <label>Hora</label>
            <input
              type="time"
              name="time"
              id="time"
              v-model="formConcentimiento.currentTime"
              disabled
            />
          </div>
          <div class="row">
            <label for="phone">Número de Teléfono:</label>
            <div class="phone-input">
              <vue-tel-input
                v-model="formConcentimiento.phoneNumber"
                mode="international"
                :inputOptions="{
                  inputClass: 'vue-tel-input__input',
                  type: 'tel',
                  pattern: '[0-9]{10}',
                  maxlength: '10',
                }"
                style="
                  width: 100%;
                  line-height: normal;
                  display: flex;
                  align-items: center;
                  height: 42px;
                "
              ></vue-tel-input>
            </div>
          </div>

          <div class="row">
            <label for="address">Dirección:</label>
            <input
              type="text"
              id="address"
              v-model="formConcentimiento.address"
              placeholder="Ingrese su dirección"
            />
          </div>
          <div class="file-row">
            <label for="fileInput" class="file-label">
              Subir un documento de identidad (PDF o imagen):
            </label>

            <input
              type="file"
              class="file-input"
              id="fileInput"
              accept=".pdf, image/*"
              @change="handleFileChange"
            />

            <div v-if="formConcentimiento.fileUrl" class="file-preview">
              <a :href="formConcentimiento.fileUrl" target="_blank">
                <span v-if="isImage(formConcentimiento.fileUrl)">
                  <img
                    :src="formConcentimiento.fileUrl"
                    alt="Documento cargado"
                    class="file-thumbnail"
                  />
                </span>
                <span v-else class="btn-view">📄</span>
              </a>
            </div>
          </div>
          <div class="button">
            <button class="btn btn-primary" type="submit" @click="submit()">
              {{ consentExists ? "Actualizar" : "Enviar" }}
            </button>
          </div>
        </div>
      </form>

      <form @submit.prevent="submit" v-if="selectedLanguage === 'en'">
        <div class="card">
          <div class="row">
            <label>Email</label>
            <input
              type="text"
              v-model="formConcentimiento.email"
              id="email"
              placeholder="example@mail.com"
              required
              readonly
            />
            <span v-if="!isValidEmail" style="color: red">
              Please enter a valid email address.
            </span>
          </div>
          <div class="row">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              id="fullname"
              v-model="formConcentimiento.name"
            />
          </div>
          <div class="row">
            <label>Nationality</label>
            <select
              id="country"
              v-model="formConcentimiento.nationatily"
              placeholder="Select"
            >
              <option value="" disabled selected>Select a country</option>
              <option
                v-for="(country, index) in countries"
                :key="index"
                :value="country.countryName"
              >
                {{ country.countryName }}
              </option>
            </select>
          </div>
          <div class="row">
            <label>ID Document (DNI, ID, Passport)</label>
            <input
              type="text"
              v-model="formConcentimiento.document"
              @input="validateIdentification"
              minlength="6"
              maxlength="20"
              id="document"
              placeholder="Enter your document"
            />
            <span v-if="!isValidId" style="color: red"
              >Please enter a valid document.</span
            >
          </div>
          <div class="row">
            <label>Place of Issue</label>
            <select id="country" v-model="formConcentimiento.expedition">
              <option value="" disabled selected>Select a country</option>
              <option
                v-for="(country, index) in countries"
                :key="index"
                :value="country.countryName"
              >
                {{ country.countryName }}
              </option>
            </select>
          </div>
          <div class="row">
            <label for=""
              >Name of the university, institute, or company you are part of and/or represent</label
            >
            <input
              type="text"
              placeholder="Enter the name of the university or company to which you belong"
              id="school"
              v-model="formConcentimiento.schoolName"
            />
          </div>
          <div class="row">
            <label
              >By this means, I authorize the Bilingual Gymnasium School and the
              International Foundation FUNIFELT to use and disclose the existing
              physical or digital media and future media in which my image and
              all didactic products that may arise within this process are
              present.</label
            >
            <div class="checks">
              <input
                type="checkbox"
                name="si"
                v-model="formConcentimiento.accept1"
              />
              <label>Accept</label>
            </div>
          </div>
          <div class="row">
            <label
              >I give my consent to allow the above-mentioned media to be used.
              I also understand and agree that the images and products generated
              may be used for research related to educational and cultural
              programs, news media, public and educational policies, and even in
              the International Baccalaureate organization for the purposes
              described below: Identification, Training, Media Coverage,
              Research, and other purposes related to the FUNIFELT
              purpose.</label
            >
            <div class="checks">
              <input
                type="checkbox"
                name="si"
                v-model="formConcentimiento.accept2"
              />
              <label>Accept</label>
            </div>
          </div>
          <div class="row">
            <label
              >I understand that the media will be used/seen by the following as
              indicated: Administrative staff, families and students,
              volunteers, trainees, researchers, National and international
              academic public.</label
            >
            <div class="checks">
              <input
                type="checkbox"
                name="si"
                v-model="formConcentimiento.accept3"
              />
              <label>Accept</label>
            </div>
          </div>
          <div class="row">
            <label
              >IV. DATA PROTECTION I understand that the media used will be
              clearly marked and protected from use. I also understand that
              property rights will be retained by the educational institution
              and that images will be stored and securely destroyed in a manner
              consistent with the protection of my privacy. (Law 1581 of 2012
              and Regulatory Decree 1377 of 2013) That in compliance with
              Statutory Law 1581 of 2012, which establishes the 'General Regime
              for the Protection of Data' and Regulatory Decree 1377 of 2013,
              respectfully demands your authorization so that freely, prior,
              clear, express, voluntary and duly informed allows the institution
              to collect, collect, store, use, process, compile, exchange,
              treat, update and dispose of the data that have been provided and
              that have been incorporated. This information is and will be used
              in the development of the Entity's own functions.</label
            >
            <div class="checks">
              <input
                type="checkbox"
                name="si"
                v-model="formConcentimiento.accept4"
              />
              <label>Accept</label>
            </div>
          </div>
          <div class="row">
            <label
              >V- CONSENT I have read the information provided in this consent
              form, or it has been read to me adequately. All my questions about
              images and my participation in this have been addressed. I freely
              consent to participate in this research and dissemination of
              information. I authorize the use and disclosure of information
              from images, videos, photographs, among others to the entity
              mentioned above in this consent for the purposes described
              above.</label
            >
            <div class="checks">
              <input
                type="checkbox"
                name="si"
                v-model="formConcentimiento.accept5"
              />
              <label>Accept</label>
            </div>
          </div>
          <div class="row">
            <label>This consent is valid from this date:</label>
            <input
              type="date"
              name="date"
              id="date"
              v-model="formConcentimiento.currentDate"
              disabled
            />
          </div>
          <div class="row">
            <label>Time</label>
            <input
              type="time"
              name="time"
              id="time"
              v-model="formConcentimiento.currentTime"
              disabled
            />
          </div>
          <div class="row">
            <label for="phone">Phone Number:</label>
            <div class="phone-input">
              <vue-tel-input
                v-model="formConcentimiento.phoneNumber"
                mode="international"
                :inputOptions="{
                  inputClass: 'vue-tel-input__input',
                  type: 'tel',
                  pattern: '[0-9]{10}',
                  maxlength: '10',
                }"
                style="
                  width: 100%;
                  line-height: normal;
                  display: flex;
                  align-items: center;
                  height: 42px;
                "
              ></vue-tel-input>
            </div>
          </div>
          <div class="row">
            <label>Address:</label>
            <input
              type="text"
              id="address"
              v-model="formConcentimiento.address"
              placeholder="Enter your address"
            />
          </div>
          <div class="file-row">
            <label for="fileInput" class="file-label">
              Upload an ID document (PDF or image):
            </label>

            <input
              type="file"
              class="file-input"
              id="fileInput"
              accept=".pdf, image/*"
              @change="handleFileChange"
            />

            <div v-if="formConcentimiento.fileUrl" class="file-preview">
              <a :href="formConcentimiento.fileUrl" target="_blank">
                <span v-if="isImage(formConcentimiento.fileUrl)">
                  <img
                    :src="formConcentimiento.fileUrl"
                    alt="Documento cargado"
                    class="file-thumbnail"
                  />
                </span>
                <span v-else class="btn-view">📄</span>
              </a>
            </div>
          </div>
          <div class="button">
            <button class="btn btn-primary" type="submit" @click="submit()">
              {{ consentExists ? "Update" : "Submit" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// Importaciones de módulos y componentes necesarios
import { defineComponent, ref, onMounted } from "vue";
import countries from "@/utils/countryInfo.json"; // Importa datos de países desde un archivo JSON
import VueCountryRegionSelect from "vue-country-region-select"; // Componente para selección de país/región
import TextSizeSelector from "@/components/textSizeSelector.vue"; // Componente para selector de tamaño de texto
import { toast } from "vue3-toastify"; // Módulo para notificaciones
import PhoneInput from "vue-phone-number-input";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import {
  storage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "@/firebase";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

// Define y exporta el componente Vue
export default defineComponent({
  components: {
    VueCountryRegionSelect,
    TextSizeSelector,
    PhoneInput,
    VueTelInput,
  }, // Componentes utilizados en el template
  props: {
    textSizeClass: {
      type: String,
      default: "medium-text", // Tamaño de texto por defecto
    },
    selectedLanguage: {
      type: String,
      required: true,
    },
  },
  setup() {
    const phone = ref(null);
    const formConcentimiento = ref({
      email: "",
      disability: [], // <- Asegúrate de que esta propiedad existe si `isOtroSelected` la usa
    });

    const isValidEmail = ref(true);
    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (loggedUser) => {
        if (loggedUser) {
          formConcentimiento.value.email = loggedUser.email || "";
        }
      });
    });

    return { formConcentimiento, isValidEmail, phone };
  },
  data() {
    // Datos del componente
    return {
      phoneNumber: "",
      selectedCountryCode: "",
      currentDate: "",
      currentTime: "",
      formConcentimiento: {
        // Objeto para almacenar datos del formulario de consentimiento
        email: "",
        name: "",
        nationatily: "",
        document: "",
        expedition: "",
        phoneNumber: "",
        address: "",
        accept1: "",
        accept2: "",
        accept3: "",
        accept4: "",
        accept5: "",
        currentDate: "",
        currentTime: "",
        schoolName: "",
        file: "",
      },
      countryCode: "+57", // Código de país predeterminado
      phoneNumber: "",
      isValidEmail: true, // Indicador de validación de correo electrónico
      countries: {}, // Lista de países
      email: "",
      isValidId: true, // Indicador de validación de identificación
    };
  },
  async mounted() {
    try {
      this.currentDate = this.getCurrentDate();
      this.currentTime = this.getCurrentTime();
      this.formConcentimiento.currentDate = this.currentDate;
      this.formConcentimiento.currentTime = this.currentTime;

      this.countries = countries.map((country) => ({
        countryCode: country.countryCode,
        countryName: country.country,
        code: country.code,
        countryFlag: country.flag,
      }));

      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const uid = currentUser.uid;
        const db = getFirestore();
        const consentRef = doc(db, "Consentimiento", uid);
        const docSnap = await getDoc(consentRef);

        if (docSnap.exists()) {
          console.log("Datos encontrados en Firestore:", docSnap.data());
          this.formConcentimiento = {
            ...this.formConcentimiento,
            ...docSnap.data(),
          };

          if (docSnap.data().fileUrl) {
            this.formConcentimiento.fileUrl = docSnap.data().fileUrl;
          }

          this.consentExists = true;
        }
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  },
  methods: {
    // Métodos del componente
    validateEmail() {
      // Validar formato de correo electrónico utilizando expresión regular
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isValidEmail = regex.test(this.formConcentimiento.email);
    },
    validateIdentification() {
      // Validar formato de identificación utilizando expresión regular
      const regex = /^(?:\d{9}|[A-Za-z0-9]{6,20})$/;
      this.isValidId = regex.test(this.identificationNumber); // Asegura de que la identificación sea válida
    },
    getCurrentDate() {
      // Obtener fecha actual en formato YYYY-MM-DD
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getCurrentTime() {
      // Obtener hora actual en formato HH:MM
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    updatePhoneNumber() {
      // Actualizar y emitir número de teléfono con código de país
      this.$emit("input", `${this.countryCode} ${this.phoneNumber}`);
    },
    handleFileUpload(event) {
      // Manejar carga de archivo y validar el tipo de archivo
      const file = event.target.files[0];
      if (file) {
        const fileType = file.type;
        if (fileType === "application/pdf" || fileType.startsWith("image/")) {
          console.log("Archivo válido:", file.name);
        } else {
          console.log(
            "Formato de archivo no válido. Selecciona un PDF o una imagen."
          );
        }
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.formConcentimiento.file = file; // Guarda el nuevo archivo
        console.log("Archivo seleccionado:", file.name);
      }
    },
    isImage(fileUrl) {
      return /\.(jpeg|jpg|png|gif)$/i.test(fileUrl);
    },
    validateForm() {
      this.errorMessages = []; // Reinicia los mensajes de error

      const {
        email,
        name,
        nationatily,
        document,
        expedition,
        phoneNumber,
        address,
        accept1,
        accept2,
        accept3,
        accept4,
        accept5,
        schoolName,
        file,
      } = this.formConcentimiento;

      // Validación de campos requeridos y otros criterios
      if (!email) {
        this.errorMessages.push("El correo electrónico es requerido.");
      }

      if (!name) {
        this.errorMessages.push("El nombre es requerido.");
      }

      if (!nationatily) {
        this.errorMessages.push("La nacionalidad es requerida.");
      }

      if (!document) {
        this.errorMessages.push("El documento es requerido.");
      }

      if (!expedition) {
        this.errorMessages.push("La expedición es requerida.");
      }

      if (!phoneNumber) {
        this.errorMessages.push("El número de teléfono es requerido.");
      }

      if (!address) {
        this.errorMessages.push("La dirección es requerida.");
      }

      if (!accept1 || !accept2 || !accept3 || !accept4 || !accept5) {
        this.errorMessages.push(
          "Debes aceptar todos los términos y condiciones."
        );
      }

      if (!schoolName) {
        this.errorMessages.push("El nombre de la escuela es requerido.");
      }

      if (!this.formConcentimiento.file && !this.formConcentimiento.fileUrl) {
        this.errorMessages.push("El archivo es requerido.");
      }

      // Añadir validaciones adicionales según sea necesario

      this.formValid = this.errorMessages.length === 0; // Actualiza el estado de validez del formulario
    },

    async submit() {
      if (this.isSubmitting) return;
      this.isSubmitting = true;

      this.validateForm();
      if (!this.formValid) {
        this.errorMessages.forEach((message) =>
          toast.error(message, { autoClose: 2000 })
        );
        this.isSubmitting = false;
        return;
      }

      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("No hay usuario autenticado.");
        this.isSubmitting = false;
        return;
      }

      const file = this.formConcentimiento.file;
      let fileUrl = this.formConcentimiento.fileUrl || ""; // Mantener el archivo actual si no se sube uno nuevo

      // Subir archivo solo si hay un nuevo archivo seleccionado
      if (file) {
        const sanitizedFileName = file.name.replace(/\s+/g, "_");
        const storageReference = storageRef(
          storage,
          `filesConsentimiento/${sanitizedFileName}`
        );

        try {
          const snapshot = await uploadBytes(storageReference, file);
          fileUrl = await getDownloadURL(snapshot.ref);
        } catch (error) {
          console.error("Error al subir el archivo:", error);
          toast.error("Error al subir el archivo.");
          this.isSubmitting = false;
          return;
        }
      }

      const uid = currentUser.uid;
      const db = getFirestore();
      const consentRef = doc(db, "Consentimiento", uid);

      const dataToSend = {
        userId: uid,
        ...this.formConcentimiento,
        timestamp: new Date().toISOString(),
      };

      // Solo agregar fileUrl si hay un archivo nuevo o si ya existe un archivo anterior
      if (fileUrl) {
        dataToSend.fileUrl = fileUrl;
      }

      delete dataToSend.file; // No guardar el archivo directamente

      try {
        const docSnap = await getDoc(consentRef);
        const mensaje = docSnap.exists()
          ? "Consentimiento actualizado correctamente"
          : "Consentimiento enviado correctamente";

        if (docSnap.exists()) {
          await updateDoc(consentRef, dataToSend);
        } else {
          await setDoc(consentRef, dataToSend);
        }

        this.consentExists = true;
        localStorage.setItem("Consentimiento", "true");

        toast.success(mensaje, { autoClose: 1000 });

        setTimeout(() => {
          this.$router.push("/principal");
        }, 1500);
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        toast.error("Error al enviar los datos.");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
</script>

<style>
/* Estilo para el contenedor principal */
.container {
  max-width: 800px;
  /* Ancho máximo del contenedor */
  margin: 0 auto;
  /* Centrar horizontalmente en la página */
  padding: 0 15px;
  /* Espacio de relleno a los lados del contenedor */
}

/* Estilo para el título */
.title {
  text-align: center;
  /* Centrar el texto */
  margin-bottom: 1rem;
  /* Margen inferior */
}

/* Estilo para la tarjeta */
.card {
  padding: 1rem;
  /* Espaciado interno */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  /* Sombra ligera */
  background-image: url("./background.jpg"); /* Ruta de la imagen */
  background-size: cover; /* Ajusta la imagen para cubrir todo el fondo */
  background-position: center; /* Centra la imagen en el fondo */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
}

.content {
  background-image: url("./background.jpg"); /* Ruta de la imagen */
  background-size: cover; /* Ajusta la imagen para cubrir todo el fondo */
  background-position: center; /* Centra la imagen en el fondo */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
}
/* Estilo para las filas */
.row {
  display: grid;
  /* Mostrar como grid */
  grid-template-columns: 1fr;
  /* Una columna por defecto */
  margin-bottom: 1rem;
  /* Margen inferior */
  gap: 0.5rem;
  /* Espacio entre elementos */
  padding-left: 1rem;
  /* Relleno izquierdo */
  padding-right: 1rem;
  /* Relleno derecho */
}

/* Estilo para etiquetas */
.label {
  font-weight: bold;
  /* Texto en negrita */
}

/* Estilo para mensajes de error */
.error-msg {
  color: red;
  /* Color rojo para mensajes de error */
}

/* Estilo para elementos hijos de .row que no son inputs */
.row > *:not(input) {
  padding-left: 0 !important;
  /* Eliminar relleno izquierdo */
  padding-right: 0 !important;
  /* Eliminar relleno derecho */
}

/* Estilo para inputs y elementos similares */
input[type="text"],
select,
multiselect,
textarea,
input[type="email"],
input[type="tel"],
input[type="date"],
input[type="time"],
input[type="file"] {
  width: 100%;
  /* Ancho completo */
  padding: 0.5rem;
  /* Espaciado interno */
  border: 1px solid #ccc;
  /* Borde con color gris claro */
  border-radius: 4px;
  /* Borde redondeado */
  box-sizing: border-box;
  /* Tamaño del borde incluido en el ancho */
}

/* Estilo para botones */
.button {
  text-align: center;
  /* Centrar texto del botón */
  margin-top: 1rem;
  /* Margen superior */
}

.file-row {
  display: flex;
  align-items: center; /* Alinea verticalmente todos los elementos */
  gap: 15px; /* Espacio entre elementos */
}

.file-label {
  white-space: nowrap; /* Evita que el texto del label se divida en varias líneas */
}

.file-input {
  flex-grow: 1; /* Permite que el input se ajuste al espacio disponible */
}

.file-preview {
  display: flex;
  align-items: center;
}

.file-thumbnail {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.prueba {
  /* Ancho completo para input tipo texto, select y multiselect */
  padding: 0.5rem;
  /* Relleno de 0.5 rem para estos elementos */
  border: 1px solid #ccc;
  /* Borde de 1 píxel sólido en color gris */
  border-radius: 4px;
  /* Borde redondeado con un radio de 4 píxeles */
  box-sizing: border-box;
  /* Caja de tamaño de borde */
}

.file-button {
  text-decoration: none;
}

.btn-view {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-view:hover {
  background-color: #0056b3;
}

/* Media queries para pantallas más grandes */
@media screen and (min-width: 768px) {
  .row {
    grid-template-columns: 1fr 1fr;
    /* Dos columnas en pantallas grandes */
  }
}

@media screen and (min-width: 992px) {
  .row {
    grid-template-columns: 1fr 1fr 1fr;
    /* Tres columnas en pantallas extra grandes */
  }
}

/* Estilo para contenedor de input de teléfono */
.phone-input {
  display: flex;
  /* Mostrar como flexbox */
  align-items: center;
  /* Alinear elementos verticalmente */
}

/* Estilo para select dentro de .phone-input */
.phone-input select,
.phone-input input {
  height: 100%;
  /* Altura del 100% */
}

.phone-input select {
  width: 70px;
  /* Ancho fijo para el select */
  margin-right: 5px;
  /* Espacio a la derecha del select */
}

.phone-input input {
  flex-grow: 1;
  /* El input ocupa todo el espacio restante */
}

/* Media query para pantallas muy pequeñas */
@media (max-width: 320px) {
  .phone-input {
    display: grid;
    /* Mostrar como grid en pantallas pequeñas */
    grid-template-rows: auto auto;
    /* Dos filas automáticas */
    gap: 0.5rem;
    /* Espacio entre filas */
  }

  .phone-input select,
  .phone-input input[type="tel"] {
    width: 100%;
    /* Ancho completo para select e input en pantallas pequeñas */
  }
}
</style>
