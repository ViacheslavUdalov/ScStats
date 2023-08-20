import image from '../..//src/common/Loading_icon.gif'
const PreLoader = () => {
    return <div style={{position: 'absolute', top: '30%', left: '35%'}}>
       <img src={image}/>
    </div>
}
export default PreLoader;