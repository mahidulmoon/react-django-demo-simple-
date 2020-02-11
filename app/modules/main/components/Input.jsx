import React from 'react'

const Input = (props) => (
    <div>
        {props.type!=='select' ? 
            <div className="form-group">
                <label htmlFor={props.name}>{props.label}</label>
                <input onChange={props.onChangeHandle} value={props.value} name={props.name} id={props.name} type={props.type} className="form-control" placeholder={props.label} />
            </div>
                : 
            <div className="form-group">
                <label htmlFor={props.name}>{props.label}</label>
                <select onChange={props.onChangeHandle} value={props.value} name={props.name} className="form-control" >
                    {props.options.map((a,b)=>{
                        return(
                            <option key={b} value={a}>{a}</option>
                        )
                    })}
                </select>
            </div>} 
    </div>
)
export default Input