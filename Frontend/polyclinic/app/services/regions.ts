export interface RegionRequest {
    title: string;
}

export const getAllRegions = async () => {
    const response = await fetch("https://localhost:7142/Regions");

    return response.json();
};

export const createRegion = async (regionRequest: RegionRequest) => {
    await fetch("https://localhost:7142/Regions", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(regionRequest),
    });
};

export const updateRegion = async (id: string, regionRequest: RegionRequest) => {
    await fetch(`https://localhost:7142/Regions/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(regionRequest),
    });   
};

export const deleteRegion = async (id: string) => {
    await fetch(`httpa://localhost:7142/Regions/${id}`, {
        method: "DELETE",
    });   
};