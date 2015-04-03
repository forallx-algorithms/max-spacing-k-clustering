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

  var clusters = [];
  var ufind = {};

  // Sort edges
  var sorted = edges.sort( function(f,s){ return f[2] - s[2]; } );

  // Update ufind data structure
  for(var i in sorted) {
    var n1 = sorted[i][0], n2 = sorted[i][1];

    if(ufind[n1] == undefined) ufind[n1] = clusters.push([n1]) - 1;
    if(ufind[n2] == undefined) ufind[n2] = clusters.push([n2]) - 1;
  }

  var curclusters = clusters.length;

  // While clusters != cnum
  while(sorted.length != 0) {

    // Get cheapest edge
    var cheap = sorted.shift(),
        n1 = cheap[0],
        n2 = cheap[1];

    // Merge nodes
    var n1cluster = ufind[n1],
        n2cluster = ufind[n2];

    if(n1cluster != n2cluster) {
      // Update keys for all vertices in n2cluster
      for(var i in clusters[n2cluster]) ufind[clusters[n2cluster][i]] = n1cluster;

      clusters[n1cluster] = clusters[n1cluster].concat( clusters[n2cluster] );
      clusters[n2cluster] = undefined;
      curclusters--;
    } else {
      if(curclusters == cnum) break;
    }

  }

  clusters = clusters.filter( function(e){ return e != undefined } );

  var mind = clusters.length == 1 ? 0 : sorted[0][2];

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

console.log("Case 1:", maxSpacingKClustering(sampleGraph, 3));





