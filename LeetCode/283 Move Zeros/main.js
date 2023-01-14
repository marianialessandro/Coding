/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    for (var i = nums.length; i > 0; i--){

        var swap = true;

        for (var j = 0; j < i-1; j++){
            if (nums[j] == 0){
                var tmp = nums[j+1];
                nums[j+1] = nums[j];
                nums[j] = tmp;

                swap = false;
            }
        }

        if (swap)
            return;
    }
};