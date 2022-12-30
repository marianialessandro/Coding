#include <iostream>

using namespace std;

int main(){
    int w = 0;

    cin >> w;

    cout << ((w <= 2 || w % 2) ? "NO" : "YES") << endl;

    return 0;
}