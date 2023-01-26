/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function(s) {
    let output = [];

    var backTrack = (str, i) => {
        if (str.length === s.length) {
            output.push(str);
            return;
        }

        if (s.charAt(i) >= '0' && s.charAt(i) <= '9'){
            dfs(str + s[i], i + 1);
            return;
        }

        dfs(str + s[i].toLowerCase(), i + 1);
        dfs(str + s[i].toUpperCase(), i + 1);
    }

    backTrack("", 0);
    return output;
};