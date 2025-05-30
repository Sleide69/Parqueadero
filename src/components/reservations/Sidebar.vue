<template>
    <aside class="sidebar">
      <nav>
        <a href="/vue-project/src/views/DashboardUsuario.vue">Panel de Control</a>
        <a href="/vue-project/src/views/RegistroVehiculo.vue">Registro de Vehiculos</a>
        <a href="/vue-project/src/views/ReservationView.vue">Reserva de Espacios</a>
        <a href="/vue-project/src/views/Configuracion.vue">Configuración del Sistema</a>
        <a href="/vue-project/src/views/Historial.vue">Historial de Vehículos</a>
        <a href="/vue-project/src/views/Reportes.vue">Reportes</a>
        <a href="/vue-project/src/views/LoginUsuario.vue">Cerrar Sesión</a>
      </nav>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'Sidebar',
  };
  </script>
  
  <style scoped>
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
    background-color: #444;
  }
  </style>
  