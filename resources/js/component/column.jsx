export default function Column(props) {
    return (
        <div className={`col-md-${props.size || 10} ${props.className} `}>
            {props.children}
        </div>
    );
}
