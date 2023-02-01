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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    var isLeaf = (node) =>{
        return node.left == null && node.right == null;
    }

    if (root == null)
        return false;
    
    if (isLeaf(root) && targetSum-root.val == 0)
        return true;
    else
        return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val); 
};