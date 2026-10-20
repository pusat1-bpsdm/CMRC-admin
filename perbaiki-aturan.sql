-- PERBAIKAN MENYELURUH aturan akses untuk proyek BARU. Aman dijalankan berulang kali.
-- Satu-satunya yang perlu diganti: email di baris is_admin() di bawah (email akun admin proyek ini).
-- Perbandingan email tidak peduli huruf besar/kecil.

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = lower('pusat1.bpsdm@gmail.com')
$$;

-- Alat diagnosa: menunjukkan apa yang DILIHAT database tentang akun yang sedang login
create or replace function public.whoami()
returns json
language sql
stable
as $$
  select json_build_object(
    'email', auth.jwt() ->> 'email',
    'role', auth.jwt() ->> 'role',
    'is_admin', public.is_admin()
  )
$$;
grant execute on function public.whoami() to authenticated;

-- Tabel konten
alter table public.page_content enable row level security;
drop policy if exists "page_content: publik boleh baca" on public.page_content;
drop policy if exists "page_content: admin tulis" on public.page_content;
create policy "page_content: publik boleh baca" on public.page_content for select using (true);
create policy "page_content: admin tulis" on public.page_content for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Tabel pegawai
alter table public.employees enable row level security;
drop policy if exists "employees: publik boleh baca" on public.employees;
drop policy if exists "employees: admin tulis" on public.employees;
create policy "employees: publik boleh baca" on public.employees for select using (true);
create policy "employees: admin tulis" on public.employees for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Bucket dan aturan file
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('content', 'content', true, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do nothing;

drop policy if exists "file: admin baca" on storage.objects;
drop policy if exists "file: admin upload" on storage.objects;
drop policy if exists "file: admin timpa" on storage.objects;
drop policy if exists "file: admin hapus" on storage.objects;
create policy "file: admin baca" on storage.objects for select to authenticated
  using (bucket_id = 'content' and public.is_admin());
create policy "file: admin upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'content' and public.is_admin());
create policy "file: admin timpa" on storage.objects for update to authenticated
  using (bucket_id = 'content' and public.is_admin()) with check (bucket_id = 'content' and public.is_admin());
create policy "file: admin hapus" on storage.objects for delete to authenticated
  using (bucket_id = 'content' and public.is_admin());
