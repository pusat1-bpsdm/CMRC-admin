// Isi dengan nilai dari Supabase: Project Settings -> API
// anon key AMAN ada di sini (keamanan dijaga RLS). JANGAN pernah pakai service_role key.
window.APP_CONFIG = {
  SUPABASE_URL: "https://fwduskrkoqbeuqewsaav.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZHVza3Jrb3FiZXVxZXdzYWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0NDI0NjAsImV4cCI6MjEwODAxODQ2MH0.YEgXbEQVLdZhp0nPV1RA_h-2MwqjNtdBn9B3je4QfuI",
  BUCKET: "content",
  MAX_MB: 10,

  // Pilihan status residu risiko.
  // key: pengenal tetap (huruf kecil/angka/tanda hubung, jangan diubah setelah dipakai)
  // label: teks yang tampil di situs (boleh kosong "" = hanya blok warna)
  // name: nama pilihan di halaman admin (isi kalau label kosong)
  // color: warna latar (kode hex)
  STATUS_LEVELS: [
    { key: "terkendali",       label: "TERKENDALI",       color: "#15803d" },
    { key: "belum-terkendali", label: "BELUM TERKENDALI", color: "#FFCC00" },
    { key: "merah",            label: "TIDAK TERKENDALI", color: "#dc2626"}
  ],

  // Halaman muka + 13 sub halaman. "id" dipakai di alamat (?page=halaman-1) dan nama folder file:
  // huruf kecil, angka, tanda hubung. Ganti "label" dengan nama asli. Jangan ubah id setelah ada konten.
  PAGES: [
    { id: "home", label: "Halaman muka", slots: [
      { key: "pemilik",      label: "Pemilik risiko",    kind: "person", large: true },
      { key: "pengelola-1", label: "Pengelola risiko / penjamin mutu 1", kind: "person", aliases: ["pengendali-1"] },
      { key: "pengelola-2", label: "Pengelola risiko / penjamin mutu 2", kind: "person", aliases: ["pengendali-2"] },
      { key: "pengelola-3", label: "Pengelola risiko / penjamin mutu 3", kind: "person", aliases: ["pengendali-3"] },
      { key: "pengelola-4", label: "Pengelola risiko / penjamin mutu 4", kind: "person", aliases: ["pengendali-4"] }
    ] },
    { id: "halaman-1", label: "1. Barang yang diterima tidak memenuhi standar yang telah ditetapkan" },
    { id: "halaman-2", label: "2. Penggunaan Barang Persediaan keperluan kantor dimanfaatkan untuk kepentingan pribadi" },
    { id: "halaman-3", label: "3. Ketidakandalan data hasil keluaran/rekomendasi pengembangan talenta" },
    { id: "halaman-4", label: "4. Asesi memberikan hadiah kepada asesor" },
    { id: "halaman-5", label: "5. Ketidaksesuaian pengelolaan kinerja Pegawai sesuai dengan peraturan terbaru/terkait kinerja 2026" },
    { id: "halaman-6", label: "6. Ketidakmampuan bidang Kepatuhan Intern untuk memastikan pengendalian risiko telah dilakukan oleh UPR sesuai profil risiko yang disusun" },
    { id: "halaman-7", label: "7. Ketidakandalan data hasil Penilaian Potensi dan Kompetensi" },
    { id: "halaman-8", label: "8. Tidak tercapainya target pembinaan, laporan pengembangan KI & MR, jumlah laporan pengendalian dan pemantauan kepatuhan intern" },
    { id: "halaman-9", label: "9. Ketidaksesuaian kompetensi Pegawai dengan tugas dan fungsi yang dilaksanakan" },
    { id: "halaman-10", label: "10. Ketidakpercayaan Pegawai terhadap hasil pengembangan talenta" },
    { id: "halaman-11", label: "11. Tidak tercapainya target kinerja penilaian potensi dan kompetensi sebagai dasar penyusunan profil kompetensi PNS" },
    { id: "halaman-12", label: "12. Keterlambatan pelaksanaan penilaian kinerja Pegawai sesuai aturan" },
    { id: "halaman-13", label: "13. Data dalam e-Nominasi tidak andal" }
  ],

  // Komponen yang sama di SETIAP sub halaman (halaman tanpa "slots" sendiri memakai daftar ini).
  // aliases: nama lama komponen; alamat embed lama dan data lama tetap terbaca selama masa peralihan
  // kind: "people" = daftar pegawai yang jumlahnya fleksibel (ditambah dari admin; di embed dipilih lewat &urut=1, 2, ...)
  // kind: "title" (judul halaman otomatis dari label, tanpa input di admin) | "status" | "person" | "document"
  // multiple: true  -> komponen dokumen berisi BANYAK PDF (daftar yang bertambah), bukan satu file yang ditimpa
  SLOTS: [
    { key: "judul",             label: "Judul halaman",                 kind: "title" },
    { key: "status",            label: "Status residu risiko",          kind: "status" },
    { key: "pengelola",         label: "Pengelola risiko / penjamin mutu", kind: "person", aliases: ["penjamin-mutu"] },
    { key: "pengendali",        label: "Pengendali risiko",             kind: "people", legacy: ["pengendali-1", "pengendali-2"] },
    { key: "risk-register",     label: "Risk register",                 kind: "document" },
    { key: "sop",               label: "SOP",                           kind: "document" },
    { key: "form-pengendalian", label: "Form pengendalian",             kind: "document" },
    { key: "jadwal-rencana",    label: "Jadwal pengendalian",           kind: "document" },
    { key: "bukti-pelaksanaan", label: "Bukti pengendalian",            kind: "document", multiple: true },
    { key: "eval-perbaikan",    label: "Evaluasi dan rencana",          kind: "document" }
  ]
};
