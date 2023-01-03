# Threaded Binary Trees

## Problemi con i normali binary trees

Inorder, preorder e postorder visit si avvalgono spesso di eventuali strutture dati ausiliarie che però occupano molto spazio e l'ordine di stampa dei nodi non lascia ben intendere la struttura dell'albero ed inoltre c'è un eccessivo uso di null pointer.



## Classificazione di threaded binary trees

La classificazione si ha in base a che tipologia di informazioni vengono memorizzate

### Left Threaded binary trees

Albero in cui vengono memorizzate solo le le informazioni riguardo il predecessore

### Right Threaded binary trees

Albero in cui vengono memorizzate solo le le informazioni riguardo il successore

### Threaded binary trees

Albero in cui vengono memorizzate solo le le informazioni riguardo il predecessore e successore

<br>

## Tipi di binary trees

Il puntatore di sinistra conterrà le informazioni riguardo il predecessore e il nodo di sinistra le informazioni riguardo il successore secondo una strategia di visita precisa che varia in base al tipo di albero

- Preorder Threaded Binary Trees
- Inorder Threaded Binary Trees
- Preorder Threaded Binary Trees

## Struttura del nodo di un threaded binary trees

- data
- leftNode
- lTag
- rightNode
- rTag

```javascript
class Node{
    constructor(val, lTag = 1, left = null, rTag = 1, right = this){
        this.val = val;
        this.lTag = lTag;
        this.left = left;
        this.rTag = rTag;
        this.right = right;
    }
}
```

|           | Regular Binary Trees | Threaded Binary Trees |
| --------- | :------------------: | :-------------------: |
| lTag == 0 | NULL                 | punta al in-order predecessor |
| lTag == 1 | Punta ad un nodo     | punta al nodo figlio |
| rTag == 0 | NULL                 | punta al in-order predecessor |
| rTag == 1 | Punta ad un nodo     | punta al nodo figlio |

Nella stessa maniera è possibile definire anche per il postOrder andando semplicemente a cambiare i nodi puntati in caso di tag destro o sinistro = 0

L'albero inizia sempre con un **dummy node** quindi il primo nodo non è la root dell'albero per una migliore gestione della struttura.
Come si può vedere dal codice sopra, il costruttore è settato con parametri di default per la creazione di un dummy node

La procedura di scelta del predecessore può essere automatizzata con il finder proposto in ogni classe