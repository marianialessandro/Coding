import BinaryTree, {Node} from '../BinaryTree.mjs';

class BinarySearchTree extends BinaryTree{
    add(){

    }

    remove(){
        
    }
}

var tree = new BinarySearchTree(
    new Node(
        2,
        new Node(
            0
        ),
        new Node(
            3,
            null,
            new Node(
                4
            )
        )
    )
);

console.log(tree.preOrderTraversal());
console.log(tree.getOrderedArray());
