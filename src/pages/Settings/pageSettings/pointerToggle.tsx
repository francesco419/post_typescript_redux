import { Alertpopup } from "../../../components/extra/alertpopup";
import { selectFunc, setPointerMode } from "../../../redux/Slices/funcSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "./toggle.module.scss";
import { useEffect } from "react";

export default function PointerToggle() {
  const func = useAppSelector(selectFunc);
  const dispatch = useAppDispatch();

  return (
    <div className={styles["block-pageSetting-toggle"]}>
      <h4>Use Pointer : </h4>
      <input
        type="checkbox"
        id="pointer"
        name="Pointer"
        checked={!func.value.pointer}
        onChange={(e) => {
          dispatch(setPointerMode(!e.target.checked));
        }}
      />
      <label htmlFor="pointer">setting pointer animation ON / OFF</label>
      <Alertpopup text="ON / OFF" />
    </div>
  );
}
