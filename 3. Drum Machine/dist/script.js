function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Drum extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "playSound",













    (element, id) => {
      element.play();
      this.setState({
        message: id.concat(' Sound') });

    });_defineProperty(this, "handleClick",

    id => {
      this.playSound(document.getElementById(id), id);
    });_defineProperty(this, "handleKeyDown",

    event => {
      let element = document.getElementById(String.fromCharCode(event.keyCode));
      element ?
      this.playSound(element, String.fromCharCode(event.keyCode)) :
      null;

    });this.state = { message: "Play Away!!" };}componentDidMount() {document.addEventListener('keydown', this.handleKeyDown, true);}componentWillUnmount() {document.removeEventListener('keydown', this.handleKeyDown, true);}

  render() {
    return (
      React.createElement(DrumMachine, null,
      React.createElement("div", { id: "display" }, this.state.message),
      React.createElement(DrumPadContainer, null,
      React.createElement(DrumPad, { id: "Q", onClick: id => this.handleClick(id) }),
      React.createElement(DrumPad, { id: "W", onClick: id => this.handleClick(id) }),
      React.createElement(DrumPad, { id: "E", onClick: id => this.handleClick(id) }),
      React.createElement(DrumPad, { id: "A", onClick: id => this.handleClick(id) }),
      React.createElement(DrumPad, { id: "S", onClick: id => this.handleClick(id) }),
      React.createElement(DrumPad, { id: "D", onClick: id => this.handleClick(id) }),
      React.createElement(DrumPad, { id: "Z", onClick: id => this.handleClick(id) }),
      React.createElement(DrumPad, { id: "X", onClick: id => this.handleClick(id) }),
      React.createElement(DrumPad, { id: "C", onClick: id => this.handleClick(id) }))));



  }}


const DrumMachine = props => {
  return (
    React.createElement("div", { id: "drum-machine" },
    props.children));


};

const DrumPadContainer = props => {
  return (
    React.createElement("div", { id: "drum-pad" },
    props.children));


};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      React.createElement("div", { class: "drum-pad", id: this.props.id.charCodeAt(0), onClick: this.handleClick },
      this.props.id,
      React.createElement("audio", { id: this.props.id, class: "clip", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" })));



  }}


ReactDOM.render(React.createElement(Drum, null), document.getElementById('root'));