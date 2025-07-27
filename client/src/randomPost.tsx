import { Button } from './components/ui/button'
import {  useState } from 'react'

export const RandomPost = () => {


  const [randomNum, setRandomNum] = useState(0);
  const handleRandomNum = () => {
    const num = Math.round(Math.random() * 10 + 1)
    setRandomNum(prev => prev !== num ? prev : num);
    console.log(num)
  }
  return (<>
    <div className="flex min-h-svh flex-col items-center justify-center">
      <span>{randomNum}</span>
      <Button onClick={handleRandomNum}>Click me</Button>
    </div>

  </>)
}