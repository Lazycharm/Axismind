import React from "react";
import { Badge } from "@/components/ui/badge";

/**
 * Fixed media area: square on mobile, 4:3 from md up.
 * Images use object-contain — full screenshot visible, no cropping.
 */
export default function PortfolioImageFrame({
  src,
  alt,
  onMediaClick,
  priority = false,
  featured = false,
  placeholder = null,
  roundedClassName = "rounded-t-xl",
}) {
  const showZoom = Boolean(src && onMediaClick);

  return (
    <div
      className={`relative w-full aspect-square md:aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-900/95 via-gray-900 to-blue-950/55 border-b border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${roundedClassName}`}
    >
      <div className="absolute inset-0 p-2 sm:p-3 md:p-4 flex items-center justify-center min-h-0">
        {src ? (
          showZoom ? (
            <button
              type="button"
              onClick={onMediaClick}
              className="group relative flex h-full w-full max-h-full max-w-full items-center justify-center rounded-lg outline-none transition-transform duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-amber-400/60 cursor-zoom-in"
              aria-label={`View full image: ${alt}`}
            >
              <img
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                className="max-h-full max-w-full h-auto w-auto object-contain object-center"
              />
            </button>
          ) : (
            <img
              src={src}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="max-h-full max-w-full h-auto w-auto object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-500">{placeholder}</div>
        )}
      </div>

      {featured && (
        <Badge className="pointer-events-none absolute right-3 top-3 z-10 border-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
          Featured
        </Badge>
      )}
    </div>
  );
}
