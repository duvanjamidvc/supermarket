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

Aquí tienes los pasos detallados para ejecutar el proyecto Nest.js y ejecutar las pruebas:

## Ejecutar el Proyecto Nest.js

1. **Instalación de Dependencias:**
   Asegúrate de tener Node.js y npm instalados en tu sistema. Luego, ejecuta el siguiente comando en la raíz del proyecto para instalar las dependencias:

   ```bash
   npm install
   ```

2. **Configuración de la Base de Datos:**
   Si el proyecto utiliza una base de datos, asegúrate de tenerla configurada y en ejecución. Consulta la documentación del proyecto para obtener detalles
   específicos sobre la configuración de la base de datos.

3. **Entorno de Desarrollo:**
   Para ejecutar el proyecto en un entorno de desarrollo, utiliza el siguiente comando:

   ```bash
   npm run start:dev
   ```

   Esto iniciará el servidor Nest.js en modo de desarrollo. Puedes acceder a la aplicación desde tu navegador ingresando
   a [http://localhost:3000](http://localhost:3000) u al puerto que hayas configurado.

## Ejecutar Pruebas

### Pruebas Unitarias

1. **Ejecutar Pruebas Unitarias:**
   Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

   ```bash
   npm run test
   ```

   Este comando ejecutará las pruebas unitarias del proyecto y mostrará los resultados en la consola.

### Pruebas de Cobertura

1. **Generar Informe de Cobertura:**
   Si deseas obtener un informe de cobertura, puedes ejecutar el siguiente comando:

   ```bash
   npm run test:cov
   ```

   Esto generará un informe detallado de la cobertura de las pruebas en el directorio `coverage`.

Recuerda que estos son pasos generales y pueden variar según la configuración específica del proyecto Nest.js que estás utilizando. Consulta la documentación
del proyecto para obtener información más detallada sobre la configuración y ejecución de pruebas.