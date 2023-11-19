# Entregable - Parcial Práctico

## Estructura del Proyecto

Dentro del proyecto de Nest.js, se ha creado una carpeta denominada `collections`. Esta carpeta contiene las colecciones requeridas para la aplicación.

```plaintext
project-root
│
├── collections (Colecciones de Postman para test)
│   └── ...
│
├── openapi ( Definición de la API) 
│   └── ...
├── src
│   ├── ...
│   └── (resto de la estructura del proyecto)
│
└── ...
```

# Paso a Paso: Ejecución del Proyecto Nest.js y Pruebas

Este proyecto Nest.js proporciona una API con funcionalidades específicas. A continuación, se detallan los pasos para iniciar la aplicación y acceder a la API y
la documentación en Swagger.

## Iniciar la Aplicación

### Requisitos

- Node.js 18 o superior

1. **Instalación de Dependencias:**
   Asegúrate de tener Node.js y npm instalados en tu sistema. Luego, ejecuta el siguiente comando en la raíz del proyecto para instalar las dependencias:

   ```bash
   npm install
   ```

2. **Iniciar la Aplicación:**
   Ejecuta el siguiente comando para iniciar la aplicación:

   ```bash
   npm start
   ```

   Al iniciarse, verás un mensaje similar al siguiente:

   ```bash
    DEBUG [Main] >>> Application is running on: http://localhost:3000/api/v1
    DEBUG [Main] >>> Application documentation running on: http://localhost:3000/docs
   ```

3. **Acceder a la API:**
   La API estará disponible en [http://localhost:3000/api/v1](http://localhost:3000/api/v1).

4. **Acceder a la Documentación en Swagger:**
   La documentación en Swagger estará disponible en [http://localhost:3000/docs](http://localhost:3000/docs). Esta interfaz proporciona una descripción
   detallada de los endpoints, parámetros y respuestas de la API.

## Ejecutar Pruebas

Para ejecutar las pruebas unitarias, puedes utilizar el siguiente comando:

```bash
npm test
```

Este comando ejecutará las pruebas y mostrará los resultados en la consola.

Para generar un informe de cobertura, puedes utilizar:

```bash
npm run test:cov
```

Esto generará un informe detallado en el directorio `coverage`.

