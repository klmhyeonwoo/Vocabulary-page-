import { useState, useEffect } from "react";
import dummy from '../db/data.json';

const Word = ({word: w}) => { /* props로 넘겨받는 word 값을 w라는 별칭으로 또 한번 재정의 */

    //const [word, setWord] = useState(w);
    //const [isShow, SetisShow] = useState(false);
    //const [isDone, SetisDone] = useState(word.isDone);

    const [word, Setword] = useState(w); 
    const [data, Setdata] = useState([]);
    const [isShow, SetisShow] = useState(false);
    const [isDone, SetisDone] = useState(word.isDone);


    const toggleShow = () => {
        SetisShow(!isShow);
    }

    const toggleDone = () => {
        //SetisDone(!isDone);
        fetch(`http://localhost:3001/words/${word.id}`, { 
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({ /* 객체를 JSON으로 바꿔준다. */ 
                ...word, /* 기존 word 데이터를 가져온다. */
                isDone : !isDone, /* isDone의 값을 새롭게 정의한다. */
            }),
        })
        .then(res => {
            if (res.ok) { /* 만약 Response가 성공할 경우, state의 값을 반대로 바꿔준다.*/
                SetisDone(!isDone);
            }
        })
    }

    const del = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) { /* 원래는 confirm 명령어로도 가능하지만, 리액트에서는 window를 붙혀주자 */
            fetch(`http://localhost:3001/words/${word.id}`, {
            method : 'DELETE',
        })
        .then(res => {
            if (res.ok) {
                Setword({...word, id : 0}); /* res가 ok되었다면, state를 새롭게 정의해줘야 렌더링이 되어지며, id를 0으로 만들어주는 것이 안전하다. */
            }
        })
        }
    }

    if (word.id === 0) {
        return null;
    }

    return (
        <>
        <table>
        <tr key={word.id} className={isDone ? 'off' : 'on'}>
                <td>
                    <input type="checkbox" checked={isDone} onChange={toggleDone} aria-label="Search"/>
                </td>
                <td>{word.kor}</td>
                <td>{isShow && word.eng}</td>
                <td>
                    <button onClick={toggleShow}> {isShow ? "뜻 숨기기" : "뜻 보기"} </button>
                    <button onClick={del} className='btn_del'> 삭제</button>
                </td>
            </tr>
        </table>
        </>
    )
}

export default Word;