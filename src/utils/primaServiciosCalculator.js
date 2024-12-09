import { 
  calcularDiasLaborados, 
  redondear, 
  crearResultado,
  validarValorNumerico 
} from './commonCalculations';

export const calcularPrimaServicios = (
  salarioBase,
  gastosRepresentacion = 0,
  auxilioAlimentacion = 0,
  auxilioTransporte = 0,
  fechaInicio,
  fechaFin,
  doceavoBonificacion = 0
) => {
  try {
      // Validar y convertir valores numéricos exactos
      const salarioValidado = Math.floor(validarValorNumerico(salarioBase, 'Salario Base'));
      const gastosValidados = Math.floor(validarValorNumerico(gastosRepresentacion, 'Gastos de Representación'));
      const auxilioAlimentacionValidado = Math.floor(validarValorNumerico(auxilioAlimentacion, 'Auxilio de Alimentación'));
      const auxilioTransporteValidado = Math.floor(validarValorNumerico(auxilioTransporte, 'Auxilio de Transporte'));
      const doceavoBonificacionValidado = Math.floor(validarValorNumerico(doceavoBonificacion, 'Doceavo Bonificación'));

      // Base para el cálculo
      const baseCalculo = 
          salarioValidado + 
          gastosValidados + 
          auxilioAlimentacionValidado + 
          auxilioTransporteValidado +
          doceavoBonificacionValidado;

      // Calcular días del semestre (máximo 180 días)
      const diasCalculados = calcularDiasLaborados(fechaInicio, fechaFin);
      const diasLaborados = Math.min(diasCalculados, 180);
      
      // Valor día
      const valorDia = Math.floor(baseCalculo / 30);
      
      // Prima = (Base * días) / 360
      const primaServicios = (baseCalculo * diasLaborados) / 360;
      const valorFinal = Math.floor(primaServicios);
      const doceavoPrima = Math.floor(valorFinal / 12);

      return {
          ...crearResultado(valorFinal, {
              'Base de cálculo': baseCalculo,
              'Días laborados': diasLaborados,
              'Valor día': valorDia,
              '1/12 Bonificación por Servicios': doceavoBonificacionValidado,
              'Prima de Servicios': valorFinal,
              '1/12 Prima de Servicios': doceavoPrima
          }),
          doceavo: doceavoPrima
      };
  } catch (error) {
      console.error('Error en el cálculo de la prima de servicios:', error);
      throw error;
  }
};

export const obtenerDoceavoPrima = (resultado) => {
  if (!resultado) return 0;
  return resultado.doceavo || 0;
};