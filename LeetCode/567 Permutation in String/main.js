/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    var compareSortedArray = (a1, a2) =>{
        if (a1.length != a2.length)
            return false;  

        var flag = true;

        a1.forEach((element, index) => {
            if (a2[index] != element){
                flag = false;
                return;
            }
        });

        return flag;
    };

    /**
     * Ritorna un array contenente i singoli caratteri ordinata alfabeticamente
     * 
     * @param {string} s 
     */
    var createSortedArray = (s) => {
        var elements = Array.from(s);

        elements.sort(function(a, b){	
            if (a < b)
                return -1;
            else
                return 1;
        });

        return elements;
    }

    var elements = createSortedArray(s1);

    for (var i = 0, substring = createSortedArray(s2.substring(i, elements.length)); i < s1.length; i++, substring = createSortedArray(s2.substring(i, elements.length))){
        if (compareSortedArray(elements, substring))
            return true;
    }

    return false;
};