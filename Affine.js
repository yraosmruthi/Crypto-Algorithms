// Function to compute gcd
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to compute modular inverse
function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return -1;
}

// Function to encrypt a message (either text or number)
function affineEncrypt(plaintext, a, b) {
    let encryptedText = '';
    for (let i = 0; i < plaintext.length; i++) {
        if (/[a-zA-Z]/.test(plaintext[i])) {
            let offset = (plaintext[i].toUpperCase() === plaintext[i]) ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            let encryptedChar = String.fromCharCode(((a * (plaintext[i].toUpperCase().charCodeAt(0) - offset) + b) % 26) + offset);
            encryptedText += encryptedChar;
        } else {
            encryptedText += plaintext[i]; // For non-alphabetic characters, leave them unchanged
        }
    }
    return encryptedText;
}

// Function to decrypt a message
function affineDecrypt(ciphertext, a, b) {
    let a_inv = modInverse(a, 26);
    if (a_inv === -1) {
        console.log("Error: 'a' and 26 are not coprime, decryption not possible.");
        return;
    }

    let decryptedText = '';
    for (let i = 0; i < ciphertext.length; i++) {
        if (/[a-zA-Z]/.test(ciphertext[i])) {
            let offset = (ciphertext[i].toUpperCase() === ciphertext[i]) ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            let decryptedChar = String.fromCharCode(((a_inv * (ciphertext[i].toUpperCase().charCodeAt(0) - offset - b + 26)) % 26) + offset);
            decryptedText += decryptedChar;
        } else {
            decryptedText += ciphertext[i]; // For non-alphabetic characters, leave them unchanged
        }
    }
    return decryptedText;
}

// Main Function
function rsaEncryption() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the text to encrypt (letters only): ', (text) => {
        rl.question('Enter the value of "a" for the Affine Cipher: ', (a) => {
            rl.question('Enter the value of "b" for the Affine Cipher: ', (b) => {
                a = parseInt(a);
                b = parseInt(b);

                // Check if 'a' and 26 are coprime (gcd(a, 26) must be 1)
                if (gcd(a, 26) !== 1) {
                    console.log("Error: 'a' and 26 are not coprime, encryption not possible.");
                    rl.close();
                    return;
                }

                console.log(Original `Text: ${text}`);

                // Encrypt the message
                let encryptedText = affineEncrypt(text, a, b);
                console.log(Encrypted `Text: ${encryptedText}`);

                // Decrypt the message
                let decryptedText = affineDecrypt(encryptedText, a, b);
                console.log(Decrypted `Text: ${decryptedText}`);

                rl.close();
            });
        });
    });
}

// Run the Affine Cipher encryption and decryption
rsaEncryption();