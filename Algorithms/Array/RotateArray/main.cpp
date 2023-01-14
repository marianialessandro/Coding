#include<iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

void printVector(vector<int> & nums){
    for (auto num: nums) 
        std::cout << num << " ";

    cout << endl;
}

void reverse(vector<int> &v, int left, int right){
    if (left < 0 || right < 0)
        return;
    for (int first = left, last = right-1; first<last; first++, last--)
       iter_swap(v.begin() + first, v.begin() + last);
    
}

void rotateVector(vector<int> & nums, int k){
    reverse(nums, 0, nums.size()-(k%nums.size()));
    reverse(nums, nums.size()-(k%nums.size()), nums.size());
    reverse(nums, 0, nums.size());
}

int main(){

    vector<int> v;

    for (int i = 1; i <= 7; i++)
        v.push_back(i);

    printVector(v);

    rotateVector(v, 3);

    printVector(v);
    
    cout << endl;
    
    return 0;
}