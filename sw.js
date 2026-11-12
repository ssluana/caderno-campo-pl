/* Guarda o aplicativo e as fotos de referência no aparelho para funcionar sem internet.
   - O aplicativo fica num cache por versão; as fotos ficam num cache próprio, que não é apagado nas atualizações.
   - Só uma página válida (HTML, 200) do próprio aplicativo substitui a cópia guardada. */
const APP = "caderno-pl-app-v7";
const FOTOS = "caderno-pl-fotos";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "logo-zhouse.png"];
const REFS = ["ref/10-2.jpg", "ref/10-3.jpg", "ref/10.jpg", "ref/11-2.jpg", "ref/11.jpg", "ref/12-2.jpg", "ref/12-3.jpg", "ref/12.jpg", "ref/13.jpg", "ref/15.jpg", "ref/16.jpg", "ref/17.jpg", "ref/18.jpg", "ref/19.jpg", "ref/2.jpg", "ref/20.jpg", "ref/21.jpg", "ref/22-2.jpg", "ref/22.jpg", "ref/23.jpg", "ref/24-2.jpg", "ref/24.jpg", "ref/25-2.jpg", "ref/25.jpg", "ref/26-2.jpg", "ref/26.jpg", "ref/27-2.jpg", "ref/27.jpg", "ref/28-2.jpg", "ref/28-3.jpg", "ref/28.jpg", "ref/29-2.jpg", "ref/29.jpg", "ref/3-2.jpg", "ref/3-3.jpg", "ref/3.jpg", "ref/30-2.jpg", "ref/30-3.jpg", "ref/30.jpg", "ref/31-2.jpg", "ref/31.jpg", "ref/32-2.jpg", "ref/32-3.jpg", "ref/32.jpg", "ref/33.jpg", "ref/34-2.jpg", "ref/34-3.jpg", "ref/34.jpg", "ref/35-2.jpg", "ref/35.jpg", "ref/36-2.jpg", "ref/36.jpg", "ref/37.jpg", "ref/38.jpg", "ref/39.jpg", "ref/4.jpg", "ref/41.jpg", "ref/44.jpg", "ref/45-2.jpg", "ref/45.jpg", "ref/47.jpg", "ref/48.jpg", "ref/49.jpg", "ref/5.jpg", "ref/51.jpg", "ref/52.jpg", "ref/53-2.jpg", "ref/53.jpg", "ref/54.jpg", "ref/55.jpg", "ref/56.jpg", "ref/57-2.jpg", "ref/57.jpg", "ref/58.jpg", "ref/59.jpg", "ref/6.jpg", "ref/60-2.jpg", "ref/60-3.jpg", "ref/60.jpg", "ref/61.jpg", "ref/62-2.jpg", "ref/62.jpg", "ref/63.jpg", "ref/64.jpg", "ref/65.jpg", "ref/66.jpg", "ref/67-2.jpg", "ref/67.jpg", "ref/68-2.jpg", "ref/68-3.jpg", "ref/68.jpg", "ref/69-2.jpg", "ref/69.jpg", "ref/7-2.jpg", "ref/7-3.jpg", "ref/7.jpg", "ref/70-2.jpg", "ref/70.jpg", "ref/71-2.jpg", "ref/71.jpg", "ref/72-2.jpg", "ref/72.jpg", "ref/73.jpg", "ref/74.jpg", "ref/75.jpg", "ref/77.jpg", "ref/78.jpg", "ref/79.jpg", "ref/8-2.jpg", "ref/8.jpg", "ref/83.jpg", "ref/85.jpg", "ref/87-2.jpg", "ref/87.jpg", "ref/88.jpg", "ref/89.jpg", "ref/9.jpg", "ref/90.jpg", "ref/91-2.jpg", "ref/91.jpg", "ref/92.jpg", "ref/93.jpg", "ref/94-2.jpg", "ref/94.jpg", "ref/95.jpg", "ref/96.jpg", "ref/97-2.jpg", "ref/97.jpg", "ref/98.jpg", "ref/99.jpg", "ref/thumb/10.jpg", "ref/thumb/11.jpg", "ref/thumb/12.jpg", "ref/thumb/13.jpg", "ref/thumb/15.jpg", "ref/thumb/16.jpg", "ref/thumb/17.jpg", "ref/thumb/18.jpg", "ref/thumb/19.jpg", "ref/thumb/2.jpg", "ref/thumb/20.jpg", "ref/thumb/21.jpg", "ref/thumb/22.jpg", "ref/thumb/23.jpg", "ref/thumb/24.jpg", "ref/thumb/25.jpg", "ref/thumb/26.jpg", "ref/thumb/27.jpg", "ref/thumb/28.jpg", "ref/thumb/29.jpg", "ref/thumb/3.jpg", "ref/thumb/30.jpg", "ref/thumb/31.jpg", "ref/thumb/32.jpg", "ref/thumb/33.jpg", "ref/thumb/34.jpg", "ref/thumb/35.jpg", "ref/thumb/36.jpg", "ref/thumb/37.jpg", "ref/thumb/38.jpg", "ref/thumb/39.jpg", "ref/thumb/4.jpg", "ref/thumb/41.jpg", "ref/thumb/44.jpg", "ref/thumb/45.jpg", "ref/thumb/47.jpg", "ref/thumb/48.jpg", "ref/thumb/49.jpg", "ref/thumb/5.jpg", "ref/thumb/51.jpg", "ref/thumb/52.jpg", "ref/thumb/53.jpg", "ref/thumb/54.jpg", "ref/thumb/55.jpg", "ref/thumb/56.jpg", "ref/thumb/57.jpg", "ref/thumb/58.jpg", "ref/thumb/59.jpg", "ref/thumb/6.jpg", "ref/thumb/60.jpg", "ref/thumb/61.jpg", "ref/thumb/62.jpg", "ref/thumb/63.jpg", "ref/thumb/64.jpg", "ref/thumb/65.jpg", "ref/thumb/66.jpg", "ref/thumb/67.jpg", "ref/thumb/68.jpg", "ref/thumb/69.jpg", "ref/thumb/7.jpg", "ref/thumb/70.jpg", "ref/thumb/71.jpg", "ref/thumb/72.jpg", "ref/thumb/73.jpg", "ref/thumb/74.jpg", "ref/thumb/75.jpg", "ref/thumb/77.jpg", "ref/thumb/78.jpg", "ref/thumb/79.jpg", "ref/thumb/8.jpg", "ref/thumb/83.jpg", "ref/thumb/85.jpg", "ref/thumb/87.jpg", "ref/thumb/88.jpg", "ref/thumb/89.jpg", "ref/thumb/9.jpg", "ref/thumb/90.jpg", "ref/thumb/91.jpg", "ref/thumb/92.jpg", "ref/thumb/93.jpg", "ref/thumb/94.jpg", "ref/thumb/95.jpg", "ref/thumb/96.jpg", "ref/thumb/97.jpg", "ref/thumb/98.jpg", "ref/thumb/99.jpg"];
/* Fotos trocadas nesta versão: baixadas de novo mesmo que já estejam guardadas. */
const CHANGED = ["ref/98.jpg", "ref/99.jpg", "ref/36-2.jpg", "ref/thumb/98.jpg", "ref/thumb/99.jpg"];
const fresh = u => fetch(new Request(u, { cache: "reload" }));
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const app = await caches.open(APP);
    await Promise.all(SHELL.map(async u => { const r = await fresh(u); if (r.ok) await app.put(u, r); else throw new Error(u); }));
    const fotos = await caches.open(FOTOS);
    await Promise.allSettled(REFS.map(async u => {
      if (!CHANGED.includes(u) && await fotos.match(u)) return;
      const r = await fresh(u); if (r.ok) await fotos.put(u, r);
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== APP && k !== FOTOS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const isApp = url => { const p = new URL(url).pathname; return p.endsWith("/caderno-campo-pl/") || p.endsWith("/index.html") || p === "/"; };
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        const html = (r.headers.get("content-type") || "").includes("text/html");
        if (r.ok && html && isApp(req.url)) { const c = await caches.open(APP); await c.put("index.html", r.clone()); }
        return r;
      } catch (err) {
        return (await caches.match("index.html")) || Response.error();
      }
    })());
    return;
  }
  const isFoto = new URL(req.url).pathname.includes("/ref/");
  e.respondWith((async () => {
    const c = await caches.open(isFoto ? FOTOS : APP);
    const hit = await c.match(req);
    const net = fetch(req).then(r => { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(() => hit || Response.error());
    return hit || net;
  })());
});
