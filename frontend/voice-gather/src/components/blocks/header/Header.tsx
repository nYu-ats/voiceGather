import React from "react";
import { Button } from "@material-ui/core";

export const Header = () => {
    const style = {
        width: '100vw',
        height: '100px',
        background: 'linear-gradient(-135deg, #E4A972, #9941D8)'
    }

    return (
        <div {... {style}}>
            <Button variant="contained">
                test
            </Button>
        </div>
    )
}