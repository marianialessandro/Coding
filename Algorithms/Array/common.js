/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
Array.prototype.rotate = function(k){
    if (this.length == 1)
        return;

    /**
     * @param {int} left: estremo sinistro dell'array da ruotare
     * @param {int} right: estremo destro dell'array da ruotare (non compreso)
     */
    var reverse = (nums, left, right) => {
        if (left < 0 || right < 0)
            return;

        for (var first = left, last = right-1; first < last; first++, last--){
            var tmp = nums[last];
            nums[last] = nums[first];
            nums[first] = tmp;
        }
    }

    reverse(this, 0, this.length-(k%this.length));
    reverse(this, this.length-(k%this.length), this.length);
    reverse(this, 0, this.length);
}

var arr = [1,2,3,4,5,6,7];
arr.rotate(3);

console.log(arr);