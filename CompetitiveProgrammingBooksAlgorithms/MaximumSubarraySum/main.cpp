#include<iostream> 
#include<algorithm>

#define N 10

using namespace std; 

int v1(int *v){
    /*
        i e j servono per limitare la lunghezza dell'array: nello specifico con i si punta l'estremo sinistro, con j l'estremo destro (inizialmente i e j coincideranno quindi l'array sarà di un solo elemento) e successivamente con k si itera sul vettore e si verifica qual'è la somma migliore fino ad ora ottenuta
    */

    int best = 0;

    for (int i = 0; i < N; i++){
        for (int j = i; j < N; j++){
            int sum = 0;

            for (int k = i; k <= j; k++){
                sum += v[k];
            }

            best = max(best, sum);
        }
    }

    return best;
}

int v2(int *v){
    /*
        Nella 1° versione si definisce l'indice sinistro, il destro e si itera. Inevitabilmente si leggeranno più volte gli stessi valori in quanto andare ad aumentare l'indice destro di 1 obbliga ri scorrersi tutta l'array.
        Si può quindi ottenere una versione migliore andando a sommare solo l'elemento nuovo (quindi una volta incrementato j si somma) e comparare la somma attuale con la precedente.
    */

    int best = 0;

    for (int i = 0; i < N; i++){
        int sum = 0;

        for (int j = i; j < N; j++){
            sum += v[j];
            best = max(best, sum);
        }
    }

    return best;
}

int v3(int *v){

    /*
        Nella 3 versione si va ad utilizzare solo un for
        Si va quindi ad avere due casistiche:
            - la somma è data da tutti gli elementi fino a quella posizione
            - la somma è data solo dall'elemento in quella posizione (questo perchè questo eguaglia tutti gli altri elementi)

        (per comprendere meglio provare tabella di traccia)
    */

    int best = 0, sum = 0;

    for (int i = 0; i < N; i++){
        sum = max(v[i], sum+v[i]);
        best = max(best, sum);
    }

    return best;
}

int main(){

    int v[N] = {-1, 2, 4, -3, 5, 2, -5, 2};

    cout << "Somma massima nella subarray con algoritmo n^3: " << v1(v) << endl;
    cout << "Somma massima nella subarray con algoritmo n^2: " << v2(v) << endl;
    cout << "Somma massima nella subarray con algoritmo n: " << v3(v) << endl;

    return 0; 
}

/*
    Il limite inferiore di tale algoritmo è dato dalla dimensione dell'input. 
        Sapendo che i limiti inferiori di un problema sono dati o dalla dimensione dell'input oppure dall'albero di decisione. In questo caso l'albero di decisione risulta non essere un limite inferiore valido.
    
    Questo è facilmente riscontrabile in quanto per sommare n elementi è necessario leggerli tutti e procedere con la somma. Pertanto algoritmi che richiedono un tempo di esecuzione maggiore sono considerati non ottimali per tale operazione.
*/
