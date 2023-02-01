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
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
    var results = [];

    var isLeaf = (node) =>{
        return node.left == null && node.right == null;
    }

    var hasPathSum = (sum, node = root, path = []) =>{
        if (node == null)
            return;
        
        if (isLeaf(node) && sum-node.val == 0){
            results.push([...path, node.val]);
            return;
        }
        else{
            // Non escludo una quando l'altra funziona
            hasPathSum(sum-node.val, node.left, [...path, node.val]);
            hasPathSum(sum-node.val, node.right, [...path, node.val]);
        }
    }

    hasPathSum(targetSum)

    return results;
};