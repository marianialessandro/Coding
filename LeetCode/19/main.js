/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    var tmp1 = head;
    var tmp2 = head;
    
    for (var i = 0; i < n; i++) 
        tmp1 = tmp1.next;

    if (!tmp1)
        return head.next;
    
    while (tmp1.next){
        tmp1 = tmp1.next;
        tmp2 = tmp2.next;
    }
    
    tmp2.next = tmp2.next.next
    return head
};  