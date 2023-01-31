//
//  Created by Alessandro Mariani
//
#include <stdio.h>
#include <math.h>

int search(int* nums, int numsSize, int target){
    int left = 0, right = numsSize-1;

    while (left <= right){
        int x = floor((left+right)/2);

        if (nums[x] == target)
            return x;
        
        if (nums[x] > target)
            right = x;
        else
            left = x;
    }

    return -1;
}

int main(int argc, char const *argv[]){
   
    int arr[10] = {1,2,3,4,5,6,7,8,9};

    printf("%d", search(arr, 10, 1));

    return 0;
}
