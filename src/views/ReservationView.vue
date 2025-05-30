<template>
  <div>
    <header class="header">
      <h1>Reserva de Espacios</h1>
    </header>

    <aside class="sidebar">
      <router-link to="/dashboard">Panel de Control</router-link>
      <router-link to="/registro-vehiculo">Registro de Vehículos</router-link>
      <router-link to="/reservation">Reserva de Estacionamiento</router-link>
      <router-link to="/historial">Historial</router-link>
      <router-link to="/configuracion">Configuración</router-link>
      <router-link to="/reportes">Reportes</router-link>
      <router-link to="/login">Cerrar Sesión</router-link>
    </aside>

    <div class="form-container">
      <form @submit.prevent="reservarEspacio">
        <h2>Reservar un Espacio de Estacionamiento</h2>

        <label for="vehicleSelect">Selecciona el Vehículo:</label>
        <select id="vehicleSelect" v-model="selectedVehicle" required>
          <option value="" disabled>Seleccione un vehículo</option>
          <option
            v-for="vehicle in vehicles"
            :key="vehicle.placa"
            :value="vehicle.placa"
          >
            {{ vehicle.marca }} {{ vehicle.modelo }} ({{ vehicle.placa }})
          </option>
        </select>

        <label for="parkingSpot">Espacio de Estacionamiento:</label>
        <select id="parkingSpot" v-model="parkingSpot" required>
          <option value="" disabled>Seleccione un espacio</option>
          <option v-for="spot in parkingSpots" :key="spot" :value="spot">
            {{ spot }}
          </option>
        </select>

        <label for="reservationDate">Fecha de Reserva:</label>
        <input
          type="date"
          id="reservationDate"
          v-model="reservationDate"
          :min="minDate"
          required
        />

        <label for="dataFormat">Formato de Datos:</label>
        <select id="dataFormat" v-model="dataFormat">
          <option value="json">JSON</option>
          <option value="xml">XML</option>
        </select>

        <button type="submit">Reservar Espacio</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReservationView",
  data() {
    return {
      vehicles: [],
      parkingSpots: ["A1", "A2", "B1", "B2","C1","C2"], // Lista de espacios de estacionamiento
      selectedVehicle: "",
      parkingSpot: "",
      reservationDate: "",
      dataFormat: "json", // Formato de datos por defecto
    };
  },
  computed: {
    minDate() {
      const today = new Date();
      return today.toISOString().split("T")[0]; // Fecha mínima (hoy)
    },
  },
  mounted() {
    this.loadVehicles();
  },
  methods: {
    loadVehicles() {
      const userEmail = localStorage.getItem("userEmail");
      const vehiclesData = JSON.parse(localStorage.getItem("vehiclesData")) || [];
      this.vehicles = vehiclesData.filter((vehicle) => vehicle.email === userEmail);
    },
    reservarEspacio() {
  if (!this.selectedVehicle || !this.parkingSpot || !this.reservationDate) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const reservation = {
    usuario: localStorage.getItem("userEmail"),
    vehiculo: this.selectedVehicle,
    espacio: this.parkingSpot,
    fecha: this.reservationDate,
  };

  if (this.dataFormat === "json") {
    this.guardarEnServidor(reservation, "json");
  } else if (this.dataFormat === "xml") {
    this.guardarEnServidor(reservation, "xml");
  }

  this.resetFormulario();
},

    
  guardarEnServidor(reservation, formato) {
    const url =
      formato === "json"
        ? "http://localhost:3000/api/reservas/json"
        : "http://localhost:3000/api/reservas/xml";

    const headers =
      formato === "json"
        ? { "Content-Type": "application/json" }
        : { "Content-Type": "application/xml" };

    const body =
      formato === "json"
        ? JSON.stringify(reservation)
        : `<reserva>
            <usuario>${reservation.usuario}</usuario>
            <vehiculo>${reservation.vehiculo}</vehiculo>
            <espacio>${reservation.espacio}</espacio>
            <fecha>${reservation.fecha}</fecha>
          </reserva>`;

    fetch(url, {
      method: "POST",
      headers,
      body,
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Respuesta del servidor:", response);
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json(); // Esto asume que el servidor devuelve JSON como respuesta
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);

        // Guardar en localStorage
        const reservasExistentes =
          JSON.parse(localStorage.getItem("reservas")) || [];
        reservasExistentes.push(reservation);
        localStorage.setItem("reservas", JSON.stringify(reservasExistentes));

        alert("Espacio reservado exitosamente.");
      })
      .catch((error) => {
        console.error("Error al guardar la reserva:", error);
        alert("Hubo un error al realizar la reserva. Inténtalo nuevamente.");
      });
  },



resetFormulario() {
  this.selectedVehicle = "";
  this.parkingSpot = "";
  this.reservationDate = "";
  this.dataFormat = "json";
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Arial", sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.header {
  background-color: #333333;
  padding: 20px;
  text-align: center;
  color: white;
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
  width: 100%;
  max-width: 500px;
  margin: 50px auto;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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

form select,
form input,
form button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form button {
  width: 100%;
  padding: 10px;
  background-color: #00509e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #003366;
}
</style>

  