import ForFullScreen from "./ForFullScreen";
import React from "react";
import ForSmallScreen from "./ForSmallScreen";
const Header = (  ) => {
    const isSmallScreen = window.innerWidth < 890;

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