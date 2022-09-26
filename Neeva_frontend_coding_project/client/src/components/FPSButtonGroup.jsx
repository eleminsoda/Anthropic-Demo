import React from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function FPSButtonGroup({callback}){
    return (
        <ButtonGroup className="button-group" aria-label="FPS">
                <Button
                    variant="secondary"
                    onClick={() => {
                        callback(10);
                    }}
                >
                    10
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        callback(30);
                    }}
                >
                    30
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        callback(60);
                    }}
                >
                    60
                </Button>
            </ButtonGroup>
    )
}