export class PopUpMsg{
    constructor (type, text) {
      this.type = type;
      this.text = text;
    }

    createPopUp() {
        const div = document.createElement('div');
        div.className = `message message--${this.type} row`;
        const textSpan = document.createElement('span');
        textSpan.className = 'text';
        textSpan.innerText = this.text;
        const removeButton = document.createElement('i');
        removeButton.className = 'delete';
        removeButton.innerHTML = '&times;';

        removeButton.addEventListener('click', (e) => {
          e.target.parentNode.remove();
        });

        div.appendChild(textSpan);
        div.appendChild(removeButton);

        return div;
    }


  }
