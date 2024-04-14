import "./PictureButton.scss"

interface PictureButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string,
    alt?: string
}

const PictureButton: React.FC<PictureButtonProps> = (props) => {

    return (
        <div {...props} className="btn">
            <img className="image" src={props.src} alt={props.alt}/>
        </div>
    )
}

export default PictureButton;