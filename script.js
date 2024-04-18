function calculateMinCost() {
  const ropeLengthsInput = document.getElementById('rope-lengths').value;
  const ropeLengths = ropeLengthsInput.split(',').map(Number);
  
  // Create a min-heap (priority queue)
  const minHeap = new MinHeap();
  
  // Insert all rope lengths into the min-heap
  ropeLengths.forEach(length => minHeap.insert(length));
  
  let totalCost = 0;
  
  // Continue until only one rope remains
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes
    const firstRope = minHeap.extractMin();
    const secondRope = minHeap.extractMin();
    
    // Calculate the cost of merging
    const cost = firstRope + secondRope;
    
    // Add the cost to the total cost
    totalCost += cost;
    
    // Insert the merged rope back into the min-heap
    minHeap.insert(cost);
  }
  
  // Display the result in the result div
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `Minimum cost of ropes: ${totalCost}`;
}

// MinHeap class for implementing the min-heap
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) {
        break;
      }
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
        smallest = leftChild;
      }

      if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        this.swap(smallest, index);
        index = smallest;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  size() {
    return this.heap.length;
  }
}
