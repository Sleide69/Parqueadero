<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="main-content">
    <!-- Aquí se renderizan las páginas según la ruta -->
    <RouterView />
  </div>
</template>

<style scoped>
/* Variables globales para colores */
:root {
  --color-bg: #ffffff;
  --color-main-bg: #f4f4f4;
  --color-text: #000;
  --color-link-hover: #ff6f61;
  --font-family: 'Arial', sans-serif;
}

.main-content {
  background-color: var(--color-main-bg);
  padding: 1.5rem;
  height: 100vh; /* Asegura que el área principal ocupe todo el alto disponible */
  overflow-y: auto; /* Permite desplazamiento si el contenido es largo */
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
}

.main-content > * {
  margin-bottom: 1.5rem; /* Espacio entre los elementos dentro del contenido */
}
</style>



<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <!-- <header>
    <img alt="Logo de Sistema de Parqueadero" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <nav>
      <RouterLink to="/">Registro</RouterLink>
      <RouterLink to="/about">Acerca de</RouterLink>
    </nav>
  </header> -->

   <!-- Aquí se mostrarán las vistas según las rutas -->
  <!-- <RouterView />
</template> 

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style> --> 
