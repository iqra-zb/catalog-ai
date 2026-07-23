export interface AmazonListing {
  title: string;
  bullets: string[];
  description: string;
  backend_keywords: string;
}

export interface ShopifyListing {
  title: string;
  meta_description: string;
  description: string;
}

export interface ListingResults {
  amazon?: AmazonListing;
  shopify?: ShopifyListing;
}