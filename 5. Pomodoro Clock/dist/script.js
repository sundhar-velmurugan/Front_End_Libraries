/*---------------------------UTILS--------------------------------*/
const convertSecToMinSec = time => {
  let hour = Math.floor(time / 60);
  let second = time % 60;

  hour = hour < 10 ? `0${hour}` : hour;
  second = second < 10 ? `0${second}` : second;

  return `${hour}:${second}`;
};

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
/*-------------------------COMPONENT------------------------------*/
class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timerLabel: 'Session',
      timeLeft: 1500,
      isRunning: false };


    this.incrementLength = this.incrementLength.bind(this);
    this.decrementLength = this.decrementLength.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.runClock = this.runClock.bind(this);
    this.updateTimeLeft = this.updateTimeLeft.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  incrementLength(division) {
    if (division === 'session') {
      let { sessionLength, timeLeft } = this.state;
      if (sessionLength + 1 <= 60) {
        sessionLength = sessionLength + 1;
        timeLeft = timeLeft + 60;
        this.setState({
          sessionLength,
          timeLeft },
        () => {});
      }
    } else {
      let { breakLength } = this.state;
      if (breakLength + 1 <= 60) {
        breakLength = breakLength + 1;
        this.setState({
          breakLength },
        () => {});
      }
    }
  }

  decrementLength(division) {
    if (division === 'session') {
      let { sessionLength, timeLeft } = this.state;
      if (sessionLength - 1 > 0) {
        sessionLength = sessionLength - 1;
        timeLeft = timeLeft - 60;
        this.setState({
          sessionLength,
          timeLeft },
        () => {});
      }
    } else {
      let { breakLength } = this.state;
      if (breakLength - 1 > 0) {
        breakLength = breakLength - 1;
        this.setState({
          breakLength },
        () => {});
      }
    }
  }

  resetClock() {
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      timerLabel: 'Session',
      timeLeft: 1500,
      isRunning: false },
    () => {
      this.audio.pause();
      this.audio.currentTime = 0;
    });
  }

  runClock() {
    let { isRunning } = this.state;
    this.setState({
      isRunning: !isRunning },
    () => {});
  }

  updateTimeLeft(timeLeft) {
    this.setState({
      timeLeft },
    () => {});
  }

  triggerChange() {
    let { timerLabel } = this.state;
    this.runClock();
    this.audio.play();
    if (timerLabel === 'Session') {
      this.setState({
        timerLabel: 'Break',
        timeLeft: this.state.breakLength * 60,
        isRunning: true },
      () => {});
    } else {
      this.setState({
        timerLabel: 'Session',
        timeLeft: this.state.sessionLength * 60,
        isRunning: true },
      () => {});
    }
  }

  render() {
    let {
      timerLabel,
      timeLeft,
      sessionLength,
      breakLength,
      isRunning } =
    this.state;
    return (
      React.createElement("div", { id: "pomodoro" },
      React.createElement(LeftPanel, { timerLabel: timerLabel, timeLeft: timeLeft, onResetClick: this.resetClock, onPlayClick: this.runClock, isRunning: isRunning, updateTimeLeft: tleft => this.updateTimeLeft(tleft), triggerChange: this.triggerChange }),
      React.createElement(RightPanel, { onIncrementClick: div => this.incrementLength(div), onDecrementClick: div => this.decrementLength(div), isRunning: isRunning, sessionLength: sessionLength, breakLength: breakLength }),
      React.createElement("audio", { id: "beep", preload: "auto", src: "https://goo.gl/65cBl1", ref: audio => {this.audio = audio;} })));


  }}


function LeftPanel(props) {
  return (
    React.createElement("div", { id: "leftPanel" },
    React.createElement("div", { id: "clock" },
    React.createElement("p", { id: "timer-label", className: "main-label" }, props.timerLabel),
    React.createElement("p", { id: "time-left" }, props.isRunning ? React.createElement(Counter, { isRunning: props.isRunning, timeLeft: props.timeLeft, updateTimeLeft: tleft => props.updateTimeLeft(tleft), triggerChange: props.triggerChange }) : convertSecToMinSec(props.timeLeft))),

    React.createElement("div", { id: "controls" },
    React.createElement("button", { id: "start_stop", className: "btn btn-dark", onClick: props.onPlayClick },
    React.createElement("i", { className: "fa fa-play", "aria-hidden": "true" }),
    React.createElement("i", { className: "fa fa-pause", "aria-hidden": "true" })),

    React.createElement("button", { id: "reset", className: "btn btn-info", onClick: props.onResetClick },
    React.createElement("i", { className: "fa fa-repeat", "aria-hidden": "true" })))));




}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    let { timeLeft } = this.props;
    this.state = {
      timeLeft };

  }
  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.props.isRunning) {
        if (this.state.timeLeft - 1 >= 0) {
          this.setState({
            timeLeft: this.state.timeLeft - 1 },

          () => {this.props.updateTimeLeft(this.state.timeLeft);});

        } else {
          this.props.triggerChange();
        }
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      React.createElement(React.Fragment, null, convertSecToMinSec(this.state.timeLeft)));

  }}


function RightPanel(props) {
  return (
    React.createElement("div", { id: "rightPanel" },
    React.createElement(Input, { division: "session", onIncrementClick: division => props.onIncrementClick(division), onDecrementClick: division => props.onDecrementClick(division), isRunning: props.isRunning, length: props.sessionLength }),
    React.createElement(Input, { division: "break", onIncrementClick: division => props.onIncrementClick(division), onDecrementClick: division => props.onDecrementClick(division), isRunning: props.isRunning, length: props.breakLength })));


}

function Input(props) {
  let { division, isRunning } = props;
  return (
    React.createElement("div", { id: division },
    React.createElement("p", { id: `${division}-label`, className: "side-label" }, capitalize(division), " Length"),
    React.createElement("span", { id: `${division}-controls` },
    React.createElement("button", { id: `${division}-decrement`, className: "btn btn-danger", onClick: isRunning ? () => {} : () => props.onDecrementClick(division) },
    React.createElement("i", { className: "fa fa-arrow-left", "aria-hidden": "true" })),

    React.createElement("p", { id: `${division}-length` }, props.length.toString()),
    React.createElement("button", { id: `${division}-increment`, className: "btn btn-success", onClick: isRunning ? () => {} : () => props.onIncrementClick(division) },
    React.createElement("i", { className: "fa fa-arrow-right", "aria-hidden": "true" })))));




}

ReactDOM.render(React.createElement(Pomodoro, null), document.getElementById('root'));