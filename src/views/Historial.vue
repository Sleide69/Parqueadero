<template>
  <div class="history-container">
    <aside class="sidebar">
      <router-link to="/dashboard">Panel de Control</router-link>
      <router-link to="/registro-vehiculo">Registro de Vehículos</router-link>
      <router-link to="/reservation">Reserva de Estacionamiento</router-link>
      <router-link to="/historial">Historial</router-link>
      <router-link to="/configuracion">Configuración</router-link>
      <router-link to="/reportes">Reportes</router-link>
      <router-link to="/login">Cerrar Sesión</router-link>
    </aside>

    <main class="content">
      <h1>Historial de Reservas</h1>

      <div v-if="userReservations.length > 0" id="reservasContainer">
        <div v-for="(reservation, index) in userReservations" :key="index" class="reserva">
          <p><strong>Usuario:</strong> {{ reservation.usuario }}</p>
          <p><strong>Vehículo:</strong> {{ reservation.vehiculo }}</p>
          <p><strong>Espacio:</strong> {{ reservation.espacio }}</p>
          <p><strong>Fecha:</strong> {{ formatDate(reservation.fecha) }}</p>
        </div>
      </div>

      <p v-else>No tienes reservas registradas.</p>
    </main>
  </div>
</template>

<script>
export default {
  name: "UserHistory",
  data() {
    return {
      userReservations: [], // Almacena las reservas del usuario
    };
  },
  methods: {
    loadReservations() {
      try {
        // Obtener las reservas del LocalStorage
        const reservasData = JSON.parse(localStorage.getItem("reservas")) || [];
        const userEmail = localStorage.getItem("userEmail");

        // Filtrar las reservas del usuario actual
        this.userReservations = reservasData.filter(
          (reserva) => reserva.usuario === userEmail
        );
      } catch (error) {
        console.error("Error al cargar las reservas desde el localStorage:", error);
        alert("Ocurrió un problema al cargar tus reservas.");
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  mounted() {
    // Cargar las reservas al montar el componente
    this.loadReservations();
  },
};
</script>

<style scoped>
.history-container {
  display: flex;
  background-color: #f4f4f9;
  height: 100vh; /* Asegura que el contenedor ocupe toda la altura */
}

.sidebar {
  width: 200px;
  background-color: #333333;
  position: fixed; /* Mantén la barra lateral fija */
  height: 100%;
  top: 0;
  left: 0;
  padding-top: 20px;
  z-index: 10; /* Asegura que la barra lateral esté siempre encima */
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

.content {
  margin-left: 220px; /* Desplaza el contenido a la derecha de la barra lateral */
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra el contenido horizontalmente */
  justify-content: center; /* Centra el contenido verticalmente */
  min-height: 100vh; /* Asegura que ocupe toda la altura de la pantalla */
}

.reserva {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px; /* Limita el ancho máximo de las tarjetas */
}

.reserva p {
  margin: 5px 0;
  color: #555;
}

.reserva p strong {
  color: #333;
}

h1 {
  color: #333;
  margin-bottom: 20px;
  text-align: center; /* Centra el título */
}

@media (max-width: 768px) {
  .sidebar {
    width: 180px; /* Ajusta el ancho de la barra lateral en pantallas pequeñas */
  }

  .content {
    margin-left: 190px; /* Ajusta el margen para pantallas más pequeñas */
  }
}

@media (max-width: 600px) {
  .sidebar {
    width: 160px;
  }

  .content {
    margin-left: 170px;
  }
}

</style>
