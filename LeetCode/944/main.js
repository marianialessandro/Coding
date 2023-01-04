/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function(strs) {
    var count = 0;
    for (var i = 0; i < strs[0].length; i++){
        for (var j = 0; j < strs.length - 1; j++){
            if (strs[j].charAt(i) > strs[j+1].charAt(i)){
                count++;
                break;
            }
        }
    }

    return count;
};