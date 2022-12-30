#include <iostream>

using namespace std;

bool isNumber(string s){
    for (char const c : s) {
        if (isdigit(c) == 1) 
            return true;
    }

    return false;
}

int main(){
    string s;
    int n; 

    cin >> n;

    while (n--){
        cin >> s;

        if (isNumber(s) == false){
            if (s.length() > 10){
                cout << s[0] << (s.length()-2) << s[s.length()-1] << endl;
            }
            else{
                cout << s << endl;
            }
        }
    }

    return 0;
}
