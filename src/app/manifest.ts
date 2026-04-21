import type { MetadataRoute } from "next"; 

export default function getManifest(): MetadataRoute.Manifest { 
  return { 
    name: "My Next.js App", 
    short_name: "NextApp", 
    description: "A sample Next.js application", 
    icons: [ 
      { 
        src: "/icons/image.png", 
        sizes: "192x192", 
        type: "image/png", 
      }, 
    ], 
    start_url: "/", 
    display: "standalone", 
    background_color: "#ffffff", 
    theme_color: "#000000", 
  }; 
} 