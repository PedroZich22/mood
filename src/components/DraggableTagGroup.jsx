import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Edit3, Trash2, Plus, X } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

const DraggableTagGroup = ({
  group,
  isEditMode,
  onUpdateGroup,
  onDeleteGroup,
  onAddTag,
  onRemoveTag,
  availableIcons,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [groupName, setGroupName] = useState(group.name);
  const [newTagName, setNewTagName] = useState("");
  const [showAddTag, setShowAddTag] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: group.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSaveName = () => {
    if (groupName.trim() && groupName !== group.name) {
      onUpdateGroup(group.id, { ...group, name: groupName });
    }
    setIsEditing(false);
  };

  const handleAddTag = () => {
    if (newTagName.trim()) {
      onAddTag(group.id, newTagName.trim());
      setNewTagName("");
      setShowAddTag(false);
    }
  };

  const getIconComponent = (iconName) => {
    const iconData = availableIcons.find((icon) => icon.name === iconName);
    const IconComponent = iconData ? iconData.icon : availableIcons[0].icon;
    return <IconComponent className="w-5 h-5 text-brown-600" />;
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`p-4 ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isEditMode && (
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-brown-100 rounded"
            >
              <GripVertical className="w-5 h-5 text-brown-400" />
            </div>
          )}

          {getIconComponent(group.icon)}

          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="text-sm py-1 px-2"
                onKeyPress={(e) => e.key === "Enter" && handleSaveName()}
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveName}
                className="text-green-600 hover:text-green-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h3 className="heading-md">{group.name}</h3>
              {isEditMode && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="text-brown-500 hover:text-brown-700"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {isEditMode && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteGroup(group.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {group.tags.map((tag, tagIndex) => (
          <Badge
            key={typeof tag === "string" ? tagIndex : tag.id}
            className={`${group.color} ${isEditMode ? "group" : ""}`}
          >
            <span>{typeof tag === "string" ? tag : tag.name}</span>
            {isEditMode && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  onRemoveTag(
                    group.id,
                    typeof tag === "string" ? tagIndex : tag.id,
                  )
                }
                className="ml-1 hover:text-red-600 w-3 h-3 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </Badge>
        ))}

        {isEditMode && (
          <>
            {showAddTag ? (
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Tag name"
                  className="text-sm py-1 px-2 w-24"
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAddTag}
                  className="text-green-600 hover:text-green-700 w-4 h-4 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowAddTag(false);
                    setNewTagName("");
                  }}
                  className="text-red-600 hover:text-red-700 w-4 h-4 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddTag(true)}
                className="border-dashed border-brown-300 text-brown-500 hover:border-brown-400 hover:text-brown-600 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Tag</span>
              </Button>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default DraggableTagGroup;
