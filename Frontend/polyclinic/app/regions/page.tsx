"use client";

import Button from "antd/es/button/button";
import { Regions } from "../components/Region";
import { useEffect, useState } from "react";
import { RegionRequest, createRegion, deleteRegion, getAllRegions, updateRegion } from "../services/regions";
import Title from "antd/es/typography/Title";
import { CreateUpdateRegion, Mode } from "../components/CreateUpdateRegion";
import { Flex } from "antd";

export default function RegionsPage(){
    const defaultValues = {
        title: "",
    } as Region

    const [values, setValues] = useState<Region>(defaultValues);

    const [regions, setRegions] = useState<Region[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const getRegions = async () => {
           const regions = await getAllRegions();
           setLoading(false);
           setRegions(regions);
        };

        getRegions();
    }, [])

    const handleCreateRegion = async (request: RegionRequest) => {
        await createRegion(request);
        closeModal();

        const regions = await getAllRegions();
        setRegions(regions);
    }

    const handleUpdateRegion = async (id: string, request: RegionRequest) => {
        await updateRegion(id, request);
        closeModal();

        const regions = await getAllRegions();
        setRegions(regions);
    }

    const handleDeleteRegion = async (id: string) => {
        await deleteRegion(id);
        closeModal();

        const regions = await getAllRegions();
        setRegions(regions);
    };

    const openModal = () => {
        //setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (region: Region) => {
        setMode(Mode.Edit);
        setValues(region);
        setIsModalOpen(true);   
    };

    return(
        <div>
            
            <Button
                type="primary"
                style={{ marginTop: "15px", marginLeft: "44%", fontSize: "22px", fontWeight: 600, height:"100%", backgroundColor: "black"}}
                size="large"
                onClick={openModal}
            >
                Добавить участок
            </Button>

            <CreateUpdateRegion 
                mode = {mode} 
                values={values} 
                isModalOpen ={isModalOpen}
                handleCreate={handleCreateRegion}
                handleUpdate={handleUpdateRegion}
                handleCancel={closeModal}
            />

            {loading ? (
                <Title>Loading...</Title>
            ) : (
                <Regions 
                    regions={regions} 
                    handleOpen={openEditModal} 
                    handleDelete={handleDeleteRegion}
                />
            )}
        </div>
    )
}