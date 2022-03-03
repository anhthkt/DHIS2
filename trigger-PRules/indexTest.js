function createFunction1() {
    // var x = 20;
    return new Function(['x=1'], 'return x;'); // this |x| refers global |x|
}
var f1 = createFunction1();
console.log(f1());