class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.states = config.states;
        this.initial = config.initial;
        this.CurrentState = config.states[this.initial];
        let states_keys = Object.keys(this.states);
        for (let state of states_keys) {
            this.states[state].toString = () => state;
        }

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return `${this.CurrentState}`;

    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.states.hasOwnProperty(state)) {
            this.CurrentState = this.states[state];
        } else {
            throw new Error("State is missing");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.CurrentState.transitions.hasOwnProperty(event)) {
            this.changeState(this.CurrentState.transitions[event]);
        } else {
            throw new Error("Event is unavaible from this state");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.CurrentState = this.states[this.initial]
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = Object.keys(this.states);
        if (event === undefined) {
            return states;
        }
        let StatesOfEvent = [];
        for (let state of states) {
            if (this.states[state].transitions.hasOwnProperty(event)) {
                StatesOfEvent.push(state)
            }
        }
        return StatesOfEvent;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/