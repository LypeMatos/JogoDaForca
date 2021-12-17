document.querySelector('form').addEventListener('submit', event => {
    console.log('formulário enviado');

    event.preventDefault();
});

//pega todos os inputs com a tag required
const camposInput = document.querySelectorAll('[required]');

function validaCampos(campo) {

    function verificaErros() {
        let foundError = false;

        for (let error in campo.validity) {
            //se não for customError
            //então verifica se tem erro
            if (campo.validity[error] && !campo.validity.valid) {
                foundError = error;
            }
        }
        return foundError;
    }

    function customMessage(typeError){
        const messages = {
            text: {
                valueMissing: 'Preencha este campo.'
            },
            email:{
                valueMissing: 'Preencha com seu e-mail.',
                typeMismatch: 'Preencha um e-mail válido.'
            },
            password:{
                valueMissing: 'Insira uma senha.'
            }
        }
        return messages[campo.type][typeError];
    }

    function setCustomMessage(message) {
        const spanErro = campo.parentNode.querySelector('span.error');
        if (message) {
            //trocar mensagem de erro
            //campo.setCustomValidity('Esse campo é obrigatório');
            spanErro.classList.add('active');
            spanErro.innerHTML = message;
        } else {
            //campo.setCustomValidity('');
            spanErro.classList.remove('active');
            spanErro.innerHTML = '';
        }
    }

    return function(){
        const erros = verificaErros();

        if (erros){
            const message = customMessage(erros);
            setCustomMessage(message);
        }else {
            setCustomMessage();
        }
    };
}

function customValidation(event) {
    const campo = event.target;
    const validation = validaCampos(campo);

    validation();
    //remove a mensagem de erro do navegador
    event.preventDefault();

    //const erros = validaCampos(campo);
}

//checa se os campos estão validos
for (let campo of camposInput) {
    campo.addEventListener('invalid', customValidation);
    campo.addEventListener('blur', customValidation);
}