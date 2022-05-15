import React from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";

function Pointer() {
  const value = useSelector((state) => state.point.value);
  const diffMoney = useSelector((state) => state.point.diffMoney);

  let nonsense = value + diffMoney;

  return (
    <div className="pointer">
      <div>
        <h1>POINT:</h1>
        <h1>
          <CountUp start={nonsense} end={value} delay={0}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
        </h1>
      </div>
    </div>
  );
}

export default Pointer;
