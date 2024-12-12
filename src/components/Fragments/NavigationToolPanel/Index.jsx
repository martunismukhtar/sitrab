import { useContext } from 'react'
import styles from "./styles.module.css"
import MapContext from '../../../context/MapContext'
import { useAtom } from 'jotai'
import { initialExtentAtom, initialMapSizeAtom, initialResolutionAtom, isClickable, tooglePanelAtom } from '../../../jotai/atoms'

const NavigationToolPanel = () => {
    const { peta } = useContext(MapContext)
    const [extent, ] = useAtom(initialExtentAtom);
    const [map_size, ] = useAtom(initialMapSizeAtom);
    const [res, ] = useAtom(initialResolutionAtom);
    const [, setIsClickable] = useAtom(isClickable);
    const [panel, tooglePanel] = useAtom(tooglePanelAtom);

    const handleZoomIn = () => {
        let current_zoom = peta.getView().getZoom() + 0.5;
        peta.getView().setZoom(current_zoom);
    }

    const handleZoomOut = () => {
        let current_zoom = peta.getView().getZoom() - 0.5;
        peta.getView().setZoom(current_zoom);
    }

    const zoomToFitExtent = () => {        
        peta.getView().fit(extent, map_size);
        peta.getView().setResolution(res);
    }

    const handleInfo = () => {        
        setIsClickable(true);
    }
    const handleDrag = () => {
        setIsClickable(false);
    }

  return (
    <div className='absolute bottom-0 right-0 mb-36 sm:mb-24 z-[2]'>
        <div className={`flex items-center justify-center ${styles.dot} mb-2`} 
            title="Buka panel navigasi"
            onClick={()=> tooglePanel(!panel)}
            >
            <svg width="24px" height="24px" viewBox="0 -2 32 32" 
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#609ed6">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <title>hamburger-2</title> 
                        <desc>Created with Sketch Beta.</desc> <defs> </defs> 
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" 
                        fillRule="evenodd"> 
                        <g id="Icon-Set"  
                        transform="translate(-308.000000, -1037.000000)" 
                        fill="#609ed6"> 
                        <path d="M336,1063 L312,1063 C310.896,1063 310,1062.1 310,1061 C310,1059.9 310.896,1059 312,1059 L336,1059 C337.104,1059 338,1059.9 338,1061 C338,1062.1 337.104,1063 336,1063 L336,1063 Z M336,1057 L312,1057 C309.791,1057 308,1058.79 308,1061 C308,1063.21 309.791,1065 312,1065 L336,1065 C338.209,1065 340,1063.21 340,1061 C340,1058.79 338.209,1057 336,1057 L336,1057 Z M336,1053 L312,1053 C310.896,1053 310,1052.1 310,1051 C310,1049.9 310.896,1049 312,1049 L336,1049 C337.104,1049 338,1049.9 338,1051 C338,1052.1 337.104,1053 336,1053 L336,1053 Z M336,1047 L312,1047 C309.791,1047 308,1048.79 308,1051 C308,1053.21 309.791,1055 312,1055 L336,1055 C338.209,1055 340,1053.21 340,1051 C340,1048.79 338.209,1047 336,1047 L336,1047 Z M312,1039 L336,1039 C337.104,1039 338,1039.9 338,1041 C338,1042.1 337.104,1043 336,1043 L312,1043 C310.896,1043 310,1042.1 310,1041 C310,1039.9 310.896,1039 312,1039 L312,1039 Z M312,1045 L336,1045 C338.209,1045 340,1043.21 340,1041 C340,1038.79 338.209,1037 336,1037 L312,1037 C309.791,1037 308,1038.79 308,1041 C308,1043.21 309.791,1045 312,1045 L312,1045 Z" id="hamburger-2"> </path> </g> </g> 
                        </g>
            </svg>          
        </div>
        <div className={`flex items-center justify-center ${styles.dot} mb-2`} 
            title="Perbesar"
            onClick={handleZoomIn}
            >
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <path d="M4 12H20M12 4V20" stroke="#609ed6" strokeWidth="2" 
                        strokeLinecap="round" strokeLinejoin="round">
                    </path> 
                </g>
            </svg>            
        </div>
        <div className={`flex items-center justify-center ${styles.dot} mb-2`} 
            title="Perbesar"
            onClick={handleZoomOut}
            >
            <svg width="24px" height="24px" viewBox="0 0 24 24" 
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <path d="M6 12L18 12" stroke="#609ed6" strokeWidth="2" 
                    strokeLinecap="round" strokeLinejoin="round">
                    </path> 
                </g>
            </svg>
        </div>
        <div className={`flex items-center justify-center ${styles.dot} mb-2`} 
            title="Perbesar"
            onClick={zoomToFitExtent}
            >
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" 
            xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <path d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12M21 12C21 10.3431 16.9706 9 12 9C7.02944 9 3 10.3431 3 12M12 21C7.02944 21 3 16.9706 3 12M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M3 12C3 7.02944 7.02944 3 12 3" 
                        stroke="#609ed6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    </path> 
                </g>
            </svg>
        </div>
        <div className={`flex items-center justify-center ${styles.dot} mb-2`} 
            title="Perbesar"
            onClick={handleInfo}
            >
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <path d="M12 5.00999L12 5M12 19L12 7.99998" 
                    stroke="#609ed6" strokeWidth="1.5" 
                    strokeLinecap="round" strokeLinejoin="round"></path> 
                </g>
            </svg>
        </div>
        <div className={`flex items-center justify-center ${styles.dot} mb-2`} 
            title="Perbesar"
            onClick={handleDrag}
            >
            <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" 
                xmlns="http://www.w3.org/2000/svg" aria-labelledby="panIconTitle" stroke="#609ed6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="panIconTitle">Pan</title> <path d="M20,14 L20,17 C20,19.209139 18.209139,21 16,21 L10.0216594,21 C8.75045497,21 7.55493392,20.3957659 6.80103128,19.3722467 L3.34541668,14.6808081 C2.81508416,13.9608139 2.94777982,12.950548 3.64605479,12.391928 C4.35756041,11.8227235 5.38335813,11.8798792 6.02722571,12.5246028 L8,14.5 L8,13 L8.00393081,13 L8,11 L8.0174523,6.5 C8.0174523,5.67157288 8.68902517,5 9.5174523,5 C10.3458794,5 11.0174523,5.67157288 11.0174523,6.5 L11.0174523,11 L11.0174523,4.5 C11.0174523,3.67157288 11.6890252,3 12.5174523,3 C13.3458794,3 14.0174523,3.67157288 14.0174523,4.5 L14.0174523,11 L14.0174523,5.5 C14.0174523,4.67157288 14.6890252,4 15.5174523,4 C16.3458794,4 17.0174523,4.67157288 17.0174523,5.5 L17.0174523,11 L17.0174523,7.5 C17.0174523,6.67157288 17.6890252,6 18.5174523,6 C19.3458794,6 20.0174523,6.67157288 20.0174523,7.5 L20.0058962,14 L20,14 Z"></path> </g>
            </svg>
        </div>
    </div>
  )
}

export default NavigationToolPanel