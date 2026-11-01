# Declaración de Uso de Inteligencia Artificial

**Fecha:** 1 de noviembre de 2026

**Estudiante:** Cesar Leonardo Garcia Macias (Leo)

**Objetivo:** Registro de asistencia de IA para la Actividad Integradora 2.

## 1. Herramientas y Alcance de Uso

Para el desarrollo de este proyecto se utilizó **OpenAI Codex** como asistente principal. La IA se empleó para leer el documento de requisitos (Word), proponer la estructura del proyecto, redactar el código base (HTML, CSS y JavaScript) y ejecutar pruebas de interfaz en el navegador. Adicionalmente, se utilizó Python y la librería ReportLab para la generación de archivos PDF, aunque no forman parte de las dependencias directas de la aplicación web.

## 2. Prompts Utilizados

A continuación, se detallan las instrucciones principales provistas a la IA durante el ciclo de desarrollo. Los prompts combinan directrices estructurales y de diseño funcional:

**Diseño de interfaz (UI):** «Mejora el diseño de la interfaz. Haz que los recuadros de las tareas tengan un aspecto más moderno, con sombras suaves, bordes redondeados y colores de fondo que ayuden a diferenciar visualmente los estados de cada tarea.»
**Documentación e Informe:** «Redacta la documentación del proyecto para el README.md y elabora un borrador del informe final asistido por IA, explicando la estructura del código, los componentes principales y los pasos que seguimos para completarlo.»

## 3. Errores, Límites y Ajustes Manuales

Durante la asistencia con Codex, se presentaron diversos límites técnicos y desviaciones que requirieron ajustes manuales o correcciones mediante nuevos prompts:

* **Dimensiones y diseño responsivo:** Los enmarcados de las tareas generados por la IA en respuesta al prompt de diseño tenían dimensiones erróneas y un uso de *flexbox* que rompía la vista en pantallas pequeñas. Se requirió intervenir el código y ajustar manualmente las propiedades de CSS (márgenes, *padding* y anchos máximos) para lograr la visualización correcta.
* **Tono y redacción del informe:** El borrador del informe generado por Codex estaba redactado en tercera persona y utilizaba un exceso de tecnicismos informáticos (arquitectura de componentes, ciclos de renderizado) que no correspondían al nivel académico requerido. El estudiante tuvo que reescribir gran parte del texto manualmente para adaptarlo a un tono personal, claro y acorde a los criterios de la rúbrica.
* **Limitaciones en pruebas del DOM:** La primera implementación de borrado incluía una alerta emergente (`confirm()`) que bloqueaba el control del navegador integrado de la IA, provocando tiempos de espera agotados. Se solicitó a la IA simplificar la interacción a un borrado directo.
* **Gestión de archivos simultáneos:** Un intento de la IA por actualizar el archivo `README.md` falló por enviar dos operaciones de escritura simultáneas sobre la misma ruta. Se solucionó solicitando a la herramienta que ejecutara las escrituras de forma secuencial.

## 4. Originalidad y Autoría

El código base de la aplicación fue hecho desde cero. Las fuentes externas y referencias empleadas por la IA (como MDN Web Docs) se encuentran documentadas en el `README.md`. Todo el código autogenerado ha pasado por la revisión, ejecución local y ajustes manuales de diseño y redacción por parte del estudiante, quien asume la autoría del ensamble y presentación final del proyecto.