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
var middleNode = function(head) {
    var listLen = (head) =>{
        var count = 0;

        while (head != null){
            count ++;
            head = head.next;
        }

        return count;
    }

    var size = listLen(head);
    
    for (var i = 0; i < size; i++, head = head.next){
        if (i == Math.floor(size/2)){
            console.log(i, " ", head.val);
            return head;
        }
    }
};