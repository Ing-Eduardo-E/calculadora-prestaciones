import { 
    calcularDiasLaborados, 
    validarValorNumerico,
    crearResultado 
} from './commonCalculations';

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
    try {
        // Validar y convertir valores numéricos exactos
        const salarioValidado = Math.floor(validarValorNumerico(salarioBase, 'Salario Base'));
        const gastosValidados = Math.floor(validarValorNumerico(gastosRepresentacion, 'Gastos de Representación'));
        const auxilioAlimentacionValidado = Math.floor(validarValorNumerico(auxilioAlimentacion, 'Auxilio de Alimentación'));
        const auxilioTransporteValidado = Math.floor(validarValorNumerico(auxilioTransporte, 'Auxilio de Transporte'));
        const doceavoPrimaServiciosValidado = Math.floor(validarValorNumerico(doceavoPrimaServicios, 'Doceavo Prima de Servicios'));
        const doceavoPrimaVacacionesValidado = Math.floor(validarValorNumerico(doceavoPrimaVacaciones, 'Doceavo Prima de Vacaciones'));
        const doceavoBonificacionValidado = Math.floor(validarValorNumerico(doceavoBonificacion, 'Doceavo Bonificación'));

        // Base para el cálculo
        const baseCalculo = 
            salarioValidado + 
            gastosValidados + 
            auxilioAlimentacionValidado + 
            auxilioTransporteValidado +
            doceavoPrimaServiciosValidado +
            doceavoPrimaVacacionesValidado +
            doceavoBonificacionValidado;

        // Días laborados
        const diasLaborados = calcularDiasLaborados(fechaInicio, fechaFin);
        const diasAjustados = Math.min(diasLaborados, 360);
        
        // Valor día y cálculo final
        const valorDia = Math.floor(baseCalculo / 30);
        const primaNavidad = (baseCalculo * diasAjustados) / 360;
        const valorFinal = Math.floor(primaNavidad);
        const doceavoPrima = Math.floor(valorFinal / 12);

        const proporcion = ((diasAjustados/360) * 100).toFixed(2);

        return {
            ...crearResultado(valorFinal, {
                'Base de cálculo': baseCalculo,
                'Días laborados': diasAjustados,
                'Valor día': valorDia,
                '1/12 Prima de Servicios': doceavoPrimaServiciosValidado,
                '1/12 Prima de Vacaciones': doceavoPrimaVacacionesValidado,
                '1/12 Bonificación por Servicios': doceavoBonificacionValidado,
                'Prima de Navidad': valorFinal,
                'Proporción': `${proporcion}%`
            }),
            doceavo: doceavoPrima
        };
    } catch (error) {
        console.error('Error en el cálculo de la prima de navidad:', error);
        throw error;
    }
};

export const obtenerDoceavoPrimaNavidad = (resultado) => {
    if (!resultado) return 0;
    return resultado.doceavo || 0;
};