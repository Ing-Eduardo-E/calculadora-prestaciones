import PropTypes from "prop-types";
import "./ResultadosCalculos.css";

const ResultadosCalculos = ({ resultados, datosCalculo }) => {
  if (!resultados) return null;

  return (
    <div className="resultados-container">
      <h2>Resultados del Cálculo</h2>

      <div className="datos-usados-card">
        <h3>Datos Utilizados para el Cálculo</h3>
        <div className="datos-grid">
          <div className="dato-item">
            <span className="dato-label">Salario Mínimo:</span>
            <span className="dato-valor">
              ${datosCalculo.smlv.toLocaleString("es-CO")}
            </span>
          </div>
        </div>
      </div>

      {resultados.bonificacionServicios && (
        <div className="resultado-card">
          <h3>Bonificación por Servicios</h3>
          <div className="resultado-detalles">
            {Object.entries(resultados.bonificacionServicios.detalles).map(
              ([key, value]) => (
                <div key={key} className="detalle-item">
                  <span className="detalle-label">{key}:</span>
                  <span className="detalle-valor">
                    {typeof value === "number"
                      ? `$${value.toLocaleString("es-CO")}`
                      : value}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="resultado-final">
            <span>Valor Total:</span>
            <span className="valor-destacado">
              ${resultados.bonificacionServicios.valor.toLocaleString("es-CO")}
            </span>
          </div>
        </div>
      )}

      {resultados.bonificacionRecreacion && (
        <div className="resultado-card">
          <h3>Bonificación Especial de Recreación</h3>
          <div className="resultado-detalles">
            {Object.entries(resultados.bonificacionRecreacion.detalles).map(
              ([key, value]) => (
                <div key={key} className="detalle-item">
                  <span className="detalle-label">{key}:</span>
                  <span className="detalle-valor">
                    {typeof value === "number"
                      ? `$${value.toLocaleString("es-CO")}`
                      : value}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="resultado-final">
            <span>Valor Total:</span>
            <span className="valor-destacado">
              ${resultados.bonificacionRecreacion.valor.toLocaleString("es-CO")}
            </span>
          </div>
        </div>
      )}

      {resultados.primaServicios && (
        <div className="resultado-card">
          <h3>Prima de Servicios</h3>
          <div className="resultado-detalles">
            {Object.entries(resultados.primaServicios.detalles).map(
              ([key, value]) => (
                <div key={key} className="detalle-item">
                  <span className="detalle-label">{key}:</span>
                  <span className="detalle-valor">
                    {typeof value === "number"
                      ? `$${value.toLocaleString("es-CO")}`
                      : value}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="resultado-final">
            <span>Valor Total:</span>
            <span className="valor-destacado">
              ${resultados.primaServicios.valor.toLocaleString("es-CO")}
            </span>
          </div>
        </div>
      )}

      {resultados.primaVacaciones && (
        <div className="resultado-card">
          <h3>Prima de Vacaciones</h3>
          <div className="resultado-detalles">
            {Object.entries(resultados.primaVacaciones.detalles).map(
              ([key, value]) => (
                <div key={key} className="detalle-item">
                  <span className="detalle-label">{key}:</span>
                  <span className="detalle-valor">
                    {typeof value === "number"
                      ? `$${value.toLocaleString("es-CO")}`
                      : value}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="resultado-final">
            <span>Valor Total:</span>
            <span className="valor-destacado">
              ${resultados.primaVacaciones.valor.toLocaleString("es-CO")}
            </span>
          </div>
        </div>
      )}

      {resultados.indemnizacionVacaciones && (
        <div className="resultado-card">
          <h3>Indemnización de Vacaciones</h3>
          <div className="resultado-detalles">
            {Object.entries(resultados.indemnizacionVacaciones.detalles).map(
              ([key, value]) => (
                <div key={key} className="detalle-item">
                  <span className="detalle-label">{key}:</span>
                  <span className="detalle-valor">
                    {typeof value === "number"
                      ? `$${value.toLocaleString("es-CO")}`
                      : value}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="resultado-final">
            <span>Valor Total:</span>
            <span className="valor-destacado">
              $
              {resultados.indemnizacionVacaciones.valor.toLocaleString("es-CO")}
            </span>
          </div>
        </div>
      )}

      {resultados.primaNavidad && (
        <div className="resultado-card">
          <h3>Prima de Navidad</h3>
          <div className="resultado-detalles">
            {Object.entries(resultados.primaNavidad.detalles).map(
              ([key, value]) => (
                <div key={key} className="detalle-item">
                  <span className="detalle-label">{key}:</span>
                  <span className="detalle-valor">
                    {typeof value === "number"
                      ? `$${value.toLocaleString("es-CO")}`
                      : value}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="resultado-final">
            <span>Valor Total:</span>
            <span className="valor-destacado">
              ${resultados.primaNavidad.valor.toLocaleString("es-CO")}
            </span>
          </div>
        </div>
      )}

      {resultados.cesantias && (
        <div className="resultado-card">
          <h3>Cesantías</h3>
          <div className="resultado-detalles">
            {Object.entries(resultados.cesantias.detalles).map(
              ([key, value]) => (
                <div key={key} className="detalle-item">
                  <span className="detalle-label">{key}:</span>
                  <span className="detalle-valor">
                    {typeof value === "number"
                      ? `$${value.toLocaleString("es-CO")}`
                      : value}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="resultado-final">
            <span>Valor Total:</span>
            <span className="valor-destacado">
              ${resultados.cesantias.valor.toLocaleString("es-CO")}
            </span>
          </div>
        </div>
      )}

      {resultados.interesCesantias && (
        <div className="resultado-card">
          <h3>Intereses a las Cesantías</h3>
          <div className="resultado-detalles">
            {Object.entries(resultados.interesCesantias.detalles).map(
              ([key, value]) => (
                <div key={key} className="detalle-item">
                  <span className="detalle-label">{key}:</span>
                  <span className="detalle-valor">
                    {typeof value === "number"
                      ? `$${value.toLocaleString("es-CO")}`
                      : value}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="resultado-final">
            <span>Valor Total:</span>
            <span className="valor-destacado">
              ${resultados.interesCesantias.valor.toLocaleString("es-CO")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

ResultadosCalculos.propTypes = {
  resultados: PropTypes.shape({
    bonificacionServicios: PropTypes.shape({
      valor: PropTypes.number.isRequired,
      detalles: PropTypes.object.isRequired,
    }),
    primaServicios: PropTypes.shape({
      valor: PropTypes.number.isRequired,
      detalles: PropTypes.object.isRequired,
    }),
    bonificacionRecreacion: PropTypes.shape({
      valor: PropTypes.number.isRequired,
      detalles: PropTypes.object.isRequired,
    }),
    primaVacaciones: PropTypes.shape({
      valor: PropTypes.number.isRequired,
      detalles: PropTypes.object.isRequired,
    }),
    indemnizacionVacaciones: PropTypes.shape({
      valor: PropTypes.number.isRequired,
      detalles: PropTypes.object.isRequired,
    }),
    primaNavidad: PropTypes.shape({
      valor: PropTypes.number.isRequired,
      detalles: PropTypes.object.isRequired,
      doceavo: PropTypes.number.isRequired,
    }),
    cesantias: PropTypes.shape({
      valor: PropTypes.number.isRequired,
      detalles: PropTypes.object.isRequired,
      doceavo: PropTypes.number.isRequired,
    }),
    interesCesantias: PropTypes.shape({
      valor: PropTypes.number.isRequired,
      detalles: PropTypes.object.isRequired,
    }),
  }),
  datosCalculo: PropTypes.shape({
    smlv: PropTypes.number.isRequired,
    salary: PropTypes.number.isRequired,
    representationExpenses: PropTypes.number,
    foodAllowance: PropTypes.number,
    transportAllowance: PropTypes.number,
  }).isRequired,
};

export default ResultadosCalculos;
