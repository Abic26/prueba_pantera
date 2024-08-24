# Prueba Tecnica Pantera

Proyecto realizado en el framework Vue.js + vite para gestionar y visualizar post.
## Tabla de Contenidos

- [Timeline](#timeline)
- [Instalación](#instalación)
- [Uso](#uso)
- [Despliegue](#despliegue)
- [Contribución](#Contribución)
- [Tecnologias](#Tecnologias)
- [Créditos](#créditos)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Timeline

Gestion de tiempo en el que se creo el componente y sus requerimientos
- Timelie: [Ver Timeline](https://docs.google.com/spreadsheets/d/1Maz6iDRzKnzoeJYMOjb5ChTtu_b6FcuhDhO28IquRj8/edit?usp=sharing)


## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación:

1. Clonar el proyecto 
```sh
git clone https://github.com/Abic26/prueba_pantera.git
```
2. Seleccione donde descargo el proyecto:
```sh
cd ejemplo/ejemplo
```
3. Instala las dependencias:
```sh
npm install
```
4. Abrir el proyecto en el editor de código de preferencia, se recomienda Vsc (Visual Studio Code):
```sh
code .
```
5. inicializa el proyecto en local
```sh
npm run dev
```
## Uso

1. Al inicializar el proyecto en local ingresaras a la pagina principal, se dirigue al componente de crear post.

2. se crea el post con el mensaje a publicar, se puede crear con imagenes, videos, audios.

3. se da click en el boton post y se visualizara el post a publicar con el arhicvo seleccionado "si se selecciona"

4. en el modal se da post y se podra observar el post publicado

### Agregar

se puede agregar varias imagenes al mismo tiempó, se puede agregar videos o audios, se utilizo el localstorage para guardar el post y tener persistencia del mismo

### Eliminar

antes de publicar el post puede eliminar el archivo seleccionado

## Despliegue

se hizo un despligue del componente para visualizar e interactuar con el mismo, se realizo el despliegue con vercel
- Sitio web: [Component post](https://prueba-pantera.vercel.app/)

## Contribución

Cómo contribuir al proyecto.
1. Clonar el proyecto:
```sh
git clone https://github.com/Abic26/prueba_pantera.git
```
2. Crea una rama para la contribución: 
```sh
git checkout -b feature/nueva-funcionalidad
```
3. Realice sus cambios y realiza los commits: 
```sh
git add .
git commit -m "Agrega nueva funcionalidad"
```
4. Realize push con sus nuevos cambios: 
```sh
git push origin feature/nueva-funcionalidad
```

## Tecnologias

- Para este proyecto se utilzo vue.js para el frontend, con el uso de tailwind para los estilos, primevue para componentes, botones, inputs, iconos, etc, para la logica se utilizo javascript.

## Créditos

Este proyecto fue creado por [Andres Felipe Lopez S. "Abic26"](https://github.com/Abic26).

## Licencia

Este proyecto está bajo la Licencia MIT, lo que significa que puedes:

- Usar el código en tus proyectos personales o comerciales.
- Modificar el código para satisfacer tus necesidades.
- Distribuir el código modificado o sin modificar.
- Incluir el código en otros proyectos (con los atributos adecuados).

**¡No tienes que pedir permiso!** Solo asegúrate de incluir el aviso de derechos de autor y la declaración de la Licencia MIT en las copias de tu proyecto.

## Contacto

Si tienes preguntas, sugerencias o comentarios sobre este proyecto, no dudes en ponerte en contacto. Puedes visitarme a través de:

- Correo electrónico: [abicsupa@gmail.com](mailto:abicsupa@gmail.com)
- Sitio web: [Abic26_page](https://abicdev.vercel.app/)

¡Espero escuchar tus pensamientos y opiniones!
