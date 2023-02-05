/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var findAnagrams = function (s, p) {
    // initialize output array to be returned at the end and neededChars object to store the chars in p.
    const output = [];
    const neededChars = {};
    
    for (let char of p) {
        // Se il carattere è già presente nella map incremento il valore associato, altrimenti lo inizializzo
        if (char in neededChars)
            neededChars[char]++
        else 
            neededChars[char] = 1
    }
    
    let left = 0;
    let right = 0; 
    let count = p.length 
    
    while (right < s.length) {
        
        // Decremento in quanto un occorrenza del carattere è stata individuata
        if (neededChars[s[right]] > 0) 
            count--;
        
        // Decremento di un carattere
        neededChars[s[right]]--;
        right++;    // Sposto a destra di un carattere
        
        // Se non mancano altri caratteri alla costruzione dell'anagramma inserisco l'indice sinistro
        if (count === 0) 
            output.push(left);
        
        // Quando la finestra ha raggiunto la dimensione di P si procede con il reinizializzare la hashmap precedentemente decrementata così come il contatore
        if (right - left == p.length) {
            
            if (neededChars[s[left]] >= 0) 
                count++;
            
            // re incremento il valore del carattere puntato a sinistra dalla hashmap in modo da resettarla per usi futuri
            neededChars[s[left]]++;
            left++;
        }
    }
    return output;
};