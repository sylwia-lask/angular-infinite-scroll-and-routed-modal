import { Card } from '../models';

export class GetCards {
    static readonly type = '[Card] Get';

    constructor(public pageSize: number, public page: number, public optionalParameter?: string, public optionalValue?: string) {
    }
}

export class SetSelectedCardById {
    static readonly type = '[Card API] Set';

    constructor(public id: string) {
    }
}

export class SetSelectedCardByValue {
    static readonly type = '[Card Page] Set';

    constructor(public card: Card) {
    }
}

export class SetRelatedCards {
    static readonly type = '[Related Cards API] SetRelated';

    constructor(public card: Card) {
    }
}

export class ResetSelectedCard {
    static readonly type = '[Card] Reset';
}
