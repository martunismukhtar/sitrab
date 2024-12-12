import { tooglePanelAtom } from '../../../jotai/atoms';
import { useAtom } from 'jotai';

const AsideHeader = () => {
    const [panel, tooglePanel] = useAtom(tooglePanelAtom);
  return (
    <div className="p-[5px] border-b-2 bg-[#fbfbfb] flex justify-between border-b-[#e9e9e9] rounded-md">
        <div className="font-bold text-slate-900 dark:text-slate-200 text-base">
          Daftar Peta
        </div>
        <div
          className="pr-3 font-bold text-slate-950 text-lg cursor-pointer"
          onClick={() => tooglePanel(!panel)}
        >
          <svg
            className={`${panel ? "rotate-180" : ""}`}
            fill="#367ae7"
            width="24px"
            height="24px"
            viewBox="0 0 36 36"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>angle-double-line</title>{" "}
              <path
                className="clr-i-outline clr-i-outline-path-1"
                d="M29,19.41a1,1,0,0,1-.71-.29L18,8.83,7.71,19.12a1,1,0,0,1-1.41-1.41L18,6,29.71,17.71A1,1,0,0,1,29,19.41Z"
              ></path>
              <path
                className="clr-i-outline clr-i-outline-path-2"
                d="M29,30.41a1,1,0,0,1-.71-.29L18,19.83,7.71,30.12a1,1,0,0,1-1.41-1.41L18,17,29.71,28.71A1,1,0,0,1,29,30.41Z"
              ></path>{" "}
              <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect>{" "}
            </g>
          </svg>
        </div>
      </div>
  )
}

export default AsideHeader