/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {

    /**
     * Essendo un set di dati ordinato ci si avvale della binary search
     * 
     * @param {int[]} nums 
     * @param {int} target 
    */
    var search = (nums, target, left = 0, right = nums.length) => {

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

    for (let i = 0; i < numbers.length; i++) {
        // Lo faccio con una binary search
        var index = search(numbers, target-numbers[i], i+1);

        if (index != -1)
            return [i+1, index+1];
    }    
};