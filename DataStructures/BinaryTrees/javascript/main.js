class Node{
    constructor(val, left = null, right = null){
        this.val = val;
        this.left = left;
        this.right = right;
    }
}


function preOrderTraversal(node){
    // DLR: consist in print the value of tmp node, process the left subtree then the right subtree

    var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order

    if (node != null){
        nodeValues.push(node.val);
        nodeValues = nodeValues.concat(preOrderTraversal(node.left));
        nodeValues = nodeValues.concat(preOrderTraversal(node.right));
    }

    return nodeValues;
}

function preOrderTraversalIterative(node){

    if (node == null)
        return;

    var nodeValues = [];
    
    var stack = [];

    stack.push(node);

    var prec = null;

    while (stack.length > 0){

        var tmp = stack[stack.length -1];
        
        stack.pop();

        nodeValues.push(tmp.val);

        // Metto nello stack prima destra e poi sinistra dato che prima devo processare la parte destra e poi la sinistra
        stack.push(tmp.right);
        stack.push(tmp.left);
    }

    return nodeValues;
}

function inOrderTraversal(node){
    // LDR: consist in process the left subtree after that the value of the tmp node than process the right subtree

    var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order
    if (node != null){
        nodeValues = nodeValues.concat(inOrderTraversal(node.left));
        nodeValues.push(node.val);
        nodeValues = nodeValues.concat(inOrderTraversal(node.right));
    }

    return nodeValues;
}

function inorderTraversalIterative(node){
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
}

function postOrderTraversal(node){
    // LRD: consist in process the left subtree, process the right subtree then print the value of the tmp node

    var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order

    if (node != null){
        nodeValues = nodeValues.concat(postOrderTraversal(node.left));
        nodeValues = nodeValues.concat(postOrderTraversal(node.right));
        nodeValues.push(node.val);
    }

    return nodeValues;
}

function postOrderTraversalIterative(node){
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
                list.push(tmp.data);
            }
                
            /* go up the tree from right node and after coming back
            from right node process parent and pop stack */
        }
        else if (tmp.right == prev){
            stack.pop();
            list.push(tmp.data);
        }

        prev = tmp;
    }

    return nodeValues;
}

function DRL(node){
    // DRL: consist in print the value of the tmp node, process the right subtree then the left subtree

    var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order

    if (node != null){
        nodeValues.push(node.val);
        nodeValues = nodeValues.concat(postOrderTraversal(node.right));
        nodeValues = nodeValues.concat(postOrderTraversal(node.left));
    }

    return nodeValues;
}

function RDL(node){
    // RDL: consist in process the right subtree, print the value of tmp node then process the left subtree

    var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order

    if (node != null){
        nodeValues = nodeValues.concat(postOrderTraversal(node.right));
        nodeValues.push(node.val);
        nodeValues = nodeValues.concat(postOrderTraversal(node.left));
    }

    return nodeValues;
}

function RLD(node){
    // RLD: consist in process the right subtree, process the left subtree then print the value of the tmp node

    var nodeValues = [];    // List wich contains all the node values of a tree in base of the visit order

    if (node != null){
        nodeValues = nodeValues.concat(postOrderTraversal(node.right));
        nodeValues = nodeValues.concat(postOrderTraversal(node.left));
        nodeValues.push(node.val);
    }

    return nodeValues;
}

function levelOrderTraversal(node){
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

function getMaxVal(node){
    // Cerco il massimo a sinistra, cerco il massimo a destra, confronto con la root
    
    // Complessità: O(n)
        // L'algoritmo è ottimo in quanto non avendo un albero binario di ricerca non è presente un ordine di disposizione dei nodi ben preciso quindi è necessario confrontare tutti i valori all'interno di un array

    if (node == null)
        return;
    
    var values = [];

    values.push(node.val);              // Aggiungo il valore della root

    var v = getMaxVal(node.left);

    if (v != undefined){
        // Significa che il sottoalbero sinistro contiene valori
        values.push(v);
    }

    v = getMaxVal(node.right);

    if (v != undefined){
        // Significa che il sottoalbero destro contiene valori
        values.push(v);
    }

    return Math.max(...values);
}

function search(node, val){
    // Mi avvalgo di un alterazione di una DLR visit (PREORDER). Scelgo la DLR in quanto qualora il valore fosse il primo modo non proseguo con la ricerca di esso in altri sottoalberi

    if (node == null)
        return false;

    if (node.val == val || search(node.left, val) || search(node.right, val))
        return true;    // Significa che ho trovato il valore nel nodo attuale, nel sotto albero sinistro oppure nel sotto albero destro
    else
        return false;
}

function searchIterative(node, val){
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

function insertNodeInTree(tree, val){
    var nodes = [];

    nodes.push(tree);

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

function size(tree){
    if (tree == null)
        return 0;
    
    return size(tree.left) + size(tree.right) + 1;
}

function sizeIterative(tree){
    if (tree == null)
        return 0;

    var nodes = [];

    var count = 0;

    nodes.push(tree);

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

function removeSubtreeOfNode(tree, node){
    if (node == null)
        return;
    
    if (!search(tree, node))
        return;
    
    // Eseguo una Preorder traversal e setto a null quando trovo tale nodo

    if (tree.val == node){
        tree.left = null;
        tree.right = null;
    }
    else{
        removeSubtreeOfNode(tree.left, node);
        removeSubtreeOfNode(tree.right, node);
    }

    return;
}

function getHeight(tree){
    if (tree == null)
        return 0;
    
    const leftHeight = getHeight(tree.left);
    const rightHeight = getHeight(tree.right);

    return Math.max(leftHeight, rightHeight) + 1;
}

function getHeightIterative(tree){
    if (tree == null)
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
}

// PROBLEMA SOPRA DA RIVEDERE BENE

function deepestNode(tree){
    // Itero sui nodi, andando più giù possibile

    if (tree == null)
        return;

    var queque = [];

    queque.push(tree);

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

function getNode(node, val){
    if (node == null)
        return false;

    if (node.val == val || search(node.left, val) || search(node.right, val))
        return node;    // Significa che ho trovato il valore nel nodo attuale, nel sotto albero sinistro oppure nel sotto albero destro
    else
        return false;
}

function deleteNodeInBinaryTree(tree, val){
    // Cerco il nodo, inverto il valore con quello in una foglia e rimuovo quella foglia 

    var node = getNode(tree, val);

    var deepestNode = deepestNode(tree);

    var tmp = deepestNode.val;
    deepestNode.val = node.val;
    node.val = tmp;

    // A questo punto è necessario andare a rimuovere il deepest node.
    var prev = null;

    // Procedo con una Preorder visit iterativa per andare a rimuovere tale nodo
    
    // Non verifico il null in quanto sicuramente ci saranno dei nodi
    
    var stack = [];

    stack.push(node);

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

function countLeaves(tree){
    // Le leaves sono nodi che non hanno figli

    if (tree == null)
        return 0;

    var count = 0;
    var queque = [];

    queque.push(tree)

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

function countFullNodes(tree){
    // Full nodes sono nodi che hanno entrambe i figli

    if (tree == null)
        return 0;

    var count = 0;
    var queque = [];

    queque.push(tree)

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

function countHalfNodes(tree){
    // Gli half nodes sono nodi che hanno un solo figlio

    if (tree == null)
        return 0;

    var count = 0;
    var queque = [];

    queque.push(tree)

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

function compareTrees(a, b){
    if (a == null && b == null)
        return true;
    else if (a == null || b == null)
        return false;
    else{
        if (a.val == b.val)
            return true && (compareTrees(a.left, b.left) && compareTrees(a.right, b.right));
        else
            return false;
    }
}

function diameter(tree){
    
}

function maxLevelSum(tree){
    // Per sommare i valori di ogni livello vado a inserire il nodo e un terminatore (in questo caso il null). Ad ogni nodo letto si va ad inserire anche i relativi figli e sommo il valore di tale nodo.
    // Una volta letto il null si compara la somma con la precedente dichiarata massima e si inserisce il null per indicare che tutti i nodi di quel layer sono stati inseriti

    var nodes = [];

    var maxSum = null;
    var levelSum = 0;

    nodes.push(tree);   // Inserisco il primo nodo
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
            levelSum = tree.val;
            
            // Inserisco solo se è diverso da null che essendo il carattere terminatore del layer andrebbe in conflitto
            if (tree.left != null)
                nodes.push(tree.left);
            
            if (tree.right != null)
                nodes.push(tree.right);
        }

    }

    return maxSum;
}

function hasPathSum(tree, sum){
    // Verifica l'esistenza di un path a partire dalla root a un nodo qualsiasi

    if (tree == null)
        return (sum == 0);  // Non esiste una path

    else{
        var remaingSum = sum - tree.val;

        if ((tree.left != null && tree.right != null) || !(tree.left != null && tree.right != null))
            return hasPathSum(tree.left, remaingSum) && hasPathSum(tree.right, remaingSum);
        else if (tree.left != null)
            return hasPathSum(tree.left, remaingSum);
        else
            return hasPathSum(tree.right, remaingSum);
    }
}

function sumAllNodes(tree){
    if (tree == null)
        return 0;

    return tree.val + sumAllNodes(tree.left) + sumAllNodes(tree.right);
}

function sumAllNodesIterative(tree){

    if (tree == null)
        return 0;

    var sum = 0;
    var nodes = [];

    nodes.push(tree);

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

function mirrorTree(tree){
    if (tree != null){
        mirrorTree(tree.left);
        mirrorTree(tree.right);

        var tmp = tree.right;
        tree.right = tree.left;
        tree.left = tmp;
    }
}

function areMirror(a, b){
    // Verifica se gli alberi sono specchiati
    if (a == null && b == null)         // Se sono null questi sono uguali
        return true;
    else if (a == null || b == null)    // Se uno è null ritorno false
        return false;
    else if (a.val != b.val)            // Se sono diversi ritorno false
        return false;
    else    // Sono uguali e proseguo con il controllo sulla parte sinistra e destra
        return areMirror(a.left, b.left) && areMirror(a.right, b.right);
}

function searchInArray(array, val){
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

function createBinaryTree(inOrderTraversal, preOrderTraversal){
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
    
    console.log("inorder: ", inOrderTraversal.length, " --- pre: ", preOrderTraversal.length);

    if (inOrderTraversal.length == 1){
        console.log("LEN: 1");
        return new Node(inOrderTraversal[0], null, null);
    }
    else if (inOrderTraversal.length != preOrderTraversal.length){
        console.log("ERROR");
        return; // Ritorno undefined in segno di errore
    }

    // console.log("INORDER: ", inOrderTraversal);
    // console.log("PREORDER: ", preOrderTraversal);

    // 1. Cerco l'indice della root nella inorderVisit
        // Il valore della root nella preOrder è facilmente accessibile sapendo che è in prima posizione        
    const inOrderRootIndex = searchInArray(inOrderTraversal, preOrderTraversal[0]);
    var inOrderLastLeftSubtreeNodeIndex = -1;
    switch(inOrderRootIndex){
        case 0:
            // se valesse 0 o è l'unico nodo dell'array oppure non a nodi a sx -> da valutare questa cosa
            break;
        case -1:
            console.log("ROOT NON PRESENTE NELLA INORDER VISIT")
            return undefined;   // Ritorno undefined in segno di errore
            break;
        default:    // Ho a sinistra l'ultimo nodo del left subtree
            inOrderLastLeftSubtreeNodeIndex = inOrderRootIndex-1;
            break;
    }

    // Cerco l'ultimo nodo del sottoalbero sinistro nella preorder visit
    var preOrderLastLeftNodeIndex = searchInArray(preOrderTraversal, inOrderTraversal[inOrderLastLeftSubtreeNodeIndex]);
    
    // A questo punto è possibile comporre le array 
    
    // leftInorder: 0, root-1
    var leftInorder = inOrderTraversal.slice(0, inOrderRootIndex);
    // leftPreOrder: 1, preOrderLastLeftNodeIndex+1
    var leftPreOrder = preOrderTraversal.slice(1, preOrderLastLeftNodeIndex+1);

    // rightInorder= root+1, len

    /*
    var rightInorder = null;
    if (inOrderRootIndex + 1 != inOrderTraversal.length)    // Se la root è l'ultimo nodo non ho un sottoalbero destro
        rightInorder = inOrderTraversal.slice(inOrderRootIndex + 1, inOrderTraversal.length)

    // rightPreOrder = preOrderLastLeftNodeIndex+1, len
    var rightPreOrder = null;
    
    if (rightInorder != null)   // Se != null ho un sottoalbero destro, altrimenti non ci sarebbe un sottoalbero destro
        rightPreOrder = preOrderTraversal.slice(preOrderLastLeftNodeIndex+1, preOrderTraversal.length);
    */
    var rightInorder = inOrderTraversal.slice(inOrderRootIndex + 1, inOrderTraversal.length);
    var rightPreOrder = preOrderTraversal.slice(preOrderLastLeftNodeIndex+1, preOrderTraversal.length);

    return new Node(
        preOrderTraversal[0], 
        createBinaryTree(leftInorder, leftPreOrder), 
        createBinaryTree(rightInorder, rightPreOrder)
    );
}

// Creare un array a partire da un albero
// Creare un array ordinato a partire da un albero
// Creare un albero a partire da un array

// --------------------------------------------------
// TEST

/*
var tree = new Node(1, 
    new Node(2,
        new Node(4, null, null),
        new Node(5, null, null)
        ),
    new Node(3, 
        new Node(6, null, null),
        new Node(7, null, null)
        )
    );

var tree2 = new Node(1, 
    new Node(15,
        new Node(4, null, null),
        new Node(5, null, null)
        ),
    new Node(3, 
        new Node(6, null, null),
        new Node(7, null, null)
        )
    );

var tree3 = new Node(1, 
    new Node(2,
        new Node(4, null, null),
        new Node(5, null, null)
        ),
    new Node(3, 
        new Node(16, null, null),
        new Node(7, null, null)
        )
    );

console.log("PRE ORDER: ", preOrderTraversal(tree));
console.log("IN ORDER: ", inOrderTraversal(tree));
console.log("POST ORDER: ", postOrderTraversal(tree));

console.log("LEVEL ORDER: ", levelOrderTraversal(tree));

console.log(getMaxVal(tree));
console.log(getMaxVal(tree2));
console.log(getMaxVal(tree3));

console.log("RICERCA DI 4: ", search(tree, 4));
console.log("RICERCA DI 12: ", search(tree, 55));

var tree4 = new Node(1, 
    new Node(2,
        new Node(4, null, null),
        new Node(5, null, null)
        ),
    new Node(3, 
        new Node(6, null, null),
        new Node(7, null, null)
        )
    );

insertNodeInTree(tree4, 12);

console.log("POST ORDER SU TREE4: ", postOrderTraversal(tree4));
console.log("LEVEL ORDER SU TREE4: ", levelOrderTraversal(tree4));

console.log("SIZE: ", size(tree));
console.log("SIZE ITERATIVE: ", sizeIterative(tree));

console.log("NUMERO DI FOGLIE: ", countLeaves(tree));
*/

var inOrderTraversalList = [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90];
var preOrderTraversalList = [25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90];

var generatedTree = createBinaryTree(inOrderTraversalList, preOrderTraversalList);
console.log("PRE ORDER: ", preOrderTraversal(generatedTree));
console.log("IN ORDER: ", inOrderTraversal(generatedTree));
console.log("LEVEL ORDER: ", levelOrderTraversal(generatedTree));

/*
    PRE ORDER:  (15) [25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90]
    IN ORDER:  (15) [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90]
    LEVEL ORDER:  (15) [25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90]
*/

console.log("PARTE 2");

inOrderTraversalList = [3,2,4,1,6,5];
preOrderTraversalList = [1,2,3,4,5,6];

generatedTree = createBinaryTree(inOrderTraversalList, preOrderTraversalList);
console.log("PRE ORDER VISIT: ", preOrderTraversal(generatedTree));
console.log("IN ORDER VISIT: ", inOrderTraversal(generatedTree));
console.log("LEVEL ORDER VISIT: ", levelOrderTraversal(generatedTree));

console.log("ALBERO PER COMPOSIZIONE VISITE")
var treeProva = new Node(
    1,
    new Node(
        2, 
        null, 
        new Node(
            4, 
            null, 
            null
            )
        ),
    new Node(
        5,
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

console.log("PRE ORDER VISIT: ", preOrderTraversal(treeProva));
console.log("IN ORDER VISIT: ", inOrderTraversal(treeProva));
console.log("LEVEL ORDER VISIT: ", levelOrderTraversal(treeProva));

console.log("PARTE 3");

inOrderTraversalList = [2,4,1,6,5,7];
preOrderTraversalList = [1,2,4,5,6,7];

generatedTree = createBinaryTree(inOrderTraversalList, preOrderTraversalList);
console.log("PRE ORDER VISIT: ", preOrderTraversal(generatedTree));
console.log("IN ORDER VISIT: ", inOrderTraversal(generatedTree));
console.log("LEVEL ORDER VISIT: ", levelOrderTraversal(generatedTree));

// fino a pagina 146
