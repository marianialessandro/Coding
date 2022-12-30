#include <iostream>
#define N 150

using namespace std;

int main(){
    int n = 0, x = 0;
    cin >> n;

    string s;

    for (int i = 0; i < n; i++){
        cin >> s;

        int index = 0;

        if (s[0] == 'X')
            index = 1;

        if (s[index] == '+'){
            if (s[index] == s[index+1])
                x++;
        }
        else{
            if (s[index] == s[index+1])
                x--;
        }
    }

    cout << x << endl;
}