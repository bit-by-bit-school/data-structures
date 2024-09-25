const networkDelayTime = (times, n, k) => {
	const graph = []
	const visited = Array.from(n, 0)
	const timeQueue = []

	const initiateGraph = () => {
		times.forEach(t => {
			if (!graph[t[0]]) graph[t[0]] = []
			graph[t[0]].push([t[1], t[2]])
		})
	}

	const dfs = (parent) => {
		if (graph[parent]) {
			graph[parent].forEach(n => {
				const child = n[0]
				const time = n[1]
 
				if (!visited[child]) {
					timeQueue.push(time)
					dfs(child)
					time
				}
			})
		}
	}
}

// console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2))