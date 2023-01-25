export default function Test(onclick: any) {
  return (
    <div style={{ position: "fixed", left: "0", top: "100px" }}>
      <button
        style={{ width: "100px", height: "30px" }}
        onClick={() => {
          console.log(onclick.onclick);
        }}
      >
        test
      </button>
    </div>
  );
}
