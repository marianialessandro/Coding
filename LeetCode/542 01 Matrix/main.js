/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(matrix) {
    
    let i, l, j, m, q = [];
    
    // Ricerca di tutti gli 0 nella matrice + inizializzazione della coda
    for (i = 0, l = matrix.length; i < l; i++) { 
        for ( j = 0, m = matrix[0].length; j < m; j++) {   
            if (matrix[i][j] === 0)
                q.push([i, j, 0]);
            else
                matrix[i][j] = Infinity;
        } 
    }
    
    // Vado ad inizializzare un array contenente dir per guidare gli spostamenti della BFS
    let dir = [[1,0],[0,1],[-1,0],[0,-1]];
    
    while (q.length) {
        let pos = q.shift();
        
        // write value if we find it's lower than current (like those infinities)
        if (matrix[pos[0]][pos[1]] > pos[2])
            matrix[pos[0]][pos[1]] = pos[2];
        
        // Itero sulle varie direzioni
        dir.forEach(d => {
            let next = [pos[0] + d[0], pos[1] + d[1], pos[2] + 1];

            // Verifico le coordinate 
            if (next[0] > -1 && next[0] < matrix.length && next[1] > -1 && next[1] < matrix[0].length) {
                if (matrix[next[0]][next[1]] === Infinity)
                    q.push(next);
            }
        });
    }

    return matrix;
};
