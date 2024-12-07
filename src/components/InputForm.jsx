import { useState } from 'react';
import PropTypes from 'prop-types';
import './InputForm.css';

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Fechas para prima de servicios
    startDatePrima: '',
    endDatePrima: '',
    // Fechas para las demás prestaciones
    startDateGeneral: '',
    endDateGeneral: '',
    // Datos salariales
    smlv: '',
    salary: '',
    representationExpenses: '',
    foodAllowance: '',
    transportAllowance: '',
    // Prestaciones seleccionadas
    selectedBenefits: {
      primaServicios: false,
      primaNavidad: false,
      bonificacionServicios: false,
      primaVacaciones: false,
      indemnizacionVacaciones: false,
      cesantias: false,
      interesCesantias: false,
      bonificacionRecreacion: false
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        selectedBenefits: {
          ...prevState.selectedBenefits,
          [name]: checked
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="date-section">
        <h3>Fechas para Prima de Servicios</h3>
        <div className="date-group">
          <div className="form-group">
            <label htmlFor="startDatePrima">Fecha de Inicio:</label>
            <input
              type="date"
              id="startDatePrima"
              name="startDatePrima"
              value={formData.startDatePrima}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDatePrima">Fecha Final:</label>
            <input
              type="date"
              id="endDatePrima"
              name="endDatePrima"
              value={formData.endDatePrima}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="date-section">
        <h3>Fechas para Demás Prestaciones</h3>
        <div className="date-group">
          <div className="form-group">
            <label htmlFor="startDateGeneral">Fecha de Inicio:</label>
            <input
              type="date"
              id="startDateGeneral"
              name="startDateGeneral"
              value={formData.startDateGeneral}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDateGeneral">Fecha Final:</label>
            <input
              type="date"
              id="endDateGeneral"
              name="endDateGeneral"
              value={formData.endDateGeneral}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="salary-section">
        <h3>Información Salarial</h3>
        <div className="form-group">
          <label htmlFor="smlv">Salario Mínimo Legal Vigente:</label>
          <input
            type="number"
            id="smlv"
            name="smlv"
            value={formData.smlv}
            onChange={handleChange}
            placeholder="Ingrese el SMLV actual"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salario del Empleado:</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Ingrese el salario del empleado"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="representationExpenses">Gastos de Representación:</label>
          <input
            type="number"
            id="representationExpenses"
            name="representationExpenses"
            value={formData.representationExpenses}
            onChange={handleChange}
            placeholder="Ingrese los gastos de representación"
          />
        </div>

        <div className="form-group">
          <label htmlFor="foodAllowance">Auxilio de Alimentación:</label>
          <input
            type="number"
            id="foodAllowance"
            name="foodAllowance"
            value={formData.foodAllowance}
            onChange={handleChange}
            placeholder="Ingrese el auxilio de alimentación"
          />
        </div>

        <div className="form-group">
          <label htmlFor="transportAllowance">Auxilio de Transporte:</label>
          <input
            type="number"
            id="transportAllowance"
            name="transportAllowance"
            value={formData.transportAllowance}
            onChange={handleChange}
            placeholder="Ingrese el auxilio de transporte"
          />
        </div>
      </div>

      <div className="benefits-section">
        <h3>Seleccione las Prestaciones a Calcular</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <input
              type="checkbox"
              id="primaServicios"
              name="primaServicios"
              checked={formData.selectedBenefits.primaServicios}
              onChange={handleChange}
            />
            <label htmlFor="primaServicios">Prima de Servicios</label>
          </div>

          <div className="benefit-item">
            <input
              type="checkbox"
              id="primaNavidad"
              name="primaNavidad"
              checked={formData.selectedBenefits.primaNavidad}
              onChange={handleChange}
            />
            <label htmlFor="primaNavidad">Prima de Navidad</label>
          </div>

          <div className="benefit-item">
            <input
              type="checkbox"
              id="bonificacionServicios"
              name="bonificacionServicios"
              checked={formData.selectedBenefits.bonificacionServicios}
              onChange={handleChange}
            />
            <label htmlFor="bonificacionServicios">Bonificación por Servicios</label>
          </div>

          <div className="benefit-item">
            <input
              type="checkbox"
              id="primaVacaciones"
              name="primaVacaciones"
              checked={formData.selectedBenefits.primaVacaciones}
              onChange={handleChange}
            />
            <label htmlFor="primaVacaciones">Prima de Vacaciones</label>
          </div>

          <div className="benefit-item">
            <input
              type="checkbox"
              id="indemnizacionVacaciones"
              name="indemnizacionVacaciones"
              checked={formData.selectedBenefits.indemnizacionVacaciones}
              onChange={handleChange}
            />
            <label htmlFor="indemnizacionVacaciones">Indemnización de Vacaciones</label>
          </div>

          <div className="benefit-item">
            <input
              type="checkbox"
              id="cesantias"
              name="cesantias"
              checked={formData.selectedBenefits.cesantias}
              onChange={handleChange}
            />
            <label htmlFor="cesantias">Cesantías</label>
          </div>

          <div className="benefit-item">
            <input
              type="checkbox"
              id="interesCesantias"
              name="interesCesantias"
              checked={formData.selectedBenefits.interesCesantias}
              onChange={handleChange}
            />
            <label htmlFor="interesCesantias">Intereses a las Cesantías</label>
          </div>

          <div className="benefit-item">
            <input
              type="checkbox"
              id="bonificacionRecreacion"
              name="bonificacionRecreacion"
              checked={formData.selectedBenefits.bonificacionRecreacion}
              onChange={handleChange}
            />
            <label htmlFor="bonificacionRecreacion">Bonificación Especial de Recreación</label>
          </div>
        </div>
      </div>

      <button type="submit" className="submit-button">
        Calcular Prestaciones
      </button>
    </form>
  );
};

InputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default InputForm;