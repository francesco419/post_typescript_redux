import "./toggleSwitch.scss";

export default function ToggleSwitch() {
  return (
    <label className="btn-toggle-outter" id="label">
      <input
        type="checkbox"
        id="toggle"
        className="btn-toggle-input"
        hidden
        onChange={(e) => {
          const doc = document.getElementById(
            "label"
          ) as HTMLSpanElement | null;
          const inner = document.getElementById(
            "inner"
          ) as HTMLSpanElement | null;
          doc.classList.toggle("background-toggle");
          inner.classList.toggle("inner-toggle");
        }}
      />
      <span className="btn-toggle-inner" id="inner"></span>
    </label>
  );
}
