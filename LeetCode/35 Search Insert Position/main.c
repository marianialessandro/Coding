int searchInsert(int* nums, int numsSize, int target){
    int left = 0, right = numsSize;

    while (left < right) {
        int mid = floor((left + right)/2);

        if (nums[mid] < target) 
            left = mid + 1;
        else 
            right = mid;
    }

    return left;
}