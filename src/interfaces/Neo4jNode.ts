interface Property {
    name: string,
    meaning_hygx: string,
    meaning_bdbk: string,
    structure: string,
    hsk_level: string,
    method: string,
    pinyin: string,
    sc_meaning: string,
    pr_meaning: string,
    cid: string,
    alias: string,
    is_character: boolean,
    first: string,
    second: string,
    third: string,
    fourth: string,
    english_name: string,
};

export interface Neo4jNode {
    identity: string,
    properties: Property,
    labels: Array<string>
};