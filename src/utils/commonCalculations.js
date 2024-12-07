// Función para calcular días laborados entre dos fechas
export const calcularDiasLaborados = (fechaInicio, fechaFin) => {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const diferencia = fin - inicio;
  return Math.ceil(diferencia / (1000 * 60 * 60 * 24)) + 1;
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
