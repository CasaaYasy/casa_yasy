function cerrarSesion() {
    alertify.confirm("Casa YASY S.A", "¿Quieres cerrar la sesión del usuario?",
        function(){
            localStorage.removeItem("nomUsuario"); //Elimina el nombre del usuario
            localStorage.removeItem("rolUsuario"); //Elimina el rol del usuario
            localStorage.removeItem("idUsuario");//Elimina el Id del Usuario

            sessionStorage.removeItem("sesionActiva");

            window.location.href = "index.html"; // Redirige al login
        },
        function(){
            
        }
    ).set('labels', {ok:'Sí', cancel:'No'}).set('transition', 'slide');
}

function verificarId(array, atributo, valor) {
    // Buscar si el valor ya existe en el array para el atributo especificado
    const existe = array.some(item => item[atributo] === valor);

    if (existe) {
        // Mostrar alerta de elemento existente
        alertify.error(`El valor "${valor}" ya existe para el atributo "${atributo}".`);
        return true; // Indcar que el valor ya existe
    }

    return false; // Indicar que el valor no existe
}