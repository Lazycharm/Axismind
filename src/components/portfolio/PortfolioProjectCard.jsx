import React, { memo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PortfolioImageFrame from "@/components/portfolio/PortfolioImageFrame";
import PortfolioHighlightStrip from "@/components/portfolio/PortfolioHighlightStrip";
import { ExternalLink, MessageCircle } from "lucide-react";

const PortfolioProjectCard = memo(function PortfolioProjectCard({
  project,
  urlCta,
  categoryIcon: CategoryIcon,
  categoryClass,
  onOpenLightbox,
  onWhatsApp,
  eagerImage,
}) {
  const handleLightbox = useCallback(() => {
    if (project.image_url) onOpenLightbox(project.image_url, project.title);
  }, [project.image_url, project.title, onOpenLightbox]);

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-gray-700 bg-gray-800 shadow-xl transition-shadow duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10">
      <CardContent className="flex flex-1 flex-col p-0">
        <PortfolioImageFrame
          src={project.image_url}
          alt={`${project.title} — AxisMind case study`}
          onMediaClick={project.image_url ? handleLightbox : undefined}
          priority={eagerImage}
          featured={project.featured}
          placeholder={
            CategoryIcon ? <CategoryIcon className="h-12 w-12 text-blue-400/80" /> : null
          }
        />

        <PortfolioHighlightStrip project={project} />

        <div className="flex flex-1 flex-col gap-4 p-6">
          <Badge className={`w-fit ${categoryClass}`}>
            {CategoryIcon && <CategoryIcon className="mr-1 inline h-3 w-3" />}
            {String(project.category || "").replace("_", " ")}
          </Badge>

          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-400">
              {project.title}
            </h3>
            <p className="line-clamp-3 text-sm leading-relaxed text-gray-400">{project.description}</p>
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  variant="outline"
                  className="border-gray-600 bg-gray-700 text-xs text-gray-300"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="outline" className="border-gray-600 bg-gray-700 text-xs text-gray-300">
                  +{project.technologies.length - 3} more
                </Badge>
              )}
            </div>
          )}

          <div className="mt-auto pt-2">
            {project.project_url ? (
              <Button
                size="sm"
                type="button"
                onClick={() => window.open(project.project_url, "_blank")}
                className="w-full bg-blue-600 font-semibold text-white hover:bg-blue-700"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {urlCta}
              </Button>
            ) : (
              <Button
                size="sm"
                type="button"
                onClick={onWhatsApp}
                className="w-full bg-green-600 font-semibold text-white hover:bg-green-700"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Discuss This Project
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default PortfolioProjectCard;
