interface SelectCardProps {
  image: string;
  title: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
}

export function SelectCard({
  image,
  title,
  subtitle,
  selected,
  onClick,
}: SelectCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300 ease-out
        ${selected
          ? 'ring-2 ring-primary-500 ring-offset-2 scale-[1.02] shadow-soft'
          : 'shadow-card hover:shadow-soft'
        }
      `}
    >
      <div className="aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-white font-semibold text-base">{title}</h3>
        {subtitle && (
          <p className="text-white/80 text-xs mt-0.5">{subtitle}</p>
        )}
      </div>

      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
