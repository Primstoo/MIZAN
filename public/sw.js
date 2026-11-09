/* ToumaiLearn : service worker minimal. Il sert uniquement aux notifications push
   (pas de mise en cache hors-ligne pour l'instant, donc aucun risque de contenu périmé). */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { body: event.data ? event.data.text() : "" }; }
  const titre = d.title || "ToumaiLearn";
  event.waitUntil(self.registration.showNotification(titre, {
    body: d.body || "",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    tag: d.tag || undefined,          // même tag = la notification remplace la précédente
    data: { url: d.url || "/app" },
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || "/app", self.location.origin).href;
  event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((fenetres) => {
    for (const f of fenetres) { if (f.url === url && "focus" in f) return f.focus(); }
    return self.clients.openWindow(url);
  }));
});
