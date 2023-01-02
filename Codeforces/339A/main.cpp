#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

    string str, subStr = "";

    cin >> str;
    int pos = 0;

    vector<int> nums;

    int currIndex = 0, i = 0, startIndex = 0, endIndex = 0;

    for (i = 0; i < str.length(); i++){
        if (str[i] == '+'){
            nums.push_back(stoi(subStr));
            subStr = "";
        }
        else{
            subStr = subStr + str[i];
        }
    }
    
    nums.push_back(stoi(subStr));
    subStr = "";

    sort(nums.begin(), nums.end());

    while (nums.size() > 1){
        cout << nums.front() << "+";
        nums.erase(nums.begin());
    }

    cout << nums.front() << endl;

    return 0;
}