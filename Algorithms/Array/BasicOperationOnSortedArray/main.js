/**
 * Essendo un set di dati ordinato ci si avvale della binary search
 * 
 * @param {int[]} nums 
 * @param {int} target 
 */
function search(nums, target, left = 0, right = nums.length){

    if (right == -1)
        right = nums.length;

    if (left > right)
        return -1;

    var mid = Math.floor((left+right)/2);

    if (nums[mid] == target)
        return mid;
    
    else if (nums[mid] > target)
        return search(nums, target, left, mid-1);
    else 
        return search(nums, target, mid+1, right);
}

/**
 * Ritorna la posizione in cui inserire il numero mantenendo l'ordinamento
 * Essendo che si tratta di un set ordinato, la ricerca della posizione in cui inserire l'elemento avverrà mediante un alterazione della binary search
 * 
 * @param {int[]} nums 
 * @param {int} target 
 * @returns {int} Posizione in cui inserire l'elemento
 */
function findInsertPosition(nums, target){
    var left = 0, right = nums.length;

    while (left < right) {
        var mid = Math.floor((left+right)/2);

        if (nums[mid] < target) 
            left = mid + 1;
        else 
            right = mid;
    }

    return left;
}

/**
 * Inserisce un numero
 * 
 * @param {int[]} nums Array in cui inserire il numero
 * @param {int} target Numero da inserire 
 * @returns 
 */
function insert(nums, target){
    var findInsertPosition = (nums, target) => {
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

    var pos = findInsertPosition(nums, target);

    if (pos == 0)
        nums = [target].concat(nums);
    else if (pos == nums.length)
        nums.push(target);
    else{
        var x = nums.slice(0, pos);
        x.push(target);
        nums = x.concat(nums.slice(pos, nums.length));
    }

    return nums;
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
