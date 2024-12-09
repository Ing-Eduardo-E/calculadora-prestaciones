import { useState } from 'react';
// Al inicio del archivo App.jsx, junto con las demás importaciones
import { generateLiquidacionDocument } from './utils/documentGenerator.js';
import './App.css';
import Footer from './components/Footer'; // Agregamos esta importación
import InputForm from './components/InputForm';
import ResultadosCalculos from './components/ResultadosCalculos';
import { calcularBonificacionServicios } from './utils/bonificacionServiciosCalculator';
import { calcularPrimaServicios } from './utils/primaServiciosCalculator';
import { calcularPrimaVacaciones } from './utils/primaVacacionesCalculator';
import { calcularIndemnizacionVacaciones } from './utils/indemnizacionVacacionesCalculator';
import { calcularBonificacionRecreacion } from './utils/bonificacionRecreacionCalculator';
import { calcularPrimaNavidad } from './utils/primaNavidadCalculator';
import { calcularCesantias } from './utils/cesantiasCalculator';
import { calcularInteresesCesantias } from './utils/interesesCesantiasCalculator';

function App() {
  const [formData, setFormData] = useState(null);
  const [resultados, setResultados] = useState(null);

  const handleFormSubmit = (data) => {
    const processedData = {
      ...data,
      smlv: Number(data.smlv),
      salary: Number(data.salary),
      representationExpenses: Number(data.representationExpenses || 0),
      foodAllowance: Number(data.foodAllowance || 0),
      transportAllowance: Number(data.transportAllowance || 0)
    };
    setFormData(processedData);

    const newResultados = {};

    // 1. Bonificación por Servicios
    if (processedData.selectedBenefits.bonificacionServicios) {
      newResultados.bonificacionServicios = calcularBonificacionServicios(
        processedData.salary,
        processedData.representationExpenses,
        processedData.smlv,
        processedData.startDateGeneral,
        processedData.endDateGeneral
      );
    }

    // 2. Prima de Servicios
    if (processedData.selectedBenefits.primaServicios) {
      newResultados.primaServicios = calcularPrimaServicios(
        processedData.salary,
        processedData.representationExpenses,
        processedData.foodAllowance,
        processedData.transportAllowance,
        processedData.startDatePrima,
        processedData.endDatePrima,
        newResultados?.bonificacionServicios?.doceavo || 0
      );
    }

    // 3. Prima de Vacaciones
    if (processedData.selectedBenefits.primaVacaciones) {
      newResultados.primaVacaciones = calcularPrimaVacaciones(
        processedData.salary,
        processedData.representationExpenses,
        processedData.foodAllowance,
        processedData.transportAllowance,
        newResultados?.bonificacionServicios?.doceavo || 0,
        newResultados?.primaServicios?.doceavo || 0,
        processedData.startDateGeneral,
        processedData.endDateGeneral
      );
    }

    // 4. Indemnización de Vacaciones
    if (processedData.selectedBenefits.indemnizacionVacaciones) {
      newResultados.indemnizacionVacaciones = calcularIndemnizacionVacaciones(
        processedData.salary,
        processedData.representationExpenses,
        processedData.foodAllowance,
        processedData.transportAllowance,
        newResultados?.bonificacionServicios?.doceavo || 0,
        newResultados?.primaServicios?.doceavo || 0,
        processedData.startDateGeneral,
        processedData.endDateGeneral
      );
    }

    // 5. Bonificación de Recreación
    if (processedData.selectedBenefits.bonificacionRecreacion) {
      newResultados.bonificacionRecreacion = calcularBonificacionRecreacion(
        processedData.salary,
        processedData.representationExpenses,
        processedData.foodAllowance,
        processedData.transportAllowance,
        newResultados?.primaServicios?.doceavo || 0,
        newResultados?.bonificacionServicios?.doceavo || 0,
        processedData.startDateGeneral,
        processedData.endDateGeneral
      );
    }

    // 6. Prima de Navidad
    if (processedData.selectedBenefits.primaNavidad) {
      newResultados.primaNavidad = calcularPrimaNavidad(
        processedData.salary,
        processedData.representationExpenses,
        processedData.foodAllowance,
        processedData.transportAllowance,
        newResultados?.primaServicios?.doceavo || 0,
        newResultados?.primaVacaciones?.doceavo || 0,
        newResultados?.bonificacionServicios?.doceavo || 0,
        processedData.startDateGeneral,
        processedData.endDateGeneral
      );
    }

    // 7. Cesantías
    if (processedData.selectedBenefits.cesantias) {
      newResultados.cesantias = calcularCesantias(
        processedData.salary,
        processedData.representationExpenses,
        processedData.foodAllowance,
        processedData.transportAllowance,
        newResultados?.primaNavidad?.doceavo || 0,
        newResultados?.bonificacionServicios?.doceavo || 0,
        newResultados?.primaServicios?.doceavo || 0,
        newResultados?.primaVacaciones?.doceavo || 0,
        processedData.startDateGeneral,
        processedData.endDateGeneral
      );
    }

    // 8. Intereses a las Cesantías
    if (processedData.selectedBenefits.interesCesantias && newResultados.cesantias) {
      newResultados.interesCesantias = calcularInteresesCesantias(
        newResultados.cesantias.valor,
        processedData.startDateGeneral,
        processedData.endDateGeneral
      );
    }

    setResultados(newResultados);
  };

  const handleGenerateDocument = () => {
    if (resultados && formData) {
      generateLiquidacionDocument(resultados, formData);
    }
  };

  return (
    <div className="app-wrapper"> {/* Agregamos un wrapper */}
      <div className="app-container">
        <h1>Calculadora de Prestaciones Laborales</h1>
        <div className="calculator-container">
          <InputForm onSubmit={handleFormSubmit} />
          {formData && resultados && (
            <>
              <ResultadosCalculos 
                resultados={resultados}
                datosCalculo={formData}
              />
              <div className="actions-container">
                <button 
                  onClick={handleGenerateDocument}
                  className="generate-doc-button"
                >
                  Generar Documento
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;