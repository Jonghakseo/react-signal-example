import type { Signal } from '@preact/signals-react'

type Props = { increment: () => void; changeTitle: (newValue: string) => void } & (
  | {
  count: number
  double: number
  title: string
}
  | {
  count: Signal<number>
  double: Signal<number>
  title: Signal<string>
}
  )

export const Counter = ({ count, double, increment, title, changeTitle }: Props) => (
  <div className='card'>
    <input type='text' value={title as string} onChange={(e) => changeTitle(e.target.value)} />
    {/* For some reason the typescript complains if the signal is not inside fragment*/}
    <h2>
      <>{title}</>
    </h2>
    <button onClick={increment}>
      count is <>{count}</>
    </button>
    <h2>
      Double is: <>{double}</>
    </h2>
  </div>
)
