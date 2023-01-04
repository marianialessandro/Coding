var detectCapitalUse = function(word) {
    // Chekko se tutta la stringa è capital con la funzione. Se si ritorno true
    // Controllo se è tutta minuscola se è si ritorno true
    // Controllo tutta la stringa: la prima deve essere maiuscola le altre no. quindi controllo la prima, la tolgo e guardo che siano tutte minuscole. se no ritorno false

    if (word == word.toUpperCase() || word == word.toLowerCase())
        return true;
    
    if (word.charAt(0) == (word.charAt(0)).toUpperCase() && (word.slice(1)).toLowerCase() == word.slice(1))
        return true;
    else
        return false;
};