export interface BlogPost {
  id: string;
  title: string;
  handle: string;
  category: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog_1',
    title: 'Reflections Under Control: How to Light Shiny Metallic Objects',
    handle: 'lighting-highly-reflective-products',
    category: 'Lighting Tips',
    author: 'Rohan Khanna',
    date: 'June 15, 2026',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Photographing diamonds and polished metals is a game of angles. Discover the exact diffusion setups needed to sweep highlights across metallic edges.',
    content: `
      Photographing highly reflective items like luxury products and watches is one of the most technically demanding fields in commercial photography. Shiny surfaces do not show their own textures; instead, they show whatever is in front of them—which is usually your studio lights, your camera, and you.

      Here is the technical blueprint we use at FRT Studios to achieve clean highlights and high-contrast specular reflections.

      ### 1. The Theory of Family of Angles
      Every metallic surface reflects light like a mirror. To make a metallic surface look bright, you must place your light source within the surface's "Family of Angles." This is the range of positions where light hitting the surface will bounce directly back into your camera lens. If you place a light outside this family of angles, the metal will reflect the black studio environment and appear completely dark.

      ### 2. Double Diffusion Over Speedlights
      Using bare flash creates small, harsh white hotspots on polished metal. Instead, shoot through large diffusion screens. We recommend placing a diffusion panel (like white acrylic sheets or grid cloth) close to the product, and firing your strobe through it. This creates a gradient highlight, moving from bright white to soft grey, which visually curves the metallic surfaces.

      ### 3. Reflective Cards (Flagging)
      Silver and gold cards are your best friend. Use small hand-held reflective boards positioned just inches away from the jewelry to carve out specific specular lines on prongs and shanks. Conversely, use black foam boards (flags) to create black reflection lines. These black lines define the boundaries and borders of the ring, giving it geometric structure.
    `
  },
  {
    id: 'blog_2',
    title: 'The Art of the Editorial Moodboard: Setting the Campaign Direction',
    handle: 'editorial-moodboarding-guide',
    category: 'Creative Direction',
    author: 'Elena Rostova',
    date: 'May 28, 2026',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Before the camera clicks, the campaign is won or lost on the moodboard. Learn how we translate brand goals into light, shadows, and fabric motions.',
    content: `
      Before any lights are rigged or any strobe generators are powered, a premium photoshoot campaign is designed. In luxury and editorial photography, alignment on the visual theme is paramount. This is where the moodboard comes in.

      At FRT Studios, the moodboard serves as our project Bible, keeping photographers, set designers, stylists, and clients locked onto the same creative vision.

      ### 1. Moving Beyond Pinterest Clichés
      A successful moodboard does not copy other campaigns. Instead, it aggregates inspiration from multiple design domains. We compile screenshots of classical oil paintings (for lighting and color palette), architecture (for geometry and shadows), cinema frames (for scale and mood), and fabric textures.

      ### 2. Defining the Light Signature
      One of the most important aspects of our boards is the "Light Signature" block. We define whether the shoot will use hard, high-contrast spotlight rays (like brutalist architecture) or soft, enveloping north-light windows (like Renaissance paintings). This tells the team exactly what light setups to prepare.

      ### 3. Layout Spacing and Curation
      We curate our moodboards using strict grid lines, limiting the imagery to 8-12 highly cohesive pieces. Too many elements create confusion, causing the campaign styling to drift. Keep it focused, keep it intentional.
    `
  },
  {
    id: 'blog_3',
    title: 'Behind the Scenes: vogue Autumn Session Runway Build',
    handle: 'behind-the-scenes-runway',
    category: 'Behind The Scenes',
    author: 'Rohan Khanna',
    date: 'April 10, 2026',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Take a look behind the lens of Studio Bay A during our brutalist panel build and high-speed strobe sync setup for the Vogue autumn campaign.',
    content: `
      Bay A was abuzz last month as we prepped for one of our most ambitious fashion campaigns: the Vogue Autumnal Fluidity series. The challenge was combining brutalist plaster textures with silk movement.

      Here is how the crew pulled it off inside our 2,500 sq ft cyclorama bay.

      ### 1. Building the Plaster Wall
      Our in-house set design crew constructed three modular concrete-textured plaster panels. We applied dry brushes of grey acrylics to create high-relief textures, ensuring that the camera could capture rough grains under hard spotlight grazing.

      ### 2. Rigging the Pro-11 Generators
      To freeze dynamic sweeps of fabric, we needed strobes with incredibly short flash durations. We rigged the Profoto Pro-11 generators, setting the pulse duration to 1/20,000th of a second. This allowed the camera to freeze moving threads instantly, eliminating motion blur entirely.

      ### 3. The Wind Strategy
      Soft fans create slow, boring fabric motions. We used dual industrial-grade blowers to blast directional air onto the garments, enabling the model to jump and sync her poses with the rapid air streams.
    `
  }
];

export const blog = {
  async getPosts(): Promise<BlogPost[]> {
    await new Promise(r => setTimeout(r, 100));
    return [...MOCK_BLOG_POSTS];
  },
  async getPostByHandle(handle: string): Promise<BlogPost | null> {
    await new Promise(r => setTimeout(r, 150));
    return MOCK_BLOG_POSTS.find(p => p.handle === handle) || null;
  }
};
