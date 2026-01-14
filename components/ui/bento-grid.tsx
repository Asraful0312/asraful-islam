import { cn } from "@/lib/utils";
import { GlowingEffect } from "./glowing-effect";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div className={cn("relative rounded-3xl p-0.5 md:p-1", className)}>
            <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
            />
            <div className="relative h-full flex flex-col justify-between space-y-4 rounded-[1.25rem] bg-zinc-900 border border-white/10 p-6 overflow-hidden">
                {header}
                <div className="group-hover/bento:translate-x-2 transition duration-200">
                    {icon}
                    <div className="font-sans font-bold text-neutral-200 mb-2 mt-2 text-xl">
                        {title}
                    </div>
                    <div className="font-sans font-normal text-neutral-400 text-sm leading-relaxed">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};
