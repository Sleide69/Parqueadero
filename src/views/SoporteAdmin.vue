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
    <h1>Gestión de Reportes de Soporte</h1>
    <div id="reportContainer">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tipo de Incidente</th>
            <th>Descripción</th>
            <th>Espacio</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, index) in reports" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ report.incidentType }}</td>
            <td>{{ report.description }}</td>
            <td>{{ report.parkingSpot }}</td>
            <td>{{ report.date }}</td>
            <td>{{ report.status }}</td>
            <td>
              <button
                class="status-btn pending"
                @click="updateStatus(index, 'Pendiente')"
              >
                Pendiente
              </button>
              <button
                class="status-btn resolved"
                @click="updateStatus(index, 'Resuelto')"
              >
                Resuelto
              </button>
              <button class="status-btn delete" @click="deleteReport(index)">
                Eliminar
              </button>
            </td>
          </tr>
          <tr v-if="reports.length === 0">
            <td colspan="7" style="text-align: center;">
              No hay reportes en el sistema.
            </td>
          </tr>
        </tbody>
      </table>
      <button id="clearReportsBtn" @click="clearReports">
        Eliminar Todos los Reportes
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SoporteAdmin",
  data() {
    return {
      // Carga los reportes desde LocalStorage
      reports: JSON.parse(localStorage.getItem("parkingReports")) || [],
    };
  },
  methods: {
    // Actualiza el estado de un reporte
    updateStatus(index, status) {
      this.reports[index].status = status;
      this.saveReports();
    },
    // Elimina un reporte específico
    deleteReport(index) {
      if (confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
        this.reports.splice(index, 1);
        this.saveReports();
      }
    },
    // Limpia todos los reportes
    clearReports() {
      if (confirm("¿Estás seguro de que deseas eliminar todos los reportes?")) {
        localStorage.removeItem("parkingReports");
        this.reports = [];
      }
    },
    // Guarda los reportes en LocalStorage
    saveReports() {
      localStorage.setItem("parkingReports", JSON.stringify(this.reports));
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
  
  #reportContainer {
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
  
  button,
  .status-btn {
    padding: 10px 15px;
    font-size: 1rem;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
    transition: background-color 0.3s;
  }
  
  .status-btn.pending {
    background-color: #ffc107;
  }
  
  .status-btn.resolved {
    background-color: #28a745;
  }
  
  .status-btn.delete {
    background-color: #dc3545;
  }
  
  button:hover {
    background-color: #c82333;
  }
  </style>
  