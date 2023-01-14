/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    if (nums.length == 1)
        return;

    /**
     * @param {int} left: estremo sinistro dell'array da ruotare
     * @param {int} right: estremo destro dell'array da ruotare (non compreso)
     */
    var reverse = (nums, left, right) => {
        if (left < 0 || right < 0)
            return;

        for (var first = left, last = right-1; first < last; first++, last--){
            var tmp = nums[last];
            nums[last] = nums[first];
            nums[first] = tmp;
        }
    }

    reverse(nums, 0, nums.length-(k%nums.length));
    reverse(nums, nums.length-(k%nums.length), nums.length);
    reverse(nums, 0, nums.length);
};
