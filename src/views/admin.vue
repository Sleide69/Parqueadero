<template>
    <div>
      <div class="header">
        <h1>Panel de Administración</h1>
      </div>

      <aside class="sidebar">
        <router-link to="/control_acceso">Control de Acceso</router-link>
        <router-link to="/registro_entrada_salida">Registro</router-link>
        <router-link to="/historial_admin">Historial</router-link>
        <router-link to="/configuracion_a">Configuración</router-link>
        <router-link to="/soporte_a">Soporte de Reportes</router-link>
        <router-link to="/login">Cerrar Sesión</router-link>
      </aside>

      <div class="main">
        <section id="control-acceso">
          <h2>Control de Acceso</h2>
          <p>Gestionar accesos de usuarios y seguridad del sistema.</p>
          <button @click="navigateTo('/control_acceso')">Ir a Control de Acceso</button>
        </section>

        <section id="registro_entrada_salida">
          <h2>Registro de Entrada y Salida</h2>
          <p>Verificar el historial de vehículos que han entrado y salido del parqueadero.</p>
          <button @click="navigateTo('/registro_entrada_salida')">Ver Registros</button>
        </section>

        <section id="historial">
          <h2>Reservas de Espacios</h2>
          <p>Gestionar y visualizar las reservas de espacios de parqueo.</p>
          <button @click="navigateTo('/historial_admin')">Historial</button>
        </section>

        <section id="soporte_a">
          <h2>Soporte</h2>
          <p>Contacta al equipo de soporte para asistencia técnica.</p>
          <button @click="navigateTo('/soporte_a')">Ir a Soporte</button>
        </section>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: "Admin",
    methods: {
      navigateTo(url) {
        window.location.href = url;
      },
      loadJSON(file, callback) {
        fetch(file)
          .then((response) => response.json())
          .then((data) => callback(data))
          .catch((error) => console.error("Error al cargar el archivo JSON:", error));
      },
      loadXML(file, callback) {
        fetch(file)
          .then((response) => response.text())
          .then((data) => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            callback(xml);
          })
          .catch((error) => console.error("Error al cargar el archivo XML:", error));
      },
      saveJSON(filename, data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.json`;
        link.click();
      },
      saveXML(filename, data) {
        const serializer = new XMLSerializer();
        const xmlString = serializer.serializeToString(data);
        const blob = new Blob([xmlString], { type: "application/xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.xml`;
        link.click();
      },
      parseXMLToJSON(xml) {
        const json = {};
        Array.from(xml.childNodes).forEach((node) => {
          if (node.nodeType === 1) {
            json[node.nodeName] = this.parseXMLToJSON(node);
          } else if (node.nodeType === 3) {
            json.text = node.nodeValue.trim();
          }
        });
        return json;
      },
      parseJSONToXML(json, rootElement) {
        const xmlDoc = document.implementation.createDocument("", rootElement, null);
        const root = xmlDoc.documentElement;
        const buildXML = (jsonObj, parent) => {
          Object.keys(jsonObj).forEach((key) => {
            if (typeof jsonObj[key] === "object") {
              const child = xmlDoc.createElement(key);
              buildXML(jsonObj[key], child);
              parent.appendChild(child);
            } else {
              const element = xmlDoc.createElement(key);
              element.textContent = jsonObj[key];
              parent.appendChild(element);
            }
          });
        };
        buildXML(json, root);
        return xmlDoc;
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

  .header {
    background-color: #333333;
    padding: 15px;
    text-align: center;
    color: white;
    font-size: 1.8em;
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

  .main {
    margin-left: 200px;
    padding: 20px;
  }

  .dashboard-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .card {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }

  .card h3 {
    margin: 0;
    font-size: 1.5em;
    color: #333333;
  }

  .card p {
    margin-top: 10px;
    color: #555555;
  }
  </style>
