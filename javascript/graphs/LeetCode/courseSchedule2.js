/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
	const deleted = []
	const result = []
	while (1) {
		console.log("prerequisites", prerequisites, "deleted", deleted, "result", result)
		if (prerequisites.findIndex(n => n) === -1) return result
		let map = []
		for (let i = 0; i < numCourses; i++) {
			map[i] = 0
		}
		for (let i = 0; i < prerequisites.length; i++) {
			if (prerequisites[i]) map[prerequisites[i][1]] = 1
		}
		console.log("map", map)
		let noPrereq = map.findIndex((n, i) => !deleted[i] && !n)
		if (noPrereq === -1) return false
		map.forEach((n, j) => {
			if (!n && !deleted[j]) {
				deleted[j] = 1
				result.push(j)
				prerequisites.forEach((p, i) => {
					if (p && p[0] === j) prerequisites[i] = 0
				})
			}
		})
	}

};

console.log(findOrder(2, [[1,0]]))