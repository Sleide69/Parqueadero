<template>
  <div>
    <div class="header">
      <h1>Registro de Entrada y Salida</h1>
    </div>
    <aside class="sidebar">
      <router-link to="/admin">Panel de Control</router-link>
      <router-link to="/control_acceso">Control de Acceso</router-link>
      <router-link to="/registro_entrada_salida">Registro de Entrada y Salida</router-link>
      <router-link to="/historial_admin">Historial</router-link>
      <router-link to="/configuracion_a">Configuración</router-link>
      <router-link to="/soporte_a">Soporte de Reportes</router-link>
      <router-link to="/login">Cerrar Sesión</router-link>
    </aside>
    <div class="main">
      <h2>Registro de Entrada y Salida</h2>
      <input
        v-model="licensePlate"
        type="text"
        placeholder="Placa del auto"
        required
      />
      <select v-model="selectedAction" required>
        <option value="">Seleccionar acción</option>
        <option value="Entrada">Entrada</option>
        <option value="Salida">Salida</option>
      </select>
      <button @click="registerEntryExit">Registrar</button>
      <p>{{ statusMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistroEntradaSalida",
  data() {
    return {
      licensePlate: "",
      selectedAction: "",
      statusMessage: "",
      reservationData: JSON.parse(localStorage.getItem("reservas")) || [],
      entryExitLog: JSON.parse(localStorage.getItem("entryExitLog")) || [],
    };
  },
  methods: {
    registerEntryExit() {
      const licensePlate = this.licensePlate.trim().toUpperCase();
      const action = this.selectedAction;

      if (!licensePlate) {
        this.statusMessage = "Por favor, ingresa una placa válida.";
        return;
      }

      if (!action) {
        this.statusMessage = "Por favor, selecciona una acción (Entrada o Salida).";
        return;
      }

      // Validar reserva
      const reservation = this.reservationData.find(
        (res) => res.vehiculo === licensePlate
      );

      // Buscar último estado del vehículo
      const lastLog = [...this.entryExitLog].reverse().find(
        (log) => log.placa === licensePlate
      );

      const isInside = lastLog?.action === "Entrada";

      if (action === "Entrada") {
        if (isInside) {
          this.statusMessage = `El vehículo con placa ${licensePlate} ya está dentro del estacionamiento.`;
          return;
        }

        this.statusMessage = reservation
          ? `Entrada registrada: Auto con placa ${licensePlate}, reservación en espacio ${reservation.espacio}.`
          : `Entrada registrada: Auto con placa ${licensePlate}, sin reservación.`;

        this.entryExitLog.push({
          placa: licensePlate,
          status: reservation ? "Con reservación" : "Sin reservación",
          action: "Entrada",
          timestamp: new Date().toISOString(),
        });
      } else if (action === "Salida") {
        if (!isInside) {
          this.statusMessage = `El vehículo con placa ${licensePlate} no ha registrado una entrada previa.`;
          return;
        }

        this.statusMessage = reservation
          ? `Salida registrada: Auto con placa ${licensePlate}, reservación en espacio ${reservation.espacio}.`
          : `Salida registrada: Auto con placa ${licensePlate}, sin reservación.`;

        this.entryExitLog.push({
          placa: licensePlate,
          status: reservation ? "Con reservación" : "Sin reservación",
          action: "Salida",
          timestamp: new Date().toISOString(),
        });
      }

      // Actualizar LocalStorage
      localStorage.setItem("entryExitLog", JSON.stringify(this.entryExitLog));

      // Limpiar campos
      this.licensePlate = "";
      this.selectedAction = "";
    },
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
  
  input,
  select,
  button {
    display: block;
    margin: 20px auto;
    padding: 10px;
    width: 90%;
    max-width: 400px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  button {
    color: white;
    background-color: #00509e;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #003f7f;
  }
  
  p {
    text-align: center;
    margin-top: 20px;
    font-size: 1.2em;
    color: #555555;
    font-style: italic;
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
  