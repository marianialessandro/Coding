/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function(str1, str2) {
    // Sapendo che la stringa S è il risultato della concatenazione della stringa t più volte saranno contenuti gli stessi caratteri ripetuti più volte
    if (str1+str2 != str2 + str1)
        return "";  // Anando ad aggiungere alla stringa1 un altro gruppo di caratteri si allungherà la stringa di 1 periodo. Sommando la stringa2 con la stringa1 si andrà ad allungare la stringa di n periodi. Però essendo la stringa composta dallo stesso numero di periodi devono risultare equivalenti. Qualora non lo siano la stringa t non può dividere s.

    // Sapendo che la stringa è composta da n ripetizioni della stessa stringa nello specifico è una concatenazione di più volte il periodo contenuto in str2
    // Se la porzione selezionata è la stringa che divide andando a rimuoverla più volte dalla stringa str2 questa si azzererà di dimensione, altrimenti non si azzererà.
    // Per verificare che la stringa 1 sia effettivamente composta esclusivamente da questi caratteri la stessa operazione viene effettuta anche su str1.

    result = "";

    var isValid = (period, string) => {
        if (string.length == 0)
            return true;
        // Va verificato che il periodo sia contenuto almeno in una prima parte
        if (string.startsWith(period)){
            // Richiamo nuovamente
            return isValid(period, string.slice(period.length));
        }
        else
            return false;   // Non comincia col periodo
    }

    for(let i = 1; i<=str1.length; i++){
        let current = str1.slice(0,i);
        
        if(isValid(current, str2) && isValid(current, str1))
            result = current;
    }

    return result;
};