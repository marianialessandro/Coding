/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    
    var checkSubstring = (s1, s2) =>{

        var obj = {};

        for (var i = 0; i < s2.length; i++){
            if (!s1.includes(s2.charAt(i))) // Se il carattere è contenuto solo da una parte e non dall'altra non ha senso fare la valutazione
                return false;
            else{
                if (obj[s2.charAt(i)] == undefined){
                    obj[s2.charAt(i)] = {
                        "s1": 0,
                        "s2": 0
                    }
                }
                if (obj[s1.charAt(i)] == undefined){
                    obj[s1.charAt(i)] = {
                        "s1": 0,
                        "s2": 0
                    }
                }

                // La posizione esiste ed incremento per quanto riguarda s2
                obj[s2.charAt(i)]["s2"]++;
                obj[s1.charAt(i)]["s1"]++;
            }
        }

        // Itero su tutte le chiavi
        for (const key in obj) {
            if (obj[key]["s1"] != obj[key]["s2"])
                return false;
        }

        return true;
    }

    for (var i = 0; i+s1.length <= s2.length; i++){
        if (checkSubstring(s2.substring(i, i+s1.length), s1))
            return true;
    }

    return false;
};