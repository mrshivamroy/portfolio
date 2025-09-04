// components/SkillCard.tsx
import React from "react";

type SkillCardProps = {
  name: string;
  level: string;
  color?: string;
};

export default function SkillCard({ name, level, color = "#2563eb" }: SkillCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm transform transition duration-300 hover:scale-[1.02] hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
      <h4 className="text-lg font-semibold" style={{ color }}>{name}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{level}</p>
    </div>
  );
}
