/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
	let output = [];
	
    const backtrack = (first = 1, arr = []) => {
        if (arr.length == k) {	// Quindi se l'array contiene tutti gli elementi necessari per costituire la coppia
            output.push(arr);
        }
        if (arr.length < k)
            for (let i = first; i <= n; i++) {
                arr.push(i);
                backtrack(i + 1, arr);
                arr.pop();
            }
    }

    backtrack();
    return output;
};
