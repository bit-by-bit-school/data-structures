const minimumHeightTrees = (n, edges) => {
	const graph = [...new Array(n)].map(() => [[], 0])

	edges.forEach(e => {
		graph[e[0]][0].push(e[1])
		graph[e[0]][1]++
		graph[e[1]][0].push(e[0])
		graph[e[1]][1]++
	})
	console.log("graph", graph)

	while (!(graph.filter(n => n).length === 1 || graph.filter(n => n).length === 2)) {
		let leafNodes = []
		graph.forEach((n,i) => {
			if (n && n[1] === 1) {
				leafNodes.push([i, n])
			}
		})
		leafNodes.forEach((l) => {
			l[1][0].forEach(n => {
				graph[n][0] = graph[n][0].filter(p => p !== l[0])
				graph[n][1]--
			})
			graph[l[0]] = undefined
			console.log("updated graph", graph)
		})

	}
	const minHeightRoots = []

	graph.forEach((n, i) => {
		if (n) minHeightRoots.push(i)
	})

	return minHeightRoots
}

console.log(minimumHeightTrees(6, [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]))

// assuming acyclic connected undirected graph
