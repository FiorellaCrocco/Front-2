let edad = parseInt(prompt("Ingrese su edad"));

if(edad>18){
console.log("Es mayor de edad");
}else if(isNaN(edad)){
    console.log("Ingrese un numero");
} else {
    console.log("Es menor de edad");
}

