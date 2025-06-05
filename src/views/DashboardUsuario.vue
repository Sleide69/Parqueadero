<template>
    <div>
      <header class="header">
        <h1>Panel de Control</h1>
      </header>

      <aside class="sidebar">
        <router-link to="/registro-vehiculo">Registro</router-link>
        <router-link to="/reservation">Reserva de Estacionamiento</router-link>
        <router-link to="/historial">Historial</router-link>
        <router-link to="/configuracion">Configuración</router-link>
        <router-link to="/reportes">Reportes</router-link>
        <router-link to="/login">Cerrar Sesión</router-link>
      </aside>

      <main class="main">
        <h2>Bienvenido al Sistema de Parqueadero</h2>

        <div class="card">
          <h3>Estadísticas de Uso</h3>
          <p>Aquí se mostrarán estadísticas sobre el uso del parqueadero.</p>
        </div>

        <div class="card">
          <h3>Últimos Vehículos Registrados</h3>
          <p>Se mostrarán los últimos vehículos ingresados al sistema.</p>
        </div>
      </main>
    </div>
  </template>

  <script>
  export default {
    name: "DashboardUsuario",
    data() {
      return {
        // Aquí puedes agregar datos relacionados con estadísticas o vehículos en el futuro
      };
    },
    created() {
      // Lógica que quieras ejecutar cuando se cargue este componente
      if (!localStorage.getItem("isLoggedIn")) {
        alert("Por favor, inicia sesión para acceder a esta página.");
        this.$router.push("/login");
      }
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

  .header {
    background-color: #333333;
    padding: 15px;
    text-align: center;
    color: white;
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
  }

  .sidebar a:hover {
    background-color: #00509e;
    color: white;
  }

  .main {
    margin-left: 200px;
    padding: 20px;
  }

  .card {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .card h3 {
    margin: 0;
    font-size: 1.5em;
  }

  .card p {
    margin-top: 10px;
    color: #555555;
  }
  </style>
