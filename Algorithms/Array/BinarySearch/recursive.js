function binarySearch(nums, target, left = 0, right = nums.length){
    if (left > right)
        return -1;

    var mid = Math.floor((left+right)/2);

    if (nums[mid] == target)
        return mid;
    
    else if (nums[mid] > target)
        return binarySearch(nums, target, left, mid-1);
    else 
        return binarySearch(nums, target, mid+1, right);
}

var pippo = [1,2,3,4,5,6,7,8,9];

console.log(binarySearch(pippo, 2));
