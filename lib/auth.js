import { supabase } from './supabase'

export const registerUser = async (email, password, role, formData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: role,
        nom_prenoms: formData.nom_prenoms,
        date_naissance: formData.date_naissance,
        lieu_naissance: formData.lieu_naissance,
        nationalite: formData.nationalite,
        profession: formData.profession,
        commune: formData.commune,
        contact_mm: formData.contact_mm, // Très important pour les paiements
        contact_secondaire: formData.contact_secondaire,
        type_piece: formData.type_piece,
        numero_piece: formData.numero_piece
      }
    }
  });
  return { data, error };
};

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const logoutUser = async () => {
  return await supabase.auth.signOut();
};