create or replace function public.get_init_state()
returns bigint
language sql
stable
security definer
set search_path = ''
as $$
  select count(id)
  from (
    select id
    from public.sales
    limit 1
  ) sub;
$$;

revoke all on function public.get_init_state() from public;
grant execute on function public.get_init_state() to anon, authenticated, service_role;

create or replace view public.init_state
  with (security_invoker=off)
as
select public.get_init_state() as is_initialized;

grant select on public.init_state to anon, authenticated, service_role;
