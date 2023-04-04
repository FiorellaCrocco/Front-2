// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if (!localStorage.jwt) {
  alert("No puedes ingresar")
  location.replace("./index.html")
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const url = "https://todo-api.ctd.academy/v1";
  const token = JSON.parse(localStorage.jwt);

  const formCrearTarea = document.querySelector('.nueva-tarea');
  const nuevaTarea = document.querySelector('#nuevaTarea');
  const btnuevaTarea = document.querySelector('.nuevaTarea button');
  const btnCerrarSesion = document.querySelector('#closeApp');

  obtenerNombreUsuario();
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    const cerrarSesion = confirm("Desea cerrar sesión?");
    if (cerrarSesion) {
      localStorage.clear();
      location.replace("./index.html")
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      }
    };

    console.log("Consultando el usuario");

    fetch(`${url}/users/getMe`, settings)
      .then(response => response.json())
      .then(data => {
        console.log("Nombre usuario");
        console.log(data.firstName);
        const nombreUsuario = document.querySelector('.user-info p');
        nombreUsuario.innerText = data.firstName;
      })
      .catch(error => console.log(error))
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      }
    };

    fetch(`${url}/tasks`, settings)
      .then(response => response.json())
      .then(tareas => {
        console.log("Consultando tareas");
        console.table(tareas);
        /* let tareas1 = JSON.stringify(tareas)
         localStorage.setItem("listado", tareas1)*/

        renderizarTareas(tareas);
        botonBorrarTarea();
      })
      .catch(error => console.log(error))
  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault();
    const payload = {
      description: nuevaTarea.value,
      //completed: false,
    };

    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      }
    }

    fetch(`${url}/tasks`, settings)
      .then(response => response.json())
      .then(tareas => {
        console.log("Crear nueva tarea");
        console.table(tareas);
        consultarTareas();

        formCrearTarea.reset();
      })
      .catch(error => console.log(error))
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    //consultarTareas();
    //let tareas = JSON.parse(localStorage.getItem("listado"));
 /*    const verTareaPendientes = document.querySelector('.tareas-pendientes');
    const verTareaTerminadas = document.querySelector('.tareas-terminadas');
    verTareaPendientes.innerHTML = "";
    verTareaTerminadas.innerHTML = "";

    //console.log(tareas);
    //console.log(tareas[0].description);
    //console.log(typeof tareas);

   listado.forEach((tarea) => {
      if (!tarea.completed) {
        verTareaPendientes.innerHTML += `<li class="tarea">${tarea.description} <button class="borrar" id="${tarea.id}"> <i class="fa-regular fa-trash-can"></i></button></li>`;
      } else {
        verTareaTerminadas.innerHTML += `<li class="tarea">${tarea.description} <button class="borrar" id="${tarea.id}"> <i class="fa-regular fa-trash-can"></i></button></li>`;
      }
    })*/
    const verTarea = document.querySelector('.tareas-pendientes');
    verTarea.innerHTML = '';
    let contador = 0;
    const verTareaTerminada = document.querySelector('.tareas-terminadas');
    verTareaTerminada.innerHTML = '';
    const TareaNumero = document.querySelector("#cantidad-finalizadas")

    listado.forEach(tarea => {
      let fecha = new Date(tarea.createdAt);

      if (tarea.completed) {
        contador++;
        verTareaTerminada.innerHTML += `
        <li class="tarea" data-aos="flip-up">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>`
      } else {
          verTarea.innerHTML += `
          <li class="tarea" data-aos="flip-up">
          <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
          <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <p class="timestamp">${fecha.toLocaleDateString()}<span></span></p>
            <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </li>`
      }
    })
    TareaNumero.innerText = contador;
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {





  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {

  const botonBorraTarea = document.querySelectorAll(".borrar");

    botonBorraTarea.forEach(boton => {
      boton.addEventListener("click", function (event) {

        if (confirm("Desea borrar esta tarea?")) {
          const id = event.target.id;

          const settings = {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              authorization: token,

            }
          }

          console.log("borrando tarea");

          fetch(`${url}/tasks/${id}`, settings)

            .then(reponse => {
              console.log("Eliminar Tarea");
              console.log(reponse.status);

              consultarTareas();
            })

        }
      })
    })

  };
});
