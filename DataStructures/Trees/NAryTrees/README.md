# N-Ary Trees

> **Alberi in cui ogni nodo ha al più n figli**

Essendo che il numero di figli risulta essere variabile non è possibile impostare una field per ogni possibile figlio. Di conseguenza è necessario utilizzare un sistema di linking fra i nodi, oppure andare a realizzare un array dove i nodi vengono inseriti da sinistra a destra.

In questo caso come implementazione viene utilizzata quella del linking fra oggetti dove si ha una field per i figli e una per i nodi dello stesso livello.
