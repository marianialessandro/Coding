class Node{
    constructor(val = undefined, lTag = 1, left = null, rTag = 1, right = this){
        this.val = val;
        this.lTag = lTag;
        this.left = left;
        this.rTag = rTag;
        this.right = right;
    }
}

class ThreadedBinaryTree{
    constructor(node = new Node()){
        this.dummy == null;
    }
}

class InOrderThreadedBinaryTrees extends ThreadedBinaryTree{
    inOrderSuccessor(node = this.dummy){
        /*
            Se il node non ha il sottoalbero destro si ritorna il figlio destro. Altrimenti si scorre la parte sinistra per cercare il nodo il cui sottoalbero sinistro più vicino contiene p
         */

        if (node.rTag == 0)
            return node.right;
        else{
            var p = node.right;
    
            while (p.lTag == 1)
                p = p.left
    
            return position
        }
    }

    inOrderTraversal(node = this.dummy){
        var p = this.findInorderSuccessor();

        while (p != node){
            p = this.findInorderSuccessor(p);
            console.log(p.val)
        }
    }
}

class PreOrderThreadedBinaryTrees extends ThreadedBinaryTree{
    preOrderSuccessor(node = this.dummy){
        /*
            Se node ha un sottoalbero sinistro si ritorna il nodo sinistro. Se non ha un sottoalbero sinistro si procecede con lo scorrere il sottoalbero destro alla ricerca del nodo più vicino del sottoalbero che contiene p
        */

        if (node.lTag == 1)
            return p.left;
        else{
            var p = node;
            while (p.rTag == 0)
                p = p.right;
            
                return p.right
        }
    }

    preOrderTraversal (node = this.dummy){
        var p = preOrderSuccessor(node);

        while (p != root){
            p = this.preOrderSuccessor(p);
            console.log(p.val);
        }
    }

    add(p = this.dummy, node){
        /*
            Il nodo non ha figlio destro si agganciano i nodi e si settano puntatore sinistro e destro.
            Altrimenti si procede con il processare il sottoalbero sinistro per trovare il nodo più a sinistra di tale sottoalbero, aggiungere il nuovo nodo nella posizione linkata dal nodo appena trovato quindi aggiornare i link destro e sinistro
        */

        var tmp;

        node.right = p.right;
        node.rTag = p.rTag;
        node.left = p.left;
        node.lTag = 0;

        p.right = node;
        p.rTag = 1;

        // Caso in cui sia presente il sottoalbero destro
        if (node.rTag == 1){
            tmp = node.right;
        
            while (tmp.lTag)
                tmp = tmp.left;

            tmp.left = node;
        }
        
    }

}
