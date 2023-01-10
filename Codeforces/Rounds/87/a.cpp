#include<iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

    // n stops: 1 to N in base al movimento del tram
    // i-th stop a_i passengers exist e ne salgono b_i
    // Calcolare la capacità minima del tram 

    int n, actual = 0, max = 0, var;
        // max = 0 in quanto

    cin >> n;

    for (int i = 0; i < n; i++){
        cin >> var;

        actual -= var;

        cin >> var;
        actual += var;

        if (actual > max)
            max = actual;
        
    }
        // All'ultima fermata escono tutti e non sale nessuno -> in = 0
        // Alla prima fermata non esce nessuno e salgono e basta -> exit = 0

    // Stampare la capacità minima del tram necessaria per eseguire la corsa
    cout << max << endl;

    return 0;
}