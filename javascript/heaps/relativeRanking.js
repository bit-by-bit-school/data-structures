const findRelativeRanks = (score) => {
	const maxHeap = [0]

	const siftBottomUp = (heap) => {
		let k = heap.length - 1
		while (k !== 1) {
			const parentIndex = Math.floor(k / 2)

			if (heap[parentIndex].value < heap[k].value) {
				const temp = heap[k]
				heap[k] = heap[parentIndex]
				heap[parentIndex] = temp
				k = parentIndex
			} else break
		}
	}

	const siftTopDown = (heap) => {
		console.log("before", heap)
		let k = 1
		while (k < heap.length) {

			let firstChild = heap[k * 2] && heap[k * 2].value
			if (!firstChild) break
			let secondChild = heap[(k * 2) + 1] && heap[(k * 2) + 1].value
			if (!secondChild) maxChildIndex = k * 2
			else maxChildIndex = firstChild > secondChild ? k * 2 : (k * 2) + 1
			console.log(maxChildIndex, k)
			if (heap[k].value < heap[maxChildIndex].value) {
				const temp = heap[k]
				heap[k] = heap[maxChildIndex]
				heap[maxChildIndex] = temp
				k = maxChildIndex
			} else break

		}
		console.log("after siftTopDown", heap)
		return
	}

	const extractMax = (heap) => {
		const max = heap[1]
		leaf = heap.pop()
		if (heap.length <= 1) return max
		heap[1] = leaf
		siftTopDown(heap)
		return max
	}

	score.forEach((s, i) => {
		maxHeap.push({
			value: s,
			i
		})
		siftBottomUp(maxHeap)
	})

	let rank = 1
	while (maxHeap.length > 2) {
		max = extractMax(maxHeap)
		console.log("maxHeap", maxHeap)
		console.log("max", max)
		if (rank === 1) score[max.i] = "Gold Medal"
		else if (rank === 2) score[max.i] = "Silver Medal"
		else if (rank === 3) score[max.i] = "Bronze Medal"
		else score[max.i] = rank.toString()
		rank++
	}
	if (rank === 1) score[max.i] = "Gold Medal"
	else if (rank === 2) score[max.i] = "Silver Medal"
	else if (rank === 3) score[max.i] = "Bronze Medal"

	else score[maxHeap[1].i] = rank.toString()
	return score
}

const score = [10, 9, 1, 5, 3, 2]
console.log(findRelativeRanks(score))