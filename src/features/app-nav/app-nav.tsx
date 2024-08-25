import { IconType } from "@/types";
import SelectItem from '@/features/base-components/select-item/select-item'

const navItems: Array<{
  icon: IconType;
  label: string;
}> = [
  {icon: IconType.Learn, label: "Learn"},
  {icon: IconType.Practice, label: "Practice"},
]

export default function AppNav() {
  return (
    <nav data-testid="nav">
      {
        navItems.map((item) => <SelectItem label={item.label} icon={item.icon} onClick={() => {}} key={item.label}/>)
      }
    </nav>
  )
}