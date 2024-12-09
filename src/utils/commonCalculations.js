// Función para calcular días laborados entre dos fechas
export const calcularDiasLaborados = (fechaInicio, fechaFin) => {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const diferenciaDias = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1;
  
  // Verificar si es un año completo
  const esAñoCompleto = verificarAñoCompleto(inicio, fin);
  
  // Si es un año completo, retornar 360
  if (esAñoCompleto) {
      return 360;
  }
  
  // Para períodos parciales, calcular los días efectivos
  return diferenciaDias;
};

const verificarAñoCompleto = (fechaInicio, fechaFin) => {
  // Calcular la diferencia en años
  const años = fechaFin.getFullYear() - fechaInicio.getFullYear();
  const meses = fechaFin.getMonth() - fechaInicio.getMonth();
  const dias = fechaFin.getDate() - fechaInicio.getDate();

  // Verificar si es exactamente un año
  // Caso 1: Del 1 de enero al 31 de diciembre del mismo año
  const esAñoCalendario = 
      fechaInicio.getDate() === 1 && 
      fechaInicio.getMonth() === 0 && 
      fechaFin.getDate() === 31 && 
      fechaFin.getMonth() === 11 && 
      años === 0;

  // Caso 2: Cualquier día del mes a ese mismo día del mes del año siguiente
  const esAñoCompleto = 
      años === 1 && 
      meses === 0 && 
      dias === 0;

  return esAñoCalendario || esAñoCompleto;
};

// Función para redondear valores a 2 decimales
export const redondear = (valor) => {
  return Math.round(valor * 100) / 100;
};

// Función para crear el objeto de resultado
export const crearResultado = (valor, detalles) => {
  return {
      valor: valor,
      detalles: detalles
  };
};

// Función para validar fechas
export const validarFechas = (fechaInicio, fechaFin) => {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  
  if (inicio > fin) {
      throw new Error('La fecha de inicio no puede ser posterior a la fecha final');
  }
  
  return true;
};

// Función para formatear valores monetarios
export const formatearMoneda = (valor) => {
  return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  }).format(valor);
};

// Función para calcular el valor día
export const calcularValorDia = (salarioMensual) => {
  return redondear(salarioMensual / 30);
};

// Función para validar valores numéricos
export const validarValorNumerico = (valor, nombreCampo) => {
  const numero = Number(valor);
  if (isNaN(numero) || numero < 0) {
      throw new Error(`El campo ${nombreCampo} debe ser un número válido y no puede ser negativo`);
  }
  return numero;
};
