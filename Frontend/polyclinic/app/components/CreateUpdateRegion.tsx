import Modal from "antd/es/modal/Modal";
import { RegionRequest } from "../services/regions";
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";

interface Props{
    mode: Mode;
    values: Region;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: RegionRequest) => void;
    handleUpdate: (id: string, request: RegionRequest) => void;
}

export enum Mode{
   Create,
    Edit,
}

export const CreateUpdateRegion = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate
} : Props )=> {
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        setTitle(values.title)
    }, [values])

    const handleOnOk = async () => {
        const regionRequest = {title};

        mode == Mode.Create ? handleCreate(regionRequest) : handleUpdate(values.id, regionRequest)
    }

    return (
        <Modal 
            title = {
                mode === Mode.Create ? "Добавить участок" : "Редактировать участок"
            } 
            open = {isModalOpen} 
            onOk={handleOnOk}
            onCancel={handleCancel}
            cancelText ={"Отмена"}
        >
            <div className="region_modal">
                <Input
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                    placeholder = "Наименование"
                />
            </div>
        </Modal>
    )
};
