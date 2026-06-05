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

// ---------------------------------------------------------
// FUNCIONES AGREGADAS
// ---------------------------------------------------------

function numeroALetras(num) {
    if (num === 0) return 'CERO';
    
    function unidades(num) {
        switch(num) {
            case 1: return 'UNO';
            case 2: return 'DOS';
            case 3: return 'TRES';
            case 4: return 'CUATRO';
            case 5: return 'CINCO';
            case 6: return 'SEIS';
            case 7: return 'SIETE';
            case 8: return 'OCHO';
            case 9: return 'NUEVE';
            default: return '';
        }
    }

    function decenas(num) {
        let decena = Math.floor(num/10);
        let unidad = num - (decena * 10);
        switch(decena) {
            case 1:
                switch(unidad) {
                    case 0: return 'DIEZ';
                    case 1: return 'ONCE';
                    case 2: return 'DOCE';
                    case 3: return 'TRECE';
                    case 4: return 'CATORCE';
                    case 5: return 'QUINCE';
                    default: return 'DIECI' + unidades(unidad);
                }
            case 2:
                switch(unidad) {
                    case 0: return 'VEINTE';
                    default: return 'VEINTI' + unidades(unidad);
                }
            case 3: return decenasY('TREINTA', unidad);
            case 4: return decenasY('CUARENTA', unidad);
            case 5: return decenasY('CINCUENTA', unidad);
            case 6: return decenasY('SESENTA', unidad);
            case 7: return decenasY('SETENTA', unidad);
            case 8: return decenasY('OCHENTA', unidad);
            case 9: return decenasY('NOVENTA', unidad);
            case 0: return unidades(unidad);
        }
    }

    function decenasY(strSin, numUnidades) {
        if (numUnidades > 0) return strSin + ' Y ' + unidades(numUnidades);
        return strSin;
    }

    function centenas(num) {
        let centena = Math.floor(num / 100);
        let decena = num - (centena * 100);
        switch(centena) {
            case 1:
                if (decena > 0) return 'CIENTO ' + decenas(decena);
                return 'CIEN';
            case 2: return 'DOSCIENTOS ' + decenas(decena);
            case 3: return 'TRESCIENTOS ' + decenas(decena);
            case 4: return 'CUATROCIENTOS ' + decenas(decena);
            case 5: return 'QUINIENTOS ' + decenas(decena);
            case 6: return 'SEISCIENTOS ' + decenas(decena);
            case 7: return 'SETECIENTOS ' + decenas(decena);
            case 8: return 'OCHOCIENTOS ' + decenas(decena);
            case 9: return 'NOVECIENTOS ' + decenas(decena);
        }
        return decenas(decena);
    }

    function seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor);
        let resto = num - (cientos * divisor);
        let letras = '';

        if (cientos > 0) {
            if (cientos > 1) letras = centenas(cientos) + ' ' + strPlural;
            else letras = strSingular;
        }

        return letras;
    }

    function miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor);
        let resto = num - (cientos * divisor);

        let strMiles = seccion(num, divisor, 'UN MIL', 'MIL');
        let strCentenas = centenas(resto);

        if (strMiles === '') return strCentenas;
        return strMiles + ' ' + strCentenas;
    }

    function millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor);
        let resto = num - (cientos * divisor);

        let strMillones = seccion(num, divisor, 'UN MILLON', 'MILLONES');
        let strMiles = miles(resto);

        if (strMillones === '') return strMiles;
        return strMillones + ' ' + strMiles;
    }

    return millones(num).trim();
}

function generarCuotas(total, cantidadCuotas, fechaInicial) {
    let cuotas = [];
    let montoCuota = Math.round(total / cantidadCuotas);
    // Parsear fecha, asegurando tratarla como local
    let partes = fechaInicial.split('-');
    let fecha = new Date(partes[0], partes[1] - 1, partes[2]);

    for (let i = 1; i <= cantidadCuotas; i++) {
        fecha.setMonth(fecha.getMonth() + 1);
        let anio = fecha.getFullYear();
        let mes = String(fecha.getMonth() + 1).padStart(2, '0');
        let dia = String(fecha.getDate()).padStart(2, '0');
        let fechaStr = `${anio}-${mes}-${dia}`;
        
        let monto = montoCuota;
        if (i === cantidadCuotas) {
            monto = total - (montoCuota * (cantidadCuotas - 1));
        }
        
        cuotas.push({
            numero: i,
            monto: monto,
            fechaVencimiento: fechaStr,
            estado: 'PENDIENTE'
        });
    }
    return cuotas;
}

function verificarPermiso(rolesPermitidos) {
    let rolUsuario = localStorage.getItem("rolUsuario");
    if (!rolUsuario) return false;
    rolUsuario = rolUsuario.toLowerCase();

    const criterios = Array.isArray(rolesPermitidos)
        ? rolesPermitidos
        : [rolesPermitidos];

    const valores = criterios.map(r => String(r).toLowerCase());

    const accionesPermitidas = {
        eliminar: ["administrador"],
        anular: ["administrador"]
    };

    return valores.some(valor => {
        if (accionesPermitidas[valor]) {
            return accionesPermitidas[valor].includes(rolUsuario);
        }
        return valor === rolUsuario;
    });
}