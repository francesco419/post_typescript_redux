import styles from "./ModeToggle.module.scss";

export function ModeToggle() {
  const toggledarkmode = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? document.documentElement.setAttribute("data-theme", "dark")
      : document.documentElement.setAttribute("data-theme", "light");
  };
  return (
    <div>
      <input
        type="checkbox"
        id="toggle"
        name="DarkMode"
        onChange={toggledarkmode}
      />
    </div>
  );
}
