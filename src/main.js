import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Dialog from 'primevue/dialog'
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Image from 'primevue/image';
import Textarea from "primevue/textarea";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faShare, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);

library.add(faShare);
library.add(faEarthAmericas);
app.component('font-awesome-icon', FontAwesomeIcon);



app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.component("Avatar", Avatar);
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("IconField", IconField);
app.component("InputIcon", InputIcon);
app.component("InputText", InputText);
app.component("Image", Image);
app.component("Textarea", Textarea);


app.mount("#app");
