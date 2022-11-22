import React, { useState } from "react";
//2022.11.22 : 파일 업로드 dropzone 라이브러리 import
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from "axios";

function FileUpload(props) {

    //2022.11.22 : multer를 이용한 파일 임시저장 
    const [images, setImages] = useState([]);
    
    //2022.11.22 : 이미지 파일을 백엔드로 전달기능 추가 
    const dropHandler = (files) => {
        let formData = new FormData();
        const config = {
            header : {'content-type':'multipart/form-data'} //파일이기 때문에 멀티파트 사용
        }
        formData.append("file", files[0])
        axios.post('/api/product/image', formData, config)
        .then(res => {
            if(res.data.success){ //성공
                setImages([...images, res.data.filePath])
                props.refreshFunction([...images, res.data.filePath])
            }else{ //실패
                alert("파일 업로드가 실패하였습니다. 잠시 후 다시 이용해주세요.")
            }
        })
    }

    //2022.11.22 : 이미지 클릭 시 지우기
    const deleteHandler = (index) => {
        let newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        props.refreshFunction(newImages)
    }
    return (
        // Dropzone 사용예시 링크 : https://www.npmjs.com/package/react-dropzone
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div style={{
                        width: 300, height: 240, border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '10px'
                    }} 
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{fontSize: '3rem'}}></Icon>
                    </div>
                    </section>
                )}
            </Dropzone>
            <div style={{display:'flex', width: '350px', 
                height: '240px', overflowX: 'auto', whiteSpace:'nowrap'}}
                >
                {
                    images.map((item, index) => (
                        <div key={index} onClick={() => deleteHandler(index)}>
                            <img style={{minWidth:'300px', width:'300px', height:'240px'}} 
                                src={'http://localhost:5000/'+item} />
                        </div>

                    ))
                }
            </div> 
        </div>
        
    )
}

export default FileUpload;