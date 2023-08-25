import ForFullScreen from "./ForFullScreen";
import React, {useEffect, useState} from "react";
import ForSmallScreen from "./ForSmallScreen";
const Header = (  ) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 890);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 890);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
            {isSmallScreen ?
                    <ForSmallScreen />
                : <ForFullScreen />
            }
        </div>
    )
};
export default Header;