"use client";

import { cn } from "@/lib/utils";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  onClick?: () => void;
  isSelected?: boolean;
  cardKey?: React.Key;
}

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName = "text-[#37d495]",
  onClick,
  isSelected = false,
}: DisplayCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border px-4 py-3 transition-[transform,border-color,background-color,filter,box-shadow] duration-300",
        "border-[rgba(255,255,255,.10)] bg-[#0e1315]/80 backdrop-blur-sm",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem]",
        "after:bg-gradient-to-l after:from-[#0a0d0f] after:to-transparent after:content-['']",
        "hover:border-[rgba(55,212,149,.3)] hover:bg-[#0e1315]",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div>
        {icon && (
          <span className="relative inline-block rounded-full bg-[rgba(55,212,149,.12)] p-1">
            {icon}
          </span>
        )}
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-[#e9edeb]">{description}</p>
      <p
        className="text-[#6c7a74]"
        style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: "12px" }}
      >
        {date}
      </p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[rgba(255,255,255,.06)] before:h-[100%] before:content-[''] before:bg-[#0a0d0f]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[rgba(255,255,255,.06)] before:h-[100%] before:content-[''] before:bg-[#0a0d0f]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={cardProps.cardKey ?? index} {...cardProps} />
      ))}
    </div>
  );
}

export { DisplayCard };
export type { DisplayCardProps };
