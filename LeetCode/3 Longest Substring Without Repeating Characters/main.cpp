class Solution {
public:
    int firstOccurrence(string s, char c, int left, int right){
        for (int i = left; i < right; i++){
            if (s[i] == c)
                return i;
        }
        
        return -1;
    }

    int lengthOfLongestSubstring(string s) {
        if (s.length() == 0)
            return 0;

        // Faccio un for che itera lungo la stringa

        // Max parte da 1 in quanto anche il carattere stesso è una substring senza ripetizioni 
        int max = 0, left = 0;

        // Fisso una posizione di partenza che è data da left e sposto l'estremo destro con i
        for (int i = 0; i < s.length(); i++){
            string substring = s.substr(left, i-left+1);

            if (count(substring.begin(), substring.end(), s[i]) > 1){
                // Significa che il carattere in posizione s[i] appare più volte
                // Quindi cerco la prima occorrenza e rimuovo tutti i caratteri che vanno da 0 alla prima occorrenza
                left = firstOccurrence(s, s[i], left, i) + 1;
                    // I può rimanere escluso, il carattere duplicato sarà prima di quell'indice
            }
            else if (substring.length() > max)
                max = substring.length();
        }

        return max;
    }
};