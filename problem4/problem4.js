// Problem 1

function addCheckSum(input) {
  // Split and copy the roomhashes by a space into an array
  let rooms = input.split(' ');
  // Init the count
  let totalSum = 0;
  
  // For every room
  for(let i = 0; i < rooms.length; i++) {
  	let room = rooms[i];
    // Split the room by dashes
    room = room.split('-');
    // Grab the id and checksum by removing all brackets
    let [id, checksum] = room[room.length -1].replace(']','[').split('[')
    
    
    // Grab the letters
    let letters = room.slice(0, room.length -1).join(' ');
    // Check if the checksum is valid
    let isValid = isValidId(letters, checksum);


    // Add the sum
    if(isValid) totalSum += parseInt(id);
      
  }
  
  return totalSum;
  
}


// Problem 2
function findRoom(input) {

	let rooms = input.split(' ');
  
  
  for(let i = 0; i < rooms.length; i++) {
  	let room = rooms[i];
    
    room = room.split('-');
    
    let [id, checksum] = room[room.length -1].replace(']','[').split('[')
    
    
    let letters = room.slice(0, room.length -1).join(' ');
    
    let isValid = isValidId(letters, checksum);

    let amount = parseInt(id);
    
    if(isValid){
        var deciphered = cipherCode(letters, amount)

        // Check if any of the deciphered ids are valid
        if(deciphered === 'northpole object storage'){
            return id;
        }
    }

  }
  // Return false if not found
  return false;
  
}



// Helper functions
function isValidId(letters, checksum) {
// Create a map of all the letters
	let letterCount = {};
	// If there is a space ignore
  for(let i = 0; i < letters.length; i++) {
    if(letters[i] === ' ') continue;
    // Add the count to the map
  	if(!letterCount[letters[i]]){
    	letterCount[letters[i]] = 1;
    }
    else {
    	letterCount[letters[i]]++;
    }
  }
  // Sort first by the amount and then by alphabetical order
  let createdSum = Object.keys(letterCount).sort((a, b) => {
  
  	return  letterCount[b] - letterCount[a]  || a.localeCompare(b);
  }).slice(0,5).join('');
  // Return boolean
  return checksum === createdSum;
}


// Rotate the alphabets
function cipherCode(string, amount){
    let result = '';
    // Run through the string to move every letter
    for(let i = 0; i < string.length; i++) {
        
        if(string[i] !== ' '){
            let code = string.charCodeAt(i);
            // Find remainder if large number and then increment 
            result += String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
        else {
            result += ' '
        }

    }
    // Return decoded string
    return result;
}


module.exports = {
  addCheckSum,
  findRoom
}