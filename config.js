// Isi dengan nilai dari Supabase: Project Settings -> API
// anon key AMAN ada di sini (keamanan dijaga RLS). JANGAN pernah pakai service_role key.
window.APP_CONFIG = {
  SUPABASE_URL: "https://fwduskrkoqbeuqewsaav.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZHVza3Jrb3FiZXVxZXdzYWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0NDI0NjAsImV4cCI6MjEwODAxODQ2MH0.YEgXbEQVLdZhp0nPV1RA_h-2MwqjNtdBn9B3je4QfuI",
  BUCKET: "content",
  MAX_MB: 10,

  // Pilihan status residu risiko. CONTOH SAJA: ganti dengan level yang sebenarnya.
  // key: pengenal tetap (huruf kecil/angka/tanda hubung, jangan diubah setelah dipakai)
  // label: teks yang tampil | color: warna latar (kode hex)
  STATUS_LEVELS: [
    { key: "sangat-rendah", label: "Sangat rendah", color: "#2e9e5b" },
    { key: "rendah",        label: "Rendah",        color: "#8bc34a" },
    { key: "sedang",        label: "Sedang",        color: "#f2c230" },
    { key: "tinggi",        label: "Tinggi",        color: "#f08a24" },
    { key: "sangat-tinggi", label: "Sangat tinggi", color: "#d64545" }
  ],

  // Halaman muka + 13 sub halaman. "id" dipakai di alamat (?page=halaman-1) dan nama folder file:
  // huruf kecil, angka, tanda hubung. Ganti "label" dengan nama asli. Jangan ubah id setelah ada konten.
  PAGES: [
    { id: "home", label: "Halaman muka", slots: [
      { key: "pemilik",      label: "Pemilik risiko",    kind: "person", large: true },
      { key: "pengendali-1", label: "Pengendali risiko 1", kind: "person" },
      { key: "pengendali-2", label: "Pengendali risiko 2", kind: "person" },
      { key: "pengendali-3", label: "Pengendali risiko 3", kind: "person" },
      { key: "pengendali-4", label: "Pengendali risiko 4", kind: "person" }
    ] },
    { id: "halaman-1", label: "1. Ketidakpercayaan Pegawai terhadap hasil pengembangan talenta (hasil penilaian potensi dan kompetensi)" },
    { id: "halaman-2", label: "2. Barang yang diterima tidak memenuhi standar yang telah ditetapkan" },
    { id: "halaman-3", label: "3. Tidak tercapainya target kinerja penilaian potensi dan kompetensi sebagai dasar penyusunan profil kompetensi Pegawai" },
    { id: "halaman-4", label: "4. Penggunaan Barang Persediaan keperluan kantor dimanfaatkan untuk kepentingan pribadi" },
    { id: "halaman-5", label: "5. Ketidakandalan data hasil keluaran/rekomendasi pengembangan talenta" },
    { id: "halaman-6", label: "6. Asesi memberikan hadiah kepada asesor" },
    { id: "halaman-7", label: "7. Ketidaksesuaian pengelolaan kinerja Pegawai sesuai dengan peraturan terbaru/terkait kinerja 2026" },
    { id: "halaman-8", label: "8. Ketidakmampuan bidang Kepatuhan Intern untuk memastikan pengendalian risiko telah dilakukan oleh UPR sesuai profil risiko yang disusun" },
    { id: "halaman-9", label: "9. Ketidakandalan data hasil keluaran/rekomendasi pengembangan talenta" },
    { id: "halaman-10", label: "10. Tidak tercapainya target pembinaan, laporan pengembangan KI & MR, jumlah laporan pengendalian dan pemantauan kepatuhan intern" },
    { id: "halaman-11", label: "11. Ketidaksesuaian kompetensi Pegawai dengan tugas dan fungsi yang dilaksanakan" },
    { id: "halaman-12", label: "12. Keterlambatan pelaksanaan penilaian kinerja Pegawai sesuai aturan" },
    { id: "halaman-13", label: "13. Data dalam e-Nominasi tidak andal" }
  ],

  // Komponen yang sama di SETIAP sub halaman (halaman tanpa "slots" sendiri memakai daftar ini).
  // kind: "title" (judul halaman otomatis dari label, tanpa input di admin) | "status" | "person" | "document"
  // multiple: true  -> komponen dokumen berisi BANYAK PDF (daftar yang bertambah), bukan satu file yang ditimpa
  SLOTS: [
    { key: "judul",             label: "Judul halaman",                 kind: "title" },
    { key: "status",            label: "Status residu risiko",          kind: "status" },
    { key: "penjamin-mutu",     label: "Penjamin mutu",                 kind: "person" },
    { key: "pengendali-1",      label: "Pengendali risiko 1",           kind: "person" },
    { key: "pengendali-2",      label: "Pengendali risiko 2",           kind: "person" },
    { key: "risk-register",     label: "Risk register",                 kind: "document" },
    { key: "sop",               label: "SOP",                           kind: "document" },
    { key: "form-pengendalian", label: "Form pengendalian",             kind: "document" },
    { key: "jadwal-rencana",    label: "Jadwal rencana",                kind: "document" },
    { key: "bukti-pelaksanaan", label: "Bukti pelaksanaan",             kind: "document", multiple: true },
    { key: "eval-perbaikan",    label: "Evaluasi dan rencana perbaikan", kind: "document" }
  ]
};
