"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  ShoppingCart,
  Store,
} from "lucide-react";

import AmazonListing from "./AmazonListing";
import ShopifyListing from "./ShopifyListing";

import type { ListingResults } from "@/types/listing";

type Props = {
  results: ListingResults;
};

export default function ListingTabs({ results }: Props) {
  const platforms = Object.keys(results);

  return (
    <Card className="mx-auto mt-10 max-w-5xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          Generated Listings
        </CardTitle>

        <CardDescription>
          Review, edit and copy your AI-generated listings for each marketplace.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs
          defaultValue={platforms[0]}
          className="w-full"
        >
          <TabsList className="mb-8 grid w-full grid-cols-2">
            {results.amazon && (
              <TabsTrigger
                value="amazon"
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Amazon
              </TabsTrigger>
            )}

            {results.shopify && (
              <TabsTrigger
                value="shopify"
                className="flex items-center gap-2"
              >
                <Store className="h-4 w-4" />
                Shopify
              </TabsTrigger>
            )}
          </TabsList>

          {results.amazon && (
            <TabsContent value="amazon">
              <AmazonListing listing={results.amazon} />
            </TabsContent>
          )}

          {results.shopify && (
            <TabsContent value="shopify">
              <ShopifyListing listing={results.shopify} />
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}