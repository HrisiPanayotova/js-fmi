const fs = require("fs");


class Edge {

    constructor(distance, pred, v) {
        this.distance = distance;
        this.pred = pred;
        this.v = v;
    }

    isGreater(otherEdge) {
        return this.distance > otherEdge.distance;
    }

}

class MinHeap {
    constructor() {
        this.minHeap = [];
    }

    empty() {
        return this.minHeap.length === 0;
    }

    left(index) {
        return 2 * index + 1;
    }

    right(index) {
        return 2 * index + 2;
    }

    minHeapify(index) {
        let left = this.left(index);
        let right = this.right(index);
        let len = this.minHeap.length;
        let smallest = index;
        if (left < len && this.minHeap[index].isGreater(this.minHeap[left])) smallest = left;
        if (right < len && this.minHeap[smallest].isGreater(this.minHeap[right])) smallest = right;
        if (smallest != index) {
            [this.minHeap[index], this.minHeap[smallest]] = [this.minHeap[smallest], this.minHeap[index]];
            this.minHeapify(smallest);
        }
    }

    parent(index) {
        if (index === 0) throw new Error("Edge does not have a parent");
        return Math.round((index - 1) / 2);
    }

    push(edge) {
        if (this.empty()) return this.minHeap.push(edge);
        this.minHeap.push(edge);
        let index = this.minHeap.length - 1;
        while (index != 0 && this.minHeap[this.parent(index)].isGreater(this.minHeap[index])) {
            const parent = this.parent(index);
            [this.minHeap[index], this.minHeap[parent]] = [this.minHeap[parent], this.minHeap[index]];
            index = parent;
        }
    }

    pop() {
        if (this.empty()) throw new Error("no element left in the Min heap!");
        if (this.minHeap.length === 1) return this.minHeap.pop();
        const root = this.minHeap[0];
        this.minHeap[0] = this.minHeap.pop();
        this.minHeapify(0);
        return root;
    }
}

function dijkstra(start, graph) {
    const marked = [];
    const distAndPath = {};
    const minHeap = new MinHeap();
    minHeap.push(new Edge(0, null, start));
    while (!minHeap.empty()) {
        const { distance, v, pred } = minHeap.pop();
        if (!marked.includes(v)) {
            marked.push(v);
            distAndPath[v] = { distance, pred };
            for (let node of graph[v]) {
                minHeap.push(new Edge(node.distance + distance, v, node.v));
            }
        }
    }
    return distAndPath;
}

function main() {
    const filePath = "homework1\\graph_example.json";
    fs.readFile(filePath, (err, graph) => {
        if (err) throw err;
        const start = 1;
        const result = dijkstra(start, JSON.parse(graph));
        for (let node in result) {
            console.log(`The shortest path from edge ${start} to ${node} is ${result[node].distance} through edge - ${result[node].pred || 'no edge'}`);
        }
    })
}

main();