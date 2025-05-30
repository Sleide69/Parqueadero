<template>
    <div>
        <aside class="sidebar">
        <router-link to="/admin">Panel de Control</router-link>
        <router-link to="/control_acceso">Control de Acceso</router-link>
        <router-link to="/registro_entrada_salida">Registro de Entrada y Salida</router-link>
        <router-link to="/historial_admin">Historial</router-link>
        <router-link to="/configuracion_a">Configuración</router-link>
        <router-link to="/soporte_a">Soporte de Reportes</router-link>
        <router-link to="/login">Cerrar Sesión</router-link>
      </aside>
  
      <div class="header">
        <h1>Control de Acceso</h1>
      </div>
  
      <div class="main">
        <h2>Control de acceso</h2>
        <ul id="usersList">
          <li v-for="user in usersData" :key="user.email">
            {{ user.email }} ({{ user.rol }})
          </li>
        </ul>
        <input
          v-model="emailInput"
          type="email"
          placeholder="Correo del usuario"
          required
        />
        <input
          v-model="passwordInput"
          type="password"
          placeholder="Nueva contraseña"
        />
        <button @click="changePassword">Cambiar contraseña</button>
        <button @click="deleteUser">Eliminar usuario</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ControlAcceso",
    data() {
      return {
        usersData: JSON.parse(localStorage.getItem("usersData")) || [],
        emailInput: "",
        passwordInput: "",
      };
    },
    methods: {
      renderUsers() {
        // Este método actualiza automáticamente la vista al modificar usersData
      },
      changePassword() {
        const user = this.usersData.find((u) => u.email === this.emailInput);
        if (user) {
          user.password = this.passwordInput;
          localStorage.setItem("usersData", JSON.stringify(this.usersData));
          alert("Contraseña actualizada correctamente.");
          this.logHistory(`Contraseña cambiada para el usuario ${this.emailInput}`);
        } else {
          alert("Usuario no encontrado.");
        }
      },
      deleteUser() {
        const index = this.usersData.findIndex(
          (u) => u.email === this.emailInput
        );
        if (index !== -1) {
          this.usersData.splice(index, 1);
          localStorage.setItem("usersData", JSON.stringify(this.usersData));
          alert("Usuario eliminado correctamente.");
          this.logHistory(`Usuario eliminado: ${this.emailInput}`);
        } else {
          alert("Usuario no encontrado.");
        }
      },
      logHistory(action) {
        const historyData =
          JSON.parse(localStorage.getItem("adminHistory")) || [];
        historyData.push({ action, timestamp: new Date().toISOString() });
        localStorage.setItem("adminHistory", JSON.stringify(historyData));
      },
    },
    mounted() {
      this.renderUsers();
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: "Arial", sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
  }
  
  .sidebar {
    background-color: #333333;
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
  }
  
  .sidebar a {
    display: block;
    color: white;
    padding: 15px;
    text-align: left;
    text-decoration: none;
    font-size: 1em;
  }
  
  .sidebar a:hover {
    background-color: #00509e;
    color: white;
  }
  
  .header {
    background-color: #333333;
    padding: 15px;
    text-align: center;
    color: white;
    font-size: 1.8em;
    margin-left: 200px;
  }
  
  .main {
    margin-left: 200px;
    padding: 20px;
  }
  
  h2 {
    margin-top: 20px;
    color: #333333;
    font-size: 1.5em;
    text-align: center;
  }
  
  #usersList {
    list-style-type: none;
    padding: 0;
    margin: 20px auto;
    max-width: 600px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  #usersList li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    color: #333333;
  }
  
  #usersList li:last-child {
    border-bottom: none;
  }
  
  input[type="email"],
  input[type="password"] {
    display: block;
    margin: 10px auto;
    padding: 10px;
    width: 90%;
    max-width: 400px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  button {
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #00509e;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 90%;
    max-width: 400px;
  }
  
  button:hover {
    background-color: #003f7f;
  }
  
  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
    }
  
    .header {
      margin-left: 0;
    }
  
    .main {
      margin-left: 0;
    }
  }
  </style>
  