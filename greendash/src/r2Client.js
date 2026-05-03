import { supabase } from './supabaseClient';

const PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;

/**
 * Securely uploads a file to Cloudflare R2 via a Supabase Edge Function
 * @param {File} file - The file object to upload
 * @param {string} folder - Optional folder prefix (e.g., 'products', 'banners')
 * @returns {Promise<{ url: string, key: string }>} Object containing the public URL and file key
 */
export async function uploadToR2(file, folder = '') {
  try {
    // 1. Ask the Edge Function for permission (a Pre-signed URL)
    const { data, error } = await supabase.functions.invoke('get-upload-url', {
      body: { 
        fileName: file.name, 
        fileType: file.type,
        folder: folder 
      }
    });

    if (error) throw new Error(`Edge Function Error: ${error.message}`);
    
    const { signedUrl, key } = data;

    // 2. Upload the file directly to R2 using the temporary signed URL
    const uploadResponse = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload to R2: ${uploadResponse.statusText}`);
    }

    // 3. Return the permanent public URL
    return {
      url: `${PUBLIC_URL}/${key}`,
      key: key
    };
  } catch (error) {
    console.error("Error securely uploading to R2:", error);
    throw error;
  }
}

/**
 * Since deletion is highly destructive, it should ideally also be an Edge Function.
 * For now, this is a placeholder. You can implement a 'delete-r2-file' Edge Function similarly.
 */
export async function deleteFromR2(key) {
  console.warn("deleteFromR2 is disabled securely. Please create a 'delete-file' Edge Function.");
  return false;
}
