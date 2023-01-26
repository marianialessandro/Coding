int search(int* nums, int numsSize, int target){
    int left = 0, right = numsSize-1;

    while (right-left > 1){
        int x = floor((left+right)/2);

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
}
