/**
 * Inserisce un valore nell'array
 * 
 * @param {*} target Valore da inserire
 */
Array.prototype.insert = function (target) {
    /**
     * Ritorna la posizione in cui inserire il numero mantenendo l'ordinamento
     * Essendo che si tratta di un set ordinato, la ricerca della posizione in cui inserire l'elemento avverrà mediante un alterazione della binary search
     * 
     * @param {int} target 
     * @param {int[]} nums 
     * @returns {int} Posizione in cui inserire l'elemento
     */
    var findInsertPosition = (target, nums = this) => {
        var left = 0, right = nums.length;
    
        while (left < right) {
            var mid = Math.floor((left+right)/2);
    
            if (nums[mid] < target) 
                left = mid + 1;
            else 
                right = mid;
        }
    
        return left;
    };

    // Sostituisce 0 elementi, all'indice pos con l'elemento target
    this.splice(findInsertPosition(target), 0, target);
};

Array.prototype.insertAtIndex = function (target, index){
    this.splice(index, 0, target);
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
 * 
 * @param {*} target: Rimuove un dato valore
 * @returns {boolean} Ritorna true se il valore è stato rimosso oppure non è presente, false se non è stato rimosso
 */
Array.prototype.remove = function (target){
    var index = this.search(target);

    if (index == -1)
        return true;

    return this.removeAtIndex(index);
}


Array.prototype.search = function (target, nums = this, left = 0, right = this.length){
    if (right == -1)
        right = nums.length;

    if (left > right)
        return -1;

    var mid = Math.floor((left+right)/2);

    if (nums[mid] == target)
        return mid;
    
    else if (nums[mid] > target)
        return search(target, nums, left, mid-1);
    else 
        return search(target, nums, mid+1, right);
};

Array.prototype.contains = function (target){
    if (this.search(target) != -1)
        return true;
    else
        return false;
};
