import { useRouter } from "next/router";
import { useState,useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const [dataDetail, setDetail] = useState();
    const [isChecked, setIsChecked] = useState(false);

    const { idEdit } = router.query

    useEffect(() => {
        if (!idEdit) return;

        fetch(`/api/getDataDetail?id=${idEdit}`)
            .then((res) => res.json())
            .then((data) => {
                if(!data.data) {
                    setDetail(null)
                    return; //Tidak akan menjalankan skrip berikut
                }
                setDetail(data.data);
                setIsChecked(data.data.status === 1)
            })
    }, [idEdit])

    const handleSubmit = (event) => {
        event.preventDefault();
        const todo = event.target.todo.value;
        const status = event.target.status.value.checked ? 1 : 0;
        console.log("todo ", todo)
        console.log("status ", status)

        fetch(`/api/updateData?id=${idEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: status,
                todo: todo,
                id: idEdit,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message)
        })
        .catch((data) => {
            alert('error: ', data.message)
        })
    }

    return (
        <>
            {dataDetail === undefined && <p>LOADING</p>}

            {dataDetail === null && <p>Data kosong</p>}

            {/* {dataDetail && <p>Halaman todo {dataDetail.todo}</p>} */}

            {dataDetail && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="todo">Todo : </label>
                            <input name="todo" defaultValue={dataDetail.todo}></input>
                        </div>
                        <div>
                            <label htmlFor="todo">Status : </label>
                            <input type="checkbox" name="status" value="1" onChange={(event) => {
                                setIsChecked(event.target.checked)
                            }}
                            checked={isChecked}
                                ></input>
                        </div>
                        <div>
                            <button type="submit">Update Data</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}