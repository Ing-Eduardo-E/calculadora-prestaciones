// Corrige la importación al inicio del archivo
import { Document, Paragraph, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, Packer } from 'docx';
import { saveAs } from 'file-saver';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    }).format(value);
};

export const generateLiquidacionDocument = async (resultados, datosCalculo) => {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: "LIQUIDACIÓN DE PRESTACIONES SOCIALES",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    text: `Fecha de generación: ${new Date().toLocaleDateString('es-CO')}`,
                    alignment: AlignmentType.RIGHT,
                }),
                new Paragraph({
                    text: "INFORMACIÓN GENERAL",
                    heading: HeadingLevel.HEADING_2,
                }),
                createInfoTable([
                    ["Período General:", `Del ${datosCalculo.startDateGeneral} al ${datosCalculo.endDateGeneral}`],
                    ["Período Prima:", `Del ${datosCalculo.startDatePrima} al ${datosCalculo.endDatePrima}`],
                    ["Salario Base:", formatCurrency(datosCalculo.salary)],
                    ["SMLV:", formatCurrency(datosCalculo.smlv)],
                    ["Auxilio de Alimentación:", formatCurrency(datosCalculo.foodAllowance || 0)],
                    ["Auxilio de Transporte:", formatCurrency(datosCalculo.transportAllowance || 0)],
                    ["Gastos de Representación:", formatCurrency(datosCalculo.representationExpenses || 0)]
                ]),
                new Paragraph({
                    text: "DETALLE DE PRESTACIONES LIQUIDADAS",
                    heading: HeadingLevel.HEADING_2,
                }),
            ]
        }]
    });

    // Agregar secciones para cada prestación
    if (resultados.bonificacionServicios) {
        addPrestacionSection(doc, "BONIFICACIÓN POR SERVICIOS", resultados.bonificacionServicios);
    }
    if (resultados.primaServicios) {
        addPrestacionSection(doc, "PRIMA DE SERVICIOS", resultados.primaServicios);
    }
    if (resultados.primaVacaciones) {
        addPrestacionSection(doc, "PRIMA DE VACACIONES", resultados.primaVacaciones);
    }
    if (resultados.indemnizacionVacaciones) {
        addPrestacionSection(doc, "INDEMNIZACIÓN DE VACACIONES", resultados.indemnizacionVacaciones);
    }
    if (resultados.bonificacionRecreacion) {
        addPrestacionSection(doc, "BONIFICACIÓN ESPECIAL DE RECREACIÓN", resultados.bonificacionRecreacion);
    }
    if (resultados.primaNavidad) {
        addPrestacionSection(doc, "PRIMA DE NAVIDAD", resultados.primaNavidad);
    }
    if (resultados.cesantias) {
        addPrestacionSection(doc, "CESANTÍAS", resultados.cesantias);
    }
    if (resultados.interesCesantias) {
        addPrestacionSection(doc, "INTERESES A LAS CESANTÍAS", resultados.interesCesantias);
    }

    try {
        const blob = await Packer.toBlob(doc);
        saveAs(blob, "Liquidacion_Prestaciones.docx");
    } catch (error) {
        console.error("Error generando el documento:", error);
    }
};

// El resto del código sigue igual...

const createInfoTable = (data) => {
    return new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        rows: data.map(row => 
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph(row[0])],
                        width: {
                            size: 30,
                            type: WidthType.PERCENTAGE,
                        },
                    }),
                    new TableCell({
                        children: [new Paragraph(row[1])],
                    }),
                ],
            })
        ),
    });
};

const addPrestacionSection = (doc, titulo, datos) => {
    doc.addSection({
        children: [
            new Paragraph({
                text: titulo,
                heading: HeadingLevel.HEADING_3,
            }),
            new Paragraph({
                text: "Factores de liquidación:",
                heading: HeadingLevel.HEADING_4,
            }),
            createInfoTable(
                Object.entries(datos.detalles).map(([key, value]) => [
                    key,
                    typeof value === 'number' ? formatCurrency(value) : value
                ])
            ),
            new Paragraph({
                text: `Valor Total: ${formatCurrency(datos.valor)}`,
                alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
                text: "Fórmula aplicada:",
                heading: HeadingLevel.HEADING_4,
            }),
            new Paragraph({
                text: getFormula(titulo, datos),
            }),
        ],
    });
};

const getFormula = (titulo, datos) => {
    // Definir las fórmulas específicas para cada prestación
    const formulas = {
        "BONIFICACIÓN POR SERVICIOS": `(${formatCurrency(datos.detalles['Base de cálculo'])} × ${datos.detalles['Días laborados']} × ${datos.detalles['Porcentaje aplicado']}) ÷ 360`,
        "PRIMA DE SERVICIOS": `(${formatCurrency(datos.detalles['Base de cálculo'])} × ${datos.detalles['Días laborados']}) ÷ 360`,
        "PRIMA DE VACACIONES": `(${formatCurrency(datos.detalles['Base de cálculo'])} × ${datos.detalles['Días proporcionales']}) ÷ 30`,
        "CESANTÍAS": `(${formatCurrency(datos.detalles['Base de cálculo'])} × ${datos.detalles['Días laborados']}) ÷ 360`,
        "INTERESES A LAS CESANTÍAS": `(${formatCurrency(datos.detalles['Base Cesantías'])} × ${datos.detalles['Días laborados']} × 0.12) ÷ 360`
    };

    return formulas[titulo] || "Fórmula no disponible";
};