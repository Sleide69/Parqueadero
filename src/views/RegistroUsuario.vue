<template>
    <div>
      <header class="header">
        <h1>Sistema de Parqueadero</h1>
      </header>

      <div class="login-container">
        <form class="login-form" @submit.prevent="registrarUsuario">
          <h2>¿No tienes cuenta?</h2>
          <label for="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Ingrese su correo"
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

          <button type="submit">Registrarse</button>
          <h6 style="color: rgb(188, 188, 188);">
            Si ya tienes cuenta ingresa
            <router-link to="/Login" style="color: rgb(18, 3, 233);">Aquí</router-link>
          </h6>
        </form>
      </div>

      <footer class="footer">
        <p>&copy; 2024 Sistema de Parqueadero. Todos los derechos reservados.</p>
      </footer>
    </div>
  </template>

  <script>
  export default {
    name: "RegistroUsuario",
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      // Validar el formato del correo electrónico
      isValidEmail(email) {
        const emailRegex = /^(a?[0-9]+@(live\.)?uleam\.edu\.ec)$/;
        return emailRegex.test(email);
      },

      // Validar la contraseña (mínimo 8 caracteres, al menos una letra y un número)
      isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
      },

      // Recuperar usuarios desde localStorage
      getUsers() {
        const users = localStorage.getItem("usersData");
        return users ? JSON.parse(users) : [];
      },

      // Guardar usuarios en localStorage
      saveUsers(users) {
        localStorage.setItem("usersData", JSON.stringify(users));
      },

      // Registrar un nuevo usuario
      registrarUsuario() {
        if (!this.isValidEmail(this.email)) {
          alert("Por favor, ingresa un correo electrónico válido.");
          return;
        }

        if (!this.isValidPassword(this.password)) {
          alert("La contraseña debe tener al menos 8 caracteres, una letra y un número.");
          return;
        }

        const users = this.getUsers();

        if (users.some((user) => user.email === this.email)) {
          alert("El usuario ya está registrado.");
          return;
        }

        const rol = this.email.startsWith("a") ? "admin" : "user";

        const newUser = {
          email: this.email,
          password: this.password, // Aquí puedes aplicar hash si es necesario
          rol: rol,
        };

        users.push(newUser);
        this.saveUsers(users);

        alert("Usuario registrado correctamente.");
        this.$router.push("/login"); // Redirige a la página de inicio de sesión
      },
    },
  };
  </script>

<style scoped>
/* Estilo global para el fondo y diseño de la página */
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
  height: 10vh; /* Asegura que ocupe toda la altura de la ventana */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  background-image: url("/vue-project/src/assets/img/FACULTADES.png");
  background-size: cover; /* Que el fondo cubra toda la pantalla */
  background-position: center; /* Centra la imagen de fondo */
  background-attachment: fixed; /* Fija el fondo */
}

/* Encabezado */
.header {
  background-color: #343a40;
  width: 100%; /* Asegura que ocupe toda la anchura */
  padding: 20px;
  text-align: center;
  color: white;
}

.header h1 {
  margin: 0;
  font-size: 2.5em;
}

/* Contenedor del formulario */
.login-container {
  width: 90%; /* Ocupa el 90% del ancho de la pantalla */
  max-width: 400px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco con opacidad */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Sombra moderna */
  text-align: center;
}

/* Título del formulario */
.login-form h2 {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* Etiquetas */
.login-form label {
  display: block;
  font-weight: bold;
  color: #333333;
  margin-bottom: 5px;
  text-align: left; /* Alineación a la izquierda para formularios */
}

/* Campos de entrada */
.login-form input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

/* Botones */
.login-form button {
  width: 100%;
  padding: 12px;
  background-color: #00509e; /* Azul atractivo */
  color: white;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-form button:hover {
  background-color: #003366; /* Color más oscuro al pasar el mouse */
}

/* Pie de página */
.footer {
  background-color: #343a40;
  color: white;
  padding: 10px;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 0.9em;
}
</style>

