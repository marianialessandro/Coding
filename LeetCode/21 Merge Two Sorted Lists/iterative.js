/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {

    /**
     * Inserisce il nodo nella lista e ritorna l'ultimo nodo della lista
     * 
     * @param {ListNode} list Ultimo nodo della lista
     * @param {ListNode} node Nodo da inserire
     */
    var insert = (list, node) =>{
        list.next = node;
        return list.next;
    }

    var result = new ListNode();   // DummyNode

    var results = result;

    while (list1 != null && list2 != null){
        // Confronto
        if (list1.val < list2.val){
            // List1 è il più piccolo
            // results.next = new ListNode(list1.val);
            
            results = insert(results, new ListNode(list1.val));
            list1 = list1.next;
        }
        else if (list1.val == list2.val){
            // I valori sono uguali

            results = insert(results, new ListNode(list1.val));
            results = insert(results, new ListNode(list2.val));

            list1 = list1.next;
            list2 = list2.next;
        }
        else{
            // List2 è il più piccolo
            results = insert(results, new ListNode(list2.val));
            list2 = list2.next;
        }
    }

    while (list1 != null){
        // console.log("LIST 1 IN WHILE")
        results = insert(results, new ListNode(list1.val));
        list1 = list1.next;
    }

    while (list2 != null){
        // console.log("LIST 2 IN WHILE")
        results = insert(results, new ListNode(list2.val));
        list2 = list2.next;
    }

    return result.next;
};