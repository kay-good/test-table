import React, { useState, useEffect }  from "react";
import axios from "axios";


function Table() {
    let [tableData, setTableData] = useState([])
    // let [page, setPage] = useState(1)
    let [totalPages, setTotalPages] = useState([1])
    let [sortField, setSortField] = useState('')
    let [filterField, setFilterField] = useState('')
    const [value, setValue] = useState('')  
    const limit = 15
    let defaultParams = {
        _page: 1,
        _limit: limit
    }
    const [params, setParams] = useState(defaultParams)
    
    function countPages(string) {
        const reg = /(?<=(page=))(\d+)/g
        const result = string.match(reg)
        const array = new Array(result ? (+result[result.length - 1]) : 1).fill(null).map((it, index) => index + 1) 
        setTotalPages(array)
    }

    function getdata() {
        console.log(params)
        axios.get('https://jsonplaceholder.typicode.com/posts', {
            params : params
        }).then((response) => {
            console.log(response)
            setTableData(response.data)
            if (response.headers["link"]) {
                countPages(response.headers["link"])
            }
        })
    }

    useEffect(
        () => {
            getdata()
        }, [ params ]
    )

    return <div>
        <div className="container">
        <div className="container">
            <div className="row">
                <select className="form-select col" value={sortField} onChange={(event) => {
                        console.log(event.target.value)
                        setSortField(event.target.value)
                    }}>
                    <option value="">По умолчанию</option>
                    <option value="title">Название</option>
                    <option value="userId">Количество</option>
                    <option value="userId">Расстояние</option>
                </select>
                <select className="form-select col" value={filterField} onChange={(event) => {
                        if (sortField) {
                            const string = `${sortField}${event.target.value}`
                            console.log(string)
                            setFilterField(string)
                        }
                    }}>
                    <option value="">Равно</option>
                    <option value="_gte">Больше</option>
                    <option value="_lte">Меньше</option>
                    <option value="_like">Содержит</option>
                </select>
                <input 
                    className="form-control col"
                    type="text"    
                    value={value}    
                    onChange={(event) => {
                            console.log(event.target.value)
                            setValue(event.target.value)
                        }
                    } 
                />
                <button 
                    className="btn btn-outline-secondary col"
                    onClick={() => {
                            setParams(
                                {...defaultParams, [filterField]: value}
                            )
                        }}>Прменить</button>
            </div>
        </div>
        <table cellSpacing="0" className="table table-striped">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Расстояние</th>
                </tr>
            </thead>
            <tbody>
               {tableData.map((item, index) => {
                   return (
                       <tr key={item.id}>
                           <td>{item.id}</td>
                           <td>{item.title}</td>
                           <td>{item.userId}</td>
                           <td>{item.userId}</td>
                       </tr>
                   )
               })} 
            </tbody>
        </table>
        </div>
        <div className="d-flex justify-content-center">
            <div className="btn-group">
                {totalPages.map((item) => {
                    return (
                        <button key={item} className="btn btn-outline-secondary" onClick={() => {
                            setParams({...params, _page: item})
                        }}>{item}</button>
                    )
                })}
            </div>
        </div>
    </div>
}

export default Table