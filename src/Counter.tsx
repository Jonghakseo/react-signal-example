import type {Signal} from '@preact/signals-react'
import {useEffect} from "react";

type Props = { increment: () => void; changeTitle: (newValue: string) => void } & (
  | {
  count: number
  double: number
  title: string
  onClickMinus: () => void
}
  | {
  count: Signal<number>
  double: Signal<number>
  title: Signal<string>
  onClickMinus?: never
}
  )

export const Counter = ({count, double, increment, title, changeTitle, ...restProps }: Props) => {
  const onClickMinus = () => {
    if (typeof count === 'number') {
      restProps.onClickMinus?.()
      return
    }
    count.value--
  }

  // useEffect(() => {
  //   setInterval(() => {
  //     if (typeof count !== 'number') {
  //       count.value--
  //     }
  //   }, 100)
  // }, []);

  const isSignal = typeof count !== 'number'
  console.log("render Counter. isSignal?:", isSignal)

  return (
    <div className='card'>
      <input type='text' value={title as string} onChange={(e) => changeTitle(e.target.value)}/>
      {/* For some reason the typescript complains if the signal is not inside fragment*/}
      <h2>
        <>{title}</>
      </h2>
      <button onClick={increment}>
        count is {count}
      </button>
      <h2>
        Double is: {double}
      </h2>
      <button type="button" onClick={onClickMinus}>count minus</button>
    </div>
  )
}
