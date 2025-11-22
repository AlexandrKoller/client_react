import { useSelector, useDispatch  } from "react-redux";

export default function ProgressBar() {
    const max_size = import.meta.env.VITE_MAX_SIZE_USER_STORAGE
    const items = useSelector((state) => state.user_list)
    const dispatch = useDispatch();
    let color_bar
    const persent = Math.round((items.size_storage  * 100) / max_size)
    const styles = {width: `${persent}%`}
    if (persent >= 75){
        color_bar = 'progress-bar bg-danger'
    }
    if (persent <= 75){
        color_bar = 'progress-bar bg-warning text-dark'
    }
    if (persent <= 50){
        color_bar = 'progress-bar'
    }
    if (persent <= 25){
        color_bar = 'progress-bar bg-success'
    }

    return(
        <>
        <div className="progress" role="progressbar" aria-label="Пример успеха" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div className={color_bar} style={styles}>{persent}%</div>
        </div>
        </>
    )
}