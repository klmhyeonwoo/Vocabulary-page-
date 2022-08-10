import dummy from '../db/data.json';
import { Link } from 'react-router-dom';
import UseFetch from '../hooks/UseFetch';

const DayList = () => {

    const days = UseFetch('http://www.localhost:3001/days');

    return (
        <>
        <ul className="list_day">
            {days.map(day => (
                <li key={day.id}>
                    <Link to={`/day/${day.day}`}> Day {day.day} </Link>
                </li>
            ))}
        </ul>
        </>
    )
}

export default DayList;