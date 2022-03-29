# Error Handling
> Since throwing error does not reflect on the method’s signature, all the safety of typed languages such as Typescript becomes useless since you are > neither forced nor hinted, as a caller of such method, to do something with that error.
then we are not going to throw error unlesss we actully need to do that


# Getting Started

**run the development server:**

```bash
npm run dev
# or
yarn dev
```

# Commit message Style:

```
{Type} : {Commit message} (#{Issue number})
```

**Allowed {Type} values:**

- feat (new feature)
- fix (bug fix)
- docs (changes to documentation)
- style (formatting, missing semi colons, etc; no code change)
- refactor (refactoring production code)
- test (adding missing tests, refactoring tests; no production code change)
- chore (updating grunt tasks etc; no production code change)

**Examples:**

- **chore**: add Oyster build script
- **docs**: explain hat wobble
- **feat**: add beta sequence
- **fix**: remove broken confirmation message
- **refactor**: share logic between 4d3d3d3 and flarhgunnstow
- **style**: convert tabs to spaces
- **test**: ensure Tayne retains clothing

# Components Base Code

```react
interface Props {
  exampleProps: string;
}

export type FunctionComponentProps = Props;
const FunctionComponent: React.FC<FunctionComponentProps> = (props) => {
  return <div></div>;
};
export default FunctionComponent;
```

```react
import {Component} from 'react';

interface Props {
  exampleProps: string;
}

interface States {
  exampleState: string;
}

export type ClassComponentProps = Props;
export type ClassComponentStates = States;
class ClassComponent extends Component<ClassComponentProps, ClassComponentStates> {
  constructor(props: ClassComponentProps) {
    super(props);
    // initialize the state
    this.state = {
      exampleState: 'Hey',
    };
  }
  render() {
    return <div></div>;
  }
}
export default ClassComponent;

```
