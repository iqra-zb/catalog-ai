"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AmazonListing } from "@/types/listing";

type ListingResultProps = {
  listing: AmazonListing;
  onChange: (listing: AmazonListing) => void;
};

type CharacterCountProps = {
  current: number;
  maximum: number;
  unit?: string;
};

function CharacterCount({
  current,
  maximum,
  unit = "characters",
}: CharacterCountProps) {
  const isOverLimit = current > maximum;

  return (
    <p
      className={`text-xs ${
        isOverLimit ? "font-medium text-red-500" : "text-muted-foreground"
      }`}
    >
      {current} / {maximum} {unit}
    </p>
  );
}

function getByteLength(value: string) {
  return new TextEncoder().encode(value).length;
}

export default function ListingResult({
  listing,
  onChange,
}: ListingResultProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  async function copyToClipboard(field: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);

      window.setTimeout(() => {
        setCopiedField(null);
      }, 1500);
    } catch (error) {
      console.error("Could not copy text:", error);
    }
  }

  function updateBullet(index: number, value: string) {
    const updatedBullets = [...listing.bullets];
    updatedBullets[index] = value;

    onChange({
      ...listing,
      bullets: updatedBullets,
    });
  }

  function getCompleteListing() {
    const bulletText = listing.bullets
      .map((bullet, index) => `Bullet ${index + 1}: ${bullet}`)
      .join("\n");

    return [
      `Title: ${listing.title}`,
      "",
      bulletText,
      "",
      `Description: ${listing.description}`,
      "",
      `Backend Keywords: ${listing.backend_keywords}`,
    ].join("\n");
  }

  return (
    <section className="mx-auto mt-10 max-w-4xl rounded-xl border bg-background p-6 shadow-sm">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Amazon Listing</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review and edit the generated content before exporting it.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => copyToClipboard("complete", getCompleteListing())}
        >
          {copiedField === "complete" ? (
            <>
              <Check className="mr-2 size-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 size-4" />
              Copy All
            </>
          )}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="generated-title"
              className="text-sm font-semibold"
            >
              Title
            </label>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard("title", listing.title)}
            >
              {copiedField === "title" ? (
                <>
                  <Check className="mr-2 size-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 size-4" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <Input
            id="generated-title"
            value={listing.title}
            onChange={(event) =>
              onChange({
                ...listing,
                title: event.target.value,
              })
            }
            className={
              listing.title.length > 200 ? "border-red-500" : undefined
            }
          />

          <CharacterCount
            current={listing.title.length}
            maximum={200}
          />
        </div>

        {/* Bullet points */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Bullet Points</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Amazon listings should contain exactly five concise,
              benefit-focused bullet points.
            </p>
          </div>

          {listing.bullets.map((bullet, index) => {
            const fieldKey = `bullet-${index}`;

            return (
              <div
                key={fieldKey}
                className="rounded-lg border bg-muted/20 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor={fieldKey}
                    className="text-sm font-medium"
                  >
                    Bullet {index + 1}
                  </label>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(fieldKey, bullet)
                    }
                  >
                    {copiedField === fieldKey ? (
                      <>
                        <Check className="mr-2 size-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 size-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>

                <Textarea
                  id={fieldKey}
                  value={bullet}
                  rows={3}
                  onChange={(event) =>
                    updateBullet(index, event.target.value)
                  }
                  className={
                    bullet.length > 200 ? "border-red-500" : undefined
                  }
                />

                <div className="mt-2">
                  <CharacterCount
                    current={bullet.length}
                    maximum={200}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="generated-description"
              className="text-sm font-semibold"
            >
              Description
            </label>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                copyToClipboard("description", listing.description)
              }
            >
              {copiedField === "description" ? (
                <>
                  <Check className="mr-2 size-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 size-4" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <Textarea
            id="generated-description"
            value={listing.description}
            rows={10}
            onChange={(event) =>
              onChange({
                ...listing,
                description: event.target.value,
              })
            }
          />

          <p className="text-xs text-muted-foreground">
            {
              listing.description
                .trim()
                .split(/\s+/)
                .filter(Boolean).length
            }{" "}
            words
          </p>
        </div>

        {/* Backend keywords */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="generated-keywords"
              className="text-sm font-semibold"
            >
              Backend Keywords
            </label>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                copyToClipboard(
                  "backend-keywords",
                  listing.backend_keywords
                )
              }
            >
              {copiedField === "backend-keywords" ? (
                <>
                  <Check className="mr-2 size-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 size-4" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <Textarea
            id="generated-keywords"
            value={listing.backend_keywords}
            rows={3}
            onChange={(event) =>
              onChange({
                ...listing,
                backend_keywords: event.target.value,
              })
            }
            className={
              getByteLength(listing.backend_keywords) > 250
                ? "border-red-500"
                : undefined
            }
          />

          <CharacterCount
            current={getByteLength(listing.backend_keywords)}
            maximum={250}
            unit="bytes"
          />
        </div>
      </div>
    </section>
  );
}