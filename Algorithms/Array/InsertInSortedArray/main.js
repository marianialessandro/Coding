/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {

    // Per velocizzare controllo se l'inserimento va effettuato in testa o in coda

    if (nums[0] >= target)
        return 0;
    else if (nums[nums.length-1] <= target)
        return nums.length;
    else{
        var left = 0, right = nums.length;

        while (left < right) {
            var mid = (left + right) >>> 1;
            if (nums[mid] < target) left = mid + 1;
            else right = mid;
        }

        return left;
    }
};