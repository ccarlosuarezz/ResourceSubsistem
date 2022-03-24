const nodes = new vis.DataSet([
    {id: "A", label: 'Recurso 1', x: 150, y: 0}
    , {id: "B", label: 'Recurso 2', x: 300, y: 0}
    , {id: "C", label: 'Recurso 3', x: 450, y: 0}
    , {id: "1", label: 'Proceso 1', x: 0, y: 200}
    , {id: "2", label: 'Proceso 2', x: 150, y: 200}
    , {id: "3", label: 'Proceso 3', x: 300, y: 200}
    , {id: "4", label: 'Proceso 4', x: 450, y: 200}
    , {id: "5", label: 'Proceso 5', x: 600, y: 200}
]);

let edges = new vis.DataSet([{from: "1", to: "A", arrows: "to", color: {color: '#E74C3C'}}]);

const options = {
    interaction: {
        selectable: false, dragNodes: false, dragView: false, zoomView: false,

    },
    nodes: {
        font: {size: 15, color: "#000000"}, color: '#34495E', shape: 'square', size: 20
    },
    physics: {
        enabled: false,
    },
};


function setAttributesBtn(id, text, className) {
    let btnRequest = document.getElementById(id);
    btnRequest.textContent = text;
    btnRequest.setAttribute("class", className)
}

function createDrawProcess() {
    setAttributesBtn('1A', 'Dueño', 'btn btn-danger');
    let container = document.getElementById('dibujo');
    let data = {
        nodes: nodes,
        edges: edges
    };
    let network = new vis.Network(container, data, options);
}


function addElementOrRemove(processToResource) {
    let exist = edges.get().filter(edge => edge.from === processToResource[0]
        && edge.to === processToResource[1]);
    if (exist.length === 1) {
        edges.remove(exist);
        setAttributesBtn(processToResource, 'Solicitud', 'btn btn-outline-success');
    } else {
        if (edges.get().filter(edge => edge.to === processToResource[1]).length === 0) {
            edges.add({from: processToResource[0], to: processToResource[1], arrows: "to", color: {color: '#E74C3C'}});
            setAttributesBtn(processToResource, 'Dueño', 'btn btn-danger');
        } else {
            edges.add({from: processToResource[0], to: processToResource[1], arrows: "to", color: {color: '#F1C40F'}});
            setAttributesBtn(processToResource, 'Esperando', 'btn btn-outline-warning');
        }
    }
}

function requestFunction(processToResource) {
    addElementOrRemove(processToResource);
    let container = document.getElementById('dibujo');
    let data = {
        nodes: nodes,
        edges: edges
    };
    let network = new vis.Network(container, data, options);
}
