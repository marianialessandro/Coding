/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    /**
     * @param {character[]} s: stringa da ruotare
     * @param {int} left: estremo sinistro dell'array da ruotare
     * @param {int} right: estremo destro dell'array da ruotare (non compreso)
     */
    var reverse = (s, left = 0, right = s.length) => {
        if (left < 0 || right < 0)
            return;

        for (var first = left, last = right-1; first < last; first++, last--){
            var tmp = s[last];
            s[last] = s[first];
            s[first] = tmp;
        }
    }

    reverse(s)
};