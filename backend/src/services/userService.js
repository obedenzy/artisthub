import supabase from '../config/supabase.js';

export const getUserProfile = async (userId) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('id, username, email, created_at')
    .eq('id', userId)
    .single();

  if (error) {
    return { error: { message: 'Error fetching user profile', status: 500, details: error } };
  }

  return { user };
};
