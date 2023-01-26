/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    var left = 0;
    var right = nums.length-1;

    while (right-left > 1){
        var x = Math.floor((left+right)/2);

        if (nums[x] == target)
            return x;
        
        if (nums[x] > target)
            right = x;
        else
            left = x;
    }

    if (nums[left] == target)
        return left;
    else if (nums[right] == target)
        return right;

    return -1;
};
