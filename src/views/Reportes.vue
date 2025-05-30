<template>
    <div class="reportes-container">
      <!-- Encabezado -->
      <header class="header">
        <h1>Reportes de Incidentes en el Estacionamiento</h1>
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
  
      <!-- Formulario de reporte -->
      <div class="form-container">
        <form @submit.prevent="registrarReporte">
          <label for="incidentType">Tipo de Incidente:</label>
          <select v-model="incidentType" required>
            <option value="">Seleccione un tipo de incidente</option>
            <option value="no_show">Reserva no utilizada</option>
            <option value="unauthorized_occupation">Ocupación no autorizada</option>
            <option value="damage">Daños en el espacio</option>
            <option value="other">Otro</option>
          </select>
  
          <label for="parkingSpot">Espacio de Estacionamiento:</label>
          <input
            type="text"
            id="parkingSpot"
            v-model="parkingSpot"
            placeholder="Ejemplo: A1, B2"
            required
          />
  
          <label for="reportDescription">Descripción del Incidente:</label>
          <textarea
            id="reportDescription"
            v-model="description"
            placeholder="Detalles del incidente"
            required
          ></textarea>
  
          <button type="submit">Registrar Reporte</button>
        </form>
      </div>
  
      <!-- Lista de reportes -->
      <div class="report-list">
        <h2>Lista de Reportes</h2>
        <ul>
          <li v-for="report in reports" :key="report.id">
            <strong>Tipo:</strong> {{ report.incidentType }}<br />
            <strong>Espacio:</strong> {{ report.parkingSpot }}<br />
            <strong>Descripción:</strong> {{ report.description }}<br />
            <strong>Fecha:</strong> {{ report.date }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from "@/components/reservations/Sidebar.vue";
  
  export default {
    name: "Reportes",
    components: {
      Sidebar,
    },
    data() {
      return {
        incidentType: "",
        parkingSpot: "",
        description: "",
        reports: [],
      };
    },
    methods: {
      // Recuperar reportes desde localStorage
      getReports() {
        const reports = localStorage.getItem("parkingReports");
        return reports ? JSON.parse(reports) : [];
      },
      // Guardar reportes en localStorage
      saveReports(reports) {
        localStorage.setItem("parkingReports", JSON.stringify(reports));
      },
      // Registrar un nuevo reporte
      registrarReporte() {
        const newReport = {
          id: Date.now(),
          incidentType: this.incidentType,
          parkingSpot: this.parkingSpot,
          description: this.description,
          date: new Date().toLocaleString(),
        };
  
        this.reports.push(newReport);
        this.saveReports(this.reports);
  
        alert("Reporte registrado exitosamente.");
        this.incidentType = "";
        this.parkingSpot = "";
        this.description = "";
      },
    },
    mounted() {
      this.reports = this.getReports();
    },
  };
  </script>
  
  <style scoped>
  .reportes-container {
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

  .form-container {
    width: 90%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.report-list {
  text-align: left;
  margin-bottom: 30px;
  color: #333333;
}
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  select,
  textarea,
  button {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
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
  
  .report-list {
    width: 90%;
    max-width: 600px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .report-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .report-list li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  </style>
  