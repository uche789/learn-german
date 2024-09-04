import { IconType } from "@/types";
import SelectItem from "@/components/select-item/SelectItem";
import "./AppNav.scss";

const navItems: Array<{
  icon: IconType;
  label: string;
}> = [
  { icon: IconType.Learn, label: "Learn" },
  { icon: IconType.Practice, label: "Practice" },
];

export default function AppNav() {
  return (
    <nav data-testid="nav">
      {navItems.map((item) => (
        <SelectItem
          label={item.label}
          icon={item.icon}
          onClick={() => {}}
          key={item.label}
        />
      ))}
    </nav>
  );
}
