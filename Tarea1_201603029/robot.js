// Variables del UI
const movimiento = `<li class=" list-group-item d-flex justify-content-between">
        <strong>Habitación: </strong> <i>{estado}</i>
        <strong>Acción: </strong> <i>{accion}</i>
    <span class="badge bg-primary rounded-pill">{mov}</span>
</li>`;

const nodo_finalizado = `<a href="#" class="list-group-item list-group-item-action list-group-item-success">SIMULACIÓN FINALIZADA</a>`;
const nodo_iniciado = `<a href="#" class="list-group-item list-group-item-action list-group-item-primary">SIMULACIÓN INICIADA</a>`;
const nodo_renaudado = `<a href="#" class="list-group-item list-group-item-action list-group-item-warning">SIMULACIÓN RENAUDADA</a>`;
const nodo_pausado = `<a href="#" class="list-group-item list-group-item-action list-group-item-danger">SIMULACIÓN PAUSADA</a>`;
const ensuciando = `<li class="list-group-item list-group-item-dark">Ensuciando la habitación...</li>`;


// Estados de la simulacion
const INICIO = 0;
const SIMULANDO = 1;
const PAUSADO = 2;
const FINALIZADO = 3;

let movimientos = 0;

let estado_simulacion = SIMULANDO;

// Estados de la maquina
const SUCIO = 0;
const LIMPIO = 1;

// Habitaciones de la maquina
const A = 2;
const B = 3;

// Movimientos
const DERECHA = 4;
const IZQUIERDA = 5;
const LIMPIAR = 6;
const ENSUCIAR = 7;

// Estados
let estados = [
    [A, SUCIO, SUCIO, 0],   //1
    [B, SUCIO, SUCIO, 0],   //2
    [A, SUCIO, LIMPIO, 0],  //3
    [B, SUCIO, LIMPIO, 0],  //4
    [A, LIMPIO, SUCIO, 0],  //5
    [B, LIMPIO, SUCIO, 0],  //6
    [A, LIMPIO, LIMPIO, 0], //7
    [B, LIMPIO, LIMPIO, 0]  //8
];

let estado = [A, SUCIO, SUCIO];

const prepend_to_list = (str) => {
    let el = document.getElementById("movimientos");
    let temp = document.createElement('template');
    let a_str = str.trim();
    temp.innerHTML = a_str;
    temp = temp.content.firstChild;
    el.prepend(temp);
};

const aumentar_estado_actual = () => {
    for (let i = 0; i < estados.length; i++) {
        const comparacion = estados[i];

        let iguales = true;
        for (let i = 0; i < 3; i++) {
            iguales = comparacion[i] == estado[i] && iguales;
        }

        if (iguales) {
            console.log(comparacion);
            console.log(estado);
            console.log(i);

            estados[i][3]++;
            const id_label = "estado" + (i + 1);
            document.getElementById(id_label).innerHTML = estados[i][3];
            return i;
        }
    }

    return -1;
}

const reiniciar = async () => {

    estados = [
        [A, SUCIO, SUCIO, 0],
        [B, SUCIO, SUCIO, 0],
        [A, SUCIO, LIMPIO, 0],
        [B, LIMPIO, SUCIO, 0],
        [A, LIMPIO, SUCIO, 0],
        [B, LIMPIO, SUCIO, 0],
        [A, LIMPIO, LIMPIO, 0],
        [B, LIMPIO, LIMPIO, 0]
    ];

    for (let i = 1; i <= 8; i++) {
        document.getElementById("estado" + i).innerHTML = 0;
    }

    estado = [A, SUCIO, SUCIO];

    aumentar_estado_actual();
    await sleep(1000);

    movimientos = 0;

    document.getElementById("movimientos").innerHTML = "";

    prepend_to_list(nodo_iniciado)

    renaudar();
};

const finalizado = () => {
    for (let i = 0; i < estados.length; i++) {
        if (estados[i][3] < 2) {
            return false;
        }
    }
    estado_simulacion = FINALIZADO;
    estado = [A, SUCIO, SUCIO];
    prepend_to_list(nodo_finalizado)
    return true;
};

const pausar = () => {
    estado_simulacion = PAUSADO;
    document.getElementById("btnPausa").innerHTML = "Renaudar";
};

const renaudar = () => {
    estado_simulacion = SIMULANDO;
    document.getElementById("btnPausa").innerHTML = "Pausar";
};

const toggleEstadoPausa = () => {
    if (estado_simulacion === PAUSADO) {
        renaudar();
        prepend_to_list(nodo_renaudado);
    }
    else if (estado_simulacion === SIMULANDO) {
        pausar();
        prepend_to_list(nodo_pausado);
    }
}

const decidir_accion = (location, state) => {
    if (state === SUCIO) {
        return LIMPIAR;
    }
    else if (location === A) {
        return DERECHA;
    }
    else if (location === B) {
        return IZQUIERDA;
    }
}

const print_move = (habitacion_actual, accion) => {
    console.log(`Habitación: ${habitacion_actual} | Acción: ${accion}`);
    let habitacion = "A";
    if (habitacion_actual === B) {
        habitacion = "B";
    }

    let accion_str = "DESCONOCIDA";

    if (accion === LIMPIAR) {

        accion_str = "&nbsp;&nbsp;&nbsp;&nbsp;LIMPIAR&nbsp;&nbsp;&nbsp;&nbsp;";
    } else if (accion === DERECHA) {
        accion_str = "&nbsp;MOVER A DERECHA&nbsp;";
    } else if (accion === IZQUIERDA) {
        accion_str = "MOVER A IZQUIERDA";
    } else if (accion === ENSUCIAR) {
        accion_str = "&nbsp;&nbsp;&nbsp;&nbsp;ENSUCIAR HABITACIÓN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }

    let move_str = movimiento.replace("{estado}", habitacion).replace("{accion}", accion_str).replace("{mov}", ++movimientos);

    prepend_to_list(move_str);
};

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const loop = async () => {

    if (estado_simulacion != SIMULANDO) {
        return;
    }

    if (finalizado()) {
        return;
    }

    const habitacion_actual = estado[0];
    const estado_actual = habitacion_actual === A ? estado[1] : estado[2];

    const accion = decidir_accion(habitacion_actual, estado_actual);

    print_move(habitacion_actual, accion);
    aumentar_estado_actual();

    if (accion === LIMPIAR) {
        if (habitacion_actual === A) {
            estado[1] = LIMPIO;
        }
        else {
            estado[2] = LIMPIO;
        }
    }

    else if (accion === DERECHA) {
        estado[0] = B;
    }

    else if (accion === IZQUIERDA) {
        estado[0] = A;
    }

    if (estado[1] === LIMPIO && estado[2] === LIMPIO && Math.random() < 0.5) {
        //ensuciar
        estado[1] = SUCIO;
        estado[2] = SUCIO;
        prepend_to_list(ensuciando);
        print_move(habitacion_actual, ENSUCIAR);

        aumentar_estado_actual();
        return;
    }
};

(async function start() {
    aumentar_estado_actual();
    await sleep(1000);
    while (true) {
        loop();
        await sleep(100);
    }
})();