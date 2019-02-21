## Available Scripts

In the project directory, run:
#### `npm install` to add all the dependancies

Then run 
#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Key Points

The Button, Label, and Input components in `src/js/components` had already been created previously by me, and were imported to allow faster prototyping and to concentrate on the core functionality around the ProbabilityForm. 

### Main Files

The main files to look at are 
- `src/js/components/ProbabilityForm/index.jsx` - core component file
- `src/js/components/ProbabilityForm/ProbabilityFormConstants.jsx` - constants for the component to allow easier updating
- `src/js/components/ProbabilityForm/_probabilityform.scss` - very basic styles
- `src/js/utils/SharedUtils.js` - functions which determine validity of inputs values and calculating results. Stored separately so they can be used project-wide

## Considerations

Due to time constraints, I opted to have each search prepend to a list on the screen as opposed to saving to a log file. Given more time I would set up a Node.js environment or similar to allow this to be done serverside as a downloadable file.

The components that I included but didn't code as part of this still represent 100% of my own work, and I had to extend the Input Component to include min / max / step options so that it worked for this use case

There are a few things I would expand on / extrapolate with more time, and I've added comments to that effect throughout the code.