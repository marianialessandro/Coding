/**
 * Implementazione del countingsort
 * 
 * @param {*} arr Array da ordinare secondo la proprietà maxheap
 * @param {*} N Numero di elementi
 */
function heapSort(arr, N = arr.length){

    /**
     * Processo di creazione della struttura dati heap rappresentato mediante un array.
     * Sapendo che un maxHeap è un albero in cui la root ha il valore maggiore rispetto ai due figli. 
     * MaxHeapify di fatto ricerca il massimo fra root, root del sottoalbero sinistro se presente e root del sottoalbero destro se presente. Qualora il massimo si trovi in una dei due child si procede con lo scambio dei valori in modo che il massimo vada nella root e successivamente si procede con il riordinare il sottoalbero in cui è avvenuto lo scambio per far si che rispetti la proprietà del max heap.
     * 
     * @param {*} arr Array da ordinare secondo la proprietà maxheap
     * @param {*} N Numero di elementi
     * @param {*} i root dell'albero da analizzare
     */
    var maxHeapify = (arr, N, i) =>{
        var largest = i;
        var l = 2*i+1;
        var r = 2*i+2;

        // Ricerco il massimo nel sottoalbero destro e sinistro e in più verifico che rispetti i range dell'array
        if (l < N && arr[l] > arr[largest])
            largest = l;
        
        if (r < N && arr[r] > arr[largest])
            largest = r;

        // Se il massimo non è nella root lo scambio e riordino i sotto alberi
        if (largest != i){
            var tmp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = tmp;

            maxHeapify(arr, N, largest);
        }
    }

    /**
     * Costruisce un maxHeap.
     * Opera secondo un approccio boottom up in quanto la funzione opera assumendo che i figli siano già ordinati secondo la proprietà di conseguenza è necessario procedere facendo si che i sottoalberi siano ordinati
     * 
     * 
     * @param {*} arr Array da ordinare secondo la proprietà maxheap
     * @param {*} N Numero di elementi
     */
    var buildMaxHeap = (arr, N = arr.length) =>{
        // Opero a partire dalla seconda metà dell'array in quanto dalla seconda metà in poi sono presenti solo foglie
        for (var i = Math.floor(N/2)-1; i >= 0; i--)
            maxHeapify(arr, N, i);
    }

    buildMaxHeap(arr);

    // In un maxHeap il primo elemento è quello più grande, quindi si sposta in ultima posizione dell'array e si procede con la ricostruzione dell'heap senza considerare l'ultimo nodo. Al termine del for l'array risulterà ordinata
    for (var i = N - 1; i > 0; i--) {
        // Move current root to end
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // call max heapify on the reduced heap
        maxHeapify(arr, i, 0);
    }
}

/**
 * Implementazione del countingsort
 * 
 * @param {*} arr Array da ordinare secondo la proprietà maxheap
 * @param {*} N Numero di elementi
 * @returns {Array} Array ordinata
 */
function countingSort(arr, N = arr.length){
    /**
     * Inizializzazione di un array
     * 
     * @param {number} n Dimensione dell'array
     * @param {*} val Valore di inizializzazione
     * @returns 
     */
    var initializeArray = (n, val) => {
    
        var result = [];

        for (var i = 0; i < n; i++)
            result.push(val);

        return result;
    }

    var max = Math.max(...arr);
    var b = initializeArray(N, 0);
    var c = initializeArray(max+1, 0);
    
    arr.forEach(element => {
        c[element]++;
    });

    // A seguito di questo for c contiene il numero degli elementi uguali ad i.
    
    for (var i = 1; i < c.length; i++)
        c[i] += c[i-1];

    // A questo punto c contiene il numero di elementi che sono minori o uguali ad i
    for (var j = N-1; j >= 0; j--){
        b[c[arr[j]]-1] = arr[j];
        c[arr[j]]--;
    }

    return b;
}

var arr = [2,5,3,0,2,3,0,3];
arr = countingSort(arr);
console.log("RES: ", arr);
