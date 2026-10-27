-- Jalankan SEKALI di SQL Editor proyek yang dipakai (proyek baru). Aman diulang.
-- Memindahkan data lama ke nama komponen yang baru, supaya foto/nama yang sudah dipilih tidak hilang:
--   Halaman muka : pengendali-1..4  ->  pengelola-1..4
--   Sub halaman  : penjamin-mutu    ->  pengelola
-- Baris yang namanya sudah bentrok dengan data baru dilewati (tidak ditimpa).

update public.page_content p
set slot = replace(p.slot, 'pengendali-', 'pengelola-')
where p.page = 'home'
  and p.slot in ('pengendali-1', 'pengendali-2', 'pengendali-3', 'pengendali-4')
  and not exists (
    select 1 from public.page_content q
    where q.page = p.page and q.slot = replace(p.slot, 'pengendali-', 'pengelola-')
  );

update public.page_content p
set slot = 'pengelola'
where p.page <> 'home'
  and p.slot = 'penjamin-mutu'
  and not exists (
    select 1 from public.page_content q
    where q.page = p.page and q.slot = 'pengelola'
  );
