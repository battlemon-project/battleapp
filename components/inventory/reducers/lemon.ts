import { PropertiesType } from "lemon"
import { ghostProperties } from "utils/properties"

enum ActionKind {
  Select = 'SELECT_LEMON',
}

interface Action {
  type: ActionKind
  properties: PropertiesType
}

interface State {
  properties: PropertiesType
}

const initialLemonState: State = {
  properties: ghostProperties
}

function counterReducer(state: State, action: Action): State {  
  // First, we figure out what action
  // has been fired:
  switch (action.type) {
    case ActionKind.Select:
	    return {
        ...state, 
        properties: state.properties
      }
    default:
      return state;
  }
}