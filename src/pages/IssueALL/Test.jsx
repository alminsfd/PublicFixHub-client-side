import React from 'react';
import { useReactToPrint } from "react-to-print";
import { useRef } from 'react';

const Test = () => {
     const contentRef = useRef(null);
     const reactToPrintFn = useReactToPrint({ contentRef });
     return (
          <div>
               <div className='h-screen flex justify-center items-center bg-amber-700' >
                    <button className='btn' onClick={reactToPrintFn}>Print</button>
                    <div ref={contentRef}>Content to print</div>
               </div>
          </div>
     );
};

export default Test;