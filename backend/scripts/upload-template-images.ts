import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY nao configurados.");
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

const bucketName = "templates";

const templates = [
  {
    slug: "ifood-standard",
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop"
  },
  {
    slug: "gourmet-dark",
    url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1400&auto=format&fit=crop"
  },
  {
    slug: "flat-lay-menu",
    url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1400&auto=format&fit=crop"
  },
  {
    slug: "stories-vibrant",
    url: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1400&auto=format&fit=crop"
  },
  {
    slug: "minimalist-clean",
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1400&auto=format&fit=crop"
  },
  {
    slug: "rustic-artisan",
    url: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1400&auto=format&fit=crop"
  },
  {
    slug: "fast-food-crave",
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1400&auto=format&fit=crop"
  },
  {
    slug: "dessert-elegant",
    url: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=1400&auto=format&fit=crop"
  },
  {
    slug: "drinks-refreshing",
    url: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=1400&auto=format&fit=crop"
  },
  {
    slug: "healthy-fitness",
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1400&auto=format&fit=crop"
  }
];

async function ensureBucket() {
  const { data: bucket, error } = await supabaseAdmin.storage.getBucket(bucketName);
  if (error && error.message !== "Bucket not found") {
    throw error;
  }
  if (!bucket) {
    const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
      public: true
    });
    if (createError) throw createError;
  }
}

async function uploadImage(slug: string, url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha ao baixar ${slug}: ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const filePath = `${slug}.jpg`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucketName)
    .upload(filePath, Buffer.from(arrayBuffer), {
      contentType: "image/jpeg",
      upsert: true
    });

  if (uploadError) throw uploadError;

  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`;

  const { error: updateError } = await supabaseAdmin
    .from("photo_templates")
    .update({ example_image_url: publicUrl })
    .eq("slug", slug);

  if (updateError) throw updateError;

  return publicUrl;
}

async function main() {
  await ensureBucket();
  for (const item of templates) {
    try {
      const url = await uploadImage(item.slug, item.url);
      // eslint-disable-next-line no-console
      console.log(`✅ ${item.slug} -> ${url}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`❌ ${item.slug}`, error);
    }
  }
}

main();
