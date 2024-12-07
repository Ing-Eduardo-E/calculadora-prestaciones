import { calcularDiasLaborados, redondear, crearResultado } from './commonCalculations';

export const calcularInteresesCesantias = (
    valorCesantias,
    fechaInicio,
    fechaFin
) => {
    // Días del periodo
    const diasLaborados = calcularDiasLaborados(fechaInicio, fechaFin);
    
    // Tasa de interés anual del 12%
    const tasaInteresAnual = 0.12;
    
    // Intereses = (Cesantías * días laborados * tasa) / 360
    const intereses = (valorCesantias * diasLaborados * tasaInteresAnual) / 360;
    const valorFinal = redondear(intereses);

    const resultado = crearResultado(valorFinal, {
        'Base Cesantías': valorCesantias,
        'Días laborados': diasLaborados,
        'Tasa de interés anual': '12%',
        'Proporción': `${(diasLaborados/360 * 100).toFixed(2)}%`,
        'Intereses calculados': valorFinal
    });

    return resultado;
};