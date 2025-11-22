import { useState, useEffect } from "react";
export default function LoadingComp() {
    const [loadingMessage, setLoadingMessage] = useState(<></>)
    const loading = () => {
        return (
        <>
        <div className="d-flex align-items-center">
            <strong>Загрузка...</strong>
        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>
        </>)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
          setLoadingMessage(loading());
        }, 300);
    
        return () => clearTimeout(timer);
      }, [])     
    return (<>
            {loadingMessage}
            </>)
}