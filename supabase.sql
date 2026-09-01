-- ==========================================================================
-- ABC INTERIORS — ROW LEVEL SECURITY POLICIES & SCHEMA FIX FOR "ABC-interiors"
-- Location: Tirupati, Andhra Pradesh
-- ==========================================================================

-- 1. Ensure default timestamp on created_at (Optional quality-of-life fix)
alter table public."ABC-interiors" alter column created_at set default now();

-- 2. Enable Row Level Security on the "ABC-interiors" table
alter table public."ABC-interiors" enable row level security;

-- 3. Drop existing policies to avoid duplicates
drop policy if exists "Allow public lead inserts" on public."ABC-interiors";
drop policy if exists "Allow public lead submissions" on public."ABC-interiors";
drop policy if exists "Allow anonymous insert on ABC-interiors" on public."ABC-interiors";
drop policy if exists "Allow authenticated read on ABC-interiors" on public."ABC-interiors";
drop policy if exists "Allow authenticated update on ABC-interiors" on public."ABC-interiors";
drop policy if exists "Allow authenticated delete on ABC-interiors" on public."ABC-interiors";

-- 4. Policy: Allow anonymous users to INSERT leads (No anon SELECT/read access)
create policy "Allow public lead inserts"
  on public."ABC-interiors"
  for insert
  to anon
  with check (true);

-- 5. Policy: Allow authenticated dashboard admins to READ leads
create policy "Allow authenticated read on ABC-interiors"
  on public."ABC-interiors"
  for select
  to authenticated
  using (true);

-- 6. Policy: Allow authenticated dashboard admins to UPDATE leads
create policy "Allow authenticated update on ABC-interiors"
  on public."ABC-interiors"
  for update
  to authenticated
  using (true)
  with check (true);

-- 7. Policy: Allow authenticated dashboard admins to DELETE leads
create policy "Allow authenticated delete on ABC-interiors"
  on public."ABC-interiors"
  for delete
  to authenticated
  using (true);
