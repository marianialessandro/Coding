function binarySearch(nums, target){
    var left = 0;
    var right = nums.length;

    while (right-left > 1){
        var mid = Math.floor((left+right)/2);

        if (nums[mid] == target)
            return mid;
    
        else if (nums[mid] > target)
            right = mid;
        else 
            left = mid+1;
    }

    if (nums[left] == target)
        return left;
    else if (nums[right] == target)
        return right;

    return -1;
}

var pippo = [1,2,3,4,5,6,7,8,9];

console.log(binarySearch(pippo, 1));
