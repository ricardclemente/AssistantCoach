import { useState, useEffect } from "react";
import ExerciseList from './ExerciseList';

const term = "Exercise";
const API_URL = '/exercises';
const headers = {
    'Content-Type': 'application/json',
};

function Exercise() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setData(data)
            .catch(error => setError(error)));
    }, []);

    const handleCreate = (exercise) => {
        fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({name: exercise.name, qt: exercise.qt}),
        })
            .then(response => response.json())
            .then(item => setData([...data, item]))
            .catch(error => setError(error));
    };
    
    const handleUpdate = (exercise) => {
        fetch(`${API_URL}/${exercise.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(exercise),
        })
            .then(response => response.json())
            .then(item => setData(data.map(i => i.id === item.id ? item : i)))
            .catch(error => setError(error));
    }

    const handleDelete = (exercise) => {
        fetch(`${API_URL}/${exercise.id}`, {
            method: 'DELETE',
            headers,
        })
            .then(() => setData(data.filter(i => i.id !== exercise.id)))
            .catch(error => setError(error));
    }

    return (
        <div>
            <ExerciseList 
                name={term}
                exercises={data} 
                error={error}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );

}

export default Exercise;