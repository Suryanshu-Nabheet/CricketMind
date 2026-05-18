import * as Icons from "lucide-react";

interface IconPlaceholderProps {
  className?: string;
  lucide?: string;
  hugeicons?: string;
  phosphor?: string;
  remixicon?: string;
  tabler?: string;
}

export function IconPlaceholder({ className, lucide }: IconPlaceholderProps) {
  if (!lucide) return null;

  // Strip the "Icon" suffix if it exists, to match lucide-react exports
  let iconName = lucide;
  if (iconName.endsWith("Icon")) {
    iconName = iconName.slice(0, -4);
  }

  // Cast through unknown to resolve Lucide's strict component types via index signature under TS strict mode
  const IconComponent = (Icons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >)[iconName];
  
  if (!IconComponent) {
    // Safe fallback if the icon is not found
    const HelpIcon = Icons.HelpCircle;
    return <HelpIcon className={className} />;
  }

  return <IconComponent className={className} />;
}
