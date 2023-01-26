//
//  Created by Alessandro Mariani on 26/01/23.
//

#include <stdio.h>
#include <math.h>

int bS(int *nums, int left, int right, int target){
    if (left > right)
        return -1;

    int x = floor((left+right)/2);
    
    printf("%d", left);
    printf("%d", right);
    printf("%d", x);

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

int main(int argc, const char * argv[]) {
    // insert code here...
    
    int x[6] = {-1,0,3,5,9,12};
    int v = search(x, 6, 9);
    
    printf("%d", v);
    
    return 0;
}
