/**
 * @param {number[][]} grid Matrice che può contenere 0 che indica la cella vuota, 1 arancia fresca, 2 arancia marcia
 * @return {number}
 */

var orangesRotting = function(grid) {

    /**
     * 
     * @param {*} grid Griglia contenente lo stato delle arance
     * @param {*} row Coordinata
     * @param {*} col Coordinata
     * @returns {boolean} che indica se la cella è ammissibile o meno
     */
    var isValid = (grid, row, col) =>{

        // La cella è valida se le coordinate sono consentite e se è contenuta un arancia fresca

        return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && grid[row][col] == 1
    };

    var fresh = 0, q = [], time = -1, rotted = 0, 
    dirs = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ];
    
    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid[0].length; j++){
            if(grid[i][j] == 2) q.push([i,j])   
            if(grid[i][j] == 1) fresh++;  
        }
    }
    
    // Itero fino a che ci sono arance da processare
    while(q.length){
        var rotSize = q.length;     // È necessario andare a memorizzare il tutto perchè la dimensione della coda cambia, vengono aggiunte delle coordinate che vanno inevitabilmente ad allungare la dimensione della coda che però devono essere processate alla successiva iterazione
        
        // Itero sulla attuale dimensione della coda
        while(rotSize>0){
            var cur = q.shift();
            
            // Verifico le celle adiacenti
            for(var k=0; k<4; k++){
                var row = cur[0] + dirs[k][0];
                var col = cur[1] + dirs[k][1];
                
                if(isValid(grid, row, col)){
                    grid[row][col] = 2;
                    rotted++;
                    q.push([row, col]);
                }  
            }

            rotSize--;
        }
        
        time++;
    }

    if (rotted == fresh){
        if (time == -1)
            return 0;   // Non c'erano arance da trasformare
        else
            return time;
    }
    else
        return -1;  // Impossibile
};