import type { Suggestion } from '../utils/suggestion';

interface SuggestionListProps {
  suggestions: Suggestion[];
}

export function SuggestionList({ suggestions }: SuggestionListProps) {
  return (
    <div className="space-y-3">
      {suggestions.map((suggestion, index) => (
        <div
          key={suggestion.id}
          className="flex items-start gap-3"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <p className="text-gray-700 text-sm leading-relaxed flex-1">
            {suggestion.text}
          </p>
        </div>
      ))}
    </div>
  );
}
