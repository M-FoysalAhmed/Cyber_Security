function encrypt() {
  var plaintext = document.getElementById("plaintext").value.toUpperCase();
  var key = document.getElementById("key").value;
  var keyA = parseInt(document.getElementById("key-a").value);
  var keyB = parseInt(document.getElementById("key-b").value);
  var algorithm = document.getElementById("algorithm").value;
  plaintext = plaintext.replace(/\s/g, "").toUpperCase();
  var ciphertext = "";

  

  var j = 0;

  // vigenere encryption 
  if (algorithm == "vigenere") {
    for (var i = 0; i < plaintext.length; i++) {
        var charcode = plaintext.charCodeAt(i);
        var keychar = key.charAt(i % key.length); // get key character for this plaintext character

        // if uppercase 
        if (charcode >= 65 && charcode <= 90) {
            ciphertext += String.fromCharCode(((charcode - 65 + keychar.charCodeAt(0) - 65) % 26) + 65);
        } 

        // if lowercase 
        else if (charcode >= 97 && charcode <= 122) {
            ciphertext += String.fromCharCode(((charcode - 97 + keychar.charCodeAt(0) - 97) % 26) + 97);
        } 

        // if not a letter 
        else {
            ciphertext += plaintext.charAt(i);
        }
    }
} 


else if (algorithm == "multiplicative") {
  for (var i = 0; i < plaintext.length; i++) {
      var charcode = plaintext.charCodeAt(i);
      var keychar = key.charAt(i % key.length); // get key character for this plaintext character
      if(charcode >= 65 && charcode <= 90) {
          ciphertext += String.fromCharCode(((charcode - 65) * (keychar.charCodeAt(0) - 65)) % 26 + 65);
      } 
      else if(charcode >= 97 && charcode <= 122) {
          ciphertext += String.fromCharCode(((charcode - 97) * (keychar.charCodeAt(0) - 97)) % 26 + 97);
      }
      else {
          ciphertext += plaintext.charAt(i);
      }
  }
}


else if (algorithm == "affine"){
  for (var i = 0; i < plaintext.length; i++) {
    var charCode = ((plaintext.charCodeAt(i) - 65) * keyA + keyB) % 26 + 65;
    ciphertext += String.fromCharCode(charCode);
}
}


  else if (algorithm == "additive") {
    for (var i = 0; i < plaintext.length; i++) {
      var plaintextChar = plaintext.charCodeAt(i);
      var keyChar = key.charCodeAt(j);
      var ciphertextChar = ((plaintextChar + keyChar) % 26) + 65;
      ciphertext += String.fromCharCode(ciphertextChar);
      j = (j + 1) % key.length; //update the position for next iteration 
    }

  }
   

  document.getElementById("ciphertext").value = ciphertext;
}


// for decryption 
function decrypt() {
  var ciphertext = document.getElementById("ciphertext").value;
  var key = document.getElementById("key").value;
  var keyA = parseInt(document.getElementById("key-a").value);
  var keyB = parseInt(document.getElementById("key-b").value);
  var algorithm = document.getElementById("algorithm").value;
  var decryptedtext = "";


  if (algorithm == "vigenere") {
    for (var i = 0; i < ciphertext.length; i++) {
      // Unicode code of the current ciphertext character
        var charcode = ciphertext.charCodeAt(i);
        var keychar = key.charAt(i % key.length); // get key character for this ciphertext character
        if (charcode >= 65 && charcode <= 90) {
            decryptedtext += String.fromCharCode(((charcode - 65 - (keychar.charCodeAt(0) - 65) + 26) % 26) + 65);
        } 
        else if (charcode >= 97 && charcode <= 122) {
            decryptedtext += String.fromCharCode(((charcode - 97 - (keychar.charCodeAt(0) - 97) + 26) % 26) + 97);
        } 
        else {
            decryptedtext += ciphertext.charAt(i);
        }
    }
}


else if (algorithm == "multiplicative") {

  // find the inverse 
  function findInverse(a, m) {
    a = a % m;
    for (var i = 1; i < m; i++) {
      if ((a * i) % m == 1) {
        return i;
      }
    }
    return 1;
  }
  var decryptedtext = "";
  for (var i = 0; i < ciphertext.length; i++) {
    var charcode = ciphertext.charCodeAt(i);
    var keychar = key.charCodeAt(i % key.length);
    if (charcode >= 65 && charcode <= 90) {
      decryptedtext += String.fromCharCode(((charcode - 65) * findInverse(keychar - 65, 26)) % 26 + 65);
    } 
    else if (charcode >= 97 && charcode <= 122) {
      decryptedtext += String.fromCharCode(((charcode - 97) * findInverse(keychar - 97, 26)) % 26 + 97);
    } 
    else {
      decryptedtext += ciphertext.charAt(i);
    }
  }
}


// decrypt of affine 
else if(algorithm=="affine"){
  // find multiplicative inverse
  var inverseA = 0;
  for (var i = 0; i < 26; i++) {
      if ((i * keyA) % 26 == 1) {
          inverseA = i;
          break;
      }
  }
  for (var i = 0; i < ciphertext.length; i++) {
      var charCode = ((inverseA * (ciphertext.charCodeAt(i) - 65 - keyB + 26)) % 26) + 65;
      decryptedtext += String.fromCharCode(charCode);
  }
}


  else if (algorithm == "additive"){
    var j = 0;
    for (var i = 0; i < ciphertext.length; i++) {
      // Unicode code of the current ciphertext character
      var ciphertextChar = ciphertext.charCodeAt(i);
      // Unicode code of the current key character
      var keyChar = key.charCodeAt(j);
      var plaintextChar = ((ciphertextChar - keyChar + 26) % 26) + 65;
      decryptedtext += String.fromCharCode(plaintextChar);
      j = (j + 1) % key.length;
    }
  
  }
    document.getElementById("decryptedtext").value = decryptedtext;
  }

