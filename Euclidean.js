// Function to implement the Extended Euclidean Algorithm
function extendedGCD(a, b) {
    let x = 1, y = 0, x1 = 0, y1 = 1;
    while (b !== 0) {
        let quotient = Math.floor(a / b);
        [a, b] = [b, a % b];
        [x, x1] = [x1, x - quotient * x1];
        [y, y1] = [y1, y - quotient * y1];
    }
    return { gcd: a, x, y };
}

// Function to find the modular inverse
function modularInverse(a, m) {
    const { gcd, x, y } = extendedGCD(a, m);

    if (gcd !== 1) {
        console.log(`No modular inverse exists for ${a} mod ${m}`);
        return;
    }

    // Ensure the result is positive
    let modInverse = ((x % m) + m) % m;
    console.log(`The modular inverse of ${a} mod ${m} is: ${modInverse}`);
}

// Main function to input values and compute the modular inverse
function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter a number to find its modular inverse: ", (a) => {
        rl.question("Enter the modulus (m): ", (m) => {
            a = parseInt(a);
            m = parseInt(m);

            modularInverse(a, m);

            rl.close();
        });
    });
}

// Run the main function
main();