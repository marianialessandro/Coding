/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let output = [];

    var initializeArray = (n, val) => {

        var result = [];

        for (var i = 0; i < n; i++)
            result.push(val);

        return result;
    }

    var backtracking = (permutation = [], num = nums, visited = initializeArray(num.length, false)) =>{

        if (permutation.length == num.length)
            output.push([...permutation]);
        else{
            for (var i = 0; i < num.length; i++){
                // Controllo che l'elemento i-esimo non sia già stato utilizzato
                if (visited[i] == true)  // Significa che l'elemento è già stato utilizzato, quindi procedo con il prossimo
                    continue;
                
                permutation.push(num[i]);
                visited[i] = true;

                backtracking(permutation, num, visited);
                
                permutation.pop();
                visited[i] = false;
            }
        }
    }

    backtracking(); // Richiamo la

    return output;
};