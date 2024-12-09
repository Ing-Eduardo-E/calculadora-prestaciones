import { 
    calcularDiasLaborados, 
    validarValorNumerico,
    crearResultado 
} from './commonCalculations';

export const calcularInteresesCesantias = (
    valorCesantias,
    fechaInicio,
    fechaFin
) => {
    try {
        // Validar valor de las cesantías
        const cesantiasValidadas = Math.floor(validarValorNumerico(valorCesantias, 'Cesantías'));

        // Días laborados
        const diasLaborados = calcularDiasLaborados(fechaInicio, fechaFin);
        const diasAjustados = Math.min(diasLaborados, 360);
        
        // Tasa de interés anual (12%)
        const tasaInteresAnual = 0.12;
        
        // Cálculo de intereses
        // (Cesantías × días × tasa) / 360
        const intereses = (cesantiasValidadas * diasAjustados * tasaInteresAnual) / 360;
        const valorFinal = Math.floor(intereses);

        const proporcion = ((diasAjustados/360) * 100).toFixed(2);

        return {
            ...crearResultado(valorFinal, {
                'Base Cesantías': cesantiasValidadas,
                'Días laborados': diasAjustados,
                'Tasa de interés anual': '12%',
                'Proporción': `${proporcion}%`,
                'Intereses calculados': valorFinal
            })
        };
    } catch (error) {
        console.error('Error en el cálculo de los intereses a las cesantías:', error);
        throw error;
    }
};