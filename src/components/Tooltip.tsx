const createTooltipContent = (e: any, node: any) => {
    const outDiv = document.createElement('div');
    outDiv.style.width = '300px';
    var innerHTML = '';
    if (e.targetType === 'node') {
        if (node.labels[0] == 'CHARACTER') {
            innerHTML = `
                        <h4>${node.name}</h4>
                        <ul>
                            <li>拼音: ${node.pinyin}</li>
                        </ul>
                        <ul>
                            <li>结构: ${node.structure}</li>
                        </ul>
                        <ul>
                            <li>HSK等级: ${node.level}</li>
                        </ul>
                        <ul>
                            <li>造字方法: ${node.method}</li>
                        </ul>
                        <ul>
                            <li>字义: ${node.meaning2}</li>
                        </ul>
                    `;

        }
        if (node.labels[0] == 'PICTOGRAPHIC_RADICAL') {
            innerHTML = `
                        <h4>形声字的形旁： ${node.name}</h4>
                        <ul>
                            <li>别名: ${node.alias}</li>
                        </ul>
                        <ul>
                            <li>拼音: ${node.pinyin}</li>
                        </ul>
                        
                        <ul>
                            <li>含义: ${node.pr_meaning}</li>
                        </ul>
                        
                    `;
        }
        if (node.labels[0] == 'PHONETIC_RADICAL') {
            innerHTML = `
                        <h4>形声字的声旁： ${node.name}</h4>
                        <ul>
                            <li>拼音: ${node.pinyin}</li>
                        </ul>
                        <ul>
                            <li>是否汉字: ${node.is_character}</li>
                        </ul>
                        
                    `;
        }
        if (node.labels[0] == 'SEMANTIC_COMPONENT') {
            innerHTML = `
                        <h4>会意的义符： ${node.name}</h4>
                        <ul>
                            <li>是否汉字: ${node.is_character}</li>
                        </ul>
                        <ul>
                            <li>含义: ${node.sc_meaning}</li>
                        </ul>
                        
                    `;
        }
        if (node.labels[0] == 'COMPONENT') {
            innerHTML = `
                        <h4>部件： ${node.name}</h4>
                    `;
        }
        if (node.labels[0] == 'INITIAL') {
            innerHTML = `
                        <h4>声母： ${node.name}</h4>
                    `;
        }
        if (node.labels[0] == 'FINAL') {
            innerHTML = `
                        <h4>韵母： ${node.name}</h4>
                        <ul>
                            <li>一声: ${node.first_tone}</li>
                        </ul>
                        <ul>
                            <li>二声: ${node.second_tone}</li>
                        </ul>
                        <ul>
                            <li>三声: ${node.third_tone}</li>
                        </ul>
                        <ul>
                            <li>四声: ${node.fourth_tone}</li>
                        </ul>
                    `;
        }
        if (node.labels[0] == 'TONE') {
            innerHTML = `
                        <h4>声调: ${node.name}</h4>
                    `;
        }

        outDiv.innerHTML = innerHTML;
    } else if (e.targetType === 'edge') {
        outDiv.innerHTML = `
                    <h4>${node.relationshipType}</h4>
                `;
    }
    return outDiv;
}

export default createTooltipContent;