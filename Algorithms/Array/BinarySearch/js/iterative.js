function binarySearch(nums, target){
    var left = 0;
    var right = nums.length;

    while (left <= right){
        var mid = Math.floor((left+right)/2);

        if (nums[mid] == target)
            return mid;
    
        else if (nums[mid] > target)
            right = mid;
        else 
            left = mid+1;
    }

    return -1;
}

var pippo = [1,2,3,4,5,6,7,8,9];

console.log(binarySearch(pippo, 2));
