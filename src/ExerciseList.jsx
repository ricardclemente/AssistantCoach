import { useState, useEffect } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function ExerciseList({name, exercises, onCreate, onUpdate, onDelete, error}){
    console.log(`ExerciseList: ${JSON.stringify(exercises)}`);

    const [formData, setFormData] = useState({id: '',name:'', qt:''});
    const [editingId,setEditingId] = useState(null);

    useEffect(() => {
        if(editingId === null){
            setFormData({id: '',name:'', qt:''});
        }else{
            const currentExercise = exercises.find(e => e.id === editingId);
            setFormData(currentExercise);
        }
    }, [editingId, exercises]);
    
    const handleFormChange = (event) => {
        console.log(`handleFormChange: ${event.target.name} ${event.target.value}`)
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`formData: ${JSON.stringify(formData)}`);
        if(editingId === null){
            onCreate(formData);
        }else{
            onUpdate(formData);
        }
        setFormData({id: '', name: '', qt: ''})
        setEditingId(null);
    };

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleCancel = () => {
        setFormData({id:'', name:'', qt:''});
        setEditingId(null);
    };

    const handleDelete = (id) => {
        onDelete(id);
    };

    return (
        <Box className="Box" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>{name}</h2>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:8}}>
                <TextField label="Name" name="name" value={formData.name} onChange={handleFormChange}/>
                <TextField label="Qt" name="qt" value={formData.qt} onChange={handleFormChange}/>
                <Button sx={{mr:1}} variant="contained" type="submit">{editingId === null ? 'Create' : 'Update'}</Button>
                {editingId !== null && <Button variant="contained" color ="secondary" onClick={handleCancel}>Cancel</Button>}
            </form>
            <List sx={{width:'100%', maxWidth:360}}>
                {exercises.map(item => (
                    <ListItem key={item.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label='edit' onClick={()=> handleEdit(item.id)}>
                                <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label='delete' onClick={()=> onDelete(item.id)}>
                                <Delete />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={item.name} secondary={item.qt}/>
                    </ListItem>
                ))}
            </List>
            {error && <p>{error}</p>}
        </Box>
    )
}

export default ExerciseList;