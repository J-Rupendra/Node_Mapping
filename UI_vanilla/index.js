import { API_ENDPOINT } from "./constants.js";
import { convertRawDataToRelational, createNodeElement, fetchData } from "./utilities.js";

// stored the references to avoid retriving multiple times
const treeContainer = document.getElementById('tree-container');
const popupContainer = document.getElementById('popup-container');
const closeButton = document.getElementById('close-btn');

let selectedNode = null;

// Used to create node block and children subtree
const createSubTree = (nodeChildren)=>{
    const childContainer = document.createElement('ul');
    for(const node of nodeChildren){
        const element = document.createElement('li');

        element.appendChild(createNodeElement(node));
        element.appendChild(createSubTree(node.children));

        childContainer.appendChild(element);
    }
    return childContainer;
}

fetchData(API_ENDPOINT).then(data=>{
    
    const structuredTreeData = convertRawDataToRelational(data);

    // created root element
    const rootElement = document.createElement('ul');
    rootElement.classList.add('tree');

    // created the root node content block, children nodes and append both to the root element
    const rootChild = document.createElement('li');
    rootChild.appendChild(createNodeElement(structuredTreeData));
    rootChild.appendChild(createSubTree(structuredTreeData.children));

    rootElement.appendChild(rootChild);

    treeContainer.appendChild(rootElement);
    

}).catch(err=>{
    openPopup({name:"Error", description: "Something went wrong!, Check if server is running or reload this page"}, true)
})

function openPopup({name="",description=""}, isError=false){
    popupContainer.classList.add('show');
    closeButton.classList.remove('hide')

    if(isError){
        popupContainer.classList.add('error');
        closeButton.classList.add('hide')
    }

    const titleElement = document.getElementById('popup-title');
    titleElement.textContent = name;
    const descriptionElement = document.getElementById('popup-description');
    descriptionElement.textContent = description;

}

function closePopup(){
    popupContainer?.classList.remove('show');
    if (selectedNode) {
        selectedNode.classList.remove('active')
    }
}

// event delegation to capture the node block click
treeContainer.addEventListener('click',(event)=>{
    const currentSelection = event.target;
    if(!currentSelection.classList.contains('node-content')){
        closePopup();
        return;
    }

    if(selectedNode){
        selectedNode.classList.remove('active')
    }
    currentSelection.classList.add('active');
    selectedNode = currentSelection;
    openPopup(currentSelection?.dataset)
})

closeButton.addEventListener('click', () => {
    closePopup()
})

