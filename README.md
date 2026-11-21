# 🛡️ Mapa Seguro SJL (San Juan de Lurigancho)

> **Prototipo funcional, ligero y 100% estático** para la visualización, prevención y reporte ciudadano colaborativo de zonas de riesgo en el distrito de San Juan de Lurigancho (Lima, Perú).

Desarrollado para funcionar completamente del lado del cliente (**Client-Side**), sin depender de bases de datos externas ni servidores backend, optimizado para publicarse gratuitamente en **GitHub Pages**.

---

## 🌟 Características y Cumplimiento de Historias de Usuario

### 1. [EP-01] HU-01: Ingreso y Navegación Inmediata
- **Renderizado instantáneo (< 3 segundos):** El mapa carga directamente a pantalla completa centrado en San Juan de Lurigancho (`lat: -11.985`, `lng: -77.005`, `zoom: 13`) sin pantallas de carga lentas ni modales bloqueantes.
- **Navegación fluida:** Desplazamiento libre mediante arrastre con el ratón o toques táctiles, con controles de acercamiento (+ / -) y rueda del mouse.
- **Capas 100% gratuitas:** Basado en OpenStreetMap sin necesidad de API Keys ni servicios de pago.
- **Botón "Recentrar SJL":** Permite al usuario regresar con un clic al encuadre general del distrito en cualquier momento.

### 2. [EP-02] HU-02: Atajos de Navegación (Buscador con Autocompletado)
- **Barra de búsqueda flotante:** Siempre visible en la parte superior tanto en computadoras como en dispositivos móviles.
- **Sugerencias en tiempo real:** Autocompletado inteligente mientras el vecino escribe, clasificando entre *Zonas de Riesgo Identificadas* y *Puntos de Referencia / Avenidas*.
- **Desplazamiento suave (`flyTo`):** Al presionar Enter o hacer clic en un resultado, la cámara viaja suavemente hacia las coordenadas con zoom focalizado (15x - 16x) y coloca un marcador temporal con animación pulsante.
- **Manejo resiliente:** Si no se encuentran resultados, muestra un mensaje amigable con sugerencias (ej. *Bayóvar, Zárate, Próceres, Huáscar*) sin romper la interfaz.

### 3. [EP-03] HU-03: Visualización a Detalle de Zonas de Riesgo
- **Polígonos geográficos reales:** Zonas delimitadas con códigos de colores intuitivos según su peligrosidad:
  - 🔴 **Rojo (Riesgo Alto):** Ej. Alrededores de Estación Bayóvar, Puente Nuevo / Evitamiento, A.H. Huáscar.
  - 🟠 **Naranja (Riesgo Medio):** Ej. Av. Próceres de la Independencia (cdras 15-20), Canto Grande (Mercado y Paraderos), Campoy.
  - 🟡 **Amarillo (Precaución):** Ej. Zárate (Av. Gran Chimú y zona bancaria), Av. Las Flores de Primavera (cdras 30-45).
- **Leyenda interactiva flotante:** Resume el conteo de zonas y permite filtrar la vista del mapa mostrando solo zonas de nivel Alto, Medio, Precaución o Todas.
- **Ficha informativa detallada (Panel Lateral):** Al hacer clic sobre cualquier polígono, se despliega una ficha con:
  - Nombre oficial y sector vecinal.
  - Clasificación de riesgo.
  - Modalidad delictiva principal (ej. robo en mototaxis, arrebato en paraderos, marcaje en cajeros).
  - Horarios de mayor incidencia estimados.
  - Justificación y causas fundamentadas del riesgo.
  - Medidas preventivas y de autocuidado para vecinos.
  - Acceso directo para **emitir una observación ciudadana** sobre esa zona.

### 4. [EP-04] HU-04: Observaciones y Sugerencias Ciudadanas
- **Modal de Aporte Ciudadano accesible:** Botón destacado en la cabecera con dos modalidades de participación vecinal:
  1. **Observación sobre zona existente:** Selecciona una zona existente para mocionar reducir su nivel de riesgo, solicitar su retiro del mapa o actualizar información, requiriendo justificación obligatoria.
  2. **Sugerencia de nueva zona de riesgo:** Permite ingresar nombre de calle/avenida, sector, nivel de riesgo sugerido, modalidad de incidencia, horario crítico, y la opción de **capturar coordenadas haciendo clic directamente sobre el mapa**.
- **Prácticas básicas de DevSecOps y Seguridad:**
  - **Sanitización estricta contra XSS:** Todo texto ingresado es purgado de etiquetas `<script>`, `<iframe>`, atributos de eventos JavaScript y contenido malicioso antes de ser almacenado o procesado.
  - **Validación robusta:** Verificación de campos vacíos y rangos de caracteres mínimos/máximos.
- **Historial local (`localStorage`):** Cada aporte genera un código de trámite único (ej. `SJL-2026-4821`) y se conserva en el almacenamiento local del navegador para que el usuario pueda consultar sus mociones en la pestaña *"Mis Aportes"* durante su demostración o uso diario.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 18
- **Empaquetador y Entorno:** Vite 6
- **Cartografía interactiva:** Leaflet 1.9.4 (con capa base OpenStreetMap)
- **Iconografía:** Lucide React
- **Estilos:** CSS3 nativo mobile-first con variables semánticas y diseño adaptable

---

## 🚀 Guía Paso a Paso: Ejecución Local y Despliegue en GitHub Pages

Esta guía está diseñada paso a paso para ser fácil de seguir desde cero.

### Paso 1: Instalación y Prueba en Entorno Local

1. Abre tu terminal (PowerShell, Símbolo del sistema o Git Bash) en la carpeta del proyecto:
   ```bash
   cd c:\Users\fabri\Documents\GitHub\PC2-FabricioPaz-Project
   ```

2. Instala las dependencias del proyecto ejecutando:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

4. Abre tu navegador web y entra a la dirección que te indique la terminal (usualmente `http://localhost:5173`). ¡Verás la aplicación funcionando en vivo!

Para detener el servidor de desarrollo, presiona `Ctrl + C` en tu terminal.

---

### Paso 2: Crear un Nuevo Repositorio en GitHub

1. Ingresa a tu navegador e inicia sesión en tu cuenta de [GitHub](https://github.com/). Si no tienes una, regístrate gratuitamente.
2. En la esquina superior derecha, haz clic en el botón con el ícono **`+`** y selecciona **New repository** (Nuevo repositorio).
3. Configura los datos del repositorio:
   - **Repository name:** `PC2-FabricioPaz-Project` (o el nombre que prefieras).
   - **Description:** `Prototipo de Mapa Seguro SJL - Visualización de zonas de riesgo ciudadano`.
   - **Visibility:** Selecciona **Public** (Público, requisito para activar GitHub Pages gratuitamente).
   - **IMPORTANTE:** Deja desmarcadas las casillas de *Add a README file*, *Add .gitignore* y *Choose a license*, ya que el proyecto ya contiene estos archivos creados localmente.
4. Haz clic en el botón verde **Create repository**.
5. GitHub te mostrará una pantalla con la URL de tu repositorio, que tendrá un formato similar a:
   ```text
   https://github.com/TU_USUARIO/PC2-FabricioPaz-Project.git
   ```

---

### Paso 3: Inicializar Git y Subir el Código a GitHub

En tu terminal, dentro de la carpeta del proyecto, ejecuta la siguiente secuencia de comandos (reemplaza `TU_USUARIO` por tu usuario real de GitHub):

```bash
# 1. Inicializar el repositorio Git local
git init

# 2. Agregar todos los archivos al seguimiento de Git
git add .

# 3. Crear el primer commit con un mensaje descriptivo
git commit -m "feat: Implementación completa de prototipo Mapa Seguro SJL"

# 4. Establecer la rama principal como 'main'
git branch -M main

# 5. Conectar el repositorio local con tu repositorio en GitHub
git remote add origin https://github.com/TU_USUARIO/PC2-FabricioPaz-Project.git

# 6. Subir el código a GitHub
git push -u origin main
```

*(Si Git te solicita autenticación, inicia sesión con tus credenciales de GitHub o con un Personal Access Token).*

---

### Paso 4: Publicar la Aplicación en GitHub Pages

El proyecto ya viene preconfigurado con:
- `base: './'` en `vite.config.js` para asegurar que los estilos, iconos y scripts carguen perfectamente en cualquier subruta de GitHub Pages.
- El paquete `gh-pages` instalado y los scripts `predeploy` y `deploy` agregados en `package.json`.

Para publicar el sitio en internet, sigue estos pasos:

1. En tu terminal, ejecuta el comando de despliegue automático:
   ```bash
   npm run deploy
   ```
   *Este comando compila automáticamente el proyecto (`vite build` creando la carpeta `dist`) y publica el resultado en la rama `gh-pages` de tu repositorio de GitHub.*

2. Ahora ve a tu repositorio en GitHub desde el navegador:
   - Haz clic en la pestaña **Settings** (Configuración) en la barra superior del repositorio.
   - En el menú lateral izquierdo, selecciona **Pages** (dentro de la sección *Code and automation*).
   - En la sección **Build and deployment**:
     - **Source:** Debe estar seleccionado **Deploy from a branch**.
     - **Branch:** Verifica que esté seleccionada la rama **`gh-pages`** y la carpeta **`/(root)`**, luego presiona **Save** si hiciste algún cambio.

3. Espera entre 1 y 2 minutos mientras GitHub procesa el despliegue. Al recargar la página de *Settings > Pages*, verás un recuadro verde que dice:
   > **Your site is live at `https://TU_USUARIO.github.io/PC2-FabricioPaz-Project/`**

4. ¡Listo! Ya puedes abrir ese enlace en cualquier computadora o teléfono móvil y compartir el prototipo interactivo con cualquier usuario.

---

## 🔒 Consideraciones de Seguridad (DevSecOps)

- **Sanitización de Datos:** Implementada en `src/utils/security.js` para neutralizar inyecciones de código malicioso XSS antes del almacenamiento en LocalStorage.
- **Sin Credenciales Expuestas:** El mapa utiliza OpenStreetMap que no requiere llaves de API, eliminando el riesgo de fuga de credenciales o costos no deseados.
- **Client-Side Only:** No existen endpoints de servidor expuestos ni bases de datos vulnerables a inyección SQL.

---

## 👥 Soporte Comunitario de SJL
- **Policía Nacional del Perú (PNP):** Central 105
- **Central de Serenazgo San Juan de Lurigancho:** (01) 315-1515
