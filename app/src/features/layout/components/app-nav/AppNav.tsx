import { IconType } from "@/types";
import SelectItem from "@/components/select-item/SelectItem";
import "./AppNav.scss";
import { useNavigate, useParams } from "react-router-dom";

const navItems: Array<{
  icon: IconType;
  label: string;
  path: string;
}> = [
  {
    icon: IconType.Learn, label: "Learn",
    path: "learn"
  },
  {
    icon: IconType.Practice, label: "Practice",
    path: "practice"
  },
];

export default function AppNav() {
  const navigate = useNavigate();
  const params = useParams()

  const goTo = (path: string) => {
    const route = `/${params.lang}/${path}`;
    navigate(route)
  }

  const isSelected = (path: string) => {
    const route = `/${params.lang}/${path}`;
    return window.location.pathname === route;
  }

  return (
    <nav data-testid="nav" aria-label="Site menu" className="nav-site-menu">
      {navItems.map((item) => (
        <SelectItem
          label={item.label}
          icon={item.icon}
          isSelected={isSelected(item.path)}
          onClick={() => goTo(item.path)}
          key={item.label}
        />
      ))}
    </nav>
  );
}
