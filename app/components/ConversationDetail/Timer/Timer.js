import React from 'react';
import Timer from 'react-compound-timer';
import Numeral from 'numeral';
import {
  TimerContainer, TimerStyled,
  TimerTitle, TimerValue,
} from './Timer.styled';

const TimerWrapper = () => (
  <TimerContainer>
    <TimerStyled>
      <TimerTitle>Waiting</TimerTitle>
      <TimerValue>
        <span>
          <Timer
            initialTime={Math.random() * 1000000}
            formatValue={value => Numeral(value).format('00')}
          >
            <Timer.Minutes />
            m:
            <Timer.Seconds />
            s
          </Timer>
        </span>
      </TimerValue>
    </TimerStyled>
    <TimerStyled>
      <TimerTitle>Billable</TimerTitle>
      <TimerValue>
        <span>
          <Timer
            initialTime={Math.random() * 1000000}
            formatValue={value => Numeral(value).format('00')}
          >
            <Timer.Minutes />
            m:
            <Timer.Seconds />
            s
          </Timer>
        </span>
      </TimerValue>
    </TimerStyled>
    <TimerStyled>
      <TimerTitle>Hold</TimerTitle>
      <TimerValue>
        <span>
          <Timer
            initialTime={Math.random() * 1000000}
            formatValue={value => Numeral(value).format('00')}
          >
            <Timer.Minutes />
            m:
            <Timer.Seconds />
            s
          </Timer>
        </span>
      </TimerValue>
    </TimerStyled>
  </TimerContainer>
);

export default TimerWrapper;
