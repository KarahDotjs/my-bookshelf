import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";

// 🔥 FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Ajouter les icônes à la "bibliothèque"
library.add(faPlus);

// Créer l'app + enregistrer l'icône globale
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);

// Monter l'app
app.mount("#app");
