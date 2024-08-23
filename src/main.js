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
import Textarea from "primevue/textarea";

const app = createApp(App);

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
app.component("Textarea", Textarea);


app.mount("#app");
