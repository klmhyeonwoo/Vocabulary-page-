import Word from "./Word";
import dummy from '../db/data.json';
import { useParams }  from 'react-router-dom';
import UseFetch from "../hooks/UseFetch";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useState } from "react";

const Day = () => {

    const day = useParams().day;
    const days = UseFetch('http://www.localhost:3001/days');
    const words = UseFetch('http://www.localhost:3001/words');
    const wordList = words.filter(word => word.day === Number(day))
    const navigate = useNavigate();

    const del = () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            if (Number(day) === days.length) {
                    if (wordList.length >= 1) {
                        if (window.confirm('아직 남아있는 데이터가 있습니다, 삭제하시겠습니까?')) {
                            wordList.map(word => {
                                console.log(word.day);
                                fetch(`http://localhost:3001/words/${word.id}`, {
                                    method : 'DELETE',
                                })
                            });

                            fetch(`http://localhost:3001/days/${day}`, {
                                method : 'DELETE',
                            })
                            .then(res => {
                                if (res.ok) {
                                    alert("완료!");
                                    navigate('/');
                                }
                            });
                        }
                    }

                        else {
                            fetch(`http://localhost:3001/days/${day}`, {
                                method : 'DELETE',
                            })
                            .then(res => {
                                if (res.ok) {
                                    alert("완료!");
                                    navigate('/');
                                }
                            });
                        }
                }

                else {
                    alert('아직 삭제되지 않은 상위 일정이 존재합니다!');
                }
            }
        }

    return (
        <>
        <h2> Day {day} </h2>
        <button className="delete_day" onClick={del}> Day {day} 삭제 </button>
        <table>
            <tbody>
                {wordList.map(word => (
                    <Word word={word}/>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default Day;