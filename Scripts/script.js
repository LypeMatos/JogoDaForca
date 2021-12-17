let categoriaPalavras = {
    FRUTA: ['BANANA', 'LARANJA', 'UVA'],
    CARRO: ['GOL', 'FUSION', 'CAMARO'],
    BANDA: ['NIGHTWISH', 'SABATON', 'EPICA']
}

let arrayDeCategorias = Object.keys(categoriaPalavras);
let labelCategoria = document.getElementById('categoria');
let labelPalavra = document.getElementById('palavra');
let inputLetra = document.getElementById('txtletra');
//let btnLetra = document.getElementById('botao');
let exibeLetraErrada = document.querySelector('#letraErrada');
let arrayLetrasErradas = [];
let categoriaSorteada = '';
let palavraSorteada;
let chances = 5;

function sorteiaCategoria() {
    categoriaSorteada = arrayDeCategorias;
    let indiceCategoria = Math.floor(Math.random() * categoriaSorteada.length);
    labelCategoria.innerHTML = categoriaSorteada[indiceCategoria];
    
}

function sorteiaPalavra() {
    let palavraOculta = '';
    let palavraAux = categoriaPalavras[labelCategoria.innerHTML];
    let indicePalavra = Math.floor(Math.random() * palavraAux.length);
    palavraSorteada = palavraAux[indicePalavra];
    for (let index = 0; index < palavraSorteada.length; index++) {
        palavraOculta += '-';
    }
    labelPalavra.innerHTML = palavraOculta;
}

function retornaLetra(e) {
    e = inputLetra.value;
    checaLetra(e.toUpperCase());
    if (!palavraSorteada.includes(e.toUpperCase())) {
        chances--;
        arrayLetrasErradas.push(e);
        exibeLetraErrada.innerHTML += e.toUpperCase();
        if (chances <= 0) {
            alert('Perdeu');
            inputLetra.setAttribute('disabled', true);
            btnLetra.removeEventListener('click', retornaLetra);            
        }
    }else if (palavraSorteada === labelPalavra.innerHTML){
        alert('you win!');
        document.location.reload(true);
    }
}

function checaLetra(letra) {
    let palavraAux = '';
    for (let index = 0; index < palavraSorteada.length; index++) {
        if (palavraSorteada[index] == letra) {
            palavraAux += letra;
            inputLetra.value = '';
            inputLetra.focus();
        } else if (labelPalavra.innerHTML[index] != '-') {
            palavraAux += labelPalavra.innerHTML[index];
            inputLetra.value = '';
            inputLetra.focus();
        } else {
            palavraAux += '-';
            inputLetra.value = '';
            inputLetra.focus();
        }
    }
    labelPalavra.innerHTML = palavraAux;
}

window.addEventListener('load', sorteiaCategoria);
window.addEventListener('load', sorteiaPalavra);
window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        retornaLetra();
    }
})
//btnLetra.addEventListener('click', retornaLetra);