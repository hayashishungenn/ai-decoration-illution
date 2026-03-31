interface StyleCardProps {
  image: string;
  title: string;
  subtitle: string;
  selected: boolean;
  onClick: () => void;
}

export function StyleCard({
  image,
  title,
  subtitle,
  selected,
  onClick,
}: StyleCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300
        ${selected
          ? 'ring-2 ring-green-500 ring-offset-2 shadow-lg'
          : 'shadow-card hover:shadow-soft'
        }
      `}
    >
      {/* 图片区域 */}
      <div className="h-40">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      
      {/* 文字内容 */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        <p className="text-white/80 text-xs leading-relaxed">{subtitle}</p>
      </div>

      {/* 选中对勾 */}
      {selected && (
        <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-5 h-5 text-white"
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
