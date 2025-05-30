<template>
    <div>
      <header class="header">
        <h1>Inicio de Sesión</h1>
      </header>
  
      <div class="form-container">
        <form @submit.prevent="iniciarSesion">
          <h2>Ingresa a tu cuenta</h2>
  
          <label for="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Ingrese su correo electrónico"
            required
          />
  
          <label for="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Ingrese su contraseña"
            required
          />
  
          <button type="submit">Ingresar</button>
          <p style="color: rgb(150, 150, 150);">
            ¿No tienes cuenta? 
            <router-link to="/">Regístrate aquí</router-link>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginUsuario",
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      // Lógica para el inicio de sesión
      iniciarSesion() {
        // Recuperar los usuarios del localStorage
        const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
  
        // Buscar al usuario en el almacenamiento local
        const user = usersData.find(
          (user) => user.email === this.email && user.password === this.password
        );
  
        if (user) {
          alert("Inicio de sesión exitoso.");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", this.email); // Guardar el correo del usuario logueado
  
          // Redirigir según el rol del usuario
          if (user.rol === "admin") {
            this.$router.push("/admin"); // Redirige a la página de administración
          } else {
            this.$router.push("/dashboard"); // Redirige a la página del usuario normal
          }
        } else {
          alert("Correo electrónico o contraseña incorrectos.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajustes generales */
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    background-image: url("https://www.uleam.edu.ec/wp-content/uploads/2022/11/EZM_1396-1536x1025.jpg");
    background-size: cover; /* Que la imagen cubra toda la pantalla */
    background-position: center; /* Centrar la imagen */
    height: 100vh; /* La altura debe cubrir toda la ventana */
    display: flex;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center;    /* Centrar verticalmente */
  }
  
  /* Contenedor del formulario */
  .form-container {
  background-color: #fff; /* Fondo blanco para el formulario */
  padding: 20px;
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  max-width: 400px; /* Ancho máximo del formulario */
  width: 100%; /* Asegura que el formulario sea responsivo */
}

.header {
  background-color: #343a40;
  width: 100%; /* Asegura que ocupe toda la anchura */
  padding: 20px;
  text-align: center;
  color: white;
}
  /* Título del formulario */
  form h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333333;
    font-size: 1.5em;
    font-weight: bold;
  }
  
  /* Etiquetas de los campos */
  form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333333;
  }
  
  /* Inputs y botones */
  input,
  button {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }
  
  button {
    background-color: #d32f2f; /* Rojo destacado */
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }
  
  button:hover {
    background-color: #b71c1c; /* Color hover */
  }
  
  /* Texto de pie */
  p {
    text-align: center;
    font-size: 0.9em;
    color: #333333;
  }
  
  /* Estilo del enlace */
  p a {
    color: #d32f2f; /* Rojo */
    text-decoration: none;
    font-weight: bold;
  }
  
  p a:hover {
    text-decoration: underline;
  }
  </style>
  
  