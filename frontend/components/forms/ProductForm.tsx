"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import ListingResult from "@/components/listings/ListingResult";
import type { AmazonListing } from "@/types/listing";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

/* ----------------------------- validation ----------------------------- */

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  category: z.string().min(2, "Category is required"),
  features: z.string().min(10, "Describe the key features"),
  customer: z.string().min(3, "Target customer is required"),
  keywords: z.string().optional(),
  brandVoice: z.string().min(1, "Select a brand voice"),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
});

type FormValues = z.infer<typeof formSchema>;

const platforms = [
  { id: "amazon", label: "Amazon" },
  { id: "shopify", label: "Shopify" },
  { id: "etsy", label: "Etsy" },
  { id: "walmart", label: "Walmart" },
  { id: "tiktok", label: "TikTok Shop" },
  { id: "ebay", label: "eBay" },
];

/* --------------------------- small UI helpers -------------------------- */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-medium leading-none">
      {children}
    </label>
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-500">{message}</p>;
}

/* ------------------------------- component ------------------------------ */

export default function ProductForm() {
  const [listing, setListing] = useState<AmazonListing | null>(null);
const [loading, setLoading] = useState(false);
const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      category: "",
      features: "",
      customer: "",
      keywords: "",
      brandVoice: "Professional",
      platforms: [],
    },
  });


  const { errors } = form.formState;

  // live values for the controlled shadcn components
  const brandVoice = form.watch("brandVoice");
  const selectedPlatforms = form.watch("platforms") ?? [];

  function togglePlatform(id: string, checked: boolean) {
    const current = form.getValues("platforms") ?? [];
    const next = checked
      ? [...current, id]
      : current.filter((p) => p !== id);
    form.setValue("platforms", next, { shouldValidate: true });
  }

async function onSubmit(values: FormValues) {
  setLoading(true);
  setApiError(null);

  try {
    const response = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || data.message || "Failed to generate listing"
      );
    }

    if (!data.listing) {
      throw new Error("The API returned an empty listing");
    }

    setListing(data.listing);
  } catch (error) {
    console.error("Generation error:", error);

    setApiError(
      error instanceof Error
        ? error.message
        : "Something went wrong while generating the listing"
    );
  } finally {
    setLoading(false);
  }
}

  return (
      <>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl space-y-6"
    >
      {/* Product name */}
      <div>
        <Label>Product Name</Label>
        <Input
          placeholder="Wireless Gaming Mouse RGB"
          {...form.register("name")}
        />
        <ErrorText message={errors.name?.message} />
      </div>

      {/* Category */}
      <div>
        <Label>Category</Label>
        <Input
          placeholder="Electronics"
          {...form.register("category")}
        />
        <ErrorText message={errors.category?.message} />
      </div>

      {/* Features */}
      <div>
        <Label>Key Features</Label>
        <Textarea
          placeholder="RGB lighting, 16000 DPI, rechargeable battery..."
          rows={4}
          {...form.register("features")}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Separate features with commas or new lines.
        </p>
        <ErrorText message={errors.features?.message} />
      </div>

      {/* Target customer */}
      <div>
        <Label>Target Customer</Label>
        <Input
          placeholder="Gamers, streamers, designers"
          {...form.register("customer")}
        />
        <ErrorText message={errors.customer?.message} />
      </div>

      {/* Keywords */}
      <div>
        <Label>Keywords (optional)</Label>
        <Input
          placeholder="gaming mouse, wireless mouse"
          {...form.register("keywords")}
        />
        <ErrorText message={errors.keywords?.message} />
      </div>

      {/* Brand voice */}
      <div>
        <Label>Brand Voice</Label>
        <Select
          value={brandVoice}
          onValueChange={(v) =>
            form.setValue("brandVoice", v, { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a voice" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Luxury">Luxury</SelectItem>
            <SelectItem value="Playful">Playful</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
          </SelectContent>
        </Select>
        <ErrorText message={errors.brandVoice?.message} />
      </div>

      {/* Platforms */}
      <div>
        <Label>Platforms</Label>
        <p className="mb-3 text-xs text-muted-foreground">
          Choose the marketplaces to generate listings for.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {platforms.map((p) => (
            <label
              key={p.id}
              className="flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm hover:bg-muted/50"
            >
              <Checkbox
                checked={selectedPlatforms.includes(p.id)}
                onCheckedChange={(checked) =>
                  togglePlatform(p.id, checked === true)
                }
              />
              {p.label}
            </label>
          ))}
        </div>
        <ErrorText message={errors.platforms?.message} />
      </div>

{apiError && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {apiError}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Listing"}
      </Button>
    </form>

    {listing && (
      <ListingResult
        listing={listing}
        onChange={setListing}
      />
    )}
  </>
);
}