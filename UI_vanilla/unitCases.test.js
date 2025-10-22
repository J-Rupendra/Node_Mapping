import { closePopup, createSubTree, openPopup } from ".";


describe('createTree', () => {
    test('should create a nested list structure for given data', () => {
        const testData = [{
            name: "A",
            children: [{
                name: "B",
                children: []
            }]
        }];
        const rootElement = document.createElement('div');
        rootElement.appendChild(createSubTree(testData));

        const parentNode = rootElement.querySelector('li > .node-content');
        const childNode = rootElement.querySelector('li > ul > li > .node-content');

        expect(parentNode).not.toBeNull();
        expect(parentNode.textContent).toBe('A');
        expect(childNode).not.toBeNull();
        expect(childNode.textContent).toBe('B');
    });
});

describe('openPopup', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="popup-container" class="popup">
                <h3 id="popup-title"></h3>
                <p id="popup-description"></p>
                <span id="close-btn"></span>
            </div>
        `;
    });

    test('should show the popup with correct content', () => {
        const nodeDetails = { name: "Test Node", description: "Test Description" };
        const popupContainer = document.getElementById('popup-container');

        openPopup(nodeDetails);

        expect(popupContainer.classList.contains('show')).toBe(true);
        expect(document.getElementById('popup-title').textContent).toBe('Test Node');
        expect(document.getElementById('popup-description').textContent).toBe('Test Description');
    });

    test('should handle missing description without error', () => {
        const nodeDetails = { name: "Test Node" };
        const popupContainer = document.getElementById('popup-container');

        openPopup(nodeDetails);

        expect(popupContainer.classList.contains('show')).toBe(true);
        expect(document.getElementById('popup-title').textContent).toBe('Test Node');
        expect(document.getElementById('popup-description').textContent).toBe('');
    });
});

describe('closePopup', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="popup-container" class="popup show">
                <span id="close-btn"></span>
            </div>
        `;
    });

    test('should hide the popup', () => {
        const popupContainer = document.getElementById('popup-container');

        closePopup();

        expect(popupContainer.classList.contains('show')).toBe(false);
    });
});