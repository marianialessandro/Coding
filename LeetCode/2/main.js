/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    var result = new ListNode();
        // Uso un dummy node
    var tmp = result;

    var carry=0;
    while(l1!=null || l2!=null || carry!=0){
        var sum=0;
        
        if(l1!=null){
            sum+=l1.val;
            l1=l1.next;
        }

        if(l2!=null){
            sum+=l2.val;
            l2=l2.next;
        }

        sum += carry;
        carry = Math.floor(sum/10); // Elimino le unità del numero, quello che rimane sarà il riporto
        tmp.next = new ListNode(sum%10);
        tmp = tmp.next;
    }
    
    return result.next;
};
