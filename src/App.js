import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook'
import './App.css';


export default function App() {
  const [timers, setTimers] = useState([{ time: 2, text: 'this is my message' },
  { time: 5, text: 'hello' },
  { time: 8, text: 'whats up' }])

  const { seconds, isRunning, start, reset } = useStopwatch()


  useEffect(()=>{
    const foundTimer = timers.find(t => t.time === seconds)
    if(foundTimer){
      // this is where we will speak the text
    }
    // check to see if seconds is greater than the last timer's time
    if(seconds > timers[timers.length - 1].time) reset()

  }, [seconds, timers, reset])
  


  function updateTimers(index, time, text) {
    const newTimers = [...timers]
    newTimers[index].time = time;
    newTimers[index].text = text;
    setTimers(newTimers)
  }

  function addTimer() {
    const newTimers = [...timers, { time: 100, text: 'yooo' }]
    setTimers(newTimers)
  }

  return (
    <div className="app">
      <h2>Talk the Talk</h2>

      <div className="timers">
        {timers.map((timer, index) => (
          <TimerSlot key={index} index={index} timer={timer} updateTimers={updateTimers} />
        ))}
        <button className="add-button" onClick={addTimer}>Add</button>
      </div>

      {/* seconds */}
      <h2>{seconds}</h2>

      {/* buttons */}
      <div className="buttons">
        {!isRunning && <button className="start-button" onClick={start}>Start</button>}
        {isRunning && <button className="stop-button" onClick={reset}>Stop</button>}
      </div>
    </div>
  );
}

function TimerSlot({ index, timer, updateTimers }) {
  const [time, setTime] = useState(timer.time)
  const [text, setText] = useState(timer.text)

  function handleBlur() {
    updateTimers(index, time, text)
  }

  return (
    <form className="timer" key={index}>
      <input type="number" value={time} onChange={(e) => setTime(e.target.value)} onBlur={handleBlur} />
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} onBlur={handleBlur} />
    </form>
  )
}
