document.addEventListener('DOMContentLoaded', function() {

    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');

    const spinner = document.querySelector('#spinner')

    inputEmail.addEventListener('input', validar)
    inputCC.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFormulario();
    });

    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }
    
    function validar(e) {
        if (e.target.value.trim() === '' && e.target.id !== 'cc') {  //trim elimina los espacios en blanco
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement); //muestra un msj
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if ((e.target.id === 'email' || e.target.id === 'cc') && !validarEmail(e.target.value)) {
            mostrarAlerta('El e-mail introducido no corresponde a una dirección de e-mail válida', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);
        
        //asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        //comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) { //se le agrega el parametro msj
        //comprueba si ya existe una alerta
        limpiarAlerta(referencia);
        //generar la alerta en el html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-danger', 'text-white', 'p-2', 'text-center', 'rounded-2', 'mt-2');
        //inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-danger')
        if(alerta) {
            alerta.remove();
        } 
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarEmail() {
        // Verifica si los campos de email, asunto y mensaje están llenos
        if (email.email !== '' && email.asunto !== '' && email.mensaje !== '') {
            btnSubmit.classList.remove('opacity-25');
            btnSubmit.disabled = false;
            return;
        }
        btnSubmit.classList.add('opacity-25');
        btnSubmit.disabled = true;
    }

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.remove('visually-hidden');

        setTimeout(() => {
        spinner.classList.add('visually-hidden');
        resetFormulario();

        //crear una alerta
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-success', 'col-12', 'text-white', 'p-2', 'text-center', 'rounded-3', 'uppercase', 'mt-3')
        alertaExito.textContent = 'Mensaje enviado correctamente';

        formulario.appendChild(alertaExito);

        setTimeout(() => {
            alertaExito.remove();
        },3000);

        }, 3000);
    }

    function resetFormulario() {
        //reiniciar el objeto
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }

});