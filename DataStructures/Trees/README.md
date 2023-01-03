# Alberi

> **Struttura dati composta da nodi dove ogni nodo punta ad altri nodi detti figli**

**È una struttura dati non lineare ideare per rappresentare gerarchie**
(che cos'è una struttura dati non lineare)
L'ordine degli elementi non è importante come invece può essere in altre strutture dati.

## Glossario
- **Root**: nodo senza genitori e può essercene al più 1 in ogni albero
- **Arco**: link dal padre al figlio
- **Foglia**: nodo senza figli
- **Sibling**: nodi figli del medesimo nodo
- **Ancester**: nodi che appaiono nel percorso dalla root a tale nodo
- **Level**: anche detta profondità è la distanza di un nodo dalla root.
La profondità della root è 0.
- **Height**: lunghezza del path dalla root al nodo con profondità più alta.
Di fatto corrisponde con la massima profondità dell'arco.
- **Dimensione**: numero di nodi di un albero
  
## Possibili operazioni su un albero

- Inserimento di un nodo
- Rimozione di un nodo
- Ricerca di un nodo
- Visite
- Calcolo della dimensione
- Calcolo dell'altezza

## Applicazioni

Sono molteplici le applicazioni che richiedono la gestione di dati mediante alberi ma sicuramente la più emblematica risulta essere la rappresentazione di gerarchie

## Visite

In seguito viene usata una notazione composta da 3 caratteri per descrivere come si svolge la visita dell'albero

- D: lettura del valore del nodo
- L: analisi sottoalbero sinistro
- R: analisi sottoalber destro

Le visite più conosciute sono:

- Preorder traversal
- Inorder traversal
- Postorder traversal

Tutte le visite differiscono fondamentalmente per quando si stampano i nodi e di conseguenza dell'ordine di visita dei sottoalberi

### DLR: preorder traversal

> **Si legge il valore del nodo corrente, si processa il sottoalbero sinistro e successivamente il sottoalbero destro**

Solitamente viene usata per creare copie dell'albero. 
Qualora si analizzi un albero che descrive la costituzione di un espressione questo può essere usato per prelevare il prefisso.

### LDR: inorder traversal

> **Si processa il sottoalbero sinistro, si legge il valore del nodo per poi processare il sottoalbero destro**

### LRD: postorder traversal

> **Si processa il sottoalbero sinistro, successivamente il sottoalbero destro per poi leggere il valore del nodo**

Solitamente utilizzata in fase di eliminazione di nodi dall'albero. 
Viene anche utilizzata per prelevare il suffisso da un albero che rappresenta un espressione.

(cercare una descrizione migliore per le 3 sopra)

Le 3 visite che seguono sono di minore importanza. Sono di fatto alterazioni delle 3 sopra proposte

### DRL

> **Si legge il valore del nodo, si processa il sottoalbero destro e poi quello sinistro**

È un alterazione della preorder traversal

### RDL

> **Si processa il sottoalbero destro, si legge il valore del nodo per poi processare il valore del sottoalbero sinistro**

È un alterazione della inorder traversal

### RLD

> **Si processa il sottoalbero destro, successivamente il sottoalbero sinistro e si legge il valore del nodo**

È un alterazione della post order traversal

## Tipologie di alberi

### Binary trees

> **Albero in cui ogni nodo ha al più due figli**

[File dedicato](./BinaryTrees/README.md)

#### Binary Search Trees

> **Albero in cui i nodi vengono disposti in un certo criterio**

### N-Ary trees

> **Alberi in cui ogni nodo ha al più n figli**

[File dedicato](./NAryTrees/README.md)
