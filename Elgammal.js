// Function to compute modular exponentiation (base^exp % mod)
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

// Function to compute modular inverse using Extended Euclidean Algorithm
function modInverse(a, p) {
    let t = 0;
    let newT = 1;
    let r = p;
    let newR = a;
    let quotient, temp;

    while (newR !== 0) {
        quotient = Math.floor(r / newR);
        temp = t;
        t = newT;
        newT = temp - quotient * newT;
        temp = r;
        r = newR;
        newR = temp - quotient * newR;
    }

    if (r > 1) {
        return -1;  // Inverse doesn't exist
    }

    if (t < 0) {
        t = t + p;
    }
    return t;
}

// Function to encrypt a message (either text or number)
function encryptMessage(p, g, y, m) {
    let r = Math.floor(Math.random() * (p - 2)) + 1;  // Random r such that 1 <= r <= p-1
    let c1 = modExp(g, r, p);  // c1 = g^r % p
    let c2 = (m * modExp(y, r, p)) % p;  // c2 = m * y^r % p
    return [c1, c2];
}

// Function to decrypt the message
function decryptMessage(p, c1, c2, x) {
    let inverseC1 = modExp(c1, p - 1 - x, p);
    let m = (c2 * inverseC1) % p;  // m = c2 * (c1^x)^(-1) % p
    return m;
}

// Function to encrypt a string (convert each character to its ASCII value)
function encryptString(message, p, g, y) {
    let encryptedMessageC1 = [];
    let encryptedMessageC2 = [];
    for (let i = 0; i < message.length; i++) {
        let m = message.charCodeAt(i);
        let [c1, c2] = encryptMessage(p, g, y, m);
        encryptedMessageC1.push(c1);
        encryptedMessageC2.push(c2);
    }
    return [encryptedMessageC1, encryptedMessageC2];
}

// Function to decrypt a string (convert each encrypted ASCII value back to character)
function decryptString(encryptedMessageC1, encryptedMessageC2, p, x) {
    let decryptedMessage = '';
    for (let i = 0; i < encryptedMessageC1.length; i++) {
        let decryptedValue = decryptMessage(p, encryptedMessageC1[i], encryptedMessageC2[i], x);
        decryptedMessage += String.fromCharCode(decryptedValue);
    }
    return decryptedMessage;
}

// Main Function to run the ElGamal Encryption and Decryption
function elGamalEncryption() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter a large prime number p: ', (p) => {
        rl.question('Enter a primitive root g modulo p: ', (g) => {
            rl.question('Enter private key x: ', (x) => {
                p = parseInt(p);
                g = parseInt(g);
                x = parseInt(x);

                // Calculate public key y = g^x % p
                let y = modExp(g, x, p);

                // Display public key (p, g, y)
                console.log(`Public Key: (p = ${p}, g = ${g}, y = ${y})`);

                rl.question('Enter the message to encrypt (string or number): ', (message) => {
                    let m;
                    // Check if the input is numeric (an integer)
                    if (!isNaN(message)) {
                        m = parseInt(message);
                        let [c1, c2] = encryptMessage(p, g, y, m);
                        let decryptedMessageNum = decryptMessage(p, c1, c2, x);
                        console.log(`Encrypted Message: (c1 = ${c1}, c2 = ${c2})`);
                        console.log(`Decrypted Message: ${decryptedMessageNum}`);
                    } else {
                        // If input is a string, process each character
                        let [encryptedMessageC1, encryptedMessageC2] = encryptString(message, p, g, y);
                        let decryptedMessage = decryptString(encryptedMessageC1, encryptedMessageC2, p, x);
                        console.log('\nEncrypted Message:');
                        for (let i = 0; i < encryptedMessageC1.length; i++) {
                            console.log(`(c1 = ${encryptedMessageC1[i]}, c2 = ${encryptedMessageC2[i]})`);
                        }
                        console.log(`Decrypted Message: ${decryptedMessage}`);
                    }

                    rl.close();
                });
            });
        });
    });
}

// Run ElGamal Encryption and Decryption
elGamalEncryption();