export interface AdvancedSearchProps {
    sendDataToParent: (data: { nodes: never[]; edges: never[]; } | undefined) => void;
}