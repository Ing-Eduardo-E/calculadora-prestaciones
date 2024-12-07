import { calcularDiasLaborados, redondear, crearResultado } from './commonCalculations';

export const calcularIndemnizacionVacaciones = (
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
    
    // Días de indemnización (15 días)
    const diasBaseIndemnizacion = 15;
    
    // Cálculo proporcional según tiempo laborado
    const diasProporcionales = (diasBaseIndemnizacion * diasLaborados) / 360;
    
    // Corrección: Valor día = Base / 30
    const valorDia = baseCalculo / 30;
    const indemnizacionVacaciones = valorDia * diasProporcionales;
    const valorFinal = redondear(indemnizacionVacaciones);

    const resultado = crearResultado(valorFinal, {
        'Base de cálculo': baseCalculo,
        'Días laborados': diasLaborados,
        'Valor día': redondear(valorDia),
        'Días base': diasBaseIndemnizacion,
        'Días proporcionales': redondear(diasProporcionales, 4),
        '1/12 Bonificación por Servicios': doceavoBonificacion,
        '1/12 Prima de Servicios': doceavoPrima,
        'Indemnización de Vacaciones': valorFinal
    });

    return {
        ...resultado,
        diasProporcionales
    };
};