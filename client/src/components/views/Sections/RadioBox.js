import React, { useState } from "react";
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

//2022.11.26 : 상품 리스트 필터(가격)를 위한 라디오 컴포넌트 생성
function RadioBox(props) {
    const [priceValue, setPriceValue] = useState(0);

    const renderRadiokboxLists = () => props.list && props.list.map((item, index) =>(
        <Radio key={index} value={item.key} style={{marginBottom:'10px'}}>{item.name}</Radio>
    ))

    const handleChange = (event) => {
        setPriceValue(event.target.value)
        props.handleFilters(event.target.value)
    }
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="가격" key="1">
                <Radio.Group onChange={handleChange} value={priceValue} style={{minHeight:'110px'}}>
                    {renderRadiokboxLists()}
                </Radio.Group>
                    
                </Panel>
                
            </Collapse>
        </div>
    )
}

export default RadioBox;