import React, { useState } from 'react';
import ProbabilityFormConstants from './ProbabilityFormConstants';
import { probabilityCalc, validProbability } from '../../utils/SharedUtils';
import { Button, Input, Label } from '../Components';
import './_probabilityform.scss';

const ProbabilityForm = props => {

    const [message, setMessage] = useState('');
    const [previous, setPrevious] = useState([]);
    const [probability1, setProbability1] = useState('');
    const [probability2, setProbability2] = useState('');
    const [type, setType] = useState('combine');

    let messageString, previousResultsList, choicesRadio;

    if (message)
        messageString = <div className="row"><div className={`${ProbabilityFormConstants.BaseClass}__message`}>{message}</div></div>;

    if (previous.length) {
        previousResultsList = <div className={`${ProbabilityFormConstants.BaseClass}__previous`}>
            Previous Results
            <table>
                <thead><tr><th>P1</th><th>P2</th><th>Type</th><th>Result</th></tr></thead>
                <tbody>
                    {previous.map((previous, i) => {
                        // ideally update this to named object keys
                        return <tr key={i}><td>{previous[0]}</td><td>{previous[1]}</td><td>{previous[2]}</td><td>{previous[3]}</td></tr>;
                    })}
                </tbody>
            </table>
        </div>;
    }

    // dynamically create the radio options based on the set constants
    choicesRadio = Object.keys(ProbabilityFormConstants.Types).map((key) => {
        return <React.Fragment key={ProbabilityFormConstants.Types[key]} >
            <input 
                id={`types-${key}`} 
                name="types"
                onChange={ e => setType(key)}
                type="radio" 
                value={key}
                checked={(type === key)} />
            <Label 
                for={`types-${key}`}
                text={ProbabilityFormConstants.Types[key]} />
            <br/>
        </React.Fragment>;
    });

    function handleSubmit(e) {
    // form should only be submit with valid values
        e.preventDefault();

        const probabilityResult = probabilityCalc(type, probability1, probability2);
            
        // add the newest result to the start of the results list
        let previousResultsList = previous;
        previousResultsList.unshift([probability1, probability2, ProbabilityFormConstants.Types[type], probabilityResult]);

        setMessage(`Your result is ${probabilityResult}`);
        setPrevious(previousResultsList);
    }

    return (
        <React.Fragment>
            <form 
                className={ProbabilityFormConstants.BaseClass}
                onSubmit={handleSubmit} >
                <div className="row">
                    <Label 
                        classList={`${ProbabilityFormConstants.BaseClass}__probability-1-label`}
                        for="probability-1-input"
                        text="Probability 1"
                        valid={validProbability(probability1)}
                    />
                    <Input
                        classList={`${ProbabilityFormConstants.BaseClass}__probability-1-input`}
                        id="probability-1-input"
                        max={1}
                        min={0}
                        onChange={ e => setProbability1(e.target.value) }
                        required
                        type="number"
                        valid={validProbability(probability1)}
                        value={probability1}
                    />
                </div>
                <div className="row">
                    <Label 
                        classList={`${ProbabilityFormConstants.BaseClass}__probability-2-label`}
                        for="probability-2-input"
                        text="Probability 2"
                        valid={validProbability(probability2)}
                    />
                    <Input
                        classList={`${ProbabilityFormConstants.BaseClass}__probability-2-input`}
                        id="probability-2-input"
                        max={1}
                        min={0}
                        onChange={ e => setProbability2(e.target.value) }
                        required
                        type="number"
                        valid={validProbability(probability2)}
                        value={probability2}
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
                        disabled={!validProbability(probability1) || !validProbability(probability2)}
                        type="submit"
                    />
                </div>
            </form>
            {message}
            {previousResultsList}
        </React.Fragment>
    )
}

export default ProbabilityForm;
