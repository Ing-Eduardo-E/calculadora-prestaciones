import { redondear, crearResultado } from './commonCalculations';

export const calcularBonificacionServicios = (
    salarioBase,
    gastosRepresentacion = 0,
    smlv,
    fechaInicio,
    fechaFin
) => {
    const baseCalculo = Number(salarioBase) + Number(gastosRepresentacion);
    const diasLaborados = Math.ceil(
        (new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24)
    ) + 1;
    const dosSmmlv = Number(smlv) * 2;

    let bonificacion;
    if (baseCalculo <= dosSmmlv) {
        bonificacion = (baseCalculo * diasLaborados / 360) * 0.5;
    } else {
        bonificacion = (baseCalculo * diasLaborados / 360) * 0.35;
    }

    const valorFinal = redondear(bonificacion);
    const doceavoBonificacion = redondear(valorFinal / 12);

    const resultado = crearResultado(valorFinal, {
        'Base de cálculo': baseCalculo,
        'Días laborados': `${diasLaborados}`,
        'Porcentaje aplicado': baseCalculo <= dosSmmlv ? '50%' : '35%',
        'Bonificación calculada': valorFinal,
        '1/12 Bonificación por Servicios': doceavoBonificacion
    });

    return {
        ...resultado,
        doceavo: doceavoBonificacion
    };
};

export const obtenerDoceavoBonificacion = (resultado) => {
    if (!resultado) return 0;
    return resultado.doceavo || 0;
};