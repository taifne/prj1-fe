import { createSlice } from "@reduxjs/toolkit";
interface Node {
    id: number;
    name: string;
    img: string;
    logMessage: string;
    collapsed?: boolean; // '?' makes the property optional
    childLinks: Link[]; // Assuming Link is a type you have defined
}

interface Link {
    source: number | Node;
    target: number | Node;
    distance: number

}
const networkChartSlice = createSlice({
    name: "networkchart",
    initialState: {
        chart: {
            nodes: [],
            links: []
        },
    },
    reducers: {
        getList: (state, action) => {
            state.chart = action.payload;
        },
        addNode: (state, action) => {

            state.chart.nodes.push(action.payload.newNode);
            state.chart.links.push(action.payload.newLink);
        },
        updateNode: (state, action) => {
            state.chart.nodes.map(node => {
                if (node.id === action.payload.id) {
                    node.name = action.payload.name;
                    node.img = action.payload.img;
                    node.logMessage = action.payload.logMessage;
                }
            })
        },
        deleteNode: (state, action) => {
            const nodeIdNumber = Number(action.payload.id);

            // Directly mutate the state to filter out the node to be deleted
            state.chart.nodes = state.chart.nodes.filter(node => node.id !== nodeIdNumber);

            // Directly mutate the state to filter out links associated with the node to be deleted
            state.chart.links = state.chart.links.filter(link => {
                const sourceId = typeof link.source === 'object' ? link.source.id : Number(link.source);
                const targetId = typeof link.target === 'object' ? link.target.id : Number(link.target);
                return sourceId !== nodeIdNumber && targetId !== nodeIdNumber;
            });
        }
    }
})
export const { getList, addNode, updateNode, deleteNode } = networkChartSlice.actions;

export default networkChartSlice.reducer;