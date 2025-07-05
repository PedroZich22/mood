import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit3, Save, Settings } from "lucide-react";
import {
  Heart,
  Briefcase,
  Users,
  Home,
  Dumbbell,
  Moon,
  Brain,
  Coffee,
  Music,
  Book,
  Gamepad2,
  Plane,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTagGroups } from "../hooks/useTagGroups";
import { useToast } from "../contexts/ToastContext";
import DraggableTagGroup from "./DraggableTagGroup";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

const MoodSettings = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);

  const {
    tagGroups,
    isLoading,
    createTagGroup,
    updateTagGroup,
    deleteTagGroup,
    reorderTagGroups,
    addTagToGroup,
    removeTagFromGroup,
  } = useTagGroups();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const availableIcons = [
    { icon: Heart, name: "Heart" },
    { icon: Briefcase, name: "Work" },
    { icon: Users, name: "Social" },
    { icon: Home, name: "Home" },
    { icon: Dumbbell, name: "Exercise" },
    { icon: Moon, name: "Sleep" },
    { icon: Brain, name: "Mental" },
    { icon: Coffee, name: "Energy" },
    { icon: Music, name: "Entertainment" },
    { icon: Book, name: "Learning" },
    { icon: Gamepad2, name: "Gaming" },
    { icon: Plane, name: "Travel" },
    { icon: ShoppingBag, name: "Shopping" },
    { icon: Utensils, name: "Food" },
  ];

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tagGroups.findIndex((group) => group.id === active.id);
      const newIndex = tagGroups.findIndex((group) => group.id === over.id);

      const newGroups = arrayMove(tagGroups, oldIndex, newIndex);
      const groupIds = newGroups.map((group) => group.id);

      try {
        await reorderTagGroups(groupIds);
        showSuccess("Groups reordered successfully!");
      } catch {
        showError("Failed to reorder groups");
      }
    }
  };

  const handleAddNewGroup = async () => {
    if (!newGroupName.trim()) return;

    try {
      const newGroup = {
        name: newGroupName,
        icon: "Heart",
        color: "bg-brown-100 text-brown-700 border-brown-200",
        tags: [],
      };

      await createTagGroup(newGroup);
      setNewGroupName("");
      setShowNewGroupForm(false);
      showSuccess("Group created successfully!");
    } catch {
      showError("Failed to create group");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteTagGroup(groupId);
      showSuccess("Group deleted successfully!");
    } catch {
      showError("Failed to delete group");
    }
  };

  const handleUpdateGroup = async (groupId, groupData) => {
    try {
      await updateTagGroup(groupId, groupData);
      showSuccess("Group updated successfully!");
    } catch {
      showError("Failed to update group");
    }
  };

  const handleAddTag = async (groupId, tagName) => {
    try {
      await addTagToGroup(groupId, tagName);
      showSuccess("Tag added successfully!");
    } catch {
      showError("Failed to add tag");
    }
  };

  const handleRemoveTag = async (groupId, tagId) => {
    try {
      await removeTagFromGroup(groupId, tagId);
      showSuccess("Tag removed successfully!");
    } catch {
      showError("Failed to remove tag");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-brown-200 rounded w-1/3 mb-8"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <div className="h-6 bg-brown-200 rounded w-1/4 mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div
                      key={j}
                      className="h-8 bg-brown-100 rounded w-16"
                    ></div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-lg mb-2">Mood Configuration</h1>
            <p className="text-brown-600 font-light">
              Customize your mood tracking experience with personalized tag
              groups
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant={isEditMode ? "default" : "secondary"}
              onClick={() => setIsEditMode(!isEditMode)}
              className="flex items-center space-x-2"
            >
              {isEditMode ? <Save size={20} /> : <Edit3 size={20} />}
              <span>{isEditMode ? "Save Changes" : "Edit Mode"}</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowNewGroupForm(!showNewGroupForm)}
              className="flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Group</span>
            </Button>
          </div>
        </div>
      </div>

      {/* New Group Form */}
      {showNewGroupForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Tag Group</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="Group name (e.g., Activities, Emotions)"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleAddNewGroup}
                disabled={!newGroupName.trim()}
              >
                Create
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowNewGroupForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tag Groups */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tagGroups.map((group) => group.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {tagGroups.map((group) => (
              <DraggableTagGroup
                key={group.id}
                group={group}
                isEditMode={isEditMode}
                availableIcons={availableIcons}
                onUpdate={handleUpdateGroup}
                onDelete={handleDeleteGroup}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {tagGroups.length === 0 && !isLoading && (
        <Card className="text-center py-12">
          <Settings size={48} className="mx-auto text-brown-400 mb-4" />
          <h3 className="text-lg font-medium text-brown-800 mb-2">
            No Tag Groups Yet
          </h3>
          <p className="text-brown-600 mb-4">
            Create your first tag group to start customizing your mood tracking
            experience.
          </p>
          <Button onClick={() => setShowNewGroupForm(true)}>
            Create Your First Group
          </Button>
        </Card>
      )}
    </div>
  );
};

export default MoodSettings;
