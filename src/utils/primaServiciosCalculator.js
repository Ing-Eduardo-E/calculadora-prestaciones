import { calcularDiasLaborados, redondear, crearResultado } from './commonCalculations';

export const calcularPrimaServicios = (
  salarioBase,
  gastosRepresentacion = 0,
  auxilioAlimentacion = 0,
  auxilioTransporte = 0,
  fechaInicio,
  fechaFin,
  doceavoBonificacion = 0
) => {
  // Base para el cálculo
  const baseCalculo = 
    Number(salarioBase) + 
    Number(gastosRepresentacion) + 
    Number(auxilioAlimentacion) + 
    Number(auxilioTransporte) +
    Number(doceavoBonificacion);

  // Días del periodo específico de prima
  const diasLaborados = calcularDiasLaborados(fechaInicio, fechaFin);
  
  // Prima = (Base * días) / 360
  const primaServicios = (baseCalculo * diasLaborados) / 360;
  const valorFinal = redondear(primaServicios);
  const doceavoPrima = redondear(valorFinal / 12);

  const resultado = crearResultado(valorFinal, {
    'Base de cálculo': baseCalculo,
    'Días laborados': `${diasLaborados}`,
    'Valor día': redondear(baseCalculo / 30),
    '1/12 Bonificación por Servicios': doceavoBonificacion,
    'Prima de Servicios': valorFinal,
    '1/12 Prima de Servicios': doceavoPrima
  });

  return {
    ...resultado,
    doceavo: doceavoPrima
  };
};

export const obtenerDoceavoPrima = (resultado) => {
  if (!resultado) return 0;
  return resultado.doceavo || 0;
};