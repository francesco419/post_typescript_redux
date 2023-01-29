import "./PageSetting.scss";
import { ModeToggle } from "./ModeToggle";
import PointerToggle from "./PointerToggle";

export function PageSetting() {
  return (
    <div className="block-pagesettings-display">
      <ModeToggle />
      <PointerToggle />
    </div>
  );
}

//darkmode,
