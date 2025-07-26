export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const progress = (parent) => {
    let progress = document.createElement('md-circular-progress');
    progress.setAttribute('indeterminate', '');
    progress.setAttribute('style', 'margin: 100px auto;');
    parent.appendChild(progress);
}