import { 
    calcularDiasLaborados, 
    redondear, 
    crearResultado,
    validarValorNumerico 
} from './commonCalculations';

export const calcularPrimaVacaciones = (
    salarioBase,
    gastosRepresentacion = 0,
    auxilioAlimentacion = 0,
    auxilioTransporte = 0,
    doceavoBonificacion = 0,
    doceavoPrimaServicios = 0,
    fechaInicio,
    fechaFin
) => {
    try {
        // Validar y convertir valores numéricos exactos
        const salarioValidado = Math.floor(validarValorNumerico(salarioBase, 'Salario Base'));
        const gastosValidados = Math.floor(validarValorNumerico(gastosRepresentacion, 'Gastos de Representación'));
        const auxilioAlimentacionValidado = Math.floor(validarValorNumerico(auxilioAlimentacion, 'Auxilio de Alimentación'));
        const auxilioTransporteValidado = Math.floor(validarValorNumerico(auxilioTransporte, 'Auxilio de Transporte'));
        const doceavoBonificacionValidado = Math.floor(validarValorNumerico(doceavoBonificacion, 'Doceavo Bonificación'));
        const doceavoPrimaServiciosValidado = Math.floor(validarValorNumerico(doceavoPrimaServicios, 'Doceavo Prima de Servicios'));

        // Base para el cálculo
        const baseCalculo = 
            salarioValidado + 
            gastosValidados + 
            auxilioAlimentacionValidado + 
            auxilioTransporteValidado +
            doceavoBonificacionValidado +
            doceavoPrimaServiciosValidado;

        // Días laborados y proporción
        const diasLaborados = calcularDiasLaborados(fechaInicio, fechaFin);
        const diasBase = 15; // Días base de vacaciones
        const diasAdicionales = 6; // Sábados, domingos y festivos
        const diasTotales = diasBase + diasAdicionales;
        
        // Para año completo usar 360 días, para parcial calcular proporción
        const diasAjustados = Math.min(diasLaborados, 360);
        const proporcion = diasAjustados / 360;
        const diasProporcionales = diasTotales * proporcion;

        // Valor día y cálculo final
        const valorDia = Math.floor(baseCalculo / 30);
        const primaVacaciones = (baseCalculo * diasProporcionales) / 30;
        const valorFinal = Math.floor(primaVacaciones);
        const doceavoPrimaVacaciones = Math.floor(valorFinal / 12);

        return {
            ...crearResultado(valorFinal, {
                'Base de cálculo': baseCalculo,
                'Días laborados': diasAjustados,
                'Valor día': valorDia,
                'Días base + adicionales': diasTotales,
                'Días proporcionales': redondear(diasProporcionales, 4),
                '1/12 Bonificación por Servicios': doceavoBonificacionValidado,
                '1/12 Prima de Servicios': doceavoPrimaServiciosValidado,
                'Prima de Vacaciones': valorFinal,
                '1/12 Prima de Vacaciones': doceavoPrimaVacaciones
            }),
            doceavo: doceavoPrimaVacaciones
        };
    } catch (error) {
        console.error('Error en el cálculo de la prima de vacaciones:', error);
        throw error;
    }
};

export const obtenerDoceavoPrimaVacaciones = (resultado) => {
    if (!resultado) return 0;
    return resultado.doceavo || 0;
};