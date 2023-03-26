const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const telefone = document.getElementById('telefone')
const button = document.getElementById('button')
const message = document.getElementById('mensage')

button.addEventListener("click", checkInputs)

function checkInputs() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const telefoneValue = telefone.value;

if ( usernameValue == "") {
    setErrorFor(username, 'Erro: Nome e Sobrenome é obrigatório.');
} else {
    setSuccessFor(username);
}

if (emailValue == "") {
    setErrorFor(email, 'Erro: O Email é obrigatório.');
    return false
}else if (!checkEmail(emailValue)) {
    setErrorFor(email, 'Erro: Por favor insira um E-mail válido.');
    return false
}else{
    setSuccessFor(email);
}

if (telefoneValue == "") {
    setErrorFor(telefone, 'Erro: Digite um Telefone válido');
    return false
}else{
    setSuccessFor(telefone);
}


const formControl = form.querySelectorAll('.form-control')

    const formIsValid = [...formControl].every(formControl =>{
        return (formControl.className = "form-control success");
    });

    if (formIsValid) {
        console.log("O formulário está 100% valido.");
    }

    enviarParaWhatsApp()
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

// Adicionar a mensagem de erro
small.innerText = message;

// Adicionar a classe de erro
formControl.className = "form-control error";
}

function setSuccessFor(input) {
const formControl = input.parentElement;

// Adicionar a classe de sucesso
formControl.className = "form-control success";
}


function checkEmail(email) {
return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email);
}

function validarFormulario() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');

    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });

    return isValid;
}

function enviarFormulario() {
    if (validarFormulario()) {
        enviarParaWhatsApp();
    }
}

// Função de máscara de telefone
function mascaraTelefone(telefone) {
    const texto = telefone.value;
    const textoApenasNumeros = texto.replace(/\D/g, '').substring(0, 11);

    let telefoneFormatado = textoApenasNumeros.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    if (textoApenasNumeros.length < 11) {
        telefoneFormatado = textoApenasNumeros.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }

    telefone.value = telefoneFormatado;
}

// Adicionar evento de input ao campo de telefone
const campoTelefone = document.getElementById('telefone');
campoTelefone.addEventListener('input', function () {
    mascaraTelefone(this);
});

function enviarParaWhatsApp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensage = document.getElementById('mensage').value;

    const texto = `Nome: ${username}\nE-mail: ${email}\nTelefone: ${telefone}\nMensagem: ${mensage}`;
    const textoCodificado = encodeURIComponent(texto);
    const numeroWhatsApp = '5581997518509';
    const url = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

    window.open(url, '_blank');
}