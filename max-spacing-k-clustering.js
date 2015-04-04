/*
  Calculates clustering with maximized minimum distance in O(m*log2(n))

  @author Evgeniy Kuznetsov
  @date 03.04.2015
 */

// Calculates clusters
// @param {Array.<Edge>} edges
// @param {Integer} cnum Number of clusters
// @return {Object}
function maxSpacingKClustering(edges, cnum) {

  var clusters = [], ufind = {};

  // Make a duplicate of the array and sort edges in increasing order of distances
  var sorted = edges.slice(0).sort( function(f,s){ return f[2] - s[2]; } );

  // Update ufind data structure
  for(var i in sorted) {
    var n1 = sorted[i][0], n2 = sorted[i][1];

    if(ufind[n1] == undefined) ufind[n1] = clusters.push([n1]) - 1;
    if(ufind[n2] == undefined) ufind[n2] = clusters.push([n2]) - 1;
  }

  var curclusters = clusters.length, cheap = undefined;

  while(sorted.length != 0) {

    // Get cheapest edge
    cheap = sorted.shift();

    var n1cluster = ufind[cheap[0]],
        n2cluster = ufind[cheap[1]];

    if(n1cluster != n2cluster) {

      // Stop exactly when next node is about to be added
      if(curclusters == cnum) break;

      // Update keys for all vertices in n2cluster
      for(var i in clusters[n2cluster]) ufind[clusters[n2cluster][i]] = n1cluster;

      // Merge clusters
      clusters[n1cluster] = clusters[n1cluster].concat( clusters[n2cluster] );
      clusters[n2cluster] = undefined;
      curclusters--;
    }

  }

  clusters = clusters.filter( function(e){ return e != undefined } );
  var mind = clusters.length == 1 ? 0 : cheap[2];

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
  [5, 6, 5]
];

console.log("Case 1:", maxSpacingKClustering(sampleGraph, 3).mindistance == 5);
console.log("Case 2:", maxSpacingKClustering(sampleGraph, 3).mindistance == 5);




