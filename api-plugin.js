function d(t) {
  const n = t.toString();
  let e = 0;
  for (let o = 0; o < n.length; o++) {
    const r = n.charCodeAt(o);
    e = (e << 5) - e + r;
    e |= 0;
  }
  e = (e >>> 0) * 2654435761 % 2**32;
  return (e >>> 0) / 2**32;
}

function p(t) {
  const a = d(t);
  return Math.round((8e5 + a * 7e5) / 1e3) * 1e3;
}

function M(t) {
  const n = new Date();
  const e = new Date(n.getFullYear(), n.getMonth() - 1, n.getDate());
  const a = new Date(n.getFullYear(), n.getMonth() + 1, n.getDate());
  const o = d(t);
  const r = a - e;
  const s = e.getTime() + Math.floor(o * r);
  let i = new Date(s);
  
  if (t % 3 === 0) {
    const u = i.getDay();
    if (u !== 0 && u !== 6) {
      i.setDate(i.getDate() + (6 - u));
    }
  }
  
  const l = d(t);
  const c = ["10AM-12PM", "12PM-2PM", "2PM-4PM", "4PM-6PM"];
  const m = Math.floor(l * c.length);
  const h = c[m];
  
  return {
    date: i.toISOString().split("T")[0],
    time: h
  };
}

function H(t) {
  const n = 1 + Math.floor(d(t) * 5);
  const e = [];
  const a = new Set();
  
  for (let o = 0; o < n; o++) {
    let r, s = 0;
    do {
      r = M(t * 10 + o);
      s++;
      if (s > 100) break;
    } while (!a.has(r.date));
    
    a.add(r.date);
    e.push(r);
  }
  
  return e;
}

const f = ["Main St", "Park Ave", "Broadway", "Elm St", "Maple Ave", "Oak St", "Cedar Ln", "Pine St", "Washington St", "Lake Ave"];
const g = ["10001", "10003", "10005", "10006", "10008", "10009", "10010"];

function P(t) {
  return t < 9e5 ? [2, 1] :
         t < 1e6 ? [2, 1.5] :
         t < 12e5 ? [3, 1.5] :
         t < 14e5 ? [4, 2.5] :
         [4, 3];
}

function S(t) {
  const n = p(t, "");
  const { bedrooms: e, bathrooms: a } = P(n);
  
  return {
    id: `1000${t}`,
    address: `${t * 100} ${f[t % f.length]}`,
    city: "New York City",
    state: "NY",
    zipCode: g[t % g.length],
    price: n,
    bedrooms: e,
    bathrooms: a,
    isSaved: true,
    isFavorited: t % 5 === 0 || t % 7 === 0,
    openHouses: H(t)
  };
}

function D(t) {
  return new Array(t).fill(0).map((n, e) => S(e));
}

export default () => ({
  name: "mock-api",
  configureServer: async (t) => {
    const n = D(100);
    const e = "/api/saved-listings";
    
    function a(o) {
      if (!(d(o) < 0.1)) {
        return n.find(s => s.id === o);
      }
    }
    
    t.middlewares.use((o, r, s) => {
      if (!o.url.startsWith(e)) return s();
      
      if (Math.random() < 0.1) {
        r.statusCode = 500;
        r.end("Internal Server Error");
        return;
      }
      
      const l = o.url.replace(e, "").match(/\/([^\/]+)$/);
      const c = l ? a(l[1]) : n.map(({ openHouses: h, ...u }) => u);
      
      if (!c) {
        r.statusCode = 404;
        r.end("Not Found");
        return;
      }
      
      const m = JSON.stringify(c);
      r.setHeader("Content-Type", "application/json");
      r.end(m);
    });
  }
});