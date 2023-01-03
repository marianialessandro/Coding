/**
 * @fileOverview Tree.js
 * @author marianialessandro
 * @version 2.0.0
 */

// import Node from './node.mjs';

class Node{
    constructor(val, left = null, right = null){
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree{
    /**
     * 
     * @param {Node} root Root dell'albero
     */
    constructor(root){
        this.root = root;
    }

    /**
     * Metodo per costruire un albero a partire da una preorder visit. L'array contiene I per i nodi interni ed L per i nodi esterni.
     * Ogni nodo di quest'albero potrà avere 0 o 2 figli (di fatto si tratta di costruire un albero completo)
     * 
     * @param {Array} treeVisit Preorder visit dell'albero che si vuole costruire. Questa dovrà contenere solo I per i nodi interni ed L per i nodi esterni
     * @returns {Node} Root dell'albero costruito
     */
    static buildTreeWithProperty(treeVisit){
        // La preOrder visit legge la root e si sposta a sinistra il più a sinistra possibile finchè non si trova una foglia dopo di che si procede a destra e di nuovo tutto a sinistra
    
        var stack = [];
    
        var tmp = new Node(treeVisit.shift(), null, null);
        stack.push(tmp);
    
        treeVisit.forEach(node => {
            // Leggo il valore, prendo l'ultimo nodo nello stack, lego il nodo a sinistra e aggiungo allo stack
            // Quando trovo una foglia quindi leggo L la aggiungo al nodo. La foglia non verrà aggiunta allo stack in quanto non può avere figli. Un nodo verrà rimosso dallo stack quando sarà completato quindi avrà figlio destro e sinistro
            var added = new Node(node, null, null);
    
            while (stack[stack.length - 1].left != null || stack[stack.length - 1].right != null){
                // Cerco un nodo a cui posso aggiungere qualcosa
                stack.pop();    // Rimuovo il nodo dato che non devo andare ad aggiungere nulla
            }
    
            if (stack[stack.length - 1].left == null)   // Aggiungo a sinistra
                stack[stack.length - 1].left = added;
            else if (stack[stack.length - 1].right == null)
                stack[stack.length - 1].right = added;
    
            if (node != 'L')    // Lo aggiungo allo stack dato che è possibile aggiungere nodi
                stack.push(added);
        });
    
        return tmp;
    }

    /**
     * Metodo per costruire un albero a partire dalla inorder e postorder traversal
     * 
     * @param {Array} inOrderTraversal 
     * @param {Array} preOrderTraversal 
     * @returns {Node} root del nuovo albero costruito
     */
    static createBinaryTree(inOrderTraversal, preOrderTraversal){
        /*
            INORDER:    D B E A F C
            PREORDE:    A B D E C F
            
            1. Cerco la root
            2. Cerco i figli della root incrociando inOrder e preOrder
                Il figlio a sx lo trovo nella preOrder all'indice root+1
                Il primo figlio a dx lo trovo subito a dx dell'ultimo nodo del sottoalbero sinistro
                    1. Trovo la root nella inorder = inOrderRoot
                    2. Prendo il valore dell'ultimo nodo a sx ed è in indice inOrderRoot-1
                    3. Il valore del figlio destro si trova nella preOrder subito a dx dell'ultimo nodo del sottoAlbero sinistro
            3. A questo punto posso richiamare sui due array dei relativi sotto alberi
        */
    
        if (inOrderTraversal.length == 0 && preOrderTraversal.length == 0)
            return null;
    
        if (inOrderTraversal.length == 1){
            return new Node(inOrderTraversal[0], null, null);
        }
        else if (inOrderTraversal.length != preOrderTraversal.length){
            return; // Ritorno undefined in segno di errore
        }
    
        // 1. Cerco l'indice della root nella inorderVisit
            // Il valore della root nella preOrder è facilmente accessibile sapendo che è in prima posizione        
        const inOrderRootIndex = this.searchInArray(inOrderTraversal, preOrderTraversal[0]);
        var inOrderLastLeftSubtreeNodeIndex = -1;

        if (inOrderRootIndex == -1){
            return undefined;   // Ritorno undefined in segno di errore
        }
        else{
            inOrderLastLeftSubtreeNodeIndex = inOrderRootIndex-1;
        }

        // Cerco l'ultimo nodo del sottoalbero sinistro nella preorder visit
        var preOrderLastLeftNodeIndex = this.searchInArray(preOrderTraversal, inOrderTraversal[inOrderLastLeftSubtreeNodeIndex]);
        
        // A questo punto è possibile comporre le array per costruire albero sinistro e destro 
        
        // leftInorder: 0, root-1
        var leftInorder = inOrderTraversal.slice(0, inOrderRootIndex);
        // leftPreOrder: 1, preOrderLastLeftNodeIndex+1
        var leftPreOrder = preOrderTraversal.slice(1, preOrderLastLeftNodeIndex+1);
    
        // rightInorder= root+1, len
    
        var rightInorder = inOrderTraversal.slice(inOrderRootIndex + 1, inOrderTraversal.length);
        var rightPreOrder = preOrderTraversal.slice(preOrderLastLeftNodeIndex+1, preOrderTraversal.length);
    
        return new Node(
            preOrderTraversal[0], 
            this.createBinaryTree(leftInorder, leftPreOrder), 
            this.createBinaryTree(rightInorder, rightPreOrder)
        );
    }

    /**
     * Preorder traversal
     * DLR: Si legge il valore del nodo corrente, si processa il sottoalbero sinistro e successivamente il sottoalbero destro
     * 
     * @param {Node} node
     * @returns {Array} contenente i nodi nell'ordine previsto dalla visita
     */
    preOrderTraversal(node = this.root){
        // DLR: consist in print the value of tmp node, process the left subtree then the right subtree
    
        var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order

        if (node != null){
            nodeValues.push(node.val);
            nodeValues = nodeValues.concat(this.preOrderTraversal(node.left));
            nodeValues = nodeValues.concat(this.preOrderTraversal(node.right));
        }
    
        return nodeValues;
    }

    /**
     * Preorder traversal implementata con l'iterazione
     * DLR: Si legge il valore del nodo corrente, si processa il sottoalbero sinistro e successivamente il sottoalbero destro
     * 
     * @param {Node} node
     * @returns {Array} contenente i nodi nell'ordine previsto dalla visita
     */
    preOrderTraversalIterative(node = this.root){
        if (node == null)
            return;
    
        var nodeValues = [];
        var stack = [];
    
        stack.push(node);
    
        while (stack.length > 0){
            // var tmp = stack[stack.length -1];
            // stack.pop();

            var tmp = stack.pop();
    
            nodeValues.push(tmp.val);
    
            // Metto nello stack prima destra e poi sinistra dato che prima devo processare la parte destra e poi la sinistra
            if (tmp.right != null)
                stack.push(tmp.right);
            
            if (tmp.left != null)
                stack.push(tmp.left);
        }
    
        return nodeValues;
    }
    
    /**
     * LDR: Si processa prima il sottoalbero sinistro, si legge il valore del nodo per poi processare il sottoalbero destro
     * 
     * @param {Node} node Root dell'albero
     * @returns {Array} Array contenente i valori dei nodi dell'albero
     */
    inOrderTraversal(node = this.root){

        var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order
        if (node != null){
            nodeValues = nodeValues.concat(this.inOrderTraversal(node.left));
            nodeValues.push(node.val);
            nodeValues = nodeValues.concat(this.inOrderTraversal(node.right));
        }
    
        return nodeValues;
    }

    /**
     * Inorder traversal implementata iterativamente
     * LDR: Si processa prima il sottoalbero sinistro, si legge il valore del nodo per poi processare il sottoalbero destro
     * 
     * @param {Node} node Root dell'albero
     * @returns {Array} Array contenente i valori dei nodi dell'albero
     */
    inorderTraversalIterative(node = this.root){
        var nodeValues = [];
        var nodes = [];
    
        var tmp = node;
    
        while (tmp != null && nodes.length > 0){
            // Procedo andando tutto a sinistra
    
            while(tmp != null){
                nodes.push(tmp);
                tmp = tmp.left;
            }
    
            // A questo punto tmp = null
            tmp = nodes.pop();  // Prelevo l'ultimo nodo prelevato a sinistra
    
            nodeValues.push(tmp.val);   // Prelevo il valore
    
            tmp = tmp.right;    // Procedo andando a destra
        }

        return nodeValues;
    }

    /**
     * LRD: processa prima il sottoalbero sinistro, poi il sottoalbero destro e poi legge il valore dei nodi
     * 
     * @param {Node} node Root dell'albero
     * @returns {Array} Array contenente i valori dei nodi dell'albero
     */
    postOrderTraversal(node = this.root){

        var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order
    
        if (node != null){
            nodeValues = nodeValues.concat(this.postOrderTraversal(node.left));
            nodeValues = nodeValues.concat(this.postOrderTraversal(node.right));
            nodeValues.push(node.val);
        }
    
        return nodeValues;
    }

    /**
     * Postorder traversal implementata iterativamente
     * LRD: processa prima il sottoalbero sinistro, poi il sottoalbero destro e poi legge il valore dei nodi
     * 
     * @param {Node} node Root dell'albero
     * @returns 
     */
    postOrderTraversalIterative(node = this.root){
        var stack = [];
        var nodeValues = [];
    
        stack.push(node);
    
        var prev = null;
    
        while (stack.length != 0){
            let tmp = stack[stack.length-1];    // Prelevo l'ultimo nodo dallo stack
      
            if (prev == null || prev.left == tmp || prev.right == tmp){
    
                if (tmp.left != null)      
                    stack.push(tmp.left);
                else if (tmp.right != null)    
                    stack.push(tmp.right);
                else{
                    stack.pop();
                    nodeValues.push(tmp.val);   
                }
            }
            else if (tmp.left == prev){
                if (tmp.right != null)
                    stack.push(tmp.right);
                else{
                    stack.pop();
                    nodeValues.push(tmp.val);
                }
                
            }
            else if (tmp.right == prev){
                stack.pop();
                nodeValues.push(tmp.val);
            }
    
            prev = tmp;
        }
    
        return nodeValues;
    }

    DRL(node = this.root){
        // DRL: consist in print the value of the tmp node, process the right subtree then the left subtree
    
        var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order
    
        if (node != null){
            nodeValues.push(node.val);
            nodeValues = nodeValues.concat(this.DRL(node.right));
            nodeValues = nodeValues.concat(this.DRL(node.left));
        }
    
        return nodeValues;
    }
    
    /**
     * Si processa il sottoalbero destro, si legge il valore e poi si processa il sottoalbero sinistro
     * 
     * @param {Node} node Root del nodo
     * @returns {Array} Array contenente i valori dei nodi dell'albero
     */
    RDL(node = this.root){
    
        var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order
    
        if (node != null){
            nodeValues = nodeValues.concat(this.RDL(node.right));
            nodeValues.push(node.val);
            nodeValues = nodeValues.concat(this.RDL(node.left));
        }
    
        return nodeValues;
    }
    
    /**
     * RLD: Processa il sottoalbero destro successivamente il sottoalbero sinistro e poi si legge il valore del nodo
     * 
     * @param {Node} node Root del nodo
     * @returns {Array} Array contenente i valori dei nodi dell'albero
     */
    RLD(node = this.root){

        var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order
    
        if (node != null){
            nodeValues = nodeValues.concat(this.RLD(node.right));
            nodeValues = nodeValues.concat(this.RLD(node.left));
            nodeValues.push(node.val);
        }
    
        return nodeValues;
    }
    
    /**
     * Legge i nodi livello per livello
     * 
     * @param {Node} node Root del nodo
     * @returns {Array} Array contenente i valori dei nodi dell'albero
     */
    levelOrderTraversal(node = this.root){
        // Uso una coda dove uscita è 0 e ingresso in coda
        var nodes = [];
        var nodeValues = []
    
        nodes.push(node);
    
        while (nodes.length > 0){
        
            nodeValues.push(nodes[0].val);
    
            if (nodes[0].left != null)
                nodes.push(nodes[0].left);
    
            if (nodes[0].right != null)
                nodes.push(nodes[0].right);
    
            nodes.shift();  // Rimuovo il primo elemento che è quello appena stampato
        }
    
        return nodeValues;
    }

    /**
     * Preleva il valore massimo contenuto nell'albero
     * 
     * @param {Node} node Root del nodo
     * @returns {number}
     */
    getMaxVal(node = this.root){
        // Cerco il massimo a sinistra, cerco il massimo a destra, confronto con la root
        
        // Complessità: O(n)
            // L'algoritmo è ottimo in quanto non avendo un albero binario di ricerca non è presente un ordine di disposizione dei nodi ben preciso quindi è necessario confrontare tutti i valori all'interno di un array
    
        if (node == null)
            return;
        
        var values = [];
    
        values.push(node.val);              // Aggiungo il valore della root
    
        var v = this.getMaxVal(node.left);
    
        if (v != undefined){
            // Significa che il sottoalbero sinistro contiene valori
            values.push(v);
        }
    
        v = this.getMaxVal(node.right);
    
        if (v != undefined){
            // Significa che il sottoalbero destro contiene valori
            values.push(v);
        }
    
        return Math.max(...values);
    }
    
    /**
     * Ricerca il valore in un albero
     * 
     * @param {number} val Valore cercato nel nodo
     * @param {Node} node Root del nodo
     * @returns {boolean} per indicare la presenza del nodo all'interno dell'array
     */
    search(val, node = this.root){
        // Mi avvalgo di un alterazione di una DLR visit (PREORDER). Scelgo la DLR in quanto qualora il valore fosse il primo modo non proseguo con la ricerca di esso in altri sottoalberi
    
        if (node == null)
            return false;
    
        if (node.val == val || this.search(val, node.left) || this.search(val, node.right))
            return true;    // Significa che ho trovato il valore nel nodo attuale, nel sotto albero sinistro oppure nel sotto albero destro
        else
            return false;
    }
    
    /**
     * Ricerca il valore in un albero implementata mediante iterazione
     * 
     * @param {number} val Valore cercato nel nodo
     * @param {Node} node Root del nodo
     * @returns {boolean} per indicare la presenza del nodo all'interno dell'array
     */
    searchIterative(val, node = this.root){
        var nodeValues = [];
    
        var nodes = [];
    
        nodes.push(node);
    
        while (nodes.length > 0){
            var tmp = nodes[nodes.length -1];
    
            nodeValues.push(tmp.val);
    
            if (tmp.val == val)
                return true;
    
            nodes.pop();
    
            nodes.push(tmp.right);
            nodes.push(tmp.left);
        }
    
        return false;
    }
    
    insertNodeInTree(val){
        var node = this.root;
        var nodes = [];
    
        nodes.push(node);
    
        while (nodes.length > 0){
            if (nodes[0].left != null){
                nodes.push(nodes[0].left)
            }
            else{
                nodes[0].left = new Node(val, null, null);
                return;
            }
    
            if (nodes[0].right != null){
                nodes.push(nodes[0].right);
            }
            else{
                nodes[0].right = new Node(val, null, null);
                return;
            }
    
            nodes.shift();
        }
    
        // Inserisco nel primo nodo che non ha un figlio quindi ha left o right a null
    }
    
    /**
     * Calcola la dimensione dell'albero
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Dimensione dell'albero
     */
    size(node = this.root){
        if (node == null)
            return 0;
        
        return this.size(node.left) + this.size(node.right) + 1;
    }

    /**
     * Calcola la dimensione dell'albero mediante iterazione
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Dimensione dell'albero mediante iterazione
     */
    sizeIterative(node = this.root){
        if (node == null)
            return 0;
    
        var nodes = [];
    
        var count = 0;
    
        nodes.push(node);
    
        while (nodes.length > 0){
        
            count += 1;
    
            if (nodes[0].left != null)
                nodes.push(nodes[0].left);
    
            if (nodes[0].right != null)
                nodes.push(nodes[0].right);
    
            nodes.shift();  // Rimuovo il primo elemento che è quello appena stato contato
        }
    
        return count;
    }
    
    removeSubtreeOfNode(node, tree = this.root){
        if (node == null)
            return;
        
        if (!this.search(tree, node))
            return;
        
        // Eseguo una Preorder traversal e setto a null quando trovo tale nodo
    
        if (tree.val == node){
            tree.left = null;
            tree.right = null;
        }
        else{
            this.removeSubtreeOfNode(node, tree.left);
            this.removeSubtreeOfNode(node, tree.right);
        }
    
        return;
    }
    
    /**
     * Calcola l'altezza dell'albero
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Altezza dell'albero
     */
    getHeight(node = this.root){
        if (node == null)
            return 0;
    
        return Math.max(
            this.getHeight(node.left), 
            this.getHeight(node.right)
        ) + 1;
    }
    
    /**
     * Calcola l'altezza dell'albero mediante iterazione
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Altezza dell'albero mediante iterazione
     */
    getHeightIterative(node = this.root){
        if (node == null)
            return 0;
    
        var level = 0;
    
        var queque = [];
    
        queque.push(null);
    
        while (queque.length > 0){
            var tmp = queque.shift();
    
            if (tmp == null){
                if (queque.length > 0)
                    queque.push(null);
    
                level += 1;
            }
            else{
                if (tmp.left != null){
                    queque.push(tmp.left);
                }
                if (tmp.right != null){
                    queque.push(tmp.right);
                }
            }
        }
    
        return level;

        // PROBLEMA SOPRA DA RIVEDERE BENE
    }
    
    /**
     * Restituisce il nodo con la profondità maggiore
     * 
     * @param {Node} node 
     * @returns {Node} Nodo con profondità maggiore
     */
    deepestNode(node = this.root){
        // Itero sui nodi, andando più giù possibile
    
        if (node == null)
            return;
    
        var queque = [];
    
        queque.push(node);
    
        var tmp = null;
        
        while(queque.length > 0){   // Itero fin che la stringa non risulta vuota
            tmp = queque.shift();   // Prendo il primo elemento dalla lista
    
            // Se ho un sottoalbero sinistro lo aggiungo alla coda, stessa cosa per il sottoalbero destro
    
            if (tmp.left != null)
                queque.push(tmp.left);
    
            if (tmp.right != null)
                queque.push(tmp.right);
        }
    
        return tmp;
    }
    
    /**
     * Preleva il nodo contenente tale valore
     * 
     * @param {Number} val Valore cercato nel nodo
     * @param {Node} node Root dell'albero
     * @returns {Node} Nodo contenente tale valore
     */
    getNode(val, node = this.root){
        if (node == null)
            return null;
    
        if (node.val == val)
            return node;
        else if (this.search(val, node.left))
            return this.getNode(val, node.left);
        else if (this.search(val, node.right))
            return this.getNode(val, node.right);
    }
    
    deleteNodeInBinaryTree(val, tree = this.root){
        // Cerco il nodo, inverto il valore con quello in una foglia e rimuovo quella foglia 
    
        var tree = this.getNode(tree, val);
    
        var deepestNode = this.deepestNode(tree);
    
        var tmp = deepestNode.val;
        deepestNode.val = tree.val;
        tree.val = tmp;
    
        // A questo punto è necessario andare a rimuovere il deepest node.
        var prev = null;
    
        // Procedo con una Preorder visit iterativa per andare a rimuovere tale nodo
        // Non verifico il null in quanto sicuramente ci saranno dei nodi
        
        var stack = [];
    
        stack.push(tree);
    
        var prec = null;
    
        while (stack.length > 0){
    
            var tmp = stack[stack.length -1];
            
            stack.pop();
    
            // nodeValues.push(tmp.val);
    
            // Se il valore non corrisponde continuo con la ricerca, altrimenti setto a null e ritorno
            if ((tmp.right).val != val)
                stack.push(tmp.right);
            else{
                tmp.right = null;
                break;
            }
    
            if ((tmp.left).val != val)
                stack.push(tmp.left);
            else{
                tmp.left = null;
                break;
            }
        }
    }
    
    /**
     * Calcola il numero di foglie in un albero
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Numero di foglie in un albero
     */
    countLeaves(node = this.root){
        // Le leaves sono nodi che non hanno figli
    
        if (node == null)
            return 0;
    
        var count = 0;
        var queque = [];
    
        queque.push(node)
    
        while (queque.length > 0){
            var tmp = queque.shift();
    
            if (tmp.left != null){
                queque.push(tmp.left);
                
                if (tmp.right != null)
                    queque.push(tmp.right);
            }
            else{   // left = null
                if (tmp.right == null)  // Ho una foglia
                    count += 1;
                else    // right != null quindi aggiungo right
                    queque.push(tmp.right);
            }
        }
    
        return count;
    }
    
    /**
     * Calcola il numero di nodi completi in un albero.
     * Per nodi completi si intendono i nodi con entrambe i figli
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Numero di nodi completi nell'albero
     */
    countFullNodes(node = this.root){
    
        if (node == null)
            return 0;
    
        var count = 0;
        var queque = [];
    
        queque.push(node)
    
        while (queque.length > 0){
            var tmp = queque.shift();
            
            if (tmp.left != null){
                queque.push(tmp.left);
    
                if (tmp.right != null){
                    count += 1;
    
                    queque.push(tmp.right);
                }
            }
        }
    
        return count;
    }
    
    /**
     * Calcola il numero di halfNodes in un albero.
     * Per nodi completi si intendono i nodi con entrambe i figli
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Numero di halfNodes nell'albero
     */
    countHalfNodes(node = this.root){
        // Gli half nodes sono nodi che hanno un solo figlio
    
        if (node == null)
            return 0;
    
        var count = 0;
        var queque = [];
    
        queque.push(node)
    
        while (queque.length > 0){
            var tmp = queque.shift();
            
            if (tmp.left != null){
                queque.push(tmp.left);
    
                if (tmp.right == null)
                    count += 1;
            }
            else{
                if (tmp.right != null){
                    queque.push(tmp.right);
                    count += 1;
                }
            }
        }
    
        return count;
    }
    
    /**
     * Compara due alberi
     * 
     * @param {Node} a Root del primo albero
     * @param {Node} b Root del secondo albero
     * @returns {Boolean} Valore booleano per indicare l'uguaglianza dei due alberi
     */
    equals(a, b = this.root){
        if (a == null && b == null)
            return true;
        else if (a == null || b == null)
            return false;
        else{
            if (a.val == b.val)
                return true && (this.equals(a.left, b.left) && this.equals(a.right, b.right));
            else
                return false;
        }
    }
    
    /**
     * Calcola la somma massima di un livello in un albero
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Somma massima in un livello
     */
    maxLevelSum(node = this.root){
        // Per sommare i valori di ogni livello vado a inserire il nodo e un terminatore (in questo caso il null). Ad ogni nodo letto si va ad inserire anche i relativi figli e sommo il valore di tale nodo.
        // Una volta letto il null si compara la somma con la precedente dichiarata massima e si inserisce il null per indicare che tutti i nodi di quel layer sono stati inseriti
    
        var nodes = [];
    
        var maxSum = null;
        var levelSum = 0;
    
        nodes.push(node);   // Inserisco il primo nodo
        nodes.push(null);   // Inserisco il terminatore
    
        while (nodes.length > 0){
            // Uso il null come separatore
            var tmp = nodes.shift();
    
            if (tmp == null){
                // Terminata la lettura del layer
                if (maxSum == null || levelSum > maxSum)
                    maxSum = levelSum;
    
                // Avendo finito di leggere il layer è anche terminato l'inserimento dei relativi figli, quindi è necessario chiudere il layer inserendo un null
    
                levelSum = 0;   // Resetto la somma per conteggiare i successivi
    
                if (nodes.length > 0)
                    nodes.push(null);
    
            }
            else{
                // Sommo il valore letto e faccio l'enque dei figli destro e sinistro
                levelSum = node.val;
                
                // Inserisco solo se è diverso da null che essendo il carattere terminatore del layer andrebbe in conflitto
                if (node.left != null)
                    nodes.push(node.left);
                
                if (node.right != null)
                    nodes.push(node.right);
            }
    
        }
    
        return maxSum;
    }
    
    /**
     * Verifica l'esistenza di un path a partire dalla root a un nodo qualsiasi la cui somma di tali nodi è pari al valore passato come parametro
     * 
     * @param {Number} sum Somma che devono avere tutti i nodi nel path
     * @param {Node} node Root dell'albero
     * @returns 
     */
    hasPathSum(sum, node = this.root){
    
        if (node == null)
            return (sum == 0);  // Non esiste una path
    
        else{
            var remaingSum = sum - node.val;
    
            if ((node.left != null && node.right != null) || !(node.left != null && node.right != null))
                return this.hasPathSum(remaingSum, node.left) && this.hasPathSum(remaingSum, node.right);
            else if (node.left != null)
                return this.hasPathSum(remaingSum, node.left);
            else
                return this.hasPathSum(remaingSum, node.right);
        }
    }
    

    /**
     * Somma il valore di tutti i nodi presenti nell'albero
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Somma del valore di tutti i nodi presenti nell'albero
     */
    sumAllNodes(node = this.root){
        if (node == null)
            return 0;
    
        return node.val + this.sumAllNodes(node.left) + this.sumAllNodes(node.right);
    }
    
    /**
     * Somma il valore di tutti i nodi presenti nell'albero implementata mediante iterazione
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Somma del valore di tutti i nodi presenti nell'albero
     */
    sumAllNodesIterative(node = this.root){
    
        if (node == null)
            return 0;
    
        var sum = 0;
        var nodes = [];
    
        nodes.push(node);
    
        while (nodes.length > 0){
            var tmp = nodes.shift();
    
            // Sommo il valore
            sum += tmp.val;
    
            if (sum.left != null)
                nodes.push(sum.left);
            
            if (sum.right != null)
                nodes.push(sum.right);
        }
    
        return sum;
    }
    
    /**
     * Specchia l'albero
     * 
     * @param {Node} node Root dell'albero da specchiare
     */
    mirrorTree(node = this.root){
        if (node != null){
            this.mirrorTree(node.left);
            this.mirrorTree(node.right);
    
            var tmp = node.right;
            node.right = node.left;
            node.left = tmp;
        }
    }
    
    /**
     * Verifica se l'albero a è specchiato rispetto all'albero b
     * 
     * @param {Node} a Root dell'albero
     * @param {Node} b Root del secondo albero
     * @returns {boolean} Valore che indica se gli alberi sono specchiati
     */
    areMirror(a, b = this.root){
        // Verifica se gli alberi sono specchiati
        if (a == null && b == null)         // Se sono null questi sono uguali
            return true;
        else if (a == null || b == null)    // Se uno è null ritorno false
            return false;
        else if (a.val != b.val)            // Se sono diversi ritorno false
            return false;
        else    // Sono uguali e proseguo con il controllo sulla parte sinistra e destra
            return this.areMirror(a.left, b.left) && this.areMirror(a.right, b.right);
    }
    
    #searchInArray(array, val){
        // Uso la ricerca lineare in quanto l'array non è ordinata
    
        var index = -1;
    
        for (var i = 0; i < array.length; i++){
            if (array[i] == val){
                index = i;
                break;
            }
        }
    
        return index;
    }
    
    verticalSum(hash = {}, node = this.root, column = 0){
        if (node == null)
            return;
    
        this.verticalSum(hash, node.left, column-1);
        if (hash[String(column)] === undefined)
            hash[String(column)] = 0;
        
        hash[String(column)] += node.val;
        this.verticalSum(hash, node.right, column+1);
    }
    
    /**
     * Calcola la profondità minima nell'albero
     * 
     * @param {Node} node Root dell'albero
     * @returns {Number} Profondità minima nell'albero
     */
    getMinDepth(node = this.root){
        if (node == null)
            return 0;
    
        if (node.left == null && node.right == null)
            return 1;
    
        return Math.max(this.getMinDepth(node.left), this.getMinDepth(node.right));
    }

    /**
     * Crea un array con tutti gli elementi disposti in maniera ordinata senza usare metodi di sorting
     * Il metodo è implementato con l'iterazione
     * 
     * @param {Node} tree Root dell'albero
     * @returns {Array} Array contente i valori ordinati
     */
    getSortedArray1(tree = this.root){
        // Procedo con una preOrderVisit iterativa
        // DLR

        if (tree == null)
            return [];

        var list = [];
        var stack = [];

        stack.push(tree);

        while (stack.length > 0){   // Fin che ci sono nodi da analizzare nello stack

            var tmp = stack.pop();

            if (list.length > 0){
                // Si procede con l'ordinamento
                var i;
                for (i = 0; i < list.length; i++){
                    if (list[i] > tmp.val)
                        break;
                }

                var tmpList = list.slice(0,i);
                tmpList.push(tmp.val);

                list = tmpList.concat(list.slice(i, list.length));
            }
            else{
                list.push(tmp.val);
            }

            if (tmp.right != null)
                stack.push(tmp.right);
            
            if (tmp.left != null)
                stack.push(tmp.left);
        }
        
        return list
    }

    /**
     * Crea un array con tutti gli elementi disposti in maniera ordinata usando PreOrderTraversal e metodi di sorting
     * 
     * @param {Node} tree Root dell'albero
     * @returns {Array} Array contente i valori ordinati
     */
    getSortedArray2(tree = this.root){
        return (this.preOrderTraversal()).sort(
            function compare(a, b){
                if (a > b)
                    return 1;
                else
                    return -1;
            }
        );
    }
}

var treeNode = new Node(
    1, 
    new Node(
        2,
        new Node(
            4, 
            null, 
            null
        ),
        new Node(
            5, 
            null, 
            null
        )
    ),
    new Node(
        3, 
        new Node(
            6, 
            null, 
            null
        ),
        new Node(
            7, 
            null, 
            null
        )
    )
);

var tree = new BinaryTree(treeNode);

console.log("PREORDER TRAVERSAL: ", tree.preOrderTraversal());
console.log("PREORDER TRAVERSAL ITERATIVE: ", tree.preOrderTraversalIterative());
console.log("INORDER TRAVERSAL: ", tree.inOrderTraversal());
console.log("INORDER TRAVERSAL ITERATIVE: ", tree.inorderTraversalIterative());
console.log("POSTORDER TRAVERSAL: ", tree.postOrderTraversal());
console.log("POSTORDER TRAVERSAL ITERATIVE: ", tree.postOrderTraversalIterative());

console.log("GETSORTEDARRAY1: ", tree.getSortedArray1());
console.log("GETSORTEDARRAY2: ", tree.getSortedArray2());
