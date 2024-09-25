const nums = [4,5,8,2]
const k = 3

class KthLargest {
	constructor(k, nums) {
		heapify(nums)
		this.k = k
	}
	heapify(nums) {
		this.heap = [0]
		nums.forEach(n => {
			this.add(n)
		})
	}
	add(val) {
		this.heap.push(val)
		this.swim()
		if (this.heap.length > this.k) this.heap.pop()
	}
	swim () {
		const heap = this.heap
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
	extractKthMax () {
		return this.heap.pop()
	}
}