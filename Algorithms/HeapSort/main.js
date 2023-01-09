function left(i){
    return 2*i;
}

function right(i){
    return (2*i)+1;
}

function maxHeapify(v, i){
    var l = left(i);
    var r = right(i)

    var max;

    if (l <= v.length && v[l] > v[i])
        max = l;
    else
        max = i;

    if (r <= v.length && v[r] > v[max])
        max = r;

    if (max !== i){
        var tmp = v[i];
        v[i] = v[max];
        v[max] = tmp;

        maxHeapify(v, max);
    }
}

function buildMaxHeap(v){
    for (var i = Math.floor(v.length/2); i > 0; i--){
        maxHeapify(v, i);
    }
}

function heapSort(v){
    buildMaxHeap(v);

    for (var i = v.length; i > 0; i--){
        var tmp = v[1];
        v[1] = v[i];
        v[i] = tmp;

        maxHeapify(v, 1);
    }
}
