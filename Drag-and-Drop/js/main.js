const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

// Fill Listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Loop through empties and call drag events
for(const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

// Drag Functions
function dragStart() {
    console.log('drag start');
    this.className += ' hold';
    // setTimeout is used to introduce a slight delay in setting the invisible clas so that the image is dragged but the box .fill div it is in has the picture go invisible.
    setTimeout(() => this.className = 'invisible', 0);

}

function dragEnd() {
    console.log('drag end');
    this.className = 'fill'
}

function dragOver(e) {
    console.log('drag over');
    e.preventDefault();
}
function dragEnter(e) {
    console.log('drag enter');
    e.preventDefault();
    this.className += ' hovered';
}
function dragLeave() {
    console.log('drag leave');
    this.className = 'empty';
}
function dragDrop() {
    console.log('drag dropped');
    this.className = 'empty';
    this.append(fill);
}
