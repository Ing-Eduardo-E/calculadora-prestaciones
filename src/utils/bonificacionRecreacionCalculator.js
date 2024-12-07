import { calcularDiasLaborados, redondear, crearResultado } from './commonCalculations';

export const calcularBonificacionRecreacion = (
  salarioBase,
  gastosRepresentacion = 0,
  auxilioAlimentacion = 0,
  auxilioTransporte = 0,
  doceavoPrimaServicios = 0,
  doceavoBonificacionServicios = 0,
  fechaInicio,
  fechaFin
) => {
  // Base para el cálculo
  const baseCalculo = 
    Number(salarioBase) + 
    Number(gastosRepresentacion) + 
    Number(auxilioAlimentacion) + 
    Number(auxilioTransporte) +
    Number(doceavoPrimaServicios) +
    Number(doceavoBonificacionServicios);

  // Calcular días laborados
  const diasLaborados = calcularDiasLaborados(fechaInicio, fechaFin);
  
  // Calcular la proporción de días (2 días por año)
  const diasBonificacion = (2 * diasLaborados) / 360;
  
  // Cálculo de la bonificación proporcional
  const valorDia = baseCalculo / 30;
  const bonificacionRecreacion = valorDia * diasBonificacion;
  const valorFinal = redondear(bonificacionRecreacion);

  const resultado = crearResultado(valorFinal, {
    'Base de cálculo': baseCalculo,
    'Valor día': redondear(valorDia),
    'Días laborados': diasLaborados,
    'Días de bonificación': redondear(diasBonificacion, 4),
    '1/12 Prima de Servicios': doceavoPrimaServicios,
    '1/12 Bonificación por Servicios': doceavoBonificacionServicios,
    'Bonificación de Recreación': valorFinal
  });

  return resultado;
};