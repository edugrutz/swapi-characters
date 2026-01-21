import { StarsContainer } from "./style";

export function BackgroundStars() {
    return (
        <StarsContainer
            initial={{ y: 0 }}
            animate={{ y: "-1000px" }}
            transition={{
                duration: 100,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}
