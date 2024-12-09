import { 
    calcularDiasLaborados, 
    validarValorNumerico,
    crearResultado 
} from './commonCalculations';

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
    try {
        // Validar y convertir valores numéricos exactos
        const salarioValidado = Math.floor(validarValorNumerico(salarioBase, 'Salario Base'));
        const gastosValidados = Math.floor(validarValorNumerico(gastosRepresentacion, 'Gastos de Representación'));
        const auxilioAlimentacionValidado = Math.floor(validarValorNumerico(auxilioAlimentacion, 'Auxilio de Alimentación'));
        const auxilioTransporteValidado = Math.floor(validarValorNumerico(auxilioTransporte, 'Auxilio de Transporte'));
        const doceavoPrimaNavidadValidado = Math.floor(validarValorNumerico(doceavoPrimaNavidad, 'Doceavo Prima Navidad'));
        const doceavoBonificacionValidado = Math.floor(validarValorNumerico(doceavoBonificacion, 'Doceavo Bonificación'));
        const doceavoPrimaServiciosValidado = Math.floor(validarValorNumerico(doceavoPrimaServicios, 'Doceavo Prima de Servicios'));
        const doceavoPrimaVacacionesValidado = Math.floor(validarValorNumerico(doceavoPrimaVacaciones, 'Doceavo Prima de Vacaciones'));

        // Base para el cálculo
        const baseCalculo = 
            salarioValidado + 
            gastosValidados + 
            auxilioAlimentacionValidado + 
            auxilioTransporteValidado +
            doceavoPrimaNavidadValidado +
            doceavoBonificacionValidado +
            doceavoPrimaServiciosValidado +
            doceavoPrimaVacacionesValidado;

        // Días laborados
        const diasLaborados = calcularDiasLaborados(fechaInicio, fechaFin);
        const diasAjustados = Math.min(diasLaborados, 360);
        
        // Valor día y cálculo final
        const valorDia = Math.floor(baseCalculo / 30);
        const cesantias = (baseCalculo * diasAjustados) / 360;
        const valorFinal = Math.floor(cesantias);
        const doceavoCesantias = Math.floor(valorFinal / 12);

        const proporcion = ((diasAjustados/360) * 100).toFixed(2);

        return {
            ...crearResultado(valorFinal, {
                'Base de cálculo': baseCalculo,
                'Días laborados': diasAjustados,
                'Valor día': valorDia,
                '1/12 Prima de Navidad': doceavoPrimaNavidadValidado,
                '1/12 Bonificación por Servicios': doceavoBonificacionValidado,
                '1/12 Prima de Servicios': doceavoPrimaServiciosValidado,
                '1/12 Prima de Vacaciones': doceavoPrimaVacacionesValidado,
                'Cesantías': valorFinal,
                'Proporción': `${proporcion}%`
            }),
            doceavo: doceavoCesantias
        };
    } catch (error) {
        console.error('Error en el cálculo de las cesantías:', error);
        throw error;
    }
};

export const obtenerDoceavoCesantias = (resultado) => {
    if (!resultado) return 0;
    return resultado.doceavo || 0;
};