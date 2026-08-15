-- Replace has_role usage in cabin_bookings policy with an inline check so the
-- SECURITY DEFINER function no longer needs to be callable from the API.
DROP POLICY IF EXISTS "Admins can update any booking" ON public.cabin_bookings;
CREATE POLICY "Admins can update any booking"
  ON public.cabin_bookings FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

-- Visitors may only book a cabin that is currently free; they can never
-- overwrite an existing booking or free a cabin.
DROP POLICY IF EXISTS "Anyone can book a cabin" ON public.cabin_bookings;
CREATE POLICY "Anyone can book a free cabin"
  ON public.cabin_bookings FOR UPDATE
  TO anon, authenticated
  USING (is_booked = false)
  WITH CHECK (is_booked = true);