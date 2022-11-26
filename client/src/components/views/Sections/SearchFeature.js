import React, { useState } from "react";
import { Input } from 'antd';

const { Search } = Input;
//2022.11.26 : 상품 검색 컴포넌트 생성
function SearchFeature(props) {
    const [searchValue, setSearchValue] = useState("")
    const searchHandler = (event) => {
        setSearchValue(event.currentTarget.value)
        props.updateValue(event.currentTarget.value)
    }
    return (
        <div>
           <Search
            placeholder="데님"
            onChange={searchHandler}
            value={searchValue}
            style={{ width: 200 }}
            />
        </div>
    )
}

export default SearchFeature;