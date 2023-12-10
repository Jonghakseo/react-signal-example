import "./App.css";
import { Signal } from "./CustomSignal.tsx";


const text = new Signal("hello")

function CustomSignalApp() {
  const updateCustomSignal = () => {
    text.value = text.value + " world"
  }

  // console.log(text.value)
  console.log("render CustomSignalApp")

  return (
    <div className="App">
      <TextComponent text={text} />
      <button onClick={updateCustomSignal}>add world</button>
    </div>
  );
}

const TextComponent = ({ text }: { text: Signal<string> })  => {
  console.log("render TextComponent")
  return <p>{text.asNode}</p>
}

export default CustomSignalApp;
