// nodos
const nodes = new vis.DataSet([
    {id: 1, label: 'Recurso 1', x: 150, y: 0}
    , {id: 2, label: 'Recurso 2', x: 300, y: 0}
    , {id: 3, label: 'Recurso 3', x: 450, y: 0}
    , {id: 4, label: 'Proceso 1', x: 0, y: 200}
    , {id: 5, label: 'Proceso 2', x: 150, y: 200}
    , {id: 6, label: 'Proceso 3', x: 300, y: 200}
    , {id: 7, label: 'Proceso 4', x: 450, y: 200}
    , {id: 8, label: 'Proceso 5', x: 600, y: 200}
]);

function createDrawProcess() {
    // edges
    let edges = new vis.DataSet([]);

    // acá creamos la _red_
    let container = document.getElementById('dibujo');
    let data = {
        nodes: nodes,
        edges: edges
    };
    let options = {
        physics: {
            enabled: false,
        },
    };
    let network = new vis.Network(container, data, options);
}

function requestFunction(processToResource) {


    // edges
    let edges = new vis.DataSet([
        {from: 1, to: 2, arrows: "to"}
        , {from: 2, to: 3, arrows: "to"}
        , {from: 10, to: 11, arrows: "to"}
        , {from: 11, to: 12, arrows: "to"}
        , {from: 21, to: 22, arrows: "to"}
        , {from: 1, to: 10, arrows: "to", dashes: true}
        , {from: 2, to: 11, arrows: "to", dashes: true}
        , {from: 3, to: 12, arrows: "to", dashes: true}
        , {from: 3, to: 21, arrows: "to"}
    ]);

    // acá creamos la _red_
    let container = document.getElementById('dibujo');
    let data = {
        nodes: nodes,
        edges: edges
    };
    let options = {
        physics: {
            enabled: false,
        },
    };
    let network = new vis.Network(container, data, options);
}
