-- SKEMA LENGKAP untuk proyek BARU (gabungan setup.sql, setup-halaman.sql, setup-update.sql,
-- setup-pegawai.sql, dan setup-nip.sql). Jalankan SEKALI di SQL Editor proyek baru.
-- Jangan jalankan file setup lama lagi di proyek ini.
-- WAJIB: ganti 'admin@contoh.com' dengan email akun admin di proyek baru (huruf kecil).

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'pusat1.bpsdm@Gmail.com'
$$;

-- Konten per halaman
create table if not exists public.page_content (
  page        text not null,
  slot        text not null,
  kind        text not null check (kind in ('text', 'photo', 'document', 'person', 'status')),
  body        text,
  file_path   text,
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  primary key (page, slot)
);
alter table public.page_content enable row level security;
create policy "page_content: publik boleh baca" on public.page_content for select using (true);
create policy "page_content: admin tulis" on public.page_content for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Daftar pegawai
create table if not exists public.employees (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  position    text,
  nip         text,
  photo_path  text,
  updated_at  timestamptz not null default now()
);
alter table public.employees enable row level security;
create policy "employees: publik boleh baca" on public.employees for select using (true);
create policy "employees: admin tulis" on public.employees for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Bucket file (publik untuk dibaca lewat URL, batas 10 MB, hanya gambar dan PDF)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('content', 'content', true, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do nothing;

create policy "file: admin baca" on storage.objects for select to authenticated
  using (bucket_id = 'content' and public.is_admin());
create policy "file: admin upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'content' and public.is_admin());
create policy "file: admin timpa" on storage.objects for update to authenticated
  using (bucket_id = 'content' and public.is_admin()) with check (bucket_id = 'content' and public.is_admin());
create policy "file: admin hapus" on storage.objects for delete to authenticated
  using (bucket_id = 'content' and public.is_admin());
