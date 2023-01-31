class MaxHeap{
    constructor(arr){
        this.arr = arr;
        this.build();
    }

    /**
     * Processo di creazione della struttura dati heap rappresentato mediante un array.
     * Sapendo che un maxHeap è un albero in cui la root ha il valore maggiore rispetto ai due figli. 
     * MaxHeapify di fatto ricerca il massimo fra root, root del sottoalbero sinistro se presente e root del sottoalbero destro se presente. Qualora il massimo si trovi in una dei due child si procede con lo scambio dei valori in modo che il massimo vada nella root e successivamente si procede con il riordinare il sottoalbero in cui è avvenuto lo scambio per far si che rispetti la proprietà del max heap.
     * 
     * @param {*} N Numero di elementi
     * @param {*} i root dell'albero da analizzare
     */
    heapify(N = this.arr.length, i){
        var largest = i;
        var l = 2*i+1;
        var r = 2*i+2;

        // Ricerco il massimo nel sottoalbero destro e sinistro e in più verifico che rispetti i range dell'array
        if (l < N && this.arr[l] > this.arr[largest])
            largest = l;
        
        if (r < N && this.arr[r] > this.arr[largest])
            largest = r;

        // Se il massimo non è nella root lo scambio e riordino i sotto alberi
        if (largest != i){
            var tmp = this.arr[i];
            this.arr[i] = this.arr[largest];
            this.arr[largest] = tmp;

            this.heapify(N, largest);
        }
    }

    /**
     * Costruisce un maxHeap.
     * Opera secondo un approccio boottom up in quanto la funzione opera assumendo che i figli siano già ordinati secondo la proprietà di conseguenza è necessario procedere facendo si che i sottoalberi siano ordinati
     * 
     * @param {*} N Numero di elementi
     */
    build(N = this.arr.length){
        for (var i = Math.floor((N/2)-1); i >= 0; i--)
            this.heapify(N,i);
    }

    /**
     * Inserisce un elemento e ricostruisce l'heap
     * 
     * @param {*} val Valore da inserire
     */
    insert(val){
        this.arr.push(val);
        this.build();
    }

    /**
     * Ritorna il massimo nell'array
     * 
     * @returns {*} Elemento in prima posizione -> elemento con chiave massima
     */
    max(){
        return arr[0];
    }

    /**
     * Ritorna il valore minimo nell'array
     * 
     * @returns {*} Valore minimo nell'heap
     */
    min(){

        Array.prototype.getMinInRange = function (left = 0, right = this.arr.length){
            var result = this.arr[left];

            for (var i = left+1; i < right; i++)
                result = Math.min(this.arr[i], result);

            return result;
        };

        // Bisogna cercare fra le foglie

        return this.arr.getMinInRange(Math.floor(this.arr.length/2));   // Le foglie sono nella seconda metà dell'array, pertanto cerco solo in quella porzione
    }

    sort(N = arr.length){
        // In un maxHeap il primo elemento è quello più grande, quindi si sposta in ultima posizione dell'array e si procede con la ricostruzione dell'heap senza considerare l'ultimo nodo. Al termine del for l'array risulterà ordinata
        for (var i = N - 1; i > 0; i--) {
            // Move current root to end
            var temp = this.arr[0];
            this.arr[0] = this.arr[i];
            this.arr[i] = temp;

            // call max heapify on the reduced heap
            this.heapify(i, 0);
        }
    }
}