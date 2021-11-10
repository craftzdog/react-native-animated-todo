import React, { useRef, useState } from 'react'
import Animated, { Easing, useAnimatedProps } from 'react-native-reanimated'
import { Path, PathProps } from 'react-native-svg'

interface AnimatedStrokeProps extends PathProps {
  progress: Animated.SharedValue<number>
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

const AnimatedStroke = ({ progress, ...pathProps }: AnimatedStrokeProps) => {
  const [length, setLength] = useState(0)
  const ref = useRef<typeof AnimatedPath>(null)
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: Math.max(
      0,
      length - length * Easing.bezier(0.37, 0, 0.63, 1)(progress.value) - 0.1
    )
  }))

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      // @ts-ignore
      onLayout={() => setLength(ref.current!.getTotalLength())}
      // @ts-ignore
      ref={ref}
      strokeDasharray={length}
      {...pathProps}
    />
  )
}

export default AnimatedStroke
