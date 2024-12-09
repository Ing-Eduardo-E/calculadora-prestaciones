import {
  calcularDiasLaborados,
  redondear,
  crearResultado,
  validarValorNumerico,
} from "./commonCalculations";

export const calcularBonificacionServicios = (
  salarioBase,
  gastosRepresentacion = 0,
  smlv,
  fechaInicio,
  fechaFin
) => {
  try {
    // Validar y convertir valores numéricos exactos
    const salarioValidado = Math.floor(
      validarValorNumerico(salarioBase, "Salario Base")
    );
    const gastosValidados = Math.floor(
      validarValorNumerico(gastosRepresentacion, "Gastos de Representación")
    );
    const smlvValidado = Math.floor(validarValorNumerico(smlv, "SMLV"));

    // Base de cálculo sin redondeo en decimales
    const baseCalculo = salarioValidado + gastosValidados;

    // Verificar si es año completo y obtener días (máximo 360)
    const diasCalculados = calcularDiasLaborados(fechaInicio, fechaFin);
    const diasLaborados = Math.min(diasCalculados, 360);

    // Calcular 2 SMLV y determinar el porcentaje
    const dosSmmlv = smlvValidado * 2;
    const porcentaje = baseCalculo <= dosSmmlv ? 0.5 : 0.35;

    // Cálculo de la bonificación
    const bonificacion = (baseCalculo * diasLaborados * porcentaje) / 360;
    const valorFinal = Math.floor(bonificacion);
    const doceavoBonificacion = Math.floor(valorFinal / 12);

    return {
      ...crearResultado(valorFinal, {
        "Base de cálculo": baseCalculo,
        "Días laborados": diasLaborados,
        "Porcentaje aplicado": `${porcentaje * 100}%`,
        "Bonificación calculada": valorFinal,
        "1/12 Bonificación por Servicios": doceavoBonificacion,
      }),
      doceavo: doceavoBonificacion,
    };
  } catch (error) {
    console.error("Error en el cálculo de la bonificación:", error);
    throw error;
  }
};

export const obtenerDoceavoBonificacion = (resultado) => {
  if (!resultado) return 0;
  return resultado.doceavo || 0;
};
