"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
    AnimatePresence,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
    defaultValue?: boolean
    initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
    query: string,
    {
        defaultValue = false,
        initializeWithValue = true,
    }: UseMediaQueryOptions = {}
): boolean {
    const getMatches = (query: string): boolean => {
        if (IS_SERVER) {
            return defaultValue
        }
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState<boolean>(() => {
        if (initializeWithValue) {
            return getMatches(query)
        }
        return defaultValue
    })

    const handleChange = () => {
        setMatches(getMatches(query))
    }

    useIsomorphicLayoutEffect(() => {
        const matchMedia = window.matchMedia(query)
        handleChange()

        matchMedia.addEventListener("change", handleChange)

        return () => {
            matchMedia.removeEventListener("change", handleChange)
        }
    }, [query])

    return matches
}



const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const, filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }

const Carousel = memo(
    ({
        handleClick,
        controls,
        cards,
        isCarouselActive,
    }: {
        handleClick: (imgUrl: string, index: number) => void
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        controls: any
        cards: string[]
        isCarouselActive: boolean
    }) => {
        const isScreenSizeSm = useMediaQuery("(max-width: 640px)", { initializeWithValue: false })
        const cylinderWidth = isScreenSizeSm ? 1400 : 2300
        const faceCount = cards.length
        const faceWidth = cylinderWidth / faceCount
        const radius = cylinderWidth / (2 * Math.PI)
        const rotation = useMotionValue(0)
        const transform = useTransform(
            rotation,
            (value) => `rotate3d(0, 1, 0, ${value}deg)`
        )

        return (
            <div
                className="flex h-full items-center justify-center bg-transparent"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                <motion.div
                    drag={isCarouselActive ? "x" : false}
                    className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
                    style={{
                        transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d",
                    }}
                    onDrag={(_, info) =>
                        isCarouselActive &&
                        rotation.set(rotation.get() + info.offset.x * 0.05)
                    }
                    onDragEnd={(_, info) =>
                        isCarouselActive &&
                        controls.start({
                            rotateY: rotation.get() + info.velocity.x * 0.05,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 30,
                                mass: 0.1,
                            },
                        })
                    }
                    animate={controls}
                >
                    {cards.map((imgUrl, i) => (
                        <motion.div
                            key={`key-${imgUrl}-${i}`}
                            className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-transparent p-2"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${i * (360 / faceCount)
                                    }deg) translateZ(${radius}px)`,
                            }}
                            onClick={() => handleClick(imgUrl, i)}
                        >
                            <motion.img
                                src={imgUrl}
                                alt={`keyword_${i} ${imgUrl}`}
                                layoutId={`img-${imgUrl}`}
                                className="pointer-events-none w-full rounded-xl object-cover aspect-square shadow-xl border-2 border-white/10"
                                initial={{ filter: "blur(4px)" }}
                                layout="position"
                                animate={{ filter: "blur(0px)" }}
                                transition={transition}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        )
    }
)

Carousel.displayName = "Carousel";

const laundryImages = [
    "/images/carousel_comforter.png", // Generated: Edredom
    "/images/carousel_sneakers.png", // Generated: Tênis
    "/images/carousel_towels.png", // Generated: Toalhas
    "/images/carousel_folded_shirts.png", // Generated: Camisetas
    "/images/carousel_ironing.png", // Generated: Ferro de passar
    "/images/carousel_washing_machine.png", // Generated: Máquina de lavar
    "/images/carousel_basket.png", // Generated: Cesto de roupas
    "/images/carousel_delicate.png", // Generated: Tecido delicado
    "/images/carousel_hangers.png", // Generated: Cabides
    "/images/carousel_detergent.png", // Generated: Detergente
];

export function ThreeDPhotoCarousel() {
    const [activeImg, setActiveImg] = useState<string | null>(null)
    const [isCarouselActive, setIsCarouselActive] = useState(true)
    const controls = useAnimation()
    const cards = useMemo(() => laundryImages, []);

    useEffect(() => {
        if (isCarouselActive) {
            controls.start({
                rotateY: 360,
                transition: { duration: 50, ease: "linear", repeat: Infinity }
            });
        }
    }, [isCarouselActive, controls]);

    const handleClick = (imgUrl: string) => {
        setActiveImg(imgUrl)
        setIsCarouselActive(false)
        controls.stop()
    }

    const handleClose = () => {
        setActiveImg(null)
        setIsCarouselActive(true)
    }

    return (
        <motion.div layout className="relative">
            <AnimatePresence mode="sync">
                {activeImg && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        layoutId={`img-container-${activeImg}`}
                        layout="position"
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 md:p-20"
                        style={{ willChange: "opacity" }}
                        transition={transitionOverlay}
                    >
                        <motion.img
                            layoutId={`img-${activeImg}`}
                            src={activeImg}
                            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.5,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            style={{
                                willChange: "transform",
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="relative h-[600px] w-full overflow-hidden">
                <Carousel
                    handleClick={handleClick}
                    controls={controls}
                    cards={cards}
                    isCarouselActive={isCarouselActive}
                />
            </div>
        </motion.div>
    )
}
