import image from '../..//src/common/Spinner-1s-200px (1).gif';
import styles from './modal.module.css';
const PreLoader = () => {
    return <div style={{position: 'absolute', /* или можно использовать 'relative' для центрирования внутри родительского элемента */
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'}}>
       <img src={image}/>
    </div>
}
export default PreLoader;