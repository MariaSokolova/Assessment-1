import React from "react";

class AssemblyLine extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    stages: [],
    inputValue: ''
  };

  componentDidMount() {
    const { stages } = this.props;
    const initialStages = stages.map(stage => ({
      title: stage,
      items: []
    }));

    this.setState({ stages: initialStages });
  }

  keyPress = (e) => {
    const item = e.target.value;

    if (e.key === 'Enter' && item) {
      this.setState(prevState => {
        const firstStageItems = prevState.stages[0].items;
        firstStageItems.unshift(item);
        prevState.stages[0].items = firstStageItems;

        return {
          stages: [...prevState.stages],
          inputValue: ''
        }
      });
    }
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleClick = (e, item, stageIndex) => {
    e.preventDefault();
    this.setState(prevState => {
      prevState.stages[stageIndex].items = prevState.stages[stageIndex].items
        .filter(i => i !== item);

      if (stageIndex !== prevState.stages.length - 1) {
        const nextStageItems = prevState.stages[stageIndex + 1].items;
        nextStageItems.unshift(item);
        prevState.stages[stageIndex + 1].items = nextStageItems;
      }

      return {
        stages: [...prevState.stages],
      }
    });
  };

  handleRightClick = (e, item, stageIndex) => {
    e.preventDefault();
    this.setState(prevState => {
      prevState.stages[stageIndex].items = prevState.stages[stageIndex].items
        .filter(i => i !== item);

      if (stageIndex !== 0) {
        const prevStageItems = prevState.stages[stageIndex - 1].items;
        prevStageItems.push(item);
        prevState.stages[stageIndex - 1].items = prevStageItems;
      }

      return {
        stages: [...prevState.stages],
      }
    });
  };

  render() {
    return (
      <>
        <div>
          <label htmlFor="">Add an item:</label>
          <input
            type="text"
            className="assembly-add-item"
            onChange={this.handleChange}
            value={this.state.inputValue}
            onKeyPress={this.keyPress}/>
        </div>
        <div className="assembly-stage-list">{
          this.state.stages.map((stage, stageIndex) => (

            <div className="assembly-stage" key={stage.title}>
              <h4>{stage.title}</h4>
              <div className="assembly-stage-item">
                {stage.items.map(item => (
                  <button
                    key={item}
                    className="assembly-item"
                    onClick={(e) => this.handleClick(e, item, stageIndex)}
                    onContextMenu={(e) => this.handleRightClick(e, item, stageIndex)}
                  >{item}</button>
                ))}
              </div>
            </div>
          ))
        }
        </div>
      </>
    );
  }
}

export default AssemblyLine;
