import React, { useState } from "react";
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

//2022.11.25 : 상품 리스트 필터를 위한 체크박스 컴포넌트 생성
function CheckBox(props) {
    const [checked, setChecked] = useState([]) //check된 데이터만 담기 위해

    //2022.11.25 : 체크박스 활성/비활성을 위해
    const checkBoxHandler = (val) => {
        const currentIndex = checked.indexOf(val); //체크 하려고 하는 값의 인덱스 구하기
        const newChecked = [...checked]

        if(currentIndex === -1){ //체크하려는 값이 없을 경우
            newChecked.push(val)
        }else{ //체크하려는 값이 있을 경우
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked) //부모 컴포넌트에 체크된 값을 보내기 위해
    }

    const renderCheckboxLists = () => props.productItem1 && props.productItem1.map((item, index) =>(
        //2022.11.25 : React.Fragment (DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화하기 위해)
        <React.Fragment key={index}>
            <Checkbox onChange={() => checkBoxHandler(item.key)} 
            checked={checked.indexOf(item.key) === -1 ? false : true}
            style={{minHeight:'110px'}}
            />
            <span style={{marginLeft:'5px', marginRight:'5px'}}>{item.value}</span>
            
        </React.Fragment>
    ))
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="상품 분류" key="1">
                    {renderCheckboxLists()}
                </Panel>
                
            </Collapse>
        </div>
    )
}

export default CheckBox;