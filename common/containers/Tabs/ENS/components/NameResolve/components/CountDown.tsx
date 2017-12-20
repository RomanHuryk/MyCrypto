import React, { Component } from 'react';
import moment from 'moment';

interface Props {
  initialTime: number;
}

interface State {
  currentTime: number;
}

class CountDown extends Component<Props, State> {
  public state = { currentTime: 0 };

  constructor(props: Props) {
    super(props);
    this.startCountDown();
  }

  public render() {
    const { currentTime } = this.state;
    return <p>{this.humanizeTime(currentTime)}</p>;
  }

  private humanizeTime = (time: number) => {
    let timeRemaining = time;
    const floorTime = unit => Math.floor(timeRemaining / unit);
    const pad = (num: number) => num.toString().padStart(2, '0');
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = floorTime(day);
    timeRemaining -= days * day;
    const hours = floorTime(hour);
    timeRemaining -= hours * hour;
    const minutes = floorTime(minute);
    timeRemaining -= minutes * minute;
    const seconds = floorTime(second);

    return `${pad(days)} Days ${pad(hours)} Hours ${pad(minutes)} Minutes ${pad(seconds)} Seconds `;
  };

  private startCountDown = () => {
    const intervalId = window.setInterval(() => {
      const nextTime = +moment(this.props.initialTime).diff(+moment(), 'ms');

      if (nextTime < 0) {
        return clearInterval(intervalId);
      }

      this.setState({ currentTime: nextTime });
    }, 1000);
  };
}

interface ITime {
  text: string;
  time: number;
}

export const EnsTime: React.SFC<ITime> = ({ text, time }) => (
  <section className="order-info">
    <p>{text}</p>
    <h4>{moment(time).toString()}</h4>
    <CountDown initialTime={time} />
  </section>
);
