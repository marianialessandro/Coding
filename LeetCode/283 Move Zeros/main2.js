/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {

    // Array ordinata crescente
    var zero = [];

    /**
     * Inserisce un numero in un array ordinata
     * 
     * @param {int} target Numero da inserire
     * @param {int[]} nums  Array in cui andare ad inserire il numero
     * @returns {int[]} Array ordinata con il numero inserito
     */
    var insertSorted = (target, nums = zero) => {
        var findIndex = (nums, target) =>{
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
    
        var pos = findIndex(nums, target);
    
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

    for(var i = 0; i < nums.length; i++){
        if (nums[i] == 0)
            zero = insertSorted(i);
        else if (zero.length != 0){
            // Swappo i valori
            var tmp = nums[zero[0]];
            nums[zero[0]] = nums[i];
            nums[i] = tmp;

            // Rimuovo l'indice appena usato
            zero.shift();
            // Inserisco l'indice del nuovo 0
            zero = insertSorted(i);
        }
    }

    return nums;
};
