import { useState, useEffect } from "react";

const SearchCombination = ({ sendDataToParent }) => {
    const [data, setData] = useState<{ nodes: never[]; edges: never[]; }>();
    
    useEffect(() => {
        sendDataToParent(data);
    });

    return (
        <>
            <div>SearchCombination</div>
        </>
    );
};

export default SearchCombination;