interface Props {
  name: string;
  small?: boolean;
}

export default function SkillBadge({ name, small = false }: Props) {
  const sizeClass = small ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`${sizeClass} bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md font-medium`}
    >
      {name}
    </span>
  );
}
