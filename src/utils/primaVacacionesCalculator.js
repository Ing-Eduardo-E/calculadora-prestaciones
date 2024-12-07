import { calcularDiasLaborados, redondear, crearResultado } from './commonCalculations';

export const calcularPrimaVacaciones = (
    salarioBase,
    gastosRepresentacion = 0,
    auxilioAlimentacion = 0,
    auxilioTransporte = 0,
    doceavoBonificacion = 0,
    doceavoPrima = 0,
    fechaInicio,
    fechaFin
) => {
    // Base para el cálculo
    const baseCalculo = 
        Number(salarioBase) + 
        Number(gastosRepresentacion) + 
        Number(auxilioAlimentacion) + 
        Number(auxilioTransporte) +
        Number(doceavoBonificacion) +
        Number(doceavoPrima);

    // Días del periodo
    const diasLaborados = calcularDiasLaborados(fechaInicio, fechaFin);
    
    // Días base de vacaciones (15) más días adicionales
    const diasBasePrimaVacaciones = 15 + calcularDiasAdicionales();
    
    // Cálculo proporcional según tiempo laborado
    const diasProporcionales = (diasBasePrimaVacaciones * diasLaborados) / 360;
    
    // Prima = (Base * días proporcionales) / 30
    const primaVacaciones = (baseCalculo * diasProporcionales) / 30;
    const valorFinal = redondear(primaVacaciones);
    const doceavo = redondear(valorFinal / 12);

    const resultado = crearResultado(valorFinal, {
        'Base de cálculo': baseCalculo,
        'Días laborados': diasLaborados,
        'Valor día': redondear(baseCalculo / 30),
        'Días base + adicionales': diasBasePrimaVacaciones,
        'Días proporcionales': redondear(diasProporcionales, 4),
        '1/12 Bonificación por Servicios': doceavoBonificacion,
        '1/12 Prima de Servicios': doceavoPrima,
        'Prima de Vacaciones': valorFinal,
        '1/12 Prima de Vacaciones': doceavo
    });

    return {
        ...resultado,
        doceavo
    };
};

const calcularDiasAdicionales = () => {
    return 6; // 4 días de fin de semana + 2 festivos
};

export const obtenerDoceavoPrimaVacaciones = (resultado) => {
    if (!resultado) return 0;
    return resultado.doceavo || 0;
};