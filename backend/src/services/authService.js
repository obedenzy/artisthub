import supabase from '../config/supabase.js';
import { hashPassword, verifyPassword } from '../utils/helpers.js';

export const registerUser = async (username, email, password) => {
  const { data: existingUser, error: userError } = await supabase
    .from('users')
    .select('id')
    .or(`username.eq.${username},email.eq.${email}`)
    .single();

  if (userError && userError.code !== 'PGRST116') {
    return { error: { message: 'Error checking for existing user', status: 500, details: userError } };
  }

  if (existingUser) {
    return { error: { message: 'Username or email already exists', status: 409 } };
  }

  const hashedPassword = await hashPassword(password);

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, email, password: hashedPassword }])
    .select();

  if (error) {
    return { error: { message: 'Error registering user', status: 500, details: error } };
  }

  return { user: data[0] };
};

export const loginUser = async (identifier, password) => {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .or(`username.eq.${identifier},email.eq.${identifier}`)
    .single();

  if (userError) {
    return { error: { message: 'Error fetching user', status: 500, details: userError } };
  }

  if (!user) {
    return { error: { message: 'Invalid username/email or password', status: 401 } };
  }

  const passwordMatch = await verifyPassword(password, user.password);

  if (!passwordMatch) {
    return { error: { message: 'Invalid username/email or password', status: 401 } };
  }
  return { user };
};
