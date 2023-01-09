/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    var totalGas = 0, totalCost = 0;

    // Calcolo carburante e costo massimo, se il costo superasse il valore preso non sarebbe possibile percorrere il tragitto
    for(var i = 0 ; i < cost.length; i++){
        totalGas += gas[i];
        totalCost += cost[i];
    }

    if(totalGas < totalCost) 
        return -1;

    // Significa che è possibile percorrere il tragitto
    
    var remainsGas = 0, start = 0;

    for(var i = 0 ; i < cost.length; i++){
        remainsGas += (gas[i] - cost[i]);

        // Se il carburante non risulta essere sufficiente dal punto di partenza, parto da una stazione successiva. Non vado ad eseguire controlli sulla fattibilità del percorso in quanto in precedenza determinato possibile
        if(remainsGas < 0 ){
            start = i+1;
            remainsGas = 0;
        }
    }

    return start;
};