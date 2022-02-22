function analizarOpciones() {
    let temporada = document.getElementsByName("temporada");
    let elementos = document.getElementsByTagName("input");
    let dias = document.getElementById("cantidadDias").value;
    let precioTotal = document.getElementById("pagoTotal");
    let importeTotal = 0;
    if (temporada[1].checked) {
        let precioElementos = document.getElementsByClassName("baja");
        importeTotal = calcularPrecioElemento(elementos, precioElementos) * dias;
    } else {
        let precioElementos = document.getElementsByClassName("alta");
        importeTotal = calcularPrecioElemento(elementos, precioElementos) * dias;
    }

    //IVA
    importeTotal = importeTotal + (importeTotal*7)/100;


    //DESCUENTOS
        if(dias>10 && temporada[1].checked) {//>10 dias y temporada baja
            if (elementos[16].checked){
                importeTotal = importeTotal - 5;
                importeTotal = importeTotal - (importeTotal*20)/100;
                importeTotal = importeTotal + 5;
            }else{
                importeTotal = importeTotal - (importeTotal*20)/100;
            }
        }else if(dias>20){ //>20 dias
            if (elementos[16].checked){
                importeTotal = importeTotal - 5;
                importeTotal = importeTotal - (importeTotal*10)/100;
                importeTotal = importeTotal + 5;
            }else{
                importeTotal = importeTotal - (importeTotal*10)/100;
            }
        }

        if(elementos[1].value > 10) { //>10 adultos
            importeTotal = importeTotal - (importeTotal * 5) / 100;
        }

        precioTotal.value = importeTotal +" €";
}

function calcularPrecioElemento(elementos, precioElementos) {
    let importeElementos = 0;

    for (let i = 0; i < elementos.length - 4; i++) {
        if (i % 2 == 0 && elementos[i].checked) {
            let importeElemento = elementos[i + 1].value * parseFloat(precioElementos[(i / 2)].textContent);
            importeElementos= importeElementos + importeElemento;
        }
    }
    return importeElementos;
}

function habilitar(object) {
    let nombre = object.name;
    let inputVar = nombre.substring(7);
    let inputNumero = document.getElementById(("cantidad" + inputVar));

    if (object.checked) {
        inputNumero.disabled = false;
    } else {
        inputNumero.disabled = true;
    }

}

