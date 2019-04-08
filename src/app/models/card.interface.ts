export interface Card {
    name: string;
    subtype: string;
    supertype: string;
    text: string;
    id: string;
    imageUrl: string;
    imageUrlHiRes: string;
    series: string;
    types: string[];
    rarity: string;
    nationalPokedexNumber: number;
    hp: string;
    set: string;
    weaknesses: Weakness[];
    attacks: Attack[];
    evolvesFrom?: string;
    artist: string;
    convertedRetreatCost: number;
    resistances: Resistance[];
    retreatCost: string[];
    setCode: string;
    number: string;
    relatedCards?: Card[];
}

interface Weakness {
    type: string;
    value: string;
}

interface Resistance {
    type: string;
    value: string;
}

interface Attack {
    coveredEnergyCost: number;
    cost: string[];
    damage: string;
    name: string;
    text: string;
}