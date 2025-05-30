import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'RegistroUsuario',
    component: () => import('@/views/RegistroUsuario.vue'),
  },
  {
    path: '/login',
    name: 'LoginUsuario',
    component: () => import('@/views/LoginUsuario.vue'),
  },
  {
    path: '/dashboard',
    name: 'DashboardUsuario',
    component: () => import('@/views/DashboardUsuario.vue'),
  },
  {
    path: '/configuracion',
    name: 'Configuracion',
    component: () => import('@/views/Configuracion.vue'),
  },
  {
    path: '/reportes',
    name: 'Reportes',
    component: () => import('@/views/Reportes.vue'),
  },
  {
    path: '/registro-vehiculo',
    name: 'RegistroVehiculo',
    component: () => import('@/views/RegistroVehiculo.vue'),
  },
  {
    path: '/historial',
    name: 'Historial',
    component: () => import('@/views/Historial.vue'),
  },
  {
    path: '/reservation', // Ruta para la vista de reservas
    name: 'ReservationView',
    component: () => import('@/views/ReservationView.vue'), // Carga bajo demanda
  },
  {
    path: '/admin', // Ruta para la vista de reservas
    name: 'admin',
    component: () => import('@/views/admin.vue'), // Carga bajo demanda
  },
  {
    path: '/control_acceso', // Ruta para la vista de reservas
    name: 'Control_Acceso',
    component: () => import('@/views/Control_Acceso.vue'), // Carga bajo demanda
  },
  {
    path: '/registro_entrada_salida', // Ruta para la vista de reservas
    name: 'RegistroEntradaSalida',
    component: () => import('@/views/RegistroEntradaSalida.vue'), // Carga bajo demanda
  },
  {
    path: '/historial_admin', // Ruta para la vista de reservas
    name: 'HistorialAdmin',
    component: () => import('@/views/HistorialAdmin.vue'), // Carga bajo demanda
  },
  {
    path: '/soporte_a', // Ruta para la vista de reservas
    name: 'SoporteAdmin',
    component: () => import('@/views/SoporteAdmin.vue'), // Carga bajo demanda
  },
  {
    path: '/configuracion_a',
    name: 'ConfiguracionAdmin',
    component: () => import('@/views/ConfiguracionAdmin.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
