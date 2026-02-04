-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create estimates table
create table if not exists estimates (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  work_type text not null,
  building_type text not null,
  floors text not null,
  structure text not null,
  area text not null,
  timing text not null,
  prefecture text not null,
  city text default '',
  customer_type text not null,
  name text not null,
  name_kana text not null,
  phone text not null,
  email text,
  status text default 'pending',
  is_mail_sent boolean default false
);

-- Enable Row Level Security
alter table estimates enable row level security;

-- Create policy to allow anonymous users to insert data (for public form)
create policy "Allow anonymous inserts" on estimates
  for insert with check (true);

-- Create policy to allow admins to view data (adjust role as needed, currently authenticated)
create policy "Allow authenticated view" on estimates
  for select using (auth.role() = 'authenticated');
