module.exports = (x, y, callback) => {
    // If x is less than 0 or y is less than 0
    if (x <= 0 || y <= 0) {
        // Simulate that the process will take some time, so delay it with 2000ms
        setTimeout(() =>
            // Callback is called at the completion of a given task
            // Return an error with the given text
            callback(new Error("Rectangle dimensions should be greater than zero: l = " + x + ", and b = " + y), null),
            2000);
    } else {
        // Simulate that the process will take some time, so delay it with 2000ms
        setTimeout(() =>
            // Callback is called at the completion of a given task
            // Return the perimeter function and the area function
            callback(null,
                {
                    perimeter: () => (2 * (x + y)),
                    area: () => (x * y)
                }),
            2000);
    }
}
