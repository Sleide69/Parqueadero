// Importar estilos globales (Asegúrate de que la ruta sea correcta)
import './assets/style.css';

// Importar las dependencias necesarias de Vue
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Importar el componente raíz de la aplicación y el enrutador
import App from './App.vue';
import router from './router';

// Crear una instancia de la aplicación Vue
const app = createApp(App);

// Usar Pinia como sistema de manejo de estado global
app.use(createPinia());

// Usar el enrutador de Vue para la navegación
app.use(router);

// Montar la aplicación en el elemento con ID "app" en el DOM
app.mount('#app');
