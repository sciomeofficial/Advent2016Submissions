
// Problem 1
function findDistance(input){
  // Make copy to split string into array based on commas
  let directions = input.split(", ")

  let coordinates = {
    x: 0,
    y: 0
  }
  
  let orientation = "N";
  
  // For every direction
  for(let i = 0; i < directions.length; i++){
  
    // Grab the orientation
    let direction = directions[i][0];
    
    let count = directions[i].slice(1)
    
    count = parseInt(count);
    
    // Add the appropriate count
    if(orientation === "N") {
      
      if(direction === 'R') {
        orientation = 'E'
        coordinates.x += count;
      }
      else {
        orientation = 'W'
        coordinates.x -= count;
      }
      
    }
    else if(orientation === "S") {
    
      if(direction === 'R') {
        orientation = 'W'
        coordinates.x -= count;
      }
      else {
        orientation = 'E'
        coordinates.x += count;
      }
    }
    else if(orientation === "W") {
    
       if(direction === 'R') {
        orientation = 'N'
        coordinates.y += count;
      }
      else {
        orientation = 'S'
        coordinates.y -= count;
      }
    }
    else if(orientation === "E") {
         if(direction === 'R') {
        orientation = 'S'
        coordinates.y -= count;
      }
      else {
        orientation = 'N'
        coordinates.y += count;
      }
    }
  }
  // Return absolute value for distance
  return Math.abs(coordinates.x) + Math.abs(coordinates.y);
}

// Problem 2
function findVisitedDistance(input){
  let directions = input.split(", ")

  let pathVisited = new Set(['0,0']);

  let coordinates = {
    x: 0,
    y: 0
  }
  
  let orientation = "N";

  let final;

  // This will keep track of every point we passed through
  function addCount(type, count){

    // Check if our values are negative
    const isNegative = 0 > count;
    coordinates[type]
    // Run through each coordinate and store into memory
    for(let i = 0; i < Math.abs(count); i++){
      coordinates[type] += (isNegative ? -1 : 1)

      // Check set if we have a visited plac
      if (pathVisited.has(`${coordinates.x},${coordinates.y}`)){

        final = Math.abs(coordinates.x) + Math.abs(coordinates.y);
        return;
      } 
      // Has the coordinates for easy lookup
      pathVisited.add(`${coordinates.x},${coordinates.y}`)
    }
  }
  
  
  for(let i = 0; i < directions.length; i++){
  
    if(final) return final;

    let direction = directions[i][0];
    
    let count = directions[i].slice(1)
    
    count = parseInt(count);
    
    if(orientation === "N") {
      
      if(direction === 'R') {
        orientation = 'E'
        addCount('x', count);
      }
      else {
        orientation = 'W'
        addCount('x', -count);
      }
      
    }
    else if(orientation === "S") {
    
      if(direction === 'R') {
        orientation = 'W'
        addCount('x', -count);
      }
      else {
        orientation = 'E'
        addCount('x', count);
      }
    }
    else if(orientation === "W") {
    
       if(direction === 'R') {
        orientation = 'N'
        addCount('y', count);
      }
      else {
        orientation = 'S'
        addCount('y', -count);
      }
    }
    else if(orientation === "E") {
         if(direction === 'R') {
        orientation = 'S'
        addCount('y', -count);
      }
      else {
        orientation = 'N'
        addCount('y', count);
      }
    }
  }
  return final;
}


module.exports = {
  findDistance,
  findVisitedDistance
}