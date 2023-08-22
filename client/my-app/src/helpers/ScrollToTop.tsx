import React, {useEffect, useState} from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        const handleClick = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else setIsVisible(false)
        }
        window.addEventListener('scroll', handleClick)
        return () => {
            window.removeEventListener('scroll', handleClick)
        }
    }, [])
    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <div>
            <button onClick={ScrollToTop} style={{
                display: isVisible ? 'block' : 'none',
                width: '175px',
                position: 'fixed',
                bottom: '0',
                left: '0',
                height: '700px',
                backgroundColor: 'black',
                border: 'none',
                cursor: 'pointer',
                opacity: '40%',
                // borderRadius: '50%',
                color: 'white'
            }}>Scroll To Top</button>
        </div>
    );
};

export default ScrollToTop;