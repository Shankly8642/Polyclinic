import Card from "antd/es/card/Card"
import { CardTitle } from "./Cardtitle"
import Button from "antd/es/button/button"

interface Props{
    regions: Region[]
    handleDelete: (id: string) => void;
    handleOpen: (region: Region) => void;
}
export const Regions = ({regions, handleDelete, handleOpen}: Props) => {
    return (
        <div className="cards">
            {regions.map((region : Region) => (
                <Card 
                    key={region.id} 
                    title = {<CardTitle title = {region.title}/>} 
                    bordered = {false}
                >
                    <div className = "card_button">
                        <Button 
                            onClick={() => handleOpen(region)} 
                            style={{flex: 1}}
                        >
                            Редактировать
                        </Button>

                        <Button                            
                            onClick={() => handleDelete(region.id)} 
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