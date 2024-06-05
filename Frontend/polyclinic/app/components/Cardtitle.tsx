interface Props{
    title: string;
}

export const CardTitle = ({title}: Props) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <p className="card_title">{title}</p>
        </div>
    )
}