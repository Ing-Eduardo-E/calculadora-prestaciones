import { calcularDiasLaborados, redondear, crearResultado } from './commonCalculations';

export const calcularPrimaNavidad = (
    salarioBase,
    gastosRepresentacion = 0,
    auxilioAlimentacion = 0,
    auxilioTransporte = 0,
    doceavoPrimaServicios = 0,
    doceavoPrimaVacaciones = 0,
    doceavoBonificacion = 0,
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
        Number(doceavoPrimaVacaciones) +
        Number(doceavoBonificacion);

    // Días del periodo
    const diasLaborados = calcularDiasLaborados(fechaInicio, fechaFin);
    
    // Prima de Navidad = (Base * días laborados) / 360
    const primaNavidad = (baseCalculo * diasLaborados) / 360;
    const valorFinal = redondear(primaNavidad);

    const resultado = crearResultado(valorFinal, {
        'Base de cálculo': baseCalculo,
        'Días laborados': `${diasLaborados}`,
        'Valor día': redondear(baseCalculo / 30),
        '1/12 Prima de Servicios': doceavoPrimaServicios,
        '1/12 Prima de Vacaciones': doceavoPrimaVacaciones,
        '1/12 Bonificación por Servicios': doceavoBonificacion,
        'Prima de Navidad': valorFinal,
        'Proporción': `${(diasLaborados/360 * 100).toFixed(2)}%`
    });

    return {
        ...resultado,
        doceavo: redondear(valorFinal / 12)
    };
};

// Función auxiliar para obtener el doceavo
export const obtenerDoceavoPrimaNavidad = (resultado) => {
    if (!resultado) return 0;
    return resultado.doceavo || 0;
};