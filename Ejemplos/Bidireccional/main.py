def sucesores(n):
    if n == 1: return [2, 3, 5]
    elif n == 2: return [1, 4, 5]
    elif n == 3: return [1, 5, 6]
    elif n == 4: return [4, 7]
    elif n == 5: return [1, 2, 3, 7, 8]
    elif n == 6: return [3, 8]
    elif n == 7: return [4, 5, 9]
    elif n == 8: return [5, 6, 9]
    elif n == 9: return [7, 8]
    else: return None


def bidireccional(nodo_inicio, nodo_fin):
    front = [nodo_inicio]
    back = [nodo_fin]

    while front or back:
        nfront = front.pop(0)
        nback = back.pop(0)

        print(nfront)
        print(nback)

        if nfront in back and nback in front:
            if back.index(nfront) < front.index(nback):
                print(str(nfront) + " comun")
                return
            else:
                print(str(nback) + " comun")
                return
        elif nfront in back:
            print(str(nfront) + " comun")
            return
        elif nback in front:
            print(str(nback) + "comun")
            return

        temp = sucesores(nfront)
        if temp:
            front.extend(temp)
            print(front)

        temp = sucesores(nback)
        if temp:
            back.extend(temp)
            print(back)
    print("SIN SOLUCION")


bidireccional(1, 9)