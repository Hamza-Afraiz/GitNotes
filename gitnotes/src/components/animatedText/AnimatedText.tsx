import React from 'react';
import AnimatedText from 'react-animated-text-content';
export const AnimatedTextComponent = (props:any) => {
    return (
        <div>
            <AnimatedText
  type="words" // animate words or chars
  animation={{
    x: '200px',
    y: '-20px',
    scale: 1.1,
    ease: 'ease-in-out',
  }}
  animationType="float"
  interval={0.06}
  duration={0.8}
  tag="h3"
  className="animated-paragraph"
  includeWhiteSpaces
  threshold={0.1}
  rootMargin="40%"
>
  {props.text}
</AnimatedText>
            
        </div>
    );
};

export default AnimatedText;