const initialText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

class ReactApp extends React.Component {
  constructor(props) {
    super(props);
    //markdown previewer interprets carriage returns and renders them as br (line break) elements.
    marked.setOptions({
      breaks: true });

    this.state = {
      editorText: initialText,
      previewText: marked(initialText) };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      editorText: e.target.value,
      previewText: marked(e.target.value) });

  }

  render() {
    let { editorText, previewText } = this.state;
    return (
      React.createElement(React.Fragment, null,
      React.createElement("h1", { id: "heading" }, "Simple React Markdown Previewer"),
      React.createElement(Editor, { value: editorText, onChange: this.handleChange }),
      React.createElement(Preview, null, previewText)));


  }}


const Editor = props => {
  return (
    React.createElement("div", { className: "box" },
    React.createElement("h3", { className: "panel-heading editor-heading" }, "Editor"),
    React.createElement("div", { id: "editor-div" },
    React.createElement("textarea", { id: "editor", onChange: props.onChange }, props.value))));



};

const Preview = props => {
  return (
    React.createElement("div", { className: "box" },
    React.createElement("h3", { className: "panel-heading preview-heading" }, "Preview"),
    React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: props.children } })));


};
ReactDOM.render(React.createElement(ReactApp, null), document.getElementById("root"));