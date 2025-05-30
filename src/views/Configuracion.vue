<template>
    <div class="configuracion-container">
      <!-- Encabezado -->
      <header class="header">
        <h1>Configuración del Sistema</h1>
      </header>
  
      <!-- Barra lateral reutilizada -->
      <aside class="sidebar">
        <router-link to="/dashboard">Panel de Control</router-link>
        <router-link to="/registro-vehiculo">Registro de Vehículos</router-link>
        <router-link to="/reservation">Reserva de Estacionamiento</router-link>
        <router-link to="/historial">Historial</router-link>
        <router-link to="/configuracion">Configuración</router-link>
        <router-link to="/reportes">Reportes</router-link>
        <router-link to="/login">Cerrar Sesión</router-link>
      </aside>
  
      <!-- Formulario de configuración -->
      <div class="form-container">
        <form @submit.prevent="guardarConfiguracion">
          <h2>Configuración de Usuario</h2>
  
          <label for="currentPassword">Contraseña Actual:</label>
          <input
            type="password"
            id="currentPassword"
            v-model="currentPassword"
            placeholder="Ingrese su contraseña actual"
            required
          />
  
          <label for="newPassword">Nueva Contraseña:</label>
          <input
            type="password"
            id="newPassword"
            v-model="newPassword"
            placeholder="Ingrese la nueva contraseña"
            required
          />
  
          <label for="confirmPassword">Confirmar Nueva Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirme la nueva contraseña"
            required
          />
  
          <label for="notifications">Notificaciones:</label>
          <select v-model="notifications">
            <option value="enabled">Habilitadas</option>
            <option value="disabled">Deshabilitadas</option>
          </select>
  
          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: "Configuracion",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      notifications: "enabled",
    };
  },
  methods: {
    // Recuperar configuración del usuario desde el localStorage
    getConfig() {
      const config = localStorage.getItem("userConfig");
      return config ? JSON.parse(config) : { notifications: "enabled" };
    },
    // Guardar configuración del usuario en el localStorage
    saveConfig(config) {
      localStorage.setItem("userConfig", JSON.stringify(config));
    },
    // Buscar datos del usuario actual en usersData
    getCurrentUserData() {
      const userEmail = localStorage.getItem("userEmail");
      const usersData = JSON.parse(localStorage.getItem("usersData") || "[]");

      // Buscar el usuario por email en usersData
      return usersData.find((user) => user.email === userEmail);
    },
    // Guardar cambios de configuración
    guardarConfiguracion() {
      // Recuperar datos del usuario actual
      const currentUser = this.getCurrentUserData();

      if (!currentUser) {
        alert("No se ha encontrado el usuario actual en el sistema.");
        return;
      }

      // Validar contraseña actual
      if (this.currentPassword !== currentUser.password) {
        alert("La contraseña actual es incorrecta.");
        return;
      }

      // Validar la nueva contraseña
      if (
        this.newPassword.length < 8 ||
        !/\d/.test(this.newPassword) || // Debe contener al menos un número
        !/[A-Za-z]/.test(this.newPassword) // Debe contener al menos una letra
      ) {
        alert(
          "La nueva contraseña debe tener al menos 8 caracteres, una letra y un número."
        );
        return;
      }

      // Confirmar que las contraseñas nuevas coincidan
      if (this.newPassword !== this.confirmPassword) {
        alert("Las contraseñas nuevas no coinciden.");
        return;
      }

      // Actualizar la contraseña del usuario actual en usersData
      const usersData = JSON.parse(localStorage.getItem("usersData") || "[]");
      const updatedUsersData = usersData.map((user) => {
        if (user.email === currentUser.email) {
          return { ...user, password: this.newPassword };
        }
        return user;
      });

      // Guardar la nueva lista de usuarios en localStorage
      localStorage.setItem("usersData", JSON.stringify(updatedUsersData));

      // Guardar la configuración (opcional)
      const config = this.getConfig();
      config.notifications = this.notifications;
      this.saveConfig(config);

      alert("Configuración actualizada correctamente.");

      // Limpiar los campos del formulario
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },
  },
  mounted() {
    // Cargar configuración inicial
    const config = this.getConfig();
    this.notifications = config.notifications;
  },
};
</script>

  
  <style scoped>
  .configuracion-container {
    display: flex;
    flex-direction: column;
    margin-left: 220px; /* Espacio para la barra lateral */
  }
  
  .header {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1em;
  }
  
  .form-container {
    width: 90%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(4, 0, 0, 0.1);
  }
  form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
}

form label {
  font-weight: bold;
  color: #333333;
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

.sidebar a:hover,
.sidebar a.active {
  background-color: #00509e;
}

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  select,
  button {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #000000;
    border-radius: 4px;
  }
  
  button {
    background-color: #00509e;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #003366;
  }
  </style>
  