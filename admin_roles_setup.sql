-- =========================================================================
-- SROT FINANCE: ADMIN ROLES SETUP (admin / superuser)
-- Run this script in the Supabase SQL Editor AFTER admin_setup.sql.
-- Adds role-based access: 'admin' and 'superuser'. Only superusers can
-- promote / demote other admins. Deleting users stays admin-level.
-- =========================================================================

-- 1. Add role column (existing admins keep full power -> become superuser)
ALTER TABLE public.admins
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'admin'
CHECK (role IN ('admin', 'superuser'));

-- Preserve current power level: everyone who is already an admin today
-- could do everything, so they become superuser.
UPDATE public.admins SET role = 'superuser' WHERE role = 'admin';

-- 2. Fast check: is the current user a superuser?
CREATE OR REPLACE FUNCTION public.is_superuser()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins WHERE id = auth.uid() AND role = 'superuser'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Get current user's admin role (null when not an admin)
CREATE OR REPLACE FUNCTION public.admin_get_my_role()
RETURNS text AS $$
DECLARE
  v_role text;
BEGIN
  SELECT role INTO v_role FROM public.admins WHERE id = auth.uid();
  RETURN v_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Replace admin_get_all_users: now includes each user's admin role
CREATE OR REPLACE FUNCTION public.admin_get_all_users()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Not authorized. Admin privileges required.';
  END IF;

  SELECT json_agg(
    json_build_object(
      'id', u.id,
      'email', u.email,
      'full_name', u.raw_user_meta_data->>'full_name',
      'avatar_url', u.raw_user_meta_data->>'avatar_url',
      'created_at', u.created_at,
      'last_sign_in_at', u.last_sign_in_at,
      'admin_role', a.role
    )
  ) INTO result
  FROM auth.users u
  LEFT JOIN public.admins a ON a.id = u.id;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

-- 5. Set a user's admin role (superusers only)
-- new_role: 'admin' | 'superuser' | 'none' ('none' removes admin access)
CREATE OR REPLACE FUNCTION public.admin_set_role(target_user_id uuid, new_role text)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_email text;
BEGIN
  IF NOT public.is_superuser() THEN
    RAISE EXCEPTION 'Not authorized. Superuser privileges required.';
  END IF;

  IF new_role NOT IN ('admin', 'superuser', 'none') THEN
    RAISE EXCEPTION 'Invalid role. Use admin, superuser or none.';
  END IF;

  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'You cannot change your own role. Ask another superuser.';
  END IF;

  SELECT email INTO v_email FROM auth.users WHERE id = target_user_id;
  IF v_email IS NULL THEN
    RAISE EXCEPTION 'User not found.';
  END IF;

  IF new_role = 'none' THEN
    DELETE FROM public.admins WHERE id = target_user_id;
  ELSE
    INSERT INTO public.admins (id, email, role)
    VALUES (target_user_id, v_email, new_role)
    ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role, email = EXCLUDED.email;
  END IF;
END;
$$;

-- 6. Tighten user deletion: keep admin-level (unchanged behaviour)
-- admin_delete_user from admin_setup.sql is left as-is.

-- =========================================================================
-- DONE. Verify with:
--   SELECT * FROM public.admins;
-- Your own row should show role = 'superuser'.
-- =========================================================================
