class Solution {
public:

    int firstOccurrence (string s1, char c){

        int left = 0, right = s1.length(), mid;

	    while (left <= right){   
            mid = floor((left + right) / 2); 

		    if (s1[mid] == c)
			    return mid;
		    if (s1[mid] > c)
			    right = mid - 1;
		    else
			    left = mid + 1; 
	    }
        
        return -1;
    }

    bool check(string s1, string s2, int s2Left){

        if (s2.length() - s2Left < s1.length())
            return false;   // Sto analizzando una substring con una lunghezza minore rispetto a quella della permutazione, quindi sicuramente non sarà presente

        string substring = s2.substr(s2Left, s1.length());
        sort(substring.begin(), substring.end());
        // cout << s1 << endl;
        // cout << substring << endl;

        if (s1 == substring)
            return true;
        else
            return false;
    }

    bool checkInclusion(string s1, string s2) {
        // Itero su s2

        sort(s1.begin(), s1.end());

        for (int i = 0; i < s2.length(); i++){
            if (firstOccurrence(s1, s2[i]) != -1)
                if (check(s1, s2, i))
                    return true;
        }

        return false;
    }
};