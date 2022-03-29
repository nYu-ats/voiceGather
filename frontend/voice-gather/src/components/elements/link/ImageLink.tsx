import { VFC, ReactNode } from "react";
import { Link, LinkStyle } from "./Link"

type ImageProps = {
    imageStyle: ImageStyles;
    imageSrc: string;
    linkStyle: LinkStyle;
}

type ImageStyles = {
    width: string;
    height: string;
}

export const ImageLink: VFC<ImageProps> = (props) => {
    return (
    <Link linkStyle={props.linkStyle}>
        <img src={props.imageSrc} style={props.imageStyle}/>
    </Link>
    );
}