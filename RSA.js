// Function to compute gcd
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
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

// Function to encrypt the message (either text or number)
function encrypt(message, e, n) {
    let cipher = 1;
    for (let i = 0; i < e; i++) {
        cipher = (cipher * message) % n;
    }
    return cipher;
}

// Function to decrypt the message (either text or number)
function decrypt(cipher, d, n) {
    let message = 1;
    for (let i = 0; i < d; i++) {
        message = (message * cipher) % n;
    }
    return message;
}

// Function to encrypt a string (convert each character to its ASCII value)
function encryptString(plainText, e, n) {
    let encryptedText = [];
    for (let i = 0; i < plainText.length; i++) {
        encryptedText[i] = encrypt(plainText.charCodeAt(i), e, n);
    }
    return encryptedText;
}

// Function to decrypt a string (convert each encrypted ASCII value back to character)
function decryptString(encryptedText, d, n) {
    let decryptedText = '';
    for (let i = 0; i < encryptedText.length; i++) {
        decryptedText += String.fromCharCode(decrypt(encryptedText[i], d, n));
    }
    return decryptedText;
}

// Main Function
function rsaEncryption() {
    let prime1 = 61;  // First prime number
    let prime2 = 53;  // Second prime number
    let n = prime1 * prime2;
    let phi = (prime1 - 1) * (prime2 - 1);

    // Public exponent e
    let e = 17;

    // Compute d such that (d * e) % phi = 1
    let d = modInverse(e, phi);

    // Message to encrypt
    let plainText = "height";  // Example message to encrypt

    // Encrypt and decrypt the message (either as string or number)
    if (isNaN(plainText)) {
        // If input is a string, process each character
        let encryptedText = encryptString(plainText, e, n);
        let decryptedText = decryptString(encryptedText, d, n);
        
        console.log("\nEncrypted Message (in ASCII values): ", encryptedText.join(' '));  // Print each encrypted ASCII value
        console.log("Decrypted Message: ", decryptedText);  // Print the decrypted string
    } else {
        // If input is a number, encrypt and decrypt directly
        let m = parseInt(plainText);
        let cipher = encrypt(m, e, n);
        let decryptedNum = decrypt(cipher, d, n);
        console.log("\nEncrypted Message: ", cipher);
        console.log("Decrypted Message: ", decryptedNum);
    }
}

// Run RSA encryption and decryption
rsaEncryption();