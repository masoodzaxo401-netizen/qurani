const CACHE_NAME = 'quran-v1';
const ASSETS = [
  'index.html',
  'style.css',
  'app.js',
  'manifest.json'
];

// تثبيت ملف الخلفية وحفظ الملفات الأساسية لتسريع الموقع
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تشغيل التطبيق وتلبية الطلبات حتى عند انقطاع الإنترنت للملفات الأساسية
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});