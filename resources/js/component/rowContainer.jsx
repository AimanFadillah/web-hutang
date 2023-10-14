export default function RowContainer(props) {
    return (
        <div className="container my-5">
            <div className={`row ${props.RowClass}`}>
                 {props.children}
            </div>
        </div>
    );
}

