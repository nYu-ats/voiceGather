import { VFC } from "react";
import { Link, LinkStyle } from "./Link"

type ImageProps = {
    imageStyle: ImageStyles;
    imageSrc: string;
    linkStyle: LinkStyle;
    anchorTo?: React.MouseEventHandler<HTMLElement>;
}

type ImageStyles = {
    width: string;
    height: string;
}

export const ImageLink: VFC<ImageProps> = (props) => {
    return (
    <Link linkStyle={props.linkStyle} anchorTo={props.anchorTo}>
        <img src={props.imageSrc} style={props.imageStyle}/>
    </Link>
    );
}