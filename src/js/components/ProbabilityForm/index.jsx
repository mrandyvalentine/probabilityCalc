import React, { Component } from 'react';
import ProbabilityFormConstants from './ProbabilityFormConstants';
import { probabilityCalc, validProbability } from '../../utils/SharedUtils';
import { Button, Input, Label } from '../Components';
import './_probabilityform.scss';

class ProbabilityForm extends Component {
    constructor(props) {
        super(props);

        // set initial state values
        this.state = {
            message: '',
            previous: [],
            probability1: '',
            probability2: '',
            type: 'combine',
        }
    }

    handleSubmit = e => {
        // form should only be submit with valid values
        e.preventDefault();

        const probabilityResult = probabilityCalc(this.state.type, this.state.probability1, this.state.probability2);
        
        // add the newest result to the start of the results list
        let previousResultsList = this.state.previous;
        previousResultsList.unshift([this.state.probability1, this.state.probability2, ProbabilityFormConstants.Types[this.state.type], probabilityResult]);

        // update message and previous results list
        this.setState({message: `Your result is ${probabilityResult}`, previous: previousResultsList});

    }

    render() {
        // define the message that is optionally shown under the form
        let message;
        if (this.state.message) 
            message = <div className="row"><div className={`${ProbabilityFormConstants.BaseClass}__message`}>
                {this.state.message}
            </div></div>;

        // define the results list that is optionally shown under the form - table for visual data formatting
        let previousResultsList;
        if (this.state.previous.length) {
            previousResultsList = <div className={`${ProbabilityFormConstants.BaseClass}__previous`}>
                Previous Results
                <table>
                    <thead><tr><th>P1</th><th>P2</th><th>Type</th><th>Result</th></tr></thead>
                    <tbody>
                        {this.state.previous.map((previous, i) => {
                            // ideally update this to named object keys
                            return <tr key={i}><td>{previous[0]}</td><td>{previous[1]}</td><td>{previous[2]}</td><td>{previous[3]}</td></tr>;
                        })}
                    </tbody>
                </table>
            </div>;
        }

        // dynamically create the radio options based on the set constants
        const choicesRadio = Object.keys(ProbabilityFormConstants.Types).map((key) => {
            return <React.Fragment key={ProbabilityFormConstants.Types[key]} >
                <input 
                    id={`types-${key}`} 
                    name="types"
                    onChange={ e => this.setState({type : key})}
                    type="radio" 
                    value={key}
                    checked={(this.state.type === key)} />
                <Label 
                    for={`types-${key}`}
                    text={ProbabilityFormConstants.Types[key]} />
                <br/>
            </React.Fragment>;
        }, this);

        return (
            <React.Fragment>
                <form 
                    className={ProbabilityFormConstants.BaseClass}
                    onSubmit={this.handleSubmit} >
                    <div className="row">
                        <Label 
                            classList={`${ProbabilityFormConstants.BaseClass}__probability-1-label`}
                            for="probability-1-input"
                            text="Probability 1"
                            valid={validProbability(this.state.probability1)}
                        />
                        <Input
                            classList={`${ProbabilityFormConstants.BaseClass}__probability-1-input`}
                            id="probability-1-input"
                            max={1}
                            min={0}
                            onChange={ e => this.setState( {probability1 : e.target.value} )}
                            required
                            type="number"
                            valid={validProbability(this.state.probability1)}
                            value={this.state.probability1}
                        />
                    </div>
                    <div className="row">
                        <Label 
                            classList={`${ProbabilityFormConstants.BaseClass}__probability-2-label`}
                            for="probability-2-input"
                            text="Probability 2"
                            valid={validProbability(this.state.probability2)}
                        />
                        <Input
                            classList={`${ProbabilityFormConstants.BaseClass}__probability-2-input`}
                            id="probability-2-input"
                            max={1}
                            min={0}
                            onChange={ e => this.setState( {probability2 : e.target.value} )}
                            required
                            type="number"
                            valid={validProbability(this.state.probability2)}
                            value={this.state.probability2}
                        />
                    </div>
                    <div className="row">
                        <ul>
                            { choicesRadio }
                        </ul>
                    </div>
                    <div className="row">
                        <Button 
                            ariaAttributes={{label: "Submit"}}
                            classList={`${ProbabilityFormConstants.BaseClass}__submit-button`}
                            // disable the button if both the inputs aren't valid
                            disabled={!validProbability(this.state.probability1) || !validProbability(this.state.probability2)}
                            type="submit"
                        />
                    </div>
                </form>
                {message}
                {previousResultsList}
            </React.Fragment>
        )
    }
}

export default ProbabilityForm;

