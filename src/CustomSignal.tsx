import { useSyncExternalStore } from "react";

export class Signal<T = unknown> {
  private _value: T
  subscribers: Set<() => void> = new Set()

  constructor(value: T) {
    this._value = value
  }

  get value() {
    return (()=> {
      try {
        /**
         * 컴포넌트 최상위가 아닌 곳에서 useSignal을 호출하면 아래 에러가 발생한다.
         *  "Invalid hook call. Hooks can only be called inside of the body of a function component."
         *  이 경우 렌더링이 필요한 곳이 아니라고 판단하여 _value를 반환한다.
         */
        return useSignal(this);
      }catch {
        return this._value;
      }
    })()
  }

  set value(newValue: T) {
    // 이전 값과 같다면 리렌더링을 하지 않는다.
    if(this._value === newValue) return;

    this._value = newValue;
    this.notifyChange();
  }

  get asNode() {
    return <SignalNode signal={this}/>
  }


  /**
   * 아래는 React useSyncExternalStore 로직과 통합하기 위한 코드
   */
  private subscribe = (onStoreChange: () => void) => {
    this.subscribers.add(onStoreChange);
    return () => {
      this.subscribers.delete(onStoreChange);
    }
  }
  private notifyChange = () => {
    this.subscribers.forEach((subscriber) => {
      subscriber();
    })
  }
  private getSnapshot = () => {
    return this._value;
  }
  static subscribe<T>(signal: Signal<T>) {
    return signal.subscribe
  }
  static getSnapshot<T>(signal: Signal<T>) {
    return signal.getSnapshot
  }
}

function useSignal<T>(signal: Signal<T>) {
  return useSyncExternalStore(Signal.subscribe(signal), Signal.getSnapshot(signal))
}

function SignalNode<T>({ signal }: { signal: Signal<T> }) {
  return useSignal(signal)
}
