/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    if (root == undefined)
        return [];

    var r = [];
    r.push(root.val);

    r = r.concat(preorderTraversal(root.left));
    r = r.concat(preorderTraversal(root.right));
    
    return r;
};