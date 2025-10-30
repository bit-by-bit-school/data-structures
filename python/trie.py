class Trie:
    def __init__(self):
        self.children = {}
        self.value = None

    def add(self, keys, val):
        if len(keys) == 0:
            self.value = val
            return
        key = keys.pop(0)
        if key in self.children:
            self.children[key].add(keys, val)
            return
        child = Trie()
        if "WILDCARD" in key:
            self.children["WILDCARD"] = child
            child.add(keys, val)
            return
        self.children[key] = child
        child.add(keys, val)

    def search(self, keys, params=None):
        if params is None:
            params = []
        if len(keys) == 0:
            return self.value, params
        key = keys.pop(0)
        if key in self.children:
            child = self.children[key]
            return child.search(keys, params)
        if "WILDCARD" in self.children:
            child = self.children["WILDCARD"]
            params.append(key)
            return child.search(keys, params)
        return None
