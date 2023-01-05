/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    points.sort(function(a, b){	
        return a > b;
    })

    // A questo punto gli elementi sono sortati da sinistra a destra

    var min = points[0][1];   // Imposto ad un valore negativo
    var arrow = 1;

    points.forEach(element => {
        if (element[0] > min){
            // significa che ci sono nuovi palloncini da scoppiare
            min = element[1];   // Indico la fine di tale palloncino
                // So che tutti i palloncini che sono prima di questo valore min sono scoppiati con la freccia

            arrow++;
        }
    });

    return arrow;
};