import image from '../..//src/common/Spinner-1s-200px (1).gif';
import styles from './modal.module.css';
import ReactDOM from "react-dom";
import React from 'react';
const PreLoaderPortal= ({ isLoading }: { isLoading: boolean }) => {
    return(
        <React.Fragment>
        {isLoading &&
        <div className={`${styles.loaderOverlay} ${isLoading && styles.active}`}>
            <div >
                <img src={image} alt={'loader'} className={styles.loaderContent}/>
            </div>
        </div>
        }
        </React.Fragment>
    )
}
const PreLoader = ({ isLoading }: { isLoading: boolean }) => {
    const loaderId = document.getElementById('loading')
    return (
        <React.Fragment>
            {loaderId &&
                ReactDOM.createPortal(<PreLoaderPortal isLoading={isLoading}/>, loaderId)
            }

        </React.Fragment>
    )
}
export default PreLoader;