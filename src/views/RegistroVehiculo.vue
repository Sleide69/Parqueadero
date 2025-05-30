<template>
    <div>
      <header class="header">
        <h1>Registro de Vehículos</h1>
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
        <form @submit.prevent="registrarVehiculo">
          <h2>Registrar un Vehículo</h2>
  
          <label for="placa">Placa del Vehículo:</label>
          <input
            type="text"
            id="placa"
            v-model="vehiculo.placa"
            placeholder="Ingrese la placa"
            required
          />
  
          <label for="marca">Marca:</label>
          <input
            type="text"
            id="marca"
            v-model="vehiculo.marca"
            placeholder="Ingrese la marca"
            required
          />
  
          <label for="modelo">Modelo:</label>
          <input
            type="text"
            id="modelo"
            v-model="vehiculo.modelo"
            placeholder="Ingrese el modelo"
            required
          />
  
          <label for="color">Color:</label>
          <input
            type="text"
            id="color"
            v-model="vehiculo.color"
            placeholder="Ingrese el color"
            required
          />
  
          <label for="dataFormat">Formato de Datos:</label>
          <select id="dataFormat" v-model="formatoDatos">
            <option value="json">JSON</option>
            <option value="xml">XML</option>
          </select>
  
          <button type="submit">Registrar Vehículo</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RegistroVehiculo",
    data() {
      return {
        vehiculo: {
          placa: "",
          marca: "",
          modelo: "",
          color: "",
        },
        formatoDatos: "json", // Por defecto JSON
      };
    },
    methods: {
      registrarVehiculo() {
        const userEmail = localStorage.getItem("userEmail");
  
        if (!userEmail) {
          alert("No se ha detectado un usuario logueado. Inicie sesión nuevamente.");
          this.$router.push("/login");
          return;
        }
  
        const nuevoVehiculo = {
          ...this.vehiculo,
          email: userEmail,
          registrationDate: new Date().toISOString(),
        };
  
        if (this.formatoDatos === "json") {
          this.guardarEnLocalStorage(nuevoVehiculo);
        } else if (this.formatoDatos === "xml") {
          this.guardarComoXML(nuevoVehiculo);
        }
  
        alert("Vehículo registrado exitosamente.");
        this.resetFormulario();
      },
      guardarEnLocalStorage(vehiculo) {
        const vehiculos = JSON.parse(localStorage.getItem("vehiclesData")) || [];
        vehiculo.id = vehiculos.length + 1;
        vehiculos.push(vehiculo);
        localStorage.setItem("vehiclesData", JSON.stringify(vehiculos));
      },
      guardarComoXML(vehiculo) {
        const xmlDoc = document.implementation.createDocument("", "", null);
        const root = xmlDoc.createElement("vehiculos");
  
        const vehiculoXML = xmlDoc.createElement("vehiculo");
        for (const [key, value] of Object.entries(vehiculo)) {
          const elemento = xmlDoc.createElement(key);
          elemento.textContent = value;
          vehiculoXML.appendChild(elemento);
        }
  
        root.appendChild(vehiculoXML);
        xmlDoc.appendChild(root);
  
        const serializer = new XMLSerializer();
        const xmlString = serializer.serializeToString(xmlDoc);
  
        const blob = new Blob([xmlString], { type: "application/xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "vehiculos.xml";
        link.click();
      },
      resetFormulario() {
        this.vehiculo = { placa: "", marca: "", modelo: "", color: "" };
        this.formatoDatos = "json";
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
  
  form input,
  form select {
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
  