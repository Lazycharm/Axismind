import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Full image view: object-contain, max ~85vh, dark overlay via Dialog.
 */
export default function PortfolioLightbox({ open, onOpenChange, imageUrl, title }) {
  if (!imageUrl) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[92vh] w-[min(96vw,1200px)] max-w-[min(96vw,1200px)] overflow-y-auto border border-white/10 bg-gray-950/98 p-3 sm:p-5 shadow-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">{title || "Project image"}</DialogTitle>
        <div className="flex min-h-[min(40vh,400px)] w-full items-center justify-center py-2">
          <img
            src={imageUrl}
            alt={title || ""}
            className="max-h-[85vh] w-auto max-w-full object-contain object-center"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
