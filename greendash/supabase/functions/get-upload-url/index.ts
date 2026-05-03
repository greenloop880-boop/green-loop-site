import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { S3Client, PutObjectCommand } from "npm:@aws-sdk/client-s3@^3.0.0"
import { getSignedUrl } from "npm:@aws-sdk/s3-request-presigner@^3.0.0"

// CORS headers so your React app can talk to this Edge Function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Get the requested file name and type from your React App
    const { fileName, fileType, folder = '' } = await req.json()

    if (!fileName || !fileType) {
      return new Response(JSON.stringify({ error: 'Missing fileName or fileType' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // 2. Safely load the R2 keys from Supabase Secrets
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: Deno.env.get('R2_ENDPOINT') ?? '',
      credentials: {
        accessKeyId: Deno.env.get('R2_ACCESS_KEY_ID') ?? '',
        secretAccessKey: Deno.env.get('R2_SECRET_ACCESS_KEY') ?? '',
      },
    })

    const bucketName = Deno.env.get('R2_BUCKET_NAME')
    
    // 3. Create a unique file key to prevent overwriting
    const fileExtension = fileName.split('.').pop()
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`
    const key = folder ? `${folder}/${uniqueFileName}` : uniqueFileName

    // 4. Generate the presigned URL
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: fileType,
    })

    // URL expires in 60 seconds (highly secure)
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 })

    // 5. Send it back to the React app
    return new Response(
      JSON.stringify({ signedUrl, key }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
