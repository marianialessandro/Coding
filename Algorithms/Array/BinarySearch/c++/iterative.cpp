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

void printVector(vector<int> & nums){
    for (int i = 0; i < nums.size(); i++){
        cout << nums[i] << " ";
    }     

    cout << endl;
}

int main(){
    
    vector<int> v;

    for (int i = 0; i < 10; i++)
        v.push_back(i);

    printVector(v);

    cout << search(v, 1);

    return 0;
}