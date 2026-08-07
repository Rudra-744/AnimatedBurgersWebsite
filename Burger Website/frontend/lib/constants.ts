export const SITE_CONFIG = {
  name: "Rimi Burger",
  shortName: "Rimi Burger",
  description:
    "Rimi Burger — Premium handcrafted burgers made with 100% fresh ingredients. Taste the difference with our signature recipes, crispy sides, and refreshing drinks.",
  url: "https://riminburger.com", // TODO: Replace with actual production URL
  ogImage: "/og-image.jpg",
  locale: "en_US",
  keywords: [
    "Rimi Burger",
    "burgers",
    "best burgers",
    "handcrafted burgers",
    "fresh burgers",
    "burger restaurant",
    "fast food",
    "gourmet burgers",
    "burger delivery",
    "crispy fries",
  ],
  links: {
    instagram: "https://instagram.com/riminburger", // TODO: Replace with actual link
    facebook: "https://facebook.com/riminburger", // TODO: Replace with actual link
    twitter: "https://twitter.com/riminburger", // TODO: Replace with actual link
  },
  contact: {
    phone: "+91-XXXXXXXXXX", // TODO: Replace with actual phone
    email: "hello@riminburger.com", // TODO: Replace with actual email
    address: "Your Address Here", // TODO: Replace with actual address
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
