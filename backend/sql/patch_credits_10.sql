-- Update initial free credits to 10 for new users

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, credits_balance)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', ''), new.email, 10);

  insert into public.credit_transactions (user_id, type, amount, description)
  values (new.id, 'GRANT_FREE', 10, 'Creditos iniciais gratis');

  return new;
end;
$$ language plpgsql security definer;

-- Optional: give 10 credits to users with zero and no GRANT_FREE transaction
update public.profiles p
set credits_balance = 10
where credits_balance = 0
  and not exists (
    select 1 from public.credit_transactions ct
    where ct.user_id = p.id and ct.type = 'GRANT_FREE'
  );

insert into public.credit_transactions (user_id, type, amount, description)
select p.id, 'GRANT_FREE', 10, 'Creditos iniciais gratis'
from public.profiles p
where p.credits_balance = 10
  and not exists (
    select 1 from public.credit_transactions ct
    where ct.user_id = p.id and ct.type = 'GRANT_FREE'
  );
