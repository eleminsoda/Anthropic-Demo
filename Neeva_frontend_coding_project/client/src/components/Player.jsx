import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFPS from "../utils/useFPS";
import FPSButtonGroup from "./FPSButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";


export default function Player(props) {
    const [isPaused, setIsPaused] = useState(false);
    const [fps, setFPS] = useState(30);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [images, setImages] = useState([]);

    const pause = () => {
        setIsPaused(!isPaused);
    };

    useEffect(() => {
        // fetch all the links for images
        fetch("http://localhost:3001/video/1?offset=0&count=600")
            .then((res) => res.json())
            .then(
                (res) =>
                    new Promise((resolve) => {
                        resolve(res.frames);
                    })
            )
            .then((res) =>
            // fetch the real data for the images
                Promise.all(
                    res.map((link) =>
                        fetch("http://localhost:3001/" + link).then(
                            (res) => res.url
                        )
                    )
                )
            )
            .then((res) => {
                setImages(res);
                setIsLoading(false);
            });
    }, []);

    useFPS(
        () => {
            setCurrentImage(
                currentImage + 1 > images.length ? 0 : currentImage + 1
            );
        },
        isPaused ? null : fps
    );

    return (
        <div className="player">
            <div className="image-stack">
                {isLoading ? (
                    <Spinner
                        animation="border"
                        role="status"
                        className="spinner"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <div>
                        {images.map((img, index) => (
                            <img
                                alt="Dinner on the rooftop"
                                className={
                                    currentImage === index
                                        ? "active"
                                        : "inactive"
                                }
                                key={index}
                                src={img}
                            />
                        ))}

                        <Button
                            id="play-button"
                            onClick={pause}
                            variant="secondary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="play-icon"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                            </svg>
                        </Button>
                    </div>
                )}
            </div>

            <FPSButtonGroup callback={setFPS} />
        </div>
    );
}
