#include<iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

    string s;
    int n, count = 0; 
    cin >> n;
    cin >> s;

    for (int i = 1; i < n; i++){
        if (s[i-1] == s[i])
            count++;
    }

    cout << count << endl;
    
    return 0;
}