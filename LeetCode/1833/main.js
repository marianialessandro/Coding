/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
var maxIceCream = function(costs, coins) {
    costs.sort(function(a, b){	
        if (a < b)
            return -1;
        else
            return 1;
    });

    var count = 0;

    costs.forEach(element => {
        if (element <= coins){
            count++;
            coins -= element;
        }
        else
            return;
    });

    return count;
};