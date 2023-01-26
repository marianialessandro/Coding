/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (head == null || head.next == null)
        return head;

    var result = new ListNode(head.val);
    head = head.next;

    // Head indica il primo nodo, tail l'ultimo
	
    while (head != null){
        var node = new ListNode(head.val);
        node.next = result;

        result = node;

        head = head.next;
    }

    // return result;
    return result;
};