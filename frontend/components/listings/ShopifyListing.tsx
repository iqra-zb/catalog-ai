"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import SectionCard from "./SectionCard";
import type { ShopifyListing } from "@/types/listing";

type Props = {
  listing: ShopifyListing;
};

function CharacterCount({ current, max, unit = "characters" }: { current: number; max: number; unit?: string }) {
  const over = current > max;
  return (
    <p className={`mt-2 text-xs ${over ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
      {current} / {max} {unit}
    </p>
  );
}

export default function ShopifyListing({ listing }: Props) {
  const [data, setData] = useState(listing);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setData(listing);
  }, [listing]);

  async function copy(field: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <SectionCard title="Shopify Title">
        <div className="mb-2 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => copy("title", data.title)}>
            {copied === "title" ? <><Check className="mr-2 h-4 w-4" /> Copied</> : <><Copy className="mr-2 h-4 w-4" /> Copy</>}
          </Button>
        </div>
        <Input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className={data.title.length > 70 ? "border-red-500" : ""}
        />
        <CharacterCount current={data.title.length} max={70} />
        <p className="mt-1 text-xs text-muted-foreground">Shopify product title. Keep it natural and under 70 chars for SEO.</p>
      </SectionCard>

      {/* Meta Description */}
      <SectionCard title="SEO Meta Description">
        <div className="mb-2 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => copy("meta", data.meta_description)}>
            {copied === "meta" ? <><Check className="mr-2 h-4 w-4" /> Copied</> : <><Copy className="mr-2 h-4 w-4" /> Copy</>}
          </Button>
        </div>
        <Textarea
          value={data.meta_description}
          rows={3}
          onChange={(e) => setData({ ...data, meta_description: e.target.value })}
          className={data.meta_description.length > 160 ? "border-red-500" : ""}
        />
        <CharacterCount current={data.meta_description.length} max={160} />
      </SectionCard>

      {/* Description */}
      <SectionCard title="Product Description">
        <div className="mb-2 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => copy("desc", data.description)}>
            {copied === "desc" ? <><Check className="mr-2 h-4 w-4" /> Copied</> : <><Copy className="mr-2 h-4 w-4" /> Copy</>}
          </Button>
        </div>
        <Textarea
          value={data.description}
          rows={8}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {data.description.trim().split(/\s+/).filter(Boolean).length} words
        </p>
      </SectionCard>
    </div>
  );
}