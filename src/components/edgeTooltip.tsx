
const EdgeTooltip = (edge: any) => {
    return (
        <div style={{ top: `${edge.y}px`, left: `${edge.x}px`}}>
            <h4>{edge.relationshipType}</h4>
        </div>
    );
};

export default EdgeTooltip;