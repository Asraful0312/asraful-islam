"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Layers, CalendarDays, ThumbsUp, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    heading: '"Transformed our workflow"',
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "@TechFlow",
    companyColor: "text-lime-500",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    heading: '"Exceeded every expectation"',
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    author: "Michael Rodriguez",
    role: "CTO",
    company: "@InnovateSphere",
    companyColor: "text-amber-500",
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    heading: '"Delivers on every promise"',
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    author: "James Kim",
    role: "Engineering Lead",
    company: "@DataPro",
    companyColor: "text-emerald-500",
    avatarUrl:
      "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=200&auto=format&fit=crop",
  },
];

const stats = [
  {
    icon: Layers,
    iconColor: "#F59E0B",
    label: "Projects",
    sublabel: "Shipped",
    badgeBg: "rgba(245,158,11,0.1)",
    badgeBorder: "rgba(245,158,11,0.3)",
    badgeText: "#b45309",
    metric: "23",
    metricSuffix: "+",
    subtext: "End-to-end delivery",
    description: "Across SaaS products, marketplaces, and internal tools.",
    starColor: "text-amber-400",
    gradient:
      "repeating-linear-gradient(135deg, rgba(245,158,11,0.08) 0px, rgba(245,158,11,0.08) 1px, transparent 1px, transparent 6px, rgba(245,158,11,0.04) 6px, rgba(245,158,11,0.04) 7px, transparent 7px, transparent 12px)",
  },
  {
    icon: CalendarDays,
    iconColor: "#a3e635",
    label: "Experience",
    sublabel: "Full-Stack Dev",
    badgeBg: "rgba(163,230,53,0.1)",
    badgeBorder: "rgba(163,230,53,0.3)",
    badgeText: "#4d7c0f",
    metric: "4",
    metricSuffix: "yrs",
    subtext: "Continuous growth",
    description: "In full-stack web development and UI engineering.",
    starColor: "text-lime-400",
    gradient:
      "repeating-linear-gradient(135deg, rgba(163,230,53,0.08) 0px, rgba(163,230,53,0.08) 1px, transparent 1px, transparent 6px, rgba(163,230,53,0.04) 6px, rgba(163,230,53,0.04) 7px, transparent 7px, transparent 12px)",
  },
  {
    icon: ThumbsUp,
    iconColor: "#10B981",
    label: "Satisfaction",
    sublabel: "Client Rate",
    badgeBg: "rgba(16,185,129,0.08)",
    badgeBorder: "rgba(16,185,129,0.3)",
    badgeText: "#047857",
    metric: "96",
    metricSuffix: "%",
    subtext: "Repeat engagements",
    description: "Based on post-project feedback and repeat engagement rate.",
    starColor: "text-emerald-500",
    gradient:
      "repeating-linear-gradient(135deg, rgba(16,185,129,0.08) 0px, rgba(16,185,129,0.08) 1px, transparent 1px, transparent 6px, rgba(16,185,129,0.04) 6px, rgba(16,185,129,0.04) 7px, transparent 7px, transparent 12px)",
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-background w-full py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl tracking-tight">
            Client <span className="text-jordy_blue-400 dark:text-jordy_blue">testimonials</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
            What clients and colleagues say about working with me.
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative mx-auto max-w-7xl">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="px-2 py-2">
              {testimonials.map((t) => (
                <CarouselItem
                  key={t.id}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="bg-muted/50 flex h-full min-h-70 flex-col justify-between rounded-4xl p-6 ring-0 select-none border-0">
                    <div>
                      <h3 className="text-foreground mb-2 text-2xl font-medium leading-tight">
                        {t.heading}
                      </h3>
                      <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
                        {t.quote}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="border-border h-12 w-12 border">
                        <AvatarImage src={t.avatarUrl} alt={t.author} />
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          {t.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-foreground font-medium">{t.author}</p>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                          {t.role}{" "}
                          <span className={t.companyColor}>{t.company}</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-10 flex w-full justify-center gap-2">
              <CarouselPrevious className="bg-muted hover:bg-muted/50 relative inset-0 size-10 rounded-xl border transition-colors" />
              <CarouselNext className="bg-muted hover:bg-muted/50 relative inset-0 size-10 rounded-xl transition-colors" />
            </div>
          </Carousel>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="group relative overflow-hidden rounded-[2rem] p-0 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] ring-0 transition-all duration-300 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_4px_4px_0px_rgba(0,0,0,0.1)]"
              style={{ backgroundImage: stat.gradient }}
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex items-center">
                  <div
                    className="inline-flex items-center gap-3 rounded-xl px-3.5 py-2"
                    style={{
                      backgroundColor: stat.badgeBg,
                      border: `1px solid ${stat.badgeBorder}`,
                    }}
                  >
                    <stat.icon className="size-5 shrink-0" style={{ color: stat.iconColor }} />
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-sm font-semibold" style={{ color: stat.badgeText }}>
                        {stat.label}
                      </span>
                      <span className="text-muted-foreground mt-0.5 text-[10px] tracking-widest uppercase">
                        {stat.sublabel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-baseline gap-0.5 text-left">
                  <span className="text-foreground text-6xl font-bold tracking-tighter">
                    {stat.metric}
                  </span>
                  <span className="text-muted-foreground text-2xl font-medium">
                    {stat.metricSuffix}
                  </span>
                </div>

                <p className="text-foreground mt-5 text-left text-sm font-semibold">
                  {stat.subtext}
                </p>
                <p className="text-muted-foreground mt-2 text-left text-sm leading-relaxed">
                  {stat.description}
                </p>

                <div className="mt-auto flex gap-1 pt-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-4 fill-current ${stat.starColor}`} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
