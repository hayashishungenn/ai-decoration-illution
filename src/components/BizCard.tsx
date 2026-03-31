interface BizCardProps {
  image: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export function BizCard({ image, title, subtitle, onClick }: BizCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative h-[200px] rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-soft transition-all duration-300 group"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* 内容区域 */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2.5 mb-2">
          {/* 图标 */}
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {title.includes('家装') ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
        <p className="text-white/90 text-xs leading-relaxed pl-10">{subtitle}</p>
      </div>
    </div>
  );
}
