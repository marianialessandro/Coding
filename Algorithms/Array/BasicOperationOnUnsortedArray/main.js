/**
 * Essendo un set di dati non ordinato, l'unico modo possibile è procedere con una linear search
 * 
 * @param {int[]} nums 
 * @param {int} target 
 */
function search(nums, target){
    for (var i = 0; i < nums.length; i++){
        if (nums[i] == target)
            return i;
    }

    return -1;
}

/**
 * Rimuove un numero
 * 
 * @param {int[]} nums Array da cui rimuovere il numero
 * @param {int} target Numero da rimuovere
 * @returns 
 */
function remove(nums, target){
    var pos = search(nums, target);

    console.log(pos);

    if (target != -1){
        var x = nums.slice(0, pos);
        nums = x.concat(nums.slice(pos+1, nums.length));
    }
    
    return nums;
}
