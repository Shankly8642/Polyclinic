import Card from "antd/es/card/Card"
import { CardTitle } from "./Cardtitle"
import Button from "antd/es/button/button"

interface Props{
    departments: Department[]
    handleDelete: (id: string) => void;
    handleOpen: (department: Department) => void;
}
export const Departments = ({departments, handleDelete, handleOpen}: Props) => {
    return (
        <div className="cards">
            {departments.map((department : Department) => (
                <Card 
                    key={department.id} 
                    title = {<CardTitle title = {department.title}/>} 
                    bordered = {false}
                >
                    <div className = "card_button">
                        <Button 
                            onClick={() => handleOpen(department)} 
                            style={{flex: 1}}
                        >
                            Редактировать
                        </Button>

                        <Button                            
                            onClick={() => handleDelete(department.id)} 
                            danger
                            style={{flex: 1}}
                        >
                            Удалить
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    )
}