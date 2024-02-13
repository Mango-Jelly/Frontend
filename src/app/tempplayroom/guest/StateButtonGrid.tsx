export default function StateButtonGrid() {
  const stateButtonclass = "bg-main/30 hover:bg-main/60 rounded-3xl w-[22rem] h-[14rem] shadow";

  return (
    <div className="grid grid-cols-2 gap-4 content-center m-2">
      <button className={stateButtonclass}>
        <div>
          선생님
          <p>할 말 있어요</p>
        </div>
      </button>
      <button className={stateButtonclass}>
        <div>
          화장실에
          <p>가고 싶어요</p>
        </div>
      </button>
      <button className={stateButtonclass}>
        <div>
          저는
          <p>준비됐어요</p>
        </div>
      </button>
      <button className={stateButtonclass}>
        <div>
          응급상황!
          <p>확인해 주세요</p>
        </div>
      </button>
    </div>
  );
}
