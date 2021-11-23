
var id = 1
function inc() {
    return id++
}

function sucesores(n) {
    if (n[0] == 'A')
        return [['B', n[1] + 4, inc()], ['C', n[1] + 1, inc()], ['E', n[1] + 3, inc()]]
    if (n[0] == 'B')
        return [['A', n[1] + 4, inc()], ['D', n[1] + 5, inc()], ['E', n[1] + 2, inc()]]
    if (n[0] == 'C')
        return [['A', n[1] + 1, inc()], ['D', n[1] + 3, inc()], ['E', n[1] + 2, inc()]]
    if (n[0] == 'E')
        return [['A', n[1] + 3, inc()], ['C', n[1] + 2, inc()], ['B', n[1] + 2, inc()], ['D', n[1] + 1, inc()]]
    if (n[0] == 'D')
        return []
}

function costo(start, end) {
    console.log("Iniciando")
    var dot = '{'
    var list = [[start, 0, inc()]];
    dot += list[0][2] + ' [label="' + list[0][0] + '"];'
    while (list.length > 0) {
        var current = list.shift();
        if (current[0] == end) {
            dot += '}'
            return dot
        }
        var temp = sucesores(current);
        //temp.reverse();
        temp.forEach(val => dot += val[2] + ' [label="' + val[0] + '"];' + current[2] + '--' + val[2] + ' [label="' + val[1] + '"] ;')
        list = temp.concat(list);
        list = list.sort(function (a, b) { return a[1] - b[1] });
    }
    dot += '}'

    console.log(dot);
    return dot
}

/*


// Ancho y alto de la tabla n*n
const n = 4;
const table = [
    ["A", "B", "C", "E"],
    ["F", "G", "H", "I"],
    ["J", "K", "L", "M"],
    ["N", "O", "P", "Q"]
];

function getXY(nodo) {
    for (let x in table) {
        for (let y in table[x]) {
            if (nodo == table[y][x]) {
                return { y, x };
            }
        }
    }

    return null;
}

function sucesoresDeTabla(nodo) {
    const xy = getXY(nodo);

    if (!xy) {
        return null;
    }

    const { x, y } = xy;

    const positions = {
        l: x - 1,
        r: x + 1,
        u: y - 1,
        d: y + 1
    };

    const s = [];
    for (let i = positions.l; i <= positions.r; i++) {
        if (i < 0 || i >= n) {
            continue;
        }

        for (let j = positions.u; j <= positions.d; j++) {
            if (j < 0 || j >= n) {
                continue;
            }

            const currVal = table[i][j];
            if (currVal !== nodo) {
                s.push([currVal, nodo]);
            }
        }
    }

    return s;
}

*/