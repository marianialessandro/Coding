/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {

    var arr = s.split('');

    for (let i = 0; i < arr.length; i += 2 * k) {

        for (var first = i, last = i+k-1; first < last; first++, last--){
            console.log("GIRO");

            console.log("l: ", first, " right: ", last);

            var tmp = arr[last];
            arr[last] = arr[first];
            arr[first] = tmp;
        }
    }

    return arr.join('');    // Ricostruisco
};