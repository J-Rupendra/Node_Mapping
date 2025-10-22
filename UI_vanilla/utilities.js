export const fetchData = async (url) => {
    const resp = await fetch(url);
    const jsonData = await resp.json();
    return jsonData
}


export const convertRawDataToRelational = (rawData)=>{
    let convertedData = {};
    const dataMap = new Map();
    for(const ele of rawData){
        dataMap.set(ele.name, {...ele, children:[]})
    }
    for(const ele of rawData){
        if(ele.parent === ""){
            convertedData = dataMap.get(ele.name);
        } else {
            const nodeParent = dataMap.get(ele.parent);
            if(nodeParent){
                nodeParent.children.push(dataMap.get(ele.name)); 
            }
        }
    }
    return convertedData;
}

export const createNodeElement = (content)=>{
    const nodeElement = document.createElement('div');
    nodeElement.classList.add('node-content');
    nodeElement.setAttribute('data-name',content.name)
    nodeElement.setAttribute('data-description',content.description)
    nodeElement.textContent = content.name;
    return nodeElement;
}