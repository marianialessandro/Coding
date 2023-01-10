#include<iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main(){
    
    // matrice di dimensioni n*m e contiene o un maiale o un lupo
    // maiali e lupi sono affianco e può esserci solo un maiale accanto ad un lupo. PPW
    // può però esserci un numero non precisato di maiali accanto ad un lupo

    int a, b;
    char m[10][10];

    cin >> a >> b;

    for (int i = 0; i < a; i++){
        for (int j = 0; j < b; j++)
            cin >> m[i][j];
    }

    int var = 0;
    
    for (int i = 0; i < a; i++){
        for (int j = 0; j < b; j++){
            
            if (m[i][j] == 'W'){
                // Controllo i-1 e i+1 con la solita colonna

                if(i-1>=0 && m[i-1][j]=='P'){
                    var++;
                    m[i-1][j]='.';
                }
                else if(i+1<a && m[i+1][j]=='P'){
                    var++;
                    m[i+1][j]='.';
                }
                else if(j-1>=0 && m[i][j-1]=='P'){
                    var++;
                    m[i][j-1]='.';
                }
                else if(j+1<b && m[i][j+1]=='P'){
                    var++;
                    m[i][j+1]='.';
                }
            }
        }
    }

    cout << var << endl;
    
    return 0;
}