export default function DestroyButton ({handler, id, name}) {
    return (
        <>
            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target={`#${id}`} style={{marginTop: '4px'}}>
            Удалить
            </button>

            <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={id} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={id}>{`Выдействительно хотите удалить ${name}?`}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={handler}>Удалить</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}