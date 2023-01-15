#include <iostream>

using namespace std;

class Solution {
public:
    void reverseString(vector<char> & s) {
        for (int first = 0, last = s.size()-1; first<last; first++, last--)
            iter_swap(s.begin() + first, s.begin() + last);
    }
};

