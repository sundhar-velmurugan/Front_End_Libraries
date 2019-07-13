const data = [
{
  author: 'Mark Caine',
  quote: 'The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.',
  color: 'forestgreen' },
{
  author: 'Helen Keller',
  quote: 'When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.',
  color: 'lightskyblue' },
{
  author: 'John F. Kennedy',
  quote: 'Those who dare to fail miserably can achieve greatly.',
  color: 'tomato' },
{
  author: 'Abraham Lincoln',
  quote: 'I’m a success today because I had a friend who believed in me and I didn’t have the heart to let him down.',
  color: 'goldenrod' },
{
  author: 'Leonardo Da Vinci',
  quote: 'It had long since come to my attention that people of accomplishment rarely sat back and let things happen to them. They went out and happened to things.',
  color: 'pink' },
{
  author: 'Albert Einstein',
  quote: 'If you want to live a happy life, tie it to a goal, not to people or things.',
  color: 'turquoise' },
{
  author: 'Thomas A. Edison',
  quote: 'The three great essentials to achieve anything worthwhile are, first, hard work; second, stick-to-itiveness; third, common sense.',
  color: 'gray' }];



class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data };

    this.generateRandomIndex = this.generateRandomIndex.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  generateRandomIndex() {
    let datalength = this.state.data.length;
    return Math.floor(Math.random() * Math.floor(datalength));
  }

  componentDidMount() {
    let randomIndex = this.generateRandomIndex();
    this.setState({
      currentIndex: randomIndex });

    document.documentElement.style.setProperty('--theme-color', data[randomIndex].color);
  }

  handleClick() {
    let index = this.generateRandomIndex();
    this.setState({
      currentIndex: index });

    document.documentElement.style.setProperty('--theme-color', data[index].color);
  }

  render() {
    let { currentIndex = 0, data } = this.state;
    return React.createElement(Presentational, { data: data[currentIndex], onClick: this.handleClick });
  }}


const Presentational = props => {
  return (
    React.createElement("div", { class: "card text-center card-block", id: "quote-box" },
    React.createElement("blockquote", { class: "blockquote mb-0 card-body" },
    React.createElement("p", { id: "text" }, props.data.quote),
    React.createElement("footer", { class: "blockquote-footer" },
    React.createElement("small", { class: "text-muted", id: "author" },
    React.createElement("cite", null, props.data.author)))),



    React.createElement("div", { class: "row" },
    React.createElement("div", { class: "col-3" },
    React.createElement("a", { href: "twitter.com/intent/tweet", class: "btn", id: "tweet-quote" }, React.createElement("i", { class: "fa fa-twitter-square" }), " Tweet")),

    React.createElement("div", { class: "col-5 offset-4" },
    React.createElement("button", { class: "btn", id: "new-quote", onClick: props.onClick }, React.createElement("i", { class: "fa fa-plus-square" }), " New Quote")))));




};

ReactDOM.render(React.createElement(Container, null), document.getElementById('root'));