import { useEffect, useState } from "react";

const UseFetch = (url) => {

    const [data, Setdata] = useState([]);

        useEffect(() => {
            fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                Setdata(data);
            })
        }, [url])

        return data;
}

export default UseFetch;