import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

const templates = [
  {
    slug: "ifood-padrao",
    name: "iFood Padrão",
    description:
      "Visual limpo e comercial, perfeito para cardápios de delivery. Fundo neutro, iluminação uniforme e foco total no prato.",
    category: "delivery",
    aspect_ratio: "1:1",
    platform_suggestions: ["iFood", "Rappi", "Uber Eats", "99Food"],
    internal_prompt: `STYLE: Commercial Delivery App Photography
REFERENCE: iFood, DoorDash, Uber Eats hero images

LIGHTING:
- Primary: Large softbox positioned at 45 degrees angle from front-left, creating soft, even illumination
- Fill: Reflector on opposite side to minimize shadows, ratio 2:1
- No harsh shadows under the food
- Subtle catchlights on glossy/wet surfaces (sauces, glazes)
- Overall bright and inviting, exposure +0.3 to +0.5 stops

BACKGROUND:
- Clean, solid color background
- Options: Pure white (#FFFFFF), Light gray (#F5F5F5), or Warm off-white (#FAF9F6)
- Seamless gradient from surface to background (infinity curve effect)
- No visible horizon line or edges
- Surface: Clean white or light marble with very subtle texture

COMPOSITION:
- Camera angle: 45 degrees from horizontal (hero angle)
- Food centered in frame with 15-20% padding on all sides
- Single hero dish as focal point
- Rule of thirds positioning for off-center elements
- Negative space for potential text overlay areas

STYLING:
- Food appears fresh, just-plated
- Natural steam/heat indicators where appropriate (subtle, not overdone)
- Garnishes precisely placed
- Sauce drizzles look intentional and appetizing
- Any melted cheese or liquids captured at peak appeal moment

COLOR GRADING:
- Neutral white balance (5500K-6000K)
- Saturation: +5 to +10% on food colors only
- Contrast: Medium, clean blacks and bright whites
- Shadows slightly lifted for commercial appeal
- Highlights protected, no blown areas

MOOD:
- Clean, trustworthy, appetizing
- Professional but approachable
- "I want to order this right now" feeling`,
    example_image_url: "/templates/ifood-standard.jpg",
    is_active: true
  },
  {
    slug: "gourmet-escuro",
    name: "Gourmet Escuro",
    description:
      "Estética premium com fundo escuro e iluminação dramática. Ideal para restaurantes sofisticados e pratos de alta gastronomia.",
    category: "fine-dining",
    aspect_ratio: "4:5",
    platform_suggestions: ["Instagram Feed", "Website", "Menu Premium"],
    internal_prompt: `STYLE: Dark & Moody Fine Dining Photography
REFERENCE: Michelin-star restaurant imagery, high-end culinary magazines

LIGHTING:
- Primary: Single key light from side (90 degrees angle), creating dramatic shadows
- Hard light source with subtle diffusion for texture definition
- Ratio: 4:1 or higher between lit and shadow areas
- Rim light from behind at low intensity to separate food from background
- Specular highlights on wet/glossy elements (sauces, oils, glazes)
- Chiaroscuro effect - strong contrast between light and dark

BACKGROUND:
- Deep, rich black or very dark charcoal (#0A0A0A to #1A1A1A)
- Matte finish to absorb light
- Options: Black slate, dark wood grain, black marble with gold veins
- Surface texture visible but not distracting
- Background falls off to pure black at edges (vignette effect)

COMPOSITION:
- Camera angle: 25-35 degrees from horizontal (slightly lower than standard)
- Asymmetric composition for artistic tension
- Food positioned off-center using golden ratio
- Deliberate use of negative space (dark areas)
- Tight crop focusing on the most appealing portion
- Props minimal and dark-toned (black cutlery, dark napkin corner)

STYLING:
- Precision plating as in fine dining
- Intentional sauce swooshes or dots
- Micro-herbs and edible flowers as accents
- Oil drizzles catching the light
- Every element placed with purpose
- Slightly deconstructed presentations welcome

COLOR GRADING:
- Cool shadows with warm highlights (split toning)
- Deep blacks, no milky shadows
- Color palette: Rich, saturated food colors against monochrome background
- White balance slightly warm on food (5000K), cool on shadows
- Contrast: High, cinematic look
- Subtle teal in shadows, orange in highlights

MOOD:
- Luxurious, sophisticated, exclusive
- Restaurant-quality presentation
- Mysterious, intriguing
- "Special occasion dining" feeling
- Evokes taste through visual richness`,
    example_image_url: "/templates/gourmet-dark.jpg",
    is_active: true
  },
  {
    slug: "flat-lay-cardapio",
    name: "Flat Lay Cardápio",
    description:
      "Vista superior perfeita para cardápios e catálogos. Composição organizada com ingredientes e elementos decorativos.",
    category: "menu",
    aspect_ratio: "4:3",
    platform_suggestions: ["Cardápio Digital", "PDF Menu", "Website Gallery"],
    internal_prompt: `STYLE: Overhead Flat Lay Food Photography
REFERENCE: Magazine recipe spreads, digital menu layouts, cookbook photography

LIGHTING:
- Primary: Large diffused light source directly above or slightly angled (10-15 degrees off vertical)
- Extremely soft, shadowless illumination
- Even coverage across entire frame
- Fill from below via white bounce surface
- No harsh shadows - if shadows exist, they are very soft and short
- Simulates natural window light from above

BACKGROUND:
- Clean, styled surface filling entire frame
- Options:
  * White marble with subtle gray veining
  * Light natural wood grain (oak, birch)
  * Clean white painted wood
  * Light concrete texture
  * Linen tablecloth (neutral tones)
- Surface must be perfectly flat and level
- Texture adds interest but does not compete with food

COMPOSITION:
- Camera angle: 90 degrees overhead (true birds-eye view)
- Camera perfectly parallel to surface (no keystoning)
- Main dish as hero, positioned using rule of thirds
- Supporting elements arranged around main dish:
  * Raw ingredients (herbs, spices, vegetables)
  * Cooking utensils (wooden spoons, small bowls)
  * Napkin corner or cloth edge
  * Scattered herbs or spices for organic feel
- Balanced asymmetry - not perfectly symmetrical but visually balanced
- Leave space for text overlay if needed (menu context)

STYLING:
- "Organized chaos" aesthetic
- Ingredients appear fresh and just-gathered
- Some items partially visible at frame edges (suggests larger scene)
- Complementary colors between food and props
- Small bowls with sauces or condiments
- Fresh herb sprigs scattered naturally
- Flour/spice dust for baking items
- All elements contribute to telling the dish's story

COLOR GRADING:
- Bright, airy, editorial feel
- White balance: Neutral to slightly warm (5500K-5800K)
- High key lighting, shadows lifted significantly
- Saturation: Natural, +5% max
- Contrast: Medium-low for soft, inviting look
- Whites clean but not blown

MOOD:
- Fresh, homemade, wholesome
- "Recipe you want to cook" inspiration
- Organized and appetizing
- Editorial/magazine quality
- Inviting and accessible`,
    example_image_url: "/templates/flat-lay-menu.jpg",
    is_active: true
  },
  {
    slug: "stories-vibrante",
    name: "Stories Vibrante",
    description:
      "Cores vivas e composição vertical para Instagram Stories. Visual moderno, energético e impossível de ignorar no feed.",
    category: "social-media",
    aspect_ratio: "9:16",
    platform_suggestions: ["Instagram Stories", "TikTok", "Reels", "Status WhatsApp"],
    internal_prompt: `STYLE: Bold Social Media Vertical Photography
REFERENCE: Top food influencers, viral food content, trending Instagram Reels

LIGHTING:
- Primary: Bright, punchy front lighting
- High key with intentional highlights
- Colorful accent lighting welcome (subtle colored gels)
- Ring light effect for even, flattering illumination
- Catchlights and reflections add life and energy
- Slight overexposure acceptable for airy feel (+0.5 stops)

BACKGROUND:
- VIBRANT colored backgrounds encouraged:
  * Bold pastels (millennial pink, mint green, lavender)
  * Saturated solids (coral, turquoise, yellow)
  * Gradient backgrounds (sunset tones, cotton candy)
  * Terrazzo or colorful tile patterns
- Can match or complement food colors
- Modern, trendy aesthetic
- Clean and uncluttered

COMPOSITION:
- VERTICAL 9:16 format optimized
- Food positioned in center or lower third
- Upper third left open for text/stickers/polls
- Dynamic angles welcome (slight tilt 5-10 degrees)
- Close-up crops that fill frame
- "Hand in frame" shots highly effective
- Action shots (pouring, dipping, pulling) encouraged
- Movement and energy in composition

STYLING:
- Over-the-top garnishes welcome
- Dripping sauces, cheese pulls, chocolate drizzles
- Steam and sizzle effects
- Sprinkles, toppings caught mid-air
- Bright colored plates and utensils
- Fun props (colorful napkins, quirky utensils)
- "Instagrammable" presentation
- Slightly messy/imperfect adds authenticity

COLOR GRADING:
- HIGHLY saturated, vibrant colors
- Saturation: +15 to +25%
- Vibrance: +20%
- Contrast: Medium-high for punch
- Shadows: Lifted and colorful
- Highlights: Bright and airy
- White balance: Can be creative (warm for cozy, cool for fresh)
- Consider complementary color theory (food vs background)

MOOD:
- Fun, energetic, scroll-stopping
- "OMG I need to try this!" reaction
- Shareable, saveable content
- Youthful and trendy
- Immediate craving trigger
- FOMO-inducing`,
    example_image_url: "/templates/stories-vibrant.jpg",
    is_active: true
  },
  {
    slug: "minimalista-clean",
    name: "Minimalista Clean",
    description:
      "Elegância na simplicidade. Fundo branco puro, composição limpa e foco absoluto no prato. Perfeito para marcas premium.",
    category: "premium",
    aspect_ratio: "1:1",
    platform_suggestions: ["Website Hero", "Instagram Feed", "Print Advertising"],
    internal_prompt: `STYLE: High-End Minimalist Product Photography
REFERENCE: Apple-style product shots, Scandinavian design aesthetic, luxury brand campaigns

LIGHTING:
- Primary: Very large, extremely soft light source
- Almost shadowless, ethereal quality
- Soft gradient from light to slightly less light (not harsh shadows)
- Light wrapping around the subject
- High key lighting setup
- No visible light direction - omnidirectional softness
- Subtle rim light for separation from white background

BACKGROUND:
- PURE WHITE background (#FFFFFF)
- Infinite white - no visible surface/background separation
- White surface seamlessly blending into white backdrop
- Option: Very subtle shadow beneath dish for grounding
- If shadow present: soft, diffused, barely visible
- No textures, no distractions, no props

COMPOSITION:
- Food as SOLE subject - nothing else
- Perfect center framing or elegant off-center
- MASSIVE negative space - 60-70% of frame can be empty
- Camera angle: 0 degrees (straight on) to 45 degrees depending on dish shape
- Dish must be on a white or clear plate
- Plate edges can bleed off frame for closer feel
- Single portion, perfectly plated
- Geometric precision in arrangement

STYLING:
- Absolute precision in plating
- Every element intentional and perfect
- Clean plate edges - no drips or smears
- Architectural food arrangement
- Odd numbers of elements (3 or 5)
- Negative space ON the plate as design element
- Micro-herbs placed with tweezers precision
- Oil/sauce dots with perfect spherical shape

COLOR GRADING:
- Neutral, true-to-life colors
- White balance: Perfect neutral (5500K)
- Saturation: +5% maximum, keep natural
- Contrast: Low to medium - soft tonal range
- Shadows: Barely present, very lifted
- Highlights: Clean white, no clipping
- Overall: Clean, crisp, premium feel

MOOD:
- Sophisticated, refined, premium
- Gallery-worthy presentation
- "Less is more" philosophy
- Timeless elegance
- Trust and quality signals
- Luxury without ostentation`,
    example_image_url: "/templates/minimalist-clean.jpg",
    is_active: true
  },
  {
    slug: "rustico-artesanal",
    name: "Rústico Artesanal",
    description:
      "Aconchegante e caseiro com elementos naturais. Madeira, tecidos rústicos e luz quente natural. Ideal para padarias, cafés e comida caseira.",
    category: "artisan",
    aspect_ratio: "4:5",
    platform_suggestions: ["Instagram Feed", "Pinterest", "Blog", "Cardápio Artesanal"],
    internal_prompt: `STYLE: Rustic Farmhouse Food Photography
REFERENCE: Kinfolk magazine, farm-to-table restaurants, artisan bakery aesthetics

LIGHTING:
- Primary: Natural window light simulation
- Soft, directional side light from one source
- Warm color temperature (4500K-5000K)
- Golden hour quality - warm and inviting
- Soft shadows that add depth and dimension
- Dappled light acceptable (through leaves/window effect)
- No artificial-looking light - must feel natural

BACKGROUND:
- Rustic, textured surfaces:
  * Reclaimed wood (barn wood, weathered planks)
  * Dark stained wooden table
  * Raw linen or burlap tablecloth
  * Vintage baking sheet or cutting board
  * Stone or slate surface
  * Terracotta tiles
- Imperfections welcome (knots, grain, wear)
- Warm, earthy color palette
- Aged patina on surfaces

COMPOSITION:
- Camera angle: 25-45 degrees (intimate, inviting angle)
- Asymmetric, organic arrangement
- Layered composition with depth:
  * Background: wall or distant surface
  * Midground: props, ingredients
  * Foreground: main dish
- Props essential to storytelling:
  * Wooden cutting boards
  * Cast iron pans
  * Linen napkins (natural colors)
  * Vintage utensils (wooden spoons, butter knife)
  * Ceramic/stoneware dishes
  * Mason jars, bread baskets
  * Fresh herbs in small pots
  * Flour dust, breadcrumbs scattered

STYLING:
- "Homemade" and "handcrafted" feeling
- Imperfect beauty - slightly messy is good
- Crumbs on the cutting board
- Torn bread revealing interior
- Honey dripping from spoon
- Butter melting on warm bread
- Seasonal elements (fall leaves, spring flowers)
- Ingredients shown raw alongside finished dish
- Story of cooking/baking process

COLOR GRADING:
- Warm, cozy color palette
- White balance: Warm (4800K-5200K)
- Earth tones emphasized (browns, creams, forest greens)
- Saturation: Natural, slight desaturation in shadows
- Contrast: Medium, film-like quality
- Shadows: Warm brown tones, never black
- Highlights: Creamy, soft rolloff
- Consider vintage/film preset feel

MOOD:
- Warm, comforting, nostalgic
- "Grandma's kitchen" feeling
- Authentic, honest, unpretentious
- Slow living, slow food
- Handmade with love
- Cozy Sunday morning vibes`,
    example_image_url: "/templates/rustic-artisan.jpg",
    is_active: true
  },
  {
    slug: "fast-food-apetitoso",
    name: "Fast Food Apetitoso",
    description:
      "Textura intensa, queijo derretendo, suculência extrema. Visual que causa fome instantânea. Perfeito para hamburguerias, pizzarias e comfort food.",
    category: "fast-food",
    aspect_ratio: "4:5",
    platform_suggestions: ["iFood", "Instagram Feed", "Outdoor", "Delivery Apps"],
    internal_prompt: `STYLE: Craveable Fast Food Hero Photography
REFERENCE: McDonald's, Burger King premium campaigns, Five Guys, Shake Shack imagery

LIGHTING:
- Primary: Warm, directional key light (45 degrees front-side)
- Hard light with slight diffusion for texture definition
- Strong highlights on grease, oil, melted cheese
- Backlight/rim light to illuminate steam and separate from background
- Warm color temperature (4000K-4500K) for appetite appeal
- Specular highlights on wet/glossy surfaces
- Dramatic but appetizing - not too moody

BACKGROUND:
- Dark to medium toned backgrounds:
  * Dark wood grain
  * Black or charcoal surface
  * Kraft paper (for burger wrapper feel)
  * Industrial metal texture
  * Branded paper/tray liner
- Background should recede, not compete
- Slight depth blur on background (f/2.8 - f/4 look)
- Can include branded elements subtly

COMPOSITION:
- Camera angle: 15-30 degrees (low angle makes food look heroic)
- TIGHT CROP - fill the frame
- Slight tilt (3-5 degrees) for dynamic energy
- Stack/layer foods to show all components
- Cut foods in half to show cross-section
- Hero angle showing best side of food
- Negative space minimal - food dominates
- "Larger than life" feeling

STYLING:
- TEXTURE IS EVERYTHING:
  * Cheese pull - stretchy, gooey, perfect strings
  * Sauce drip - glossy, viscous, caught mid-drip
  * Meat juices - glistening, caramelized edges
  * Crispy elements - visible crunch texture
  * Steam rising from hot food
  * Condensation on cold drinks
  * Melting butter on buns
  * Toasted, golden bun tops
- Stack burgers tall, compress slightly for stability
- Bacon perfectly wavy
- Lettuce crisp and fresh
- Tomato juicy with visible seeds
- Slightly messy is GOOD - controlled chaos

COLOR GRADING:
- WARM and SATURATED
- White balance: Warm (4500K)
- Saturation: +10 to +15% (especially reds, yellows, oranges)
- Contrast: High - punchy blacks and bright highlights
- Shadows: Deep but not crushed
- Highlights: Hot spots on grease/shine acceptable
- Skin tones of food (meat browning) rich and appetizing
- Greens: Vibrant, fresh looking

MOOD:
- INSTANT CRAVING
- Indulgent, unapologetic
- "Cheat day" vibes
- Satisfying, filling, delicious
- Mouth-watering response
- "I need this NOW" urgency`,
    example_image_url: "/templates/fast-food-crave.jpg",
    is_active: true
  },
  {
    slug: "sobremesa-elegante",
    name: "Sobremesa Elegante",
    description:
      "Doces dignos de confeitaria premiada. Delicadeza, sofisticação e detalhes requintados. Para docerias, patisseries e sobremesas especiais.",
    category: "patisserie",
    aspect_ratio: "4:5",
    platform_suggestions: ["Instagram Feed", "Website", "Menu Degustação", "Pinterest"],
    internal_prompt: `STYLE: Fine Patisserie Photography
REFERENCE: Pierre Herme, Laduree, high-end pastry chef presentations, Bon Appetit dessert features

LIGHTING:
- Primary: Soft, diffused side light (window light quality)
- Gentle gradient from light to shadow
- Subtle backlight for translucent elements (caramel, sugar work)
- Highlight delicate textures without harsh shadows
- Catchlights on glossy glazes and chocolate
- Soft wraparound light for creams and mousses
- Light that reveals layers and textures

BACKGROUND:
- Elegant, understated surfaces:
  * White marble with subtle veining
  * Soft pink or blush surfaces
  * Light gray seamless
  * Delicate linen texture
  * Pale wood grain
  * Neutral ceramic/porcelain
- Pastel tones welcome (lavender, mint, peach)
- Background should feel luxurious but not distract
- Bokeh backgrounds with soft blur (f/2.8 look)

COMPOSITION:
- Camera angle: 25-45 degrees (shows height and layers)
- Straight-on (0 degrees) for layered cakes showing cross-section
- Rule of thirds or golden ratio positioning
- Elegant props sparingly used:
  * Silver or gold dessert forks
  * Fine china plates
  * Delicate flowers (edible or decorative)
  * Vintage cake stands
  * Silk ribbons
  * Scattered petals
- Negative space for elegance
- Multiple desserts: odd numbers (1, 3, 5)
- Show texture details (cake crumb, mousse swirl)

STYLING:
- PRECISION is paramount:
  * Mirror glazes perfectly smooth
  * Chocolate work showing craftsmanship
  * Piped elements with consistent shape
  * Sugar decorations catching light
  * Gold leaf accents placed perfectly
  * Fruit glazed and glistening
  * Dusting of powdered sugar (fresh, not melted)
  * Chocolate curls and shavings
  * Coulis drizzles with intention
- Show the "cut" moment - cake slice revealing layers
- Melting elements (ice cream, chocolate) captured perfectly
- Fresh berries with visible texture

COLOR GRADING:
- Soft, romantic palette
- White balance: Slightly warm (5200K-5500K)
- Saturation: Natural to slightly enhanced on fruit colors
- Contrast: Medium-low, soft and dreamy
- Shadows: Lifted, never harsh
- Highlights: Soft rolloff, creamy whites
- Pastels enhanced subtly
- Chocolate and caramel tones rich but not dark
- Pinks and berries: vibrant but elegant

MOOD:
- Sophisticated, refined, delicate
- "Treat yourself" indulgence
- Artistry and craftsmanship
- French patisserie elegance
- Romantic, special occasion
- Aspirational but attainable
- Gift-worthy presentation`,
    example_image_url: "/templates/dessert-elegant.jpg",
    is_active: true
  },
  {
    slug: "bebidas-refrescantes",
    name: "Bebidas Refrescantes",
    description:
      "Drinks gelados, sucos e coquetéis com visual refrescante. Condensação, gelo cristalino e cores vibrantes.",
    category: "beverages",
    aspect_ratio: "4:5",
    platform_suggestions: ["Instagram Feed", "Menu Bebidas", "Cardápio Digital"],
    internal_prompt: `STYLE: Refreshing Beverage Photography
REFERENCE: Starbucks campaigns, premium juice brands, cocktail bar menus

LIGHTING:
- Backlight essential for liquid translucency
- Side light to show condensation droplets
- Bright, airy overall feel
- Rim light on glass edges
- Catchlights in liquid surface
- Light through ice cubes creating glow

BACKGROUND:
- Light, bright backgrounds (white, light blue, soft gradients)
- Complementary colors to drink
- Summer/tropical vibes for appropriate drinks
- Clean and uncluttered

COMPOSITION:
- Straight-on or slight angle (15-20 degrees)
- Show liquid level and color
- Condensation on glass exterior (ESSENTIAL)
- Ice cubes visible and crystal clear
- Garnishes: citrus wheels, mint, berries, umbrellas
- Straws and accessories as props
- Splash/pour shots highly effective

STYLING:
- Fresh condensation droplets (glycerin trick look)
- Crystal clear ice - no cloudy cubes
- Liquid movement frozen mid-splash
- Fresh fruit garnishes
- Foam/froth texture for lattes, smoothies
- Layered drinks showing color gradients
- Crushed ice texture visible
- Fresh herbs aromatic appearance

COLOR GRADING:
- Bright and vibrant
- Enhance liquid colors (oranges, greens, pinks)
- Cool tones for refreshing feel
- High key, airy atmosphere
- Whites clean and bright
- Saturation boosted on drink colors

MOOD:
- Fresh, cool, thirst-quenching
- Summer vibes`,
    example_image_url: "/templates/drinks-refreshing.jpg",
    is_active: true
  },
  {
    slug: "saudavel-fitness",
    name: "Saudável & Fitness",
    description:
      "Alimentação saudável com visual clean e natural. Bowls, saladas e refeições fit com cores vibrantes e ingredientes frescos.",
    category: "healthy",
    aspect_ratio: "1:1",
    platform_suggestions: ["Instagram Feed", "App Fitness", "Blog Saúde", "Cardápio Fit"],
    internal_prompt: `STYLE: Clean Healthy Lifestyle Photography
REFERENCE: Sweetgreen, Daily Harvest, wellness influencers, health food brands

LIGHTING:
- Bright, natural daylight simulation
- Soft, even illumination
- High key, optimistic feeling
- Minimal shadows
- Clean whites, no yellow cast
- "Morning light" fresh quality

BACKGROUND:
- Clean whites and neutrals
- Light marble or concrete
- Natural wood (light tones)
- Fresh, clean surfaces
- Green plant elements in background (subtle)
- White linens

COMPOSITION:
- Overhead flat lay popular for bowls
- 45 degrees for plated meals
- Show abundance of ingredients
- Colorful variety visible
- Organized, intentional arrangement
- Negative space for clean feel

STYLING:
- FRESH is the keyword:
  * Crisp vegetables with visible texture
  * Vibrant greens (spinach, kale, avocado)
  * Colorful variety (rainbow of vegetables)
  * Grains with visible texture (quinoa, rice)
  * Seeds and nuts as topping
  * Fresh herbs generously used
  * Citrus segments, berries
  * Dressings in side containers
- Show ingredients separately and combined
- Meal prep container shots
- Portion control visible

COLOR GRADING:
- Bright, fresh, natural
- Greens enhanced and vibrant
- Clean whites (5500K-6000K)
- Saturation: +10% on vegetables
- Contrast: Medium-low, soft
- Airy, light overall feel
- No heavy shadows or dark tones

MOOD:
- Fresh, energizing, virtuous
- "Good for you" feeling
- Clean eating lifestyle
- Motivation and aspiration
- Balanced and wholesome
- Achievable health goals`,
    example_image_url: "/templates/healthy-fitness.jpg",
    is_active: true
  }
];

async function main() {
  const { error } = await supabase.from("photo_templates").upsert(templates, { onConflict: "slug" });

  if (error) {
    console.error("Failed to seed templates:", error.message);
    process.exit(1);
  }

  console.log("Templates updated successfully:", templates.length);
}

main();
