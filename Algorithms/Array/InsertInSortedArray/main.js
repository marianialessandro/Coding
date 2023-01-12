/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {

    var left = 0, right = nums.length;

        while (left < right) {
            var mid = (left + right) >>> 1;
            if (nums[mid] < target) left = mid + 1;
            else right = mid;
        }

        return left;
};