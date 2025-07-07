import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { Badge } from "./Badge";
import DynamicLucideIcon from "./DynamicIcon.jsx";

const TagSelector = ({ tagGroups, selectedTags, onTagToggle, className }) => {
  const [expandedGroups, setExpandedGroups] = useState(new Set());

  const toggleGroup = (groupId) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  if (!tagGroups || tagGroups.length === 0) {
    return (
      <div className={cn("text-center py-6", className)}>
        <p className="text-brown-600">No tags available</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-brown-50 rounded-lg">
          {selectedTags.map((tag, index) => (
            <Badge
              key={index}
              className="bg-brown-600 text-white cursor-pointer group"
              onClick={() => onTagToggle(tag)}
            >
              <DynamicLucideIcon name={tag.icon} size={20} />
              <span>{tag.name}</span>
              <X className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100" />
            </Badge>
          ))}
        </div>
      )}

      {/* Tag Groups */}
      <div className="space-y-2">
        {tagGroups.map((group) => {
          const isExpanded = expandedGroups.has(group.id);

          return (
            <div
              key={group.id}
              className="border border-cream-200 rounded-lg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className="w-full p-3 flex items-center justify-between bg-white hover:bg-brown-50 transition-colors"
              >
                <span className="font-medium text-brown-800">
                  {group.groupName}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-brown-600 transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>

              {isExpanded && (
                <div className="p-3 bg-cream-50 border-t border-cream-200">
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag, tagIndex) => {
                      const isSelected = selectedTags.includes(tag);

                      return (
                        <button
                          key={tagIndex}
                          type="button"
                          onClick={() => onTagToggle(tag)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-200 border",
                            isSelected
                              ? "bg-brown-600 text-white border-brown-600"
                              : "bg-white text-brown-700 border-brown-300 hover:border-brown-500"
                          )}
                        >
                          <DynamicLucideIcon name={tag.icon} size={20} />
                          {tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { TagSelector };
