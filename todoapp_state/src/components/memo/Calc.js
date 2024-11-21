import { useMemo, useState } from "react";

export default function Calc({ from, to }) {
  //   const [amount, setAmount] = useState(0);

  const calculator = useMemo(() => {
    let startTime = new Date().getMilliseconds();

    let sum = 0;
    for (let i = from; i <= to; i++) {
      sum += i;
    }
    let endTime = new Date().getMilliseconds();
    console.log(endTime - startTime + "ms");

    return sum; // sum 값이 calculator에 전달됨
  }, [from, to]); // from과 to 값이 같다면 함수를 재생성하지 않는다

  const [random, setRandom] = useState(0);

  const onClickHandler = () => {
    setRandom(Math.random());
    console.log(random);
  };
  return (
    <div>
      <div>{`${from} ~ ${to}까지의 합은 ${calculator}입니다`}</div>
      <button onClick={onClickHandler}>계산하기</button>
    </div>
  );
}
