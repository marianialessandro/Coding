/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    /**
     * Crea una matrice di dimensione data
     * 
     * @param {*} n Numero di righe
     * @param {*} m Numero di colonne
     * @returns {Array[][]} Matrice creata
     */
    var createMatrix = (n, m, val) => {
        var x = [];
    
        for (var i = 0; i < n; i++){
            x.push([]);
    
            for (var j = 0; j < m; j++){
                x[i].push(val);
            }
        }
    
        return x;
    }

    var printMatrix = (matrix) =>{
        for (var i = 0; i < matrix.length; i++){
            console.log(...matrix[i]);
        }
    }

    // Creo una matrice di una dimensione fissata numRows x s.length
    // (matrice di dimensione volutamente maggiore)

    if (numRows <= 1)   // La stringa va disposta completamente su una riga
        return s;

    // Itero sulla stringa

    var row = 0; col = 0, matrix = createMatrix(numRows, s.length, "");

    for (var i = 0; i < s.length; i++){
        if (row <= numRows-1){
            matrix[row][col] = s.charAt(i);
        }
        else{
            // row > nRows-1
            col++;
            if (row % (numRows-1) == 0){
                row = 0;
                matrix[row][col] = s.charAt(i);
                // Può ricominciare l'inserimento in colonna
            }
            else{
                // Inserimento con colonna cambiata
                matrix[((numRows-1)-(row%(numRows-1)))][col] = s.charAt(i);
            }
        }

        row++;
    }


    var result = "";

    for (var i = 0; i < matrix.length; i++){
        for (var j = 0; j < matrix[i].length; j++){
            if (matrix[i][j] != "")
                result += matrix[i][j];
        }
    }

    return result;
};