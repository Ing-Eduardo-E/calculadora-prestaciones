import { calcularDiasLaborados, redondear, crearResultado } from './commonCalculations';

export const calcularCesantias = (
    salarioBase,
    gastosRepresentacion = 0,
    auxilioAlimentacion = 0,
    auxilioTransporte = 0,
    doceavoPrimaNavidad = 0,
    doceavoBonificacion = 0,
    doceavoPrimaServicios = 0,
    doceavoPrimaVacaciones = 0,
    fechaInicio,
    fechaFin
) => {
    // Base para el cálculo
    const baseCalculo = 
        Number(salarioBase) + 
        Number(gastosRepresentacion) + 
        Number(auxilioAlimentacion) + 
        Number(auxilioTransporte) +
        Number(doceavoPrimaNavidad) +
        Number(doceavoBonificacion) +
        Number(doceavoPrimaServicios) +
        Number(doceavoPrimaVacaciones);

    // Días del periodo
    const diasLaborados = calcularDiasLaborados(fechaInicio, fechaFin);
    
    // Cesantías = (Base * días laborados) / 360
    const cesantias = (baseCalculo * diasLaborados) / 360;
    const valorFinal = redondear(cesantias);

    const resultado = crearResultado(valorFinal, {
        'Base de cálculo': baseCalculo,
        'Días laborados': diasLaborados,
        'Valor día': redondear(baseCalculo / 30),
        '1/12 Prima de Navidad': doceavoPrimaNavidad,
        '1/12 Bonificación por Servicios': doceavoBonificacion,
        '1/12 Prima de Servicios': doceavoPrimaServicios,
        '1/12 Prima de Vacaciones': doceavoPrimaVacaciones,
        'Cesantías': valorFinal,
        'Proporción': `${(diasLaborados/360 * 100).toFixed(2)}%`
    });

    return {
        ...resultado,
        doceavo: redondear(valorFinal / 12)
    };
};

export const obtenerDoceavoCesantias = (resultado) => {
    if (!resultado) return 0;
    return resultado.doceavo || 0;
};