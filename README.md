# 🌐 Portal Web - Universidad Tecnológica de Nayarit 

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Test Status](https://img.shields.io/badge/tests-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Sitio web completo para la **Universidad Tecnológica de Nayarit**, diseñado para ofrecer una experiencia de usuario dual: una interfaz pública, amigable e informativa para visitantes y estudiantes, y un panel de administración robusto y funcional para el personal autorizado.

## 📋 Tabla de Contenidos

1.  [Descripción del Proyecto](#-descripción-del-proyecto)
2.  [Características](#-características)
3.  [Pre-requisitos](#-pre-%2D-requisitos)
4.  [Instalación](#-instalación)
5.  [Tecnologías Utilizadas](#-tecnologías-utilizadas)
6.  [Creditos](#-creditos)
7.  [Agradecimientos y Contexto Académico](#-agradecimientos-y-contexto-académico)
8.  [Contacto](#-contacto)
9.  [Licencia](#-licencia)

---

## 📖 Descripción del Proyecto

Este proyecto busca modernizar la presencia digital de la **Universidad Tecnológica de Nayarit**. El sistema se divide en dos componentes principales:

* **Portal Público:** Una interfaz visualmente atractiva, intuitiva y amigable, diseñada para que los visitantes, aspirantes y estudiantes puedan consultar información relevante de la universidad, como la oferta educativa, noticias, eventos y datos de contacto.
* **Panel de Administración:** Una interfaz seria, segura y eficiente (protegida por autenticación) que permite al personal administrativo gestionar todo el contenido del sitio público.

---

## ✨ Características

### Vista de Visitante (Público)

* 🏠 **Inicio:** Página principal con noticias destacadas y accesos directos.
* 🎓 **Oferta Educativa:** Visualización de las carreras, planes de estudio y perfiles de egreso.
* 📰 **Noticias y Eventos:** Blog con las últimas actualizaciones de la comunidad universitaria.
* 📞 **Contacto:** Formulario de contacto e información de ubicación.
* 🖼️ **Galería:** Sección visual con fotos y videos de las instalaciones y eventos.
* 📝 Etc...

### Panel de Administrador

* 🔒 **Autenticación:** Sistema de login seguro para personal autorizado.
* 📊 **Dashboard:** Vista general con estadísticas rápidas.
* ✍️ **Gestión de Contenido:** CRUD (Crear, Leer, Actualizar, Borrar) para noticias, eventos y páginas estáticas.
* 🧑‍🏫 **Gestión Académica:** Administración de la información de las carreras y planes de estudio.
* 📝 Etc...

---

## 🛠️ Pre-requisitos

Para correr este proyecto en un entorno local, necesitarás tener instalado:

* [Node.js](https://nodejs.org/es/) (Versión 24.x o superior)
* [NPM](https://www.npmjs.com/) (generalmente se instala con Node.js)
* [Git](https://git-scm.com/)
* [MongoDB](https://www.mongodb.com/es)

---

## 🚀 Instalación

Sigue estos pasos para levantar el proyecto:

1.  **Clona el repositorio:**
    ```bash
    git clone git@github.com:Fernangel7/Portal_Universidad_Tecnologica_de_Nayarit.git
    cd Portal_Universidad_Tecnologica_de_Nayarit
    ```

2.  **Instala dependencias del Servidor:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    * Crea un archivo `.env` en la carpeta `src` basado en el archivo `.env.example`.
    * Añade tus claves de base de datos, secretos de JWT, etc.

    ```bash
    # Ejemplo de backend/.env
    PORT=5000
    MONGODB_URI='mongodb://localhost:27017/universidad'
    MONGO_DATABASE_NAME:'databasename'
    JWT_SECRET_KEY=tu_secreto_muy_seguro
    COOKIE_SECRET_KEY=tu_secreto_muy_seguro
    ```

4.  **Ejecuta el proyecto:**
    * Para iniciar el servidor:
        ```bash
        npm run start
        ```

¡Ahora deberías poder acceder al sitio en `http://localhost:5000` (o el puerto que use tu servidor)

---

## 💻 Tecnologías Utilizadas

Este proyecto fue construido usando las siguientes tecnologías:

* **Backend:** Node.js, Express.js
* **Frontend:** EJS
* **Base de Datos:** MongoDB (con Mongodb)
* **Autenticación:** JSON Web Tokens (JWT) / Cookie Parser (cookie-parser)
* **Estilos:** CSS Modules / TailwindCSS

---

## 🤝 Creditos

### Equipo Principal

* **Jose Angel Bernal Loma** - [github/Fernangel7](https://github.com/Fernangel7)
  * Full Stack Developer
  * Database Developer
    
* **Donnovan Joel Creano Rodríguez** - [github/Eryr-svg](https://github.com/Eryr-svg)
  * Frontend Developer
  * QA Tester
    
* **Diego Alejandro Duran Tapía** - [github/tdalejandro01](https://github.com/tdalejandro01)
  * UI/UX Designer
  * PoC
    
* **Victor Miguel Aranda García** - [github/]()
  * UI/UX Designer
  * PoC

---

## 🎓 Agradecimientos y Contexto Académico

Este proyecto fue desarrollado en el contexto de la **Universidad Tecnológica de Nayarit**.

* **Carrera:** Ingenieria en Tecnologias de la Informacion e Innovacion Digital
* **Materia:** Metodología No Code
* **Grupo:** IA-41
* **Profesor:** Ibarra Carlos Lizbeth Geraldine

Un agradecimiento especial a nuestro profesor y a la universidad por su guía y apoyo durante el desarrollo de este proyecto.

---

## 📫 Contacto

**Correo general:**
[bernallomajoseangel@gmail.com](mailto:bernallomajoseangel@gmail.com)

**Sitio Web:**
[http://localhost:5000](http://localhost:5000)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
