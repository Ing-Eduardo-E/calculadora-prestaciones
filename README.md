# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/calculadora-prestaciones.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd calculadora-prestaciones
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm run dev`

Inicia la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verlo en tu navegador.

### `npm run build`

Construye la aplicación para producción en la carpeta `dist`.\
Empaqueta React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

### `npm run preview`

Previsualiza la aplicación construida para producción.

### `npm run lint`

Ejecuta ESLint para analizar el código en busca de problemas.

## Estructura de Componentes

- `App.jsx`: Componente principal de la aplicación.
- `InputForm.jsx`: Formulario de entrada para los datos necesarios para los cálculos.
- `ResultadosCalculos.jsx`: Muestra los resultados de los cálculos.
- `Footer.jsx`: Pie de página de la aplicación.

## Utilidades

- `bonificacionServiciosCalculator.js`: Calcula la bonificación por servicios.
- `primaServiciosCalculator.js`: Calcula la prima de servicios.
- `primaVacacionesCalculator.js`: Calcula la prima de vacaciones.
- `indemnizacionVacacionesCalculator.js`: Calcula la indemnización de vacaciones.
- `bonificacionRecreacionCalculator.js`: Calcula la bonificación especial de recreación.
- `primaNavidadCalculator.js`: Calcula la prima de navidad.
- `cesantiasCalculator.js`: Calcula las cesantías.
- `interesesCesantiasCalculator.js`: Calcula los intereses a las cesantías.
- `documentGenerator.js`: Genera un documento con los resultados de los cálculos.

## Estilos

Los estilos CSS están organizados en archivos separados para cada componente en la carpeta `components`.

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
