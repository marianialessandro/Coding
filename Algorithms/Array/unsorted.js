/**
 * Ricerca in un array non ordinato
 * 
 * @param {*} target Valore da cercare
 * @param {*} nums Array in cui cercare (di default impostata a this)
 * @returns Indice dell'elemento se presente, oppure -1 se non lo è
 */
Array.prototype.search = function (target, nums = this){
    for (var i = 0; i < nums.length; i++){
        if (nums[i] == target)
            return i;
    }

    return -1;
};

/**
 * Rimuove il valore ad un dato indice
 * 
 * @param {number} index: Indice a cui rimuovere l'elemento
 * @returns {boolean}: In base all'esito dell'operazione ritorna o true o false
 */
Array.prototype.removeAtIndex = function(index){

    if (index < 0 ||index > this.length)
        return false;

    this.splice(index, 1);
    return true;
}

/**
 * Rimuove un dato valore
 * 
 * @param {*} target: Valore da rimuovere
 * @returns {boolean} Ritorna true se il valore è stato rimosso oppure non è presente, false se non è stato rimosso
 */
Array.prototype.remove = function (target){

    var index = this.search(target);

    if (index == -1)
        return true;

    return this.removeAtIndex(index);
}
