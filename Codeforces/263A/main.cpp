#include <iostream>

using namespace std;

int main(){

    int m[5][5], cI, cJ, count = 0;

    for (int i = 0; i < 5; i++){
        for (int j = 0; j < 5; j++){
            cin >> m[i][j];

            if (m[i][j] == 1){
                cI = i;
                cJ = j;
            }
        }
    }

    // Swappo le righe fino a che l'uno non si trova nella riga 3 (indice 2)
    
    int tmp[5]; // Array di appoggio per la copia delle righe e delle colonne

    while (cI != 2){
        if (cI > 2){    // cI è più grande quindi la riga ha un indice maggiore del 2 (è sotto rispetto al mezzo)
            for (int i = 0; i < 5; i++){
                tmp[i] = m[cI][i];
            }

            // Ricopio la riga sopra nella riga cI
            for (int i = 0; i < 5; i++){
                m[cI][i] = m[cI-1][i];
            }

            cI--;   // Decremento (quindi mi sposto in su)

            for (int i = 0; i < 5; i++){
                m[cI][i] = tmp[i];
            }
        }
        else{   // cI è più piccolo quindi la riga ha un indice minore del 2 (è sopra rispetto al mezzo)
            for (int i = 0; i < 5; i++){
                tmp[i] = m[cI][i];
            }

            // Ricopio la riga sopra nella riga cI
            for (int i = 0; i < 5; i++){
                m[cI][i] = m[cI-1][i];
            }

            cI++;   // Incremento (quindi mi sposto in giù)

            for (int i = 0; i < 5; i++){
                m[cI][i] = tmp[i];
            }
        }

        count++;
    }

    while (cJ != 2){
        if (cJ > 2){    // cI è più grande quindi la riga ha un indice maggiore del 2 (è sotto rispetto al mezzo)
            for (int i = 0; i < 5; i++){
                tmp[i] = m[i][cJ];
            }

            // Ricopio la riga sopra nella riga cI
            for (int i = 0; i < 5; i++){
                m[i][cJ] = m[i][cJ-1];
            }

            cJ--;   // Decremento (quindi mi sposto a sinistra)

            for (int i = 0; i < 5; i++){
                m[i][cJ] = tmp[i];
            }
        }
        else{   // cI è più piccolo quindi la riga ha un indice minore del 2 (è sopra rispetto al mezzo)
            for (int i = 0; i < 5; i++){
                tmp[i] = m[i][cJ];
            }

            // Ricopio la riga sopra nella riga cI
            for (int i = 0; i < 5; i++){
                m[i][cJ] = m[i][cJ-1];
            }

            cJ++;   // Decremento (quindi mi sposto a sinistra)

            for (int i = 0; i < 5; i++){
                m[i][cJ] = tmp[i];
            }
        }

        count++;
    }

    cout << count << endl;

    return 0;
}