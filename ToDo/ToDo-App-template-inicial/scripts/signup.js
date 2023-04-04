window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */

    const form = document.forms[0];
    const nombre = document.querySelector("#inputNombre");
    const apellido = document.querySelector("#inputApellido");
    const email = document.querySelector("#inputEmail");
    const password = document.querySelector("#inputPassword");
    const Repetirpassword = document.querySelector("#inputPasswordRepetida");

    const url = "https://todo-api.ctd.academy/v1";
    
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const payload = {
            firstName: nombre.value,
            lastName: apellido.value,
            email: email.value,
            password: password.value,
            // Repetirpassword: password.value,
        }
        //configuramos el request del Fetch
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //lanzamos la consulta de login a la API
        realizarRegister(settings);
        form.reset();
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        console.log("lanzando la consutla a la API");

        fetch(`${url}/users`, settings)
            .then(response => {
                if (response.ok != true) {
                    alert("Alguno de los datos es incorrecto")
                }
                return response.json();
            })
            .then(data => {
                console.log("Promesa cumplida");
                console.log(data);
                if (data.jwt) {
                    localStorage.setItem("jwt", JSON.stringify(data.jwt));
                    location.replace("./index.html");
                }

            })
            .catch(error => {
                console.log("Promesa rechazada");
                console.log(error);
            })
    };
});