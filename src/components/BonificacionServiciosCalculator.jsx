import { useState } from 'react';
import PropTypes from 'prop-types';
import { calcularBonificacionServicios } from '../utils/bonificacionServiciosCalculator';
import './BonificacionServiciosCalculator.css';

const BonificacionServiciosCalculator = ({ formData }) => {
    const [resultado, setResultado] = useState(null);

    const calcular = () => {
        const { 
            salary, 
            representationExpenses, 
            smlv,
            startDateOther, 
            endDateOther 
        } = formData;
        
        const resultadoCalculo = calcularBonificacionServicios(
            salary,
            representationExpenses,
            smlv,
            startDateOther,
            endDateOther
        );
        
        setResultado(resultadoCalculo);
    };

    return (
        <div className="bonificacion-calculator">
            <div className="calculator-header">
                <h3>Bonificación por Servicios Prestados</h3>
                <button onClick={calcular} className="calculate-button">
                    Calcular Bonificación
                </button>
            </div>
            
            {resultado && (
                <div className="resultado-container">
                    <h4>Resultado del Cálculo</h4>
                    <div className="resultado-valor">
                        <strong>Valor Total:</strong> 
                        <span className="valor-destacado">
                            ${resultado.valor.toLocaleString('es-CO')}
                        </span>
                    </div>
                    <div className="resultado-detalles">
                        {Object.entries(resultado.detalles).map(([key, value]) => (
                            <div key={key} className="detalle-item">
                                <span className="detalle-label">{key}:</span>
                                <span className="detalle-value">
                                    {typeof value === 'number' 
                                        ? value.toLocaleString('es-CO')
                                        : value}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="resultado-info">
                        <p>
                            <strong>Nota:</strong> La bonificación se calcula con el {' '}
                            {Number(formData.salary) + Number(formData.representationExpenses) <= (formData.smlv * 2) 
                                ? '50%' 
                                : '35%'} 
                            {' '}según el salario base más gastos de representación.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

BonificacionServiciosCalculator.propTypes = {
    formData: PropTypes.shape({
        salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        representationExpenses: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        smlv: PropTypes.number.isRequired,
        startDateOther: PropTypes.string.isRequired,
        endDateOther: PropTypes.string.isRequired,
    }).isRequired
};

export default BonificacionServiciosCalculator;
