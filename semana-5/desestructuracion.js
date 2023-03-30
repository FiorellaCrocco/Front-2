const nombres = ["Pedro", "Laura","Enrique","Flor"];

// const nombre1 =nombres[0];
// const nombre2 =nombres[1];
// const nombre3 =nombres[2];
// const nombre4 =nombres[3];

// Desestructuración

const [nombre1,,,nombre4] = nombres;

console.log(nombre1);
// console.log(nombre2);
// console.log(nombre3);
console.log(nombre4);

// Desestructurando objetos

const estudiante = {
    nombre:"Carlos",
    apellido:"Gutierrez",
    DNI: 25454545
}

 const {nombre,apellido,dni} = estudiante;

console.log(nome);
console.log(surname);
console.log(DNI);