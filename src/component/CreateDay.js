import { useState } from "react";
import UseFetch from "../hooks/UseFetch";
import { useNavigate } from 'react-router'

const CreateDay = () => {

    const navigate = useNavigate();
    const day = UseFetch('http://www.localhost:3001/days'); /* 만들어놓은 커스텀 훅을 통해 API 데이터 값 쉽게 받아오기 */

    const onSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/days/', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                day : day.length + 1
            }),
        })
        .then (res => {
            if (res.ok) {
                alert("생성이 완료되었습니다!");
                navigate('/');
            }
        })
    }

    return (
        <div>
            <h3> 현재 일수 : {day.length}일</h3>
            <button type="submit" onClick={onSubmit}> Day 추가</button>
        </div>
    )
}

export default CreateDay;