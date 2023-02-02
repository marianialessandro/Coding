/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function(words, order) {
    // L'indice della lettera prima deve essere più basso rispetto a quello della lettera dopo in order

    // Itero sull'array (scorro con uno di meno in quanto devo confrontare con la successiva, se no faccio index out of range)

    var code = 0;
        // 0 sono uguali, 1 sono ordinate, -1 no

    for (var i = 0; i < words.length-1; i++){
        // Itero finchè una delle due parole non finisce

        // Se avvio l'iterazione in questo for la prima parola sarà necessariamente di una lunghezza >= della seconda, quindi si può far eil confronto.
        for (var j = 0; j < words[i].length && j < words[i+1].length; j++){
            if (order.indexOf(words[i].charAt(j)) < order.indexOf(words[i+1].charAt(j))){
                code = 1;
                break;  // Controllo eventuali parole successive se presenti
            }
            else if (order.indexOf(words[i].charAt(j)) > order.indexOf(words[i+1].charAt(j))){
                return false;
            }
            else{   // I caratteri sono uguali è necessario proseguire il confronto
                code = 0;
                continue;
            }   
        }

        // Se la parola che sta prima è più corta della seconda e il confronto ha restituito sempre uguaglianza non possono essere ordinate lessicograficamente
        if (words[i].length > words[i+1].length && code == 0)
            return false;
    }

    if (code == 1 || code == 0)
        return true;
    else
        return false;
};