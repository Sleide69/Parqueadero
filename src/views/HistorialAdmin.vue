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
    <div id="reservasContainer">
      <h1>Historial de Entrada y Salida de Vehículos</h1>
      <table>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Estado</th>
            <th>Acción</th>
            <th>Fecha y hora</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in historyData" :key="index">
            <td>{{ entry.placa }}</td>
            <td>{{ entry.status }}</td>
            <td>{{ entry.action }}</td>
            <td>{{ new Date(entry.timestamp).toLocaleString() }}</td>
          </tr>
          <tr v-if="historyData.length === 0">
            <td colspan="4" style="text-align: center;">No hay registros en el historial.</td>
          </tr>
        </tbody>
      </table>
      <button @click="clearHistory">Limpiar Historial</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistorialAdmin",
  data() {
    return {
      // Cargar historial desde el LocalStorage
      historyData: JSON.parse(localStorage.getItem("entryExitLog")) || [],
    };
  },
  methods: {
    // Método para limpiar el historial
    clearHistory() {
      if (confirm("¿Estás seguro de que deseas borrar todo el historial?")) {
        localStorage.removeItem("entryExitLog"); // Borrar el historial del LocalStorage
        alert("Historial eliminado correctamente.");
        this.historyData = []; // Actualizar la interfaz
      }
    },
  },
};
</script>

  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f9;
  }
  
  .sidebar {
    height: 100vh;
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #333;
    padding-top: 20px;
  }
  
  .sidebar a {
    display: block;
    color: #fff;
    padding: 15px 20px;
    text-decoration: none;
    font-size: 1rem;
  }
  
  .sidebar a:hover {
    background-color: #575757;
  }
  
  .sidebar .active {
    background-color: #007bff;
  }
  
  #reservasContainer {
    margin-left: 200px;
    padding: 20px;
    max-width: 1000px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  table th,
  table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  table th {
    background-color: #007bff;
    color: white;
    text-transform: uppercase;
  }
  
  table tbody tr:hover {
    background-color: #f1f1f1;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #dc3545;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c82333;
  }
  
  @media (max-width: 768px) {
    body {
      margin-left: 0;
    }
  
    .sidebar {
      height: auto;
      position: relative;
      width: 100%;
    }
  
    .sidebar a {
      display: inline-block;
      text-align: center;
      padding: 10px;
    }
  }
  </style>
  