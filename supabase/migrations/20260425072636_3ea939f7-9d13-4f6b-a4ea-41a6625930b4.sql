
-- Roles enum and user_roles table (secure pattern)
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Cabin bookings table
CREATE TABLE public.cabin_bookings (
  cabin_id TEXT PRIMARY KEY CHECK (cabin_id IN ('C1','C2','C3','C4','C5')),
  is_booked BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

INSERT INTO public.cabin_bookings (cabin_id, is_booked) VALUES
  ('C1', false), ('C2', true), ('C3', false), ('C4', false), ('C5', true);

ALTER TABLE public.cabin_bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can see booking status (needed for public cabins page)
CREATE POLICY "Anyone can view bookings"
  ON public.cabin_bookings FOR SELECT
  USING (true);

-- Anyone can mark a cabin as booked when they reserve it (toggle off requires admin)
CREATE POLICY "Anyone can book a cabin"
  ON public.cabin_bookings FOR UPDATE
  USING (true)
  WITH CHECK (is_booked = true);

-- Admins can do anything (overrides — UPDATE to free a cabin, etc.)
CREATE POLICY "Admins can update any booking"
  ON public.cabin_bookings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
