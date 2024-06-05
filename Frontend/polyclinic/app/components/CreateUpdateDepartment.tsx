import Modal from "antd/es/modal/Modal";
import { DepartmentRequest } from "../services/departments";
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";

interface Props{
    mode: Mode;
    values: Department;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: DepartmentRequest) => void;
    handleUpdate: (id: string, request: DepartmentRequest) => void;
}

export enum Mode{
   Create,
    Edit,
}

export const CreateUpdateDepartment = ({
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
        const departmentRequest = {title};

        mode == Mode.Create ? handleCreate(departmentRequest) : handleUpdate(values.id, departmentRequest)
    }

    return (
        <Modal 
            title = {
                mode === Mode.Create ? "Добавить отделение" : "Редактировать отделение"
            } 
            open = {isModalOpen} 
            onOk={handleOnOk}
            onCancel={handleCancel}
            cancelText ={"Отмена"}
        >
            <div className="department_modal">
                <Input
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                    placeholder = "Наименование"
                />
            </div>
        </Modal>
    )
};
