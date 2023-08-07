import { ReactNode } from "react";

interface IToolTip {
  children: ReactNode;
  requireHover?: boolean;
}

const Tooltip = (props: IToolTip) => {
  return (
    <span
      className={
        props.requireHover
          ? "absolute w-auto p-1 -mt-3 min-w-max transition-all duration-150 scale-0 origin-center rounded-md shadow-md text-white bg-gradient-to-r from-cyan-900 to-blue-900 text-xs font-bold z-50 group-hover:scale-100"
          : "absolute w-auto p-1 -mt-3 min-w-max transition-all duration-150 scale-100 origin-center rounded-md shadow-md text-white bg-gradient-to-r from-cyan-900 to-blue-900 text-xs font-bold z-50 "
      }
    >
      {props.children}
    </span>
  );
};

export default Tooltip;
