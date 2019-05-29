/**
 * Interleaves multiple arrays of data into one array. Also returns the indices
 * correspnding to the interleaved array.
 *
 * @param {Array} dataArrays An array containing the arrays that need to be interleaved
 * @param {Array} dataCounts An array containing the amount of data passed per vertex
 * within each array that needs to be interleaved. The data counts in this array
 * need to be in the same order as the arrays in dataArrays.
 */
function interleaveDataArrays(dataArrays, dataCounts) {
  var interleavedData = [];
  var indices = [];

  var dataAppearances = {};
  var currentNewIndex = 0;

  var informationCount = dataArrays[0].length / dataCounts[0];
  for (var i = 0; i < informationCount; i++) {
    var vertexData = [];
    for (var j = 0; j < dataArrays.length; j++) {
      var dataFromDataArray = dataArrays[j].slice(i * dataCounts[j], (i + 1) * dataCounts[j]);
      vertexData = vertexData.concat(dataFromDataArray);
    }

    if (vertexData in dataAppearances) {
      var index = dataAppearances[vertexData];
      indices.push(index);
    }
    else {
      interleavedData = interleavedData.concat(vertexData);
      dataAppearances[vertexData] = currentNewIndex;
      indices.push(currentNewIndex);
      currentNewIndex++;
    }
  }

  return [new Float32Array(interleavedData), new Uint16Array(indices)];
}

/**
 * Interleaves an array of vertex objects into a single array. Also produces
 * the indices for this array and an array of data counts for each vertex
 * parameter.
 *
 * @param {Array} vertices An array of vertex objects
 */
function interleaveVertexData(vertices) {
  var vertexProperties = [];
  var dataArrays = [];
  var dataCounts = [];
  var usingVec3_4 = [];


  // Determine number of dataArrays and if a vector is being used
  var propertyIndex = 0;
  for (property in vertices[0]) {
    if (vertices[0].hasOwnProperty(property)) {
      if (vertices[0][property] == null) {
        continue;
      }

      if (vertices[0][property] instanceof Array) {
        dataArrays[propertyIndex]= vertices[0][property];
        usingVec3_4[propertyIndex] = false;
        dataCounts[propertyIndex] = vertices[0][property].length;
      }
      else {
        dataArrays[propertyIndex] = Array.from(vertices[0][property].elements);
        usingVec3_4[propertyIndex] = true;
        dataCounts[propertyIndex] = vertices[0][property].elements.length;
      }

      vertexProperties[propertyIndex] = property;
      propertyIndex++;
    }
  }

  for (var i = 1; i < vertices.length; i++) {
    for (var j = 0; j < vertexProperties.length; j++) {
      if (usingVec3_4[j]) {
        dataArrays[j] = dataArrays[j].concat(Array.from(vertices[i][vertexProperties[j]].elements));
      }
      else {
        dataArrays[j] = dataArrays[j].concat(vertices[i][vertexProperties[j]]);
      }
    }
  }

  var answer = interleaveDataArrays(dataArrays, dataCounts);
  answer.push(dataCounts);

  return answer;
}
