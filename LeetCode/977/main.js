/**
 * Inserisce un numero in un array ordinata
 * 
 * @param {int[]} nums  Array in cui andare ad inserire il numero
 * @param {int} target Numero da inserire
 * @returns {int[]} Array ordinata con il numero inserito
 */
function insertSorted(nums, target){
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

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    var i, results = [];

    for (i = 0; i < nums.length; i++){
        nums[i] = nums[i]**2;

        results = insertSorted(results, nums[i]);
    }

    return results;
};
