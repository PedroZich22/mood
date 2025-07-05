import { Briefcase, Home } from "lucide-react";

export const TAGS_CONFIG = {
  tags: {
    work: {
      icon: Briefcase,
      color: "bg-blue-100 text-blue-600",
    },
    personal: {
      icon: Home,
      color: "bg-green-100 text-green-600",
    },
  },
};

export const getTagIcon = (tag) => {
  const tagConfig = TAGS_CONFIG.tags[tag];
  return tagConfig ? tagConfig.icon : null;
};
