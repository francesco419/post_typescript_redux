import "./pageSetting.scss";
import { ModeToggle } from "./modeToggle";
import PointerToggle from "./pointerToggle";

export function PageSetting() {
  return (
    <div className="block-pagesettings-display">
      <ModeToggle />
      <PointerToggle />
    </div>
  );
}

//darkmode,
