import { useEffect, useState} from "react";
import "./App.css";
import { useComputed, effect, useSignal, signal } from "@preact/signals-react";
import { Counter } from "./Counter";

const countSignal = signal(0);

function App() {
  const [titleState, setTitleState] = useState("React useState Counter");
  const changeTitleState = (newValue: string) => setTitleState(newValue);
  const [countState, setCountState] = useState(0);
  const incrementState = () =>
    setCountState((oldCountState) => oldCountState + 1);
  const doubleState = countState * 2;
  useEffect(() => {
    if (countState > 10) setCountState(0);
  }, [countState]);

  const titleSignal = useSignal("Preact Signal Counter");
  const changeTitleSignal = (newValue: string) =>
    (titleSignal.value = newValue);

  const incrementSignal = () => {
    countSignal.value += 1;
    console.log("increment", countSignal.value);
  };
  const doubleSignal = useComputed(() => countSignal.value * 2);
  effect(() => {
    if (countSignal.value > 10) countSignal.value = 0;
  });

  console.log("re-render");

  return (
    <div className="App">
      <Counter
        count={countState}
        double={doubleState}
        increment={incrementState}
        title={titleState}
        changeTitle={changeTitleState}
      />
      <Counter
        count={countSignal}
        double={doubleSignal}
        increment={incrementSignal}
        title={titleSignal}
        changeTitle={changeTitleSignal}
      />
      {/*<span>{countSignal}</span>*/}
      {/*<Counter*/}
      {/*  count={countSignal.value}*/}
      {/*  double={doubleSignal.value}*/}
      {/*  increment={incrementSignal}*/}
      {/*  title={titleSignal.value}*/}
      {/*  changeTitle={changeTitleSignal}*/}
      {/*/>*/}
    </div>
  );
}

export default App;
