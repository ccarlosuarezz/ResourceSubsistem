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

let edges = new vis.DataSet([{from: "1", to: "A", arrows: "to"}]);

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


function createDrawProcess() {
    let container = document.getElementById('dibujo');
    let data = {
        nodes: nodes,
        edges: edges
    };
    let network = new vis.Network(container, data, options);
}

function requestFunction(processToResource) {
    /*edges.get().join(function (edge) {
        if (edge.from === processToResource[0] && edge.to === processToResource[1]) {
            console.log('NODO REGISTRADO PREVIAMENTE')
        } else {
            console.log('Nodo registrado')
        }
        //return edge.from === nodeId || edge.to === nodeId;
    });*/

    let exist = edges.get().filter(edge => edge.from === processToResource[0]
        && edge.to === processToResource[1]);

    if (exist.length === 1) {
        console.log('Ya agrego previamente esa ruta')
    } else {
        console.log(edges.get())
        edges.add({from: processToResource[0], to: processToResource[1], arrows: "to"});
    }

    edges.get().forEach(edge => console.log(edge));

    let container = document.getElementById('dibujo');
    let data = {
        nodes: nodes,
        edges: edges
    };
    let network = new vis.Network(container, data, options);
}
