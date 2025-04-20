const nodeTooltip = (nodeTooltip: any) => {
    console.log(nodeTooltip);
    return (
        <div>
            { nodeTooltip.labels[0] === 'CHARACTER' &&
                <div>
                    <h4>${nodeTooltip.name}</h4>
                    <ul>
                        <li>拼音: ${nodeTooltip.pinyin}</li>
                    </ul>
                    <ul>
                        <li>结构: ${nodeTooltip.structure}</li>
                    </ul>
                    <ul>
                        <li>HSK等级: ${nodeTooltip.level}</li>
                    </ul>
                    <ul>
                        <li>造字方法: ${nodeTooltip.method}</li>
                    </ul>
                    <ul>
                        <li>字义: ${nodeTooltip.meaning2}</li>
                    </ul>
                </div>
            }
            { nodeTooltip.labels[0] === 'PICTOGRAPHIC_RADICAL' &&
                <div>
                    <h4>形声字的形旁： ${nodeTooltip.name}</h4>
                    <ul>
                        <li>别名: ${nodeTooltip.alias}</li>
                    </ul>
                    <ul>
                        <li>拼音: ${nodeTooltip.pinyin}</li>
                    </ul>
                    
                    <ul>
                        <li>含义: ${nodeTooltip.pr_meaning}</li>
                    </ul>
                </div>
            }
            { nodeTooltip.labels[0] === 'PHONETIC_RADICAL' &&
                <div>
                    <h4>形声字的声旁： ${nodeTooltip.name}</h4>
                    <ul>
                        <li>拼音: ${nodeTooltip.pinyin}</li>
                    </ul>
                    <ul>
                        <li>是否汉字: ${nodeTooltip.is_character}</li>
                    </ul>
                </div>
            }
            { nodeTooltip.labels[0] === 'SEMANTIC_COMPONENT' &&
                <div>
                    <h4>会意的义符： ${nodeTooltip.name}</h4>
                    <ul>
                        <li>是否汉字: ${nodeTooltip.is_character}</li>
                    </ul>
                    <ul>
                        <li>含义: ${nodeTooltip.sc_meaning}</li>
                    </ul>
                </div>
            }
            {
                nodeTooltip.labels[0] === 'COMPONENT' &&
                <div>
                    <h4>部件： ${nodeTooltip.name}</h4>
                </div>
            }
            {
                nodeTooltip.labels[0] === 'INITIAL' &&
                <div>
                    <h4>声母： ${nodeTooltip.name}</h4>
                </div>
            }
            {
                nodeTooltip.labels[0] === 'FINAL' &&
                <div>
                    <h4>韵母： ${nodeTooltip.name}</h4>
                    <ul>
                        <li>一声: ${nodeTooltip.first_tone}</li>
                    </ul>
                    <ul>
                        <li>二声: ${nodeTooltip.second_tone}</li>
                    </ul>
                    <ul>
                        <li>三声: ${nodeTooltip.third_tone}</li>
                    </ul>
                    <ul>
                        <li>四声: ${nodeTooltip.fourth_tone}</li>
                    </ul>
                </div>
            }
            {
                nodeTooltip.labels[0] === 'TONE' &&
                <div>
                    <h4>声母： ${nodeTooltip.name}</h4>
                </div>
            }
        </div>
    )
};

export default nodeTooltip;