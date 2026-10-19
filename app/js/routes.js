/* Pure graph operations, shared by the map and Node tests. Layout is never content. */
(function (RL) {
  "use strict";
  function closure(destination, links, optional = false) {
    const ids = new Set(), edges = [], pending = [destination];
    while (pending.length) {
      const id = pending.pop();
      if (ids.has(id)) continue;
      ids.add(id);
      for (const e of links) if (e.to === id && (optional || e.role === "required")) {
        edges.push(e); pending.push(e.from);
      }
    }
    for (const e of links) if (ids.has(e.from) && ids.has(e.to) && e.role !== "optional" && !edges.includes(e)) edges.push(e);
    return { ids: [...ids].sort(), edges: edges.sort((a, b) => { const x=JSON.stringify(a),y=JSON.stringify(b); return x<y?-1:x>y?1:0; }) };
  }
  function layout(destination, links, optional = false) {
    const graph = closure(destination, links, optional), depth = new Map(), active = new Set();
    const level = (id) => {
      if (depth.has(id)) return depth.get(id);
      if (active.has(id)) throw new Error(`Required route cycle at ${id}`);
      active.add(id);
      const parents = graph.edges.filter((e) => e.to === id && e.role === "required");
      const d = parents.length ? 1 + Math.max(...parents.map((e) => level(e.from))) : 0;
      active.delete(id); depth.set(id, d); return d;
    };
    graph.ids.forEach(level);
    // Non-required cycles are allowed. Put their nodes in the first column if they have no required parents.
    const last = Math.max(1, ...depth.values()) + 1;
    depth.set(destination, last);
    const columns = new Map(), pos = new Map();
    for (const id of graph.ids) { const d = depth.get(id); if (!columns.has(d)) columns.set(d, []); columns.get(d).push(id); }
    const count = Math.max(...[...columns.values()].map((v) => v.length));
    for (const [d, ids] of columns) ids.forEach((id, i) => pos.set(id, { x: 40 + d * 245, y: 100 + i * 86 + (count - ids.length) * 43 }));
    return { ...graph, pos, width: 280 + last * 245, height: 170 + count * 86 };
  }
  RL.routes = { closure, layout };
})(globalThis.RL = globalThis.RL || {});
