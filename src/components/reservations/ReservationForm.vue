<template>
    <div class="form-container">
    <Sidebar />  
      <form @submit.prevent="handleSubmit">
        <label for="vehicleSelect">Selecciona el Vehículo:</label>
        <select v-model="selectedVehicle" required>
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
        <select v-model="parkingSpot" required>
          <option value="" disabled>Seleccione un espacio</option>
          <option v-for="spot in parkingSpots" :key="spot" :value="spot">
            {{ spot }}
          </option>
        </select>
  
        <label for="reservationDate">Fecha de Reserva:</label>
        <input
          type="date"
          v-model="reservationDate"
          :min="minDate"
          required
        />
  
        <label for="dataFormat">Formato de Datos:</label>
        <select v-model="dataFormat" required>
          <option value="json">JSON</option>
          <option value="xml">XML</option>
        </select>
  
        <button type="submit">Reservar Espacio</button>
      </form>
    </div>
  </template>
  
  <script>
import Sidebar from './Sidebar.vue';

  export default {
    name: 'ReservationForm',
    data() {
      return {
        vehicles: [],
        parkingSpots: ['A1', 'A2', 'B1', 'B2'],
        selectedVehicle: '',
        parkingSpot: '',
        reservationDate: '',
        dataFormat: 'json',
      };
    },
    computed: {
      minDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
      },
    },
    mounted() {
      this.loadVehicles();
    },
    methods: {
      loadVehicles() {
        const userEmail = localStorage.getItem('userEmail');
        const vehiclesData =
          JSON.parse(localStorage.getItem('vehiclesData')) || [];
        this.vehicles = vehiclesData.filter(
          (vehicle) => vehicle.email === userEmail
        );
      },
      handleSubmit() {
        if (!this.selectedVehicle || !this.parkingSpot || !this.reservationDate) {
          alert('Por favor completa todos los campos.');
          return;
        }
  
        const reservationData = {
          usuario: localStorage.getItem('userEmail'),
          vehiculo: this.selectedVehicle,
          espacio: this.parkingSpot,
          fecha: this.reservationDate,
        };
  
        if (this.dataFormat === 'json') {
          this.saveJSON(reservationData);
        } else if (this.dataFormat === 'xml') {
          this.saveXML(reservationData);
        }
      },
      saveJSON(data) {
        fetch('http://localhost:3000/api/reservas/json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) throw new Error('Error al guardar JSON');
            return response.json();
          })
          .then(() => alert('Reserva guardada en formato JSON.'))
          .catch((error) => console.error('Error:', error));
      },
      saveXML(data) {
        const xmlData = `
          <reserva>
            <usuario>${data.usuario}</usuario>
            <vehiculo>${data.vehiculo}</vehiculo>
            <espacio>${data.espacio}</espacio>
            <fecha>${data.fecha}</fecha>
          </reserva>`;
        fetch('http://localhost:3000/api/reservas/xml', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/xml',
          },
          body: xmlData,
        })
          .then((response) => {
            if (!response.ok) throw new Error('Error al guardar XML');
            return response.text();
          })
          .then(() => alert('Reserva guardada en formato XML.'))
          .catch((error) => console.error('Error:', error));
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    margin: 20px auto;
    padding: 20px;
    max-width: 500px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  form label {
    margin-bottom: 5px;
  }
  
  form select,
  form input,
  form button {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 1rem;
  }
  
  form button {
    background-color: #00509e;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  form button:hover {
    background-color: #003366;
  }
  </style>
  