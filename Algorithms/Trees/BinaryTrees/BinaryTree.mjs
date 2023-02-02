/**
 * Ritorna la posizione in cui inserire il numero mantenendo l'ordinamento
 * Essendo che si tratta di un set ordinato, la ricerca della posizione in cui inserire l'elemento avverrà mediante un alterazione della binary search
 * 
 * @param {int} target 
 * @param {int[]} nums 
 * @returns {int} Posizione in cui inserire l'elemento
 */
Array.prototype.findInsertPosition = function(target, nums = this){
    var left = 0, right = nums.length;

    while (left < right) {
        var mid = Math.floor((left+right)/2);

        if (nums[mid] < target) 
            left = mid + 1;
        else 
            right = mid;
    }

    return left;
};

/**
 * Inserisce un valore nell'array
 * 
 * @param {*} target Valore da inserire
 */
Array.prototype.insert = function (target) {
    // Sostituisce 0 elementi, all'indice pos con l'elemento target
    this.splice(this.findInsertPosition(target), 0, target);
};

/**
 * Verifica se un array è piena o vuota
 * 
 * @returns {boolean} True se è vuoto, false se contiene elementi
 */
Array.prototype.isEmpty = function(){
    return this.length == 0;
};

/**
 * Implementazione di una classe Node che rappresenta un nodo di un Binary Tree
 * 
 * @author @marianialessandro
 */
export class Node{
    /**
     * 
     * @param {number} val Valore non specificato da inserire nell'albero
     * @param {Node} left Sottoalbero sinistro
     * @param {Node} right Sottoalbero destro
     */
    constructor(val, left = null, right = null){
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Implementazione di una classe Binary Tree
 * 
 * @author @marianialessandro
 */
export default class BinaryTree{
    /**
     * @param {Node} root Root dell'albero
     */
    constructor(root = null){
        this.root = root;
    }

    /**
     * Ricostruisce l'albero a partire dalle visite
     * 
     * @param {Array[]} inorder Visita inorder
     * @param {Array[]} preorder Visita postorder
     */
    static buildTreeFromVisit(inorder, preorder){
        /*
            Esempi di inorder e preorder: 
                INORDER     D B E A F C
                                0 1 2 3 4 5     lenght: 6
                        - A sinistra della root c'è il nodo più a destra del sottoalbero sinistro
                        - A destra della root c'è il nodo più a sinistra del sottoalbero destro
                
                PREORDER    A B D E C F
                    - La root è il valore in prima posizione

            Algoritmo ricorsivo che sfrutta inorder e preorder per la ricostruzione dell'albero. Con la inorder si cercano i sottoalberi.
            Con la preorder invece si individuano le root dei vari alberi che sono sempre in prima posizione dell'array che viene passata come parametro.

            1. Cerco la root nella inorder e memorizzo l'indice
            2. Determino dove sono contenuti i sottoalberi sinistri e i sottoalberi destri
                - Cerco la posizione dell'ultimo nodo del sottoalbero sinistro nella preorder, so che nella posizione successiva se presente c'è la root del sottoalbero destro
        */

        var build = (inorder, preorder) =>{
            var search = (array, val) => {
                for (var i = 0; i < array.length; i++){
                    if (array[i] == val)
                        return i;
                }
    
                return -1
            };
    
            // Per trovare l'indice della root nella inorder
            var inorderRootIndex = Math.floor(inorder.length/2);
    
            if (inorderRootIndex == 0)
                return new Node(
                    preorder[0]
                );
    
            /*
                Se continuo significa che index è > 1 e ho un sottoalbero sinistro
                    - Il sottoalbero sinistro nella inorder va da [0 a inorderRootIndex)
                    - Il sottoalbero sinistro nella inorder va da (inorderRootIndex, length)
                
                --- --- --- --- --- ---    
    
                Cerco il valore dell'ultimo nodo del sottoalbero sinistro nella preorder
                Il sottoalbero sinistro nella preorder andrà da [1,lastLeftPreorder]
            */
            var lastLeftPreorder = search(preorder, inorder[inorderRootIndex-1]);            
    
            if (lastLeftPreorder == preorder.length-1)
                return new Node(
                    preorder[0],
                    build(
                        inorder.slice(0, inorderRootIndex),
                        preorder.slice(1, firstRight)
                    )
                );
    
            /*
                Allora è presente anche un sottoalbero destro
                Il sottoalbero destro nella preorder andrà da [firstRight, length)
            */
            var firstRight = lastLeftPreorder +1;

            return new Node(
                preorder[0],
                build(inorder.slice(0, inorderRootIndex), preorder.slice(1, firstRight)),
                build(inorder.slice(inorderRootIndex + 1, inorder.length), preorder.slice(firstRight, preorder.length))
            )
        }
        
        return new BinaryTree(
            build(inorder, preorder)
        );
    }

    /**
     * Aggiunge un nodo all'interno dell'albero. Modifica l'albero che ha root in this.root
     * 
     * @param {Node} node Nodo da aggiungere all'interno dell'albero
     */
    add(node){
        // Per inserire in un binary tree generico l'obiettivo è quello di completare i livelli. Procedo quindi con l'inserimento sul primo nodo del livello che ha i figli a null

        var queque = [], tmp;
        
        if (this.root != null)
            queque.push(this.root);
        else{
            this.root = node;
            return;
        }

        while (!queque.isEmpty()){
            tmp = queque.shift();

            if (tmp.left == null){
                // Aggiungo
                tmp.left = node;
                break;
            }
            else if (tmp.right == null){
                tmp.right = node;
                break;
            }

            // Significa che il nodo non è stato aggiunto
            queque.push(tmp.left);
            queque.push(tmp.right);
        }
    }

    /**
     * Rimuove un nodo con valore passato come parametro dall'albero
     * 
     * @param {*} target Valore del nodo da rimuovere
     * @param {Node} node Albero da processare (di default impostata this.root)
     */
    remove(target, node = this.root){
        // Essendo che non voglio lasciare buchi, al posto del nodo che vado a rimuovere lo sostituisco con il nodo più profondo dell'albero a meno che il nodo da rimuovere non sia il più profondo

        var d = this.deepestNode(), stack = [];

        if (node != null)
            stack.push(node);

        while (!stack.isEmpty()){
            var tmp = stack.pop();

            if (tmp.val == target)
                tmp.val = d.val;

            if (tmp.right != null){
                if (tmp.right.val != d.val)
                    stack.push(tmp.right);
                else{
                    tmp.right = null
                    break
                }
            }
            
            if (tmp.left != null){
                if (tmp.left.val != d.val)
                    stack.push(tmp.left);
                else{
                    tmp.left = null
                    break
                }
            }
        }
    }

    // --- TRAVERSAL

    /**
     * Ritorna un array con i nodi ordinati in ordine crescente
     * 
     * @param {Node} node Root dell'albero (di default impostata a this.root)
     * @returns {Array} Array che contiene i nodi già pronti
     */
    getOrderedArray(node = this.root, result = []){

        // Procedo con un iterativo per maggior controllo

        var stack = [];
    
        if (node != null)
            stack.push(node);
        
        while(!stack.isEmpty()){    // Itero finchè ci sono elementi

            var tmp = stack.pop();

            result.insert(tmp.val);

            if (tmp.right != null)
                stack.push(tmp.right);
            
            if (tmp.left != null)
                stack.push(tmp.left);
        }

        return result;
    }

    /**
     * Visita di tipo DLR: si stampa il valore del nodo, si processa il sottoalbero sinistro e successivamente il sottoalbero destro
     * 
     * @param {Node} node Albero da processare (di default impostata this.root) 
     * @returns {Array} Valori dei nodi secondo la sequenza specificata
     */
    preOrderTraversal(node = this.root){

        var results = [];

        if (node != null){
            results.push(node.val);
            results = results.concat(this.preOrderTraversal(node.left));
            results = results.concat(this.preOrderTraversal(node.right));
        }

        return results;
    }

    /**
     * Implementazione iterativa PreOrder Traversal
     * 
     * @param {Node} node Albero da processare (di default impostata this.root) 
     * @returns {Array} Valori dei nodi secondo la sequenza specificata
     */
    preOrderTraversalIterative(node = this.root){
        var results = [];
        var stack = [];

        if (node != null)
            stack.push(node);

        while (!stack.isEmpty()){
            var tmp = stack.pop();

            results.push(tmp.val);

            // Dovendo visitare prima la sinistra la inserisco dopo. Questo per l'architettura dello stack
            if (tmp.right != null)
                stack.push(tmp.right);
            
            if (tmp.left != null)
                stack.push(tmp.left);
        }

        return results;
    }

    /**
     * Visita di tipo LDR: si processa il sottoalbero sinistro, si stampa il valore del nodo quindi si procede nel sottoalbero destro
     * 
     * @param {Node} node Albero da processare (di default impostata this.root) 
     * @returns {Array} Valori dei nodi secondo la sequenza specificata
     */
    inorderTraversal(node = this.root){
        var results = [];

        if (node != null){
            results = results.concat(this.inorderTraversal(node.left));
            results.push(node.val);
            results = results.concat(this.inorderTraversal(node.right));
        }

        return results;
    }

    /**
     * Implementazione iterativa della Inorder Traversal
     * 
     * @param {Node} node Albero da processare (di default impostata this.root) 
     * @returns {Array} Valore dei nodi secondo la sequenza specificata
     */
    inorderTraversalIterative(node = this.root){
        var results = [];
        var stack = [];

        while (true){
            while (node != null){
                stack.push(node);
                node = node.left;

            }

            if (stack.isEmpty())
                break;
            
            node = stack.pop();

            results.push(node.val);
        
            node = node.right;  // Mi sposto a destra
        }

        return results;
    }

    /**
     * Visita di tipo LRD: si processa il sottoalbero sinistro, successivamente il sottoalbero destro quindi si stampa il valore del nodo;
     * 
     * @param {Node} node Albero da processare (di default impostata this.root) 
     * @returns {Array} Valori dei nodi secondo la sequenza specificata
     */
    postOrderTraversal(node = this.root){
        var results = [];

        if (node != null){
            results = results.concat(this.postOrderTraversal(node.left));
            results = results.concat(this.postOrderTraversal(node.right));
            results.push(node.val);
        }

        return results;
    }

    /**
     * Si stampa il valore del nodo, si processa il sottoalbero destro e poi il sinistro
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {Array} Valore dei nodi secondo la sequenza specificata
     */
    drlTraversal(node = this.root){
        var results = [];

        if (node != null){
            results.push(node.val);
            results = results.concat(this.inorderTraversal(node.right));
            results = results.concat(this.inorderTraversal(node.left));
        }

        return results;
    }

    /**
     * Si processa il sottoalbero destro, si stampa il valore del nodo e si processa il sottoalbero sinistro
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {Array} Valore dei nodi secondo la sequenza specificata
     */
    rdlTraversal(node = this.root){
        var results = [];

        if (node != null){
            results = results.concat(this.inorderTraversal(node.right));
            results.push(node.val);
            results = results.concat(this.inorderTraversal(node.left));
        }

        return results;
    }

    /**
     * Si processa il sottoalbero destro, si procede con il sinistro quindi si stampa il nodo
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {Array} Valore dei nodi secondo la sequenza specificata
     */
    rldTraversal(node = this.root){
        var results = [];

        if (node != null){
            results = results.concat(this.inorderTraversal(node.right));
            results = results.concat(this.inorderTraversal(node.left));
            results.push(node.val);
        }

        return results;
    }

    /**
     * Stampa i nodi in base a come questi sono disposti nel livello
     * Breadth-First Traversal dell'albero
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {Array} Valore dei nodi secondo la sequenza specificata
     */
    levelOrderTraversal(node = this.root){
        var tmp, queque = [], results = [];

        if (node == null)
            return results;
        
        queque.push(root);

        while(!queque.isEmpty()){
            tmp = queque.shift();
            results.push(tmp.val);

            if (tmp.left != null)
                queque.push(tmp.left);
            
            if (tmp.right != null)
                queque.push(tmp.right);
        }

        return results;
    }

    // ------
    // METODI PER IL CALCOLO DELLA DIMENSIONE

    /**
     * Calcolo della dimensione dell'albero
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns 
     */
    size(node = this.root){
        // Uso un algoritmo ricorsivo per semplicità dell'implementazione
        if (node == null)
            return 0;

        return this.size(node.left) + this.size(node.right) + 1;
    }

    /**
     * Calcola l'altezza dell'albero
     * 
     * @param {Node} node Root dell'albero da processare (di default impostato sulla root)
     * @returns 
     */
    height(node = this.root){
        if (node == null)
            return 0;

        var left = this.height(root.left);
        var right = this.height(root.right);

        return Math.max(left, right) + 1;   // Incremento 
    }

    // ------

    /**
     * Trova il massimo nell'albero
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {number} Massimo nell'albero
     */
    max(node = this.root){
        if (node == null)
            return Number.MIN_VALUE;    // Ritorno il valore più piccolo possibile

        return Math.max(node.val, this.max(node.left), this.max(node.right));
    }

    /**
     * Trova il massimo nell'albero
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {number} Massimo nell'albero
     */
    maxWithoutRecursion(node = this.root){
        // Richiamo un algoritmo di visita iterativo, successivamente con la funzione max prelevo il massimo da quell'array
        return Math.max(this.levelOrderTraversal());
    }

    /**
     * Conta le foglie in un albero
     * 
     * @param {Node} node Albero da processare (di default impostata this.root) Root dell'albero di cui si deve contare le foglie (di default impostata this.root)
     * @returns {number} Numero di foglie
     */
    countLeaves(node = this.root){
        if (node == null)
            return 0;
        
        if (node.left == null && node.right == null)
            return 1;

        return this.countLeaves(node.left) + this.countLeaves(node.right);
    }

    /**
     * Conta le foglie in un albero
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {number} Numero di foglie
     */
    countLeavesIterative(node = this.root){
        // Uso come struttura la preOrderTraversal
        var stack = [];
        var count = 0;

        if (node != null)
            stack.push(node);

        while (!stack.isEmpty()){
            var tmp = stack.pop();

            // Dovendo visitare prima la sinistra la inserisco dopo. Questo per l'architettura dello stack
            if (tmp.right != null)
                stack.push(tmp.right);
            
            if (tmp.left != null)
                stack.push(tmp.left);

            if (tmp.left == tmp.right && tmp.left == null)
                count++;
        }

        return count;
    }

    /**
     * Conta i nodi completi
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {number} Numero di nodi completi
     */
    countFullNodes(node = this.root){
        if (node == null)
            return 0;
        
        if (node.left != null && node.right != null)
            return 1;

        return this.countLeaves(node.left) + this.countLeaves(node.right);
    }

    /**
     * Conta i nodi pieni di un albero
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {number} Numero di nodi completi
     */
    countFullNodesIterative(node = this.root){
        // Uso come struttura la preOrderTraversal
        var stack = [];
        var count = 0;

        if (node != null)
            stack.push(node);

        while (!stack.isEmpty()){
            var tmp = stack.pop();

            // Dovendo visitare prima la sinistra la inserisco dopo. Questo per l'architettura dello stack
            if (tmp.right != null)
                stack.push(tmp.right);
            
            if (tmp.left != null)
                stack.push(tmp.left);

            if (tmp.left != tmp.right && tmp.left != null)
                count++;
        }

        return count;
    }
    /**
     * Conta i nodi con un solo figlio
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {number} Numero di nodi con un solo figlio
     */
    countHalfNodes(node = this.root){
        // Uso come struttura la preOrderTraversal
        var stack = [];
        var count = 0;

        if (node != null)
            stack.push(node);

        while (!stack.isEmpty()){
            var tmp = stack.pop();

            // Dovendo visitare prima la sinistra la inserisco dopo. Questo per l'architettura dello stack
            if (tmp.right != null)
                stack.push(tmp.right);
            
            if (tmp.left != null)
                stack.push(tmp.left);

            if (tmp.left != tmp.right && (tmp.left == null || tmp.right == null))
                count++;
        }

        return count;
    }

    /**
     * Ricerca un nodo all'interno dell'albero
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @param {number} target Valore che si vuole cercare
     * @returns {boolean} Valore booleano per indicare la presenza del nodo
     */
    search(target, node = this.root){
        if (target == false)
            return false;       // Non è possibile cercare il null'all'interno dell'albero in quanto restituirebbe sempre true

        if (node != null){
            if (node.val == target)
                return true;
            else if (this.search(target, node.left))    // Ricerco a sinistra
                return true;    // Se lo trovo ritorno true altrimenti cerco a destra
            else if (this.search(target, node.right))    
                return true;    // Ritorno true se il nodo è presente nel sottoalbero di destra
        }

        return false;   // Ritorno false se il nodo non è stato trovato o se il nodo è == null
    }

    /**
     * Verifica la presenza di almeno un nodo all'interno dell'albero
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {boolean} Valore booleano per indicare la presenza di almeno un nodo
     */
    isEmpty(node = this.root){
        return node == null;
    }

    /**
     * Ritorna la somma massima su un livello
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {Number} Risultato dell'operazione
     */
    maximumLevelSum(node = this.root){
        if (node == null)
            return 0;

        var tmp, queque = [], currentSum = 0, maxSum = 0;

        queque.push(node);
        queque.push(null);  // Va inserito un carattere terminatore che indica la fine del livello

        while (!queque.isEmpty()){
            tmp = queque.shift();

            if (tmp == null){
                maxSum = Math.max(currentSum, maxSum);

                currentSum = 0;

                // Inserisco il terminatore di livello
                if (!queque.isEmpty())
                    queque.push(null);
            }
            else{
                // C'è un valore
                currentSum += tmp.val;

                if (tmp.left != null)
                    queque.push(tmp.left);

                if (tmp.right != null)
                    queque.push(tmp.right);
            }
        }

        maxSum;
    }

    /**
     * Ricerca un path nell'albero con una data somma
     * 
     * @param {number} sum Somma
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {boolean} che indica la presenza del path con un true o false
     */
    hasPathSum(sum, node = this.root){
        if (node == null)   // Se la somma è 0 significa che il percorso termina in una foglia
            return sum == 0
        else if (sum-node.val == 0)  // Se la somma è 0 ho trovato il path e non giunge ad una foglia
            return true;
        else if (sum < 0)
            return false;
        else    // Continuo a cercare
            return this.hasPathSum(sum-node.val, node.left) || this.hasPathSum(sum-node.val, node.right);
    }

    /**
     * Somma tutti i nodi presenti nell'albero
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {number} Somma di tutti i nodi nell'albero
     */
    sumAll(node = this.root){
        if (node == null)
            return 0;
        
        return node.val + this.sumAll(node.left) + this.sumAll(node.right);
    }

    /**
     * Somma il valore di tutti i nodi senza usare la ricorsione
     * 
     * @param {Node} node Albero da processare (di default impostata this.root) 
     * @returns {number} Somma di tutti i nodi nell'albero
     */
    sumWithoutRecursion(node = this.root){
        var results = 0;
        var stack = [];

        if (node != null)
            stack.push(node);

        while (!stack.isEmpty()){
            var tmp = stack.pop();

            results += tmp.val;

            if (tmp.right != null)
                stack.push(tmp.right);
            
            if (tmp.left != null)
                stack.push(tmp.left);
        }

        return results;
    }

    /**
     * Ritorna un albero specchiato
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {Node} Albero specchiato
     */
    mirror(node = this.root){
        if (node == null)
            return;
        
        this.mirror(node.left);
        this.mirror(node.right);

        var tmp = this.left;
        this.left = this.right;
        this.right = tmp;

        return root;
    }

    /**
     * Ritorna il nodo con profondità maggiore più a destra
     * 
     * @param {Node} node Albero da processare (di default impostata this.root)
     * @returns {Node} Nodo nell'ultimo livello più a destra
     */
    deepestNode(node = this.root){
        // Ritorno il nodo più a destra dell'ultimo livello
        // È sufficiente richiamare la levelOrderTraversal e ritornare l'ultimo valore

        return (this.levelOrderTraversal(node)).pop();
    }

    /**
     * Compara due alberi e verifica se sono uguali
     * 
     * @param {BinaryTree} tree Albero da comparare
     * @returns 
     */
    equals(tree){

        var compare = (node1, node2) => {
            if (node1 == node2 && node1 == null)
                return true;
    
            if (node1.val == node2.val)
                return compare(node1.left, node2.left) && compare(node1.right, node2.right);
            else
                return false;
        }

        return compare(tree.root, this.root);
    }
}