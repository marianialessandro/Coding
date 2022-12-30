#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main(){
    /*
        si pone n=1

        si confrontano i simboli nella posizione n-esima della stringa:
        
        se una delle due stringhe non possiede l'elemento n-esimo, allora è minore dell'altra e l'algoritmo termina
        se entrambe le stringhe non possiedono l'elemento n-esimo, allora sono uguali e l'algoritmo termina
        se i simboli sono uguali, si passa alla posizione successiva della stringa (n→n+1)
        se questi sono diversi, il loro ordine è l'ordine delle stringhe
    */

    string s1, s2;

    cin >> s1;
    cin >> s2;

    if (s1.length() == s1.length()){
        // Procedere con la comparazione

        for_each(
            s1.begin(),
            s1.end(),
            [](char & c) {
            c = ::tolower(c);
        });

        for_each(
            s2.begin(),
            s2.end(),
            [](char & c) {
            c = ::tolower(c);
        });

        if (s1 == s2){
            cout << "0" << endl;
            return 0;
        }
        else{
            // Necessario il confronto
            for (int i = 0; i < s2.length(); i++){
                if (s1[i] > s2[i]){
                    cout << "1" << endl;
                    return 0;
                }
                
                if (s2[i] > s1[i]){
                    cout << "-1" << endl;
                    return 0;
                }
            }
        }
    }
    // Capire se va ritornato qualcosa altrimenti

    return 0;
}
