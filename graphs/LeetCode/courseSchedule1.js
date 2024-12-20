var canFinish = function (numCourses, prerequisites) {
	const deleted = []
	while (1) {
		let hasPrereq = []
		const initializeHasPrereq = () => {
			for (let i = 0; i < numCourses; i++) {
				hasPrereq[i] = 0
			}
		}
		for (let i = 0; i < prerequisites.length; i++) {
			if (prerequisites[i]) hasPrereq[prerequisites[i][0]] = 1
		}
		if (prerequisites.findIndex(n => n) === -1) return true
		let noPrereq = hasPrereq.findIndex((n, i) => !deleted[i] && !n)
		console.log("hasPrereq", hasPrereq, "prerequisites", prerequisites, "deleted", deleted)
		if (noPrereq === -1) return false
		hasPrereq.forEach((n, j) => {
			if (!n && !deleted[j]) {
				deleted[j] = 1
				prerequisites.forEach((p, i) => {
					if (p && p[0] === j) prerequisites[i] = 0
				})
			}
		})
	}
}

console.log(canFinish(1, [[1,0]]))