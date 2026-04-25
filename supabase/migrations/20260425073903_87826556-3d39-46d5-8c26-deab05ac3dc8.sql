
-- Grant admin role to existing user
INSERT INTO public.user_roles (user_id, role)
VALUES ('987c306a-2bdd-4add-a0cb-127cc83863ce', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Seed cabin booking rows if missing
INSERT INTO public.cabin_bookings (cabin_id, is_booked) VALUES
  ('C1', false), ('C2', false), ('C3', false), ('C4', false), ('C5', false)
ON CONFLICT (cabin_id) DO NOTHING;
