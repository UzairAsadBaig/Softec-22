import React from 'react';
import './../css/Input.css'

const Input=( { type, name, placeholder, width, onChange, disabled=false, margin, defaultValue, label, labelVal, step, required=true } ) => {


    return (
        <>
            <input type={type} id={name} name={name} className={`input ${margin}`} step={step} placeholder={placeholder} style={{ width: width }} onChange={onChange} required={required} disabled={disabled} defaultValue={defaultValue===''? '':defaultValue}
                data-content="Popover with data-trigger" rel="popover" data-placement="bottom" data-original-title="Title" data-trigger="hover" />
            <p className={`input_label_${label}`} style={{ width: width }}>{labelVal}</p>
        </>


    );
};

export default Input;