#include<iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main(){

    int n, i, sum = 0, aux=0, count = 0, k;
    cin >> n;   // Numero di monete

    vector<int> monete;

    // Monete non divise equamente -> vanno splittate in 2 uguali

    // Io prendo + soldi di modo che m1 > m2 ma con il minimo numero di monete
    for (i = 0; i < n; i++){
        cin >> k;
        monete.push_back(k);

        sum += k;
    }

    // Sorto in ordine crescente in questo modo le monete con il valore più alto saranno nelle ultime posizioni del vector

    sort(monete.begin(), monete.end());

    // A questo punto prendo monetine dal fondo (che sono quelle con il valore maggiore fin che la somma delle mie monete non risulta essere maggiore di quelle rimaste nel vector)

    sum = sum/2;

    for(i=n-1;i>=0;i--){
        
        count++;
        aux+=monete[i];     // Prendo le più grandi
        
        if(aux > sum)
            break;
    }

    cout << count << endl;

    return 0;
}
