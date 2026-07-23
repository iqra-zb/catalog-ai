"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import SectionCard from "./SectionCard";
import type { AmazonListing } from "@/types/listing";
import { Button } from "@/components/ui/button";

type Props = {
  listing: AmazonListing;
};

export default function AmazonListing({ listing }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copyText(key: string, value: string) {
    await navigator.clipboard.writeText(value);

    setCopied(key);

    setTimeout(() => {
      setCopied(null);
    }, 1500);
  }

  return (
    <div className="space-y-6">

      {/* Title */}

      <SectionCard title="Title">

        <div className="flex justify-end mb-3">

          <Button
            size="sm"
            variant="outline"
            onClick={() => copyText("title", listing.title)}
          >
            {copied === "title" ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>

        </div>

        <p className="leading-7">
          {listing.title}
        </p>

        <p className="mt-3 text-sm text-muted-foreground">
          {listing.title.length} / 200 characters
        </p>

      </SectionCard>

      {/* Bullet Points */}

      <SectionCard title="Bullet Points">

        <div className="space-y-4">

          {listing.bullets.map((bullet, index) => (

            <div
              key={index}
              className="rounded-lg border p-4"
            >

              <div className="mb-3 flex justify-between">

                <h4 className="font-medium">
                  Bullet {index + 1}
                </h4>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    copyText(`bullet-${index}`, bullet)
                  }
                >
                  {copied === `bullet-${index}` ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>

              </div>

              <p>
                {bullet}
              </p>

            </div>

          ))}

        </div>

      </SectionCard>

      {/* Description */}

      <SectionCard title="Description">

        <div className="flex justify-end mb-3">

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              copyText("description", listing.description)
            }
          >
            {copied === "description" ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>

        </div>

        <p className="leading-7 whitespace-pre-wrap">
          {listing.description}
        </p>

      </SectionCard>

      {/* Backend Keywords */}

      <SectionCard title="Backend Keywords">

        <div className="flex justify-end mb-3">

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              copyText(
                "keywords",
                listing.backend_keywords
              )
            }
          >
            {copied === "keywords" ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>

        </div>

        <p>
          {listing.backend_keywords}
        </p>

      </SectionCard>

    </div>
  );
}