<template>
    <div>
      <header class="header">
        <h1>Configuración del Sistema</h1>
      </header>
  
      <aside class="sidebar">
        <router-link to="/admin">Panel de Control</router-link>
        <router-link to="/control_acceso">Control de Acceso</router-link>
        <router-link to="/registro_entrada_salida">Registro de Entrada y Salida</router-link>
        <router-link to="/historial_admin">Historial</router-link>
        <router-link to="/configuracion_a">Configuración</router-link>
        <router-link to="/soporte_a">Soporte de Reportes</router-link>
        <router-link to="/login">Cerrar Sesión</router-link>
      </aside>
  
      <main class="main">
        <!-- <section id="config-general">
          <h2>Configuración General</h2>
          <form @submit.prevent="saveConfig">
            <label for="adminEmail">Correo del Administrador:</label>
            <input
              type="email"
              id="adminEmail"
              v-model="config.adminEmail"
              placeholder="admin@parqueadero.com"
              required
            />
  
            <label for="parkingPrice">Precio por Hora de Estacionamiento ($):</label>
            <input
              type="number"
              id="parkingPrice"
              v-model="config.parkingPrice"
              placeholder="1.50"
              required
            />
  
            <label for="maxSpots">Cantidad Máxima de Espacios de Estacionamiento:</label>
            <input
              type="number"
              id="maxSpots"
              v-model="config.maxSpots"
              placeholder="50"
              required
            />
  
            <button type="submit">Guardar Configuración</button>
          </form>
        </section> -->
  
        <section id="change-password">
          <h2>Cambiar Contraseña de Administrador</h2>
          <form @submit.prevent="changePassword">
            <label for="currentPassword">Contraseña Actual:</label>
            <input
              type="password"
              id="currentPassword"
              v-model="passwords.current"
              placeholder="Ingrese su contraseña actual"
              required
            />
  
            <label for="newPassword">Nueva Contraseña:</label>
            <input
              type="password"
              id="newPassword"
              v-model="passwords.new"
              placeholder="Nueva contraseña (min 8 caracteres)"
              required
            />
  
            <label for="confirmPassword">Confirmar Nueva Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="passwords.confirm"
              placeholder="Confirme su nueva contraseña"
              required
            />
  
            <button type="submit">Cambiar Contraseña</button>
          </form>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        config: {
          adminEmail: "admin@parqueadero.com",
          parkingPrice: 1.5,
          maxSpots: 50,
        },
        passwords: {
          current: "",
          new: "",
          confirm: "",
        },
        storedPassword: "admin123", // Simula contraseña guardada
      };
    },
    methods: {
      saveConfig() {
        // Lógica para guardar configuración
        localStorage.setItem("config", JSON.stringify(this.config));
        alert("Configuración guardada exitosamente.");
      },
      changePassword() {
        const { current, new: newPassword, confirm } = this.passwords;
  
        if (current !== this.storedPassword) {
          alert("La contraseña actual es incorrecta.");
          return;
        }
  
        if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[A-Za-z]/.test(newPassword)) {
          alert("La nueva contraseña debe tener al menos 8 caracteres, una letra y un número.");
          return;
        }
  
        if (newPassword !== confirm) {
          alert("Las contraseñas no coinciden.");
          return;
        }
  
        this.storedPassword = newPassword;
        alert("Contraseña actualizada correctamente.");
        this.passwords = { current: "", new: "", confirm: "" };
      },
    },
    mounted() {
      const savedConfig = localStorage.getItem("config");
      if (savedConfig) {
        this.config = JSON.parse(savedConfig);
      }
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }
  
  .header {
    background-color: #333333;
    color: #fff;
    text-align: center;
    padding: 1em;
  }
  
  .sidebar {
    width: 200px;
    background-color: #333333;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    padding-top: 20px;
  }
  
  .sidebar a {
    display: block;
    color: white;
    padding: 10px;
    text-decoration: none;
    margin: 5px 0;
  }
  
  .sidebar a:hover {
    background-color: #575757;
  }
  
  .main {
    margin-left: 220px;
    padding: 20px;
  }
  
  form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  button {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  