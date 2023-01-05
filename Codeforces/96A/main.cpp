#include<iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main(){
    
    bool flag = true;
    string s;
    // cout << "INSERIRE STRINGA: " << endl;
    cin >> s;

    while (s.length() >= 7){

        flag = true;

        for (int i = 1; i < 7; i++){
            if (s[i] != s[0]){
                flag = false;
                break;
            }
        }

        if (flag){
            cout << "YES" << endl;
            return 0;
        }
        else
            s.erase(s.begin());
    }

    cout << "NO" << endl;
    return 0;
}
