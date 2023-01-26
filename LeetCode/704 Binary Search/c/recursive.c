int bS(int *nums, int left, int right, int target){
    if (left > right)
        return -1;

    int x = floor((left+right)/2);

    if (nums[x] == target)
        return x;

    if (nums[x] > target)
        return bS(nums, left, x-1, target);
    else
        return bS(nums, x+1 ,right, target);
}

int search(int* nums, int numsSize, int target){
    return bS(nums, 0, numsSize-1, target);
}