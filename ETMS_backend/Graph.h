#ifndef GRAPH_H
#define GRAPH_H

#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
#include <queue>
#include <limits>
#include <stack>

using namespace std;

class Graph {
private:
    unordered_map<string, vector<pair<string, int>>> adj;

public:
    void addNode(const string& node);
    void addEdge(const string& from, const string& to, int weight, bool bidirectional = true);

    pair<vector<string>, int> dijkstra(const string& start, const string& end);
    string displayGraph() const;
    bool isValidLocation(const string& location) const;
    void clear();

};

#endif
