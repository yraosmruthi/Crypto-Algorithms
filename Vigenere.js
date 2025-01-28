// Function to encrypt the message using Vigenère cipher
function vigenereEncrypt(plaintext, key) {
    let keyLen = key.length;
    let result = plaintext.split('');
    for (let i = 0, j = 0; i < result.length; i++) {
        if (/[a-zA-Z]/.test(result[i])) {
            let offset = (result[i] === result[i].toUpperCase()) ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            result[i] = String.fromCharCode(((result[i].toUpperCase().charCodeAt(0) - offset + key[j % keyLen].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) % 26) + offset);
            j++;
        }
    }
    return result.join('');
}

// Function to decrypt the message using Vigenère cipher
function vigenereDecrypt(ciphertext, key) {
    let keyLen = key.length;
    let result = ciphertext.split('');
    for (let i = 0, j = 0; i < result.length; i++) {
        if (/[a-zA-Z]/.test(result[i])) {
            let offset = (result[i] === result[i].toUpperCase()) ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            result[i] = String.fromCharCode(((result[i].toUpperCase().charCodeAt(0) - offset - (key[j % keyLen].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)) + 26) % 26) + offset);
            j++;
        }
    }
    return result.join('');
}

// Main function to run the Vigenère cipher
function run() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter the text to encrypt (letters only): ", (text) => {
        rl.question("Enter the key (letters only): ", (key) => {
            text = text.trim();
            key = key.trim();

            console.log("Original Text:", text);

            let encryptedText = vigenereEncrypt(text, key);
            console.log("Encrypted Text:", encryptedText);

            let decryptedText = vigenereDecrypt(encryptedText, key);
            console.log("Decrypted Text:", decryptedText);

            rl.close();
        });
    });
}

// Run the program
run();