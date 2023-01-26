//
//  Created by Alessandro Mariani on 26/01/23.
//

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size()-1;

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

int main(){
    
    return 0;
}