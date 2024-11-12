import React from "react";
import {useNavigate, useParams} from 'react-router-dom'
import FormCitas from '../components/FormCitas.jsx';
const AddCitas = () => {
    return(
        <div>
            <h1>Citas</h1>
            <FormCitas/>
        </div>
    );
};

export default AddCitas;