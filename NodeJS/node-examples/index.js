var rect = require('./rectangle');

function solveRect(l, b) {
    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    // Call the rect node module and pass the length, width and the callback function
    rect(l, b, (err, rectangle) => {
        // If the error returns a value
        if (err) {
            // Console log the error message
            console.log("ERROR: ", err.message);
        } else {
            // if it does not return an error
            // Console log the values
            console.log("The area of the rectangle of dimensions l  = " + l + " and b = " + b + " is " + rectangle.area());
            console.log("The perimeter of the rectangle of dimensions l = " + l + " and b = " + b + " is " + rectangle.perimeter());
        }
    });
    console.log("This statement is after the call to rect()");
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 5);