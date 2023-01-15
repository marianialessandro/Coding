/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    var string = "";
    var splitted = s.split(" ");

    splitted.forEach((item, index) =>{
        for (var i = item.length-1; i >= 0; i--){
            string = string + item.charAt(i);
        }

        if (index != splitted.length - 1)
            string = string + " ";
    })

    return string;
};

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords2 = function(s) {
    // console.log(s);

    var string = "";
    var start = 0;

    while (string.length < s.length){
        // Cerco l'occorrenza dello spazio nel range
        var pos = s.indexOf(" ", start);

        if (pos == -1)
            pos = s.length;

        // console.log("START: ", start, " POS: ", pos);

        for (var index = pos-1; index >= start; index--){
            string = string + s.charAt(index);
        }

        if (string.length < s.length)
            string = string + " ";  // Vanno inserite altre parole
        
        start = pos+1;
    }

    return string;
};

console.log(reverseWords2("Let's take LeetCode contest"));