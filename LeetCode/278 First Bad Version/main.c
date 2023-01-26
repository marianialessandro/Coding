// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

unsigned int firstBadVersion(int n) {
    // opero su un array ordinato quindi la struttura sarà un alterazione  della binary search

    unsigned int left = 0, right = n;

    while (left < right){
        int x = floor((left+right)/2);

        if (isBadVersion(x))
            right = x;
        else
            left = x+1;
    }

    return left;
}

// uso unsigned int per rispettare le constraints del problema
