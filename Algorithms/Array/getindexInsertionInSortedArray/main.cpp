//
//  Created by Alessandro Mariani
//
#include<iostream>
#include <cmath>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int searchInsert(vector<int>& nums, int target) {
    int left = 0, right = nums.size();

    while (left < right) {
        int mid = floor((left + right)/2);

        if (nums[mid] < target) left = mid + 1;
        else right = mid;
    }

    return left;
}

int main(){
    
    return 0;
}