/*
  Calculates clustering with maximized minimum distance in O(m*n)

  @author Evgeniy Kuznetsov
  @date 03.04.2015
 */

// Calculates clusters
// @param {Array.<Edge>} edges
// @param {Integer} cnum Number of clusters
// @return {Object}
function maxSpacingKClustering(edges, cnum) {

  var clusters = {};
  var mind = undefined;

  // Sort edges

  // While clusters != cnum

    // Get cheapest edge

    // Merge nodes


  return {clusters: clusters, mindistance: mind};
}

// section: Tests

var sampleGraph = [
  [1, 2, 2],
  [1, 3, 1],
  [2, 4, 1],
  [3, 4, 3],
  [3, 5, 6],
  [4, 6, 6],
  [5, 6, 4]
];

console.log("Case 1:", maxSpacingKClustering(sampleGraph).mindistance == 5, maxSpacingKClustering(sampleGraph));






