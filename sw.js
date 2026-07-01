const NAMA_CACHE = 'winoro-music-v1';
const FILE_UTAMA = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
];

// Simpan file saat pertama buka
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(NAMA_CACHE).then(c => c.addAll(FILE_UTAMA)).catch(()=>{})
  );
  self.skipWaiting();
});

// Hapus cache lama
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(daftar => 
      Promise.all(daftar.filter(n => n !== NAMA_CACHE).map(n => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Tampilkan yang sudah disimpan, kalau ada baru minta baru
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(ada => ada || fetch(e.request).catch(()=>{}))
  );
});
