import { useNavigate } from 'react-router';
import React, { useRef, useState } from "react";
import UseFetch from '../hooks/UseFetch';

const CreateWord = () => {

    const day = UseFetch('http://www.localhost:3001/days'); /* 만들어놓은 커스텀 훅을 통해 API 데이터 값 쉽게 받아오기 */
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault() /* 원래는 submit 버튼을 누르면 자동으로 새로고침을 하지만, preventDefault를 사용하면 새로고침을 막아준다. */

        console.log(engRef.current.value); /* 현재 useRef의 값을 콘솔로 찍을 때는 current.value를 추가해준다 */
        console.log(korRef.current.value);
        console.log(dayRef.current.value);

        fetch(`http://localhost:3001/words/`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                day : Number(dayRef.current.value),
                eng : engRef.current.value,
                kor : korRef.current.value,
                isDone : false,
            }),
        })
        .then(res => {
            if (res.ok) {
                alert('생성이 완료되었습니다!');
                navigate(`/day/${dayRef.current.value}`)
            }
        })
    }


    /* 각 DOM의 값에 접근할 수 있도록 도와주는 useRef, 선언을 하고 태그에 연결을 해주면 해당 태그의 값을 끌어올 수 있다. */

    const engRef = useRef(null); 
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return (
        <form onSubmit={onSubmit}>
        <div className="input_area">
          <label>Eng</label>
          <input type="text" placeholder="computer" ref={engRef}/>
        </div>
        <div className="input_area">
          <label>Kor</label>
          <input type="text" placeholder="컴퓨터" ref={korRef}/>
        </div>
        <div className="input_area">
          <label>Day</label>
          <select title="DaySelection" ref={dayRef}>
            {day.map(day => (
              <option key={day.id} value={day.day}>
                {day.day}
              </option>
            ))}
          </select>
        </div>
        <button>저장</button>
      </form>
    )
}

export default CreateWord;