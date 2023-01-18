/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    var left = 0;
        // Indice di sinistra su aumento manuale
    var max = 0;

    var map = new Map();

    for (let i = 0; i < s.length; i++) {

        // Controllo se il valore esiste con il range attuale. Qualora esista incremento l'indice di sinistra in base al primo valore in cui appare questo carattere duplicato e lo escludo (questo perchè nella nuova substring sarà comunque compreso)
        if (map.get(s[i]) >= left)
            left = map.get(s[i]) + 1;

        map.set(s[i], i);

        max = Math.max(
            max,
            i - left + 1
        );
    }

    return max;
};