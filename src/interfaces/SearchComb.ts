class CombinationProperty {
    isChecked: boolean = false;
    userInput: string | undefined;
    constructor() {
        this.isChecked = false;
        this.userInput = '';
    }
}

export class SearchComb {
    character: CombinationProperty = new CombinationProperty;
    component: CombinationProperty = new CombinationProperty;
    semanticComponent: CombinationProperty = new CombinationProperty;
    pictographicRadical: CombinationProperty = new CombinationProperty;
    phoneticRadical: CombinationProperty = new CombinationProperty;
    initial: CombinationProperty = new CombinationProperty;
    final: CombinationProperty = new CombinationProperty;
    tone: string | undefined;

    constructor() {
        this.character = new CombinationProperty();
        this.component = new CombinationProperty();
        this.semanticComponent = new CombinationProperty();
        this.pictographicRadical = new CombinationProperty();
        this.phoneticRadical = new CombinationProperty();
        this.initial = new CombinationProperty();
        this.final = new CombinationProperty();
        this.tone = '';
    }
}