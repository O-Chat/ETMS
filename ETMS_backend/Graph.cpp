#include "Graph.h"
#include <sstream>
#include <algorithm>

void Graph::addNode(const string& node) {
    if (adj.find(node) == adj.end()) {
        adj[node] = {};
    }
}

void Graph::addEdge(const string& from, const string& to, int weight, bool bidirectional) {
    addNode(from);
    addNode(to);
    adj[from].push_back({to, weight});
    if (bidirectional) {
        adj[to].push_back({from, weight});
    }
}

pair<vector<string>, int> Graph::dijkstra(const string& start, const string& end) {
    unordered_map<string, int> dist;
    unordered_map<string, string> parent;

    for (const auto& pair : adj) {
        dist[pair.first] = numeric_limits<int>::max();
    }

    using pii = pair<int, string>;
    priority_queue<pii, vector<pii>, greater<pii>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [curDist, curNode] = pq.top();
        pq.pop();

        if (curDist > dist[curNode]) continue;

        for (const auto& [neighbor, weight] : adj[curNode]) {
            int newDist = curDist + weight;
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                parent[neighbor] = curNode;
                pq.push({newDist, neighbor});
            }
        }
    }

    vector<string> path;
    string curr = end;
    while (curr != start && parent.find(curr) != parent.end()) {
        path.push_back(curr);
        curr = parent[curr];
    }

    if (curr == start) {
        path.push_back(start);
        reverse(path.begin(), path.end());
        return {path, dist[end]};
    } else {
        return {{}, -1}; // no path
    }
}

string Graph::displayGraph() const {
    stringstream ss;
    ss << "Graph Representation (Adjacency List):\n";
    for (const auto& [node, neighbors] : adj) {
        ss << node << " -> ";
        for (const auto& [neighbor, weight] : neighbors) {
            ss << "(" << neighbor << ", " << weight << ") ";
        }
        ss << "\n";
    }
    return ss.str();
}

bool Graph::isValidLocation(const string& location) const {
    return adj.find(location) != adj.end();
}

void Graph::clear() {
    adj.clear();
}

